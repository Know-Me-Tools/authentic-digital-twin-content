import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

type Entry = { path: string; sha256: string; source: string };
type Skill = { name: string; path: string };
type Bundle = { schemaVersion: number; teamId: string; skills: Skill[]; entries: Entry[]; authoringEntries: Entry[]; installerEntries: Entry[] };
type Change = { file: string; absolute: string; before: string | null; after: string };
type Routing = { schemaVersion: number; activeTeam: string; manifest: string; target: string; [key: string]: unknown };

const targets = ['codex', 'claude', 'kimi', 'opencode', 'minimax', 'deepseek'] as const;
const skillDirectories = ['.agents/skills', '.claude/skills', '.opencode/skills', '.kimi-code/skills', '.dsh/skills', '.minimax/skills'];
const zedPriority = ['.rules', '.cursorrules', '.windsurfrules', '.clinerules', '.github/copilot-instructions.md', 'AGENT.md', 'AGENTS.md', 'CLAUDE.md', 'GEMINI.md'];
const start = '<!-- prometheus-team-routing:start v1 -->';
const end = '<!-- prometheus-team-routing:end -->';
const hash = (bytes: string | Buffer): string => createHash('sha256').update(bytes).digest('hex');

function safeRelative(value: string): string {
  if (!value || typeof value !== 'string' || value.includes('\\') || value.startsWith('/') || /[\x00-\x1f\x7f:]/.test(value)) throw Error(`Unsafe bundle path: ${JSON.stringify(value)}`);
  for (const part of value.split('/')) {
    if (!part || part === '.' || part === '..' || /[. ]$/.test(part) || /^(?:\.git|con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part)) throw Error(`Unsafe bundle path component: ${part}`);
  }
  return value;
}

function pathWithin(root: string, name: string): string {
  safeRelative(name);
  let current = root;
  for (const part of name.split('/')) {
    if (existsSync(current) && statSync(current).isDirectory()) {
      const alias = readdirSync(current).find(entry => entry.normalize('NFC').toLowerCase() === part.normalize('NFC').toLowerCase() && entry !== part);
      if (alias) throw Error(`Case-insensitive existing path collision: ${name} (${alias})`);
    }
    current = join(current, part);
    try {
      if (lstatSync(current).isSymbolicLink()) throw Error(`Symlink is not allowed in installation path: ${name}`);
    } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
  }
  const rel = relative(root, current);
  if (isAbsolute(rel) || rel === '..' || rel.startsWith(`..${sep}`)) throw Error(`Path escapes project: ${name}`);
  return current;
}

function walk(root: string, prefix = '', rootExclusions: string[] = []): string[] {
  return readdirSync(join(root, prefix), { withFileTypes: true }).flatMap(entry => {
    if (!prefix && rootExclusions.includes(entry.name)) return [];
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    safeRelative(name);
    if (entry.isSymbolicLink()) throw Error(`Symlink is not allowed in bundle: ${name}`);
    return entry.isDirectory() ? walk(root, name, rootExclusions) : entry.isFile() ? [name] : [];
  }).sort();
}

function mergeInstructions(content: string): string {
  const starts = content.split(start).length - 1;
  const ends = content.split(end).length - 1;
  if (starts !== ends || starts > 1 || (starts === 1 && content.indexOf(end) < content.indexOf(start))) throw Error('Corrupt prometheus-team-routing markers; no project files were written.');
  const newline = content.includes('\r\n') ? '\r\n' : '\n';
  const body = [start,
    'For architecture, development, maintenance, ingestion, retrieval, and database work, read `.agent-team/project-routing.json`, its selected manifest, and the relevant role instructions. Preserve existing permissions, model choices, and ownership.',
    'Use installed native roles when the active client supports delegation. Otherwise follow the roles sequentially and disclose that limitation. Definition files do not establish live invocation or access to private evidence. Independent review requires a separate context.',
    'Zed reads these shared instructions; its external ACP agents retain their own native settings. Parallel threads are not an automatic delegation API. MiniMax project roles require a launcher that sets MINIMAX_DATA_DIR to the project .minimax directory.',
    'Use portable Node.js .mjs entrypoints and TypeScript 7 sources for project automation; do not add shell-script hooks. Keep credentials and private evidence outside distributed skill packages.', end].join(newline);
  if (starts) return content.slice(0, content.indexOf(start)) + body + content.slice(content.indexOf(end) + end.length);
  return content + (content && !content.endsWith('\n') ? newline : '') + (content ? newline : '') + body + newline;
}

function nativeDestination(target: string, name: string): string | null {
  const prefixes: Record<string, string> = { codex: '.codex/agents/', claude: '.claude/agents/', kimi: '.kimi-code/agents/', opencode: '.opencode/agents/', deepseek: '.dsh/profiles/' };
  if (target === 'minimax' && name.startsWith('agents/')) return `.minimax/${name}`;
  if (prefixes[target] && name.startsWith(prefixes[target])) return name;
  const configs: Record<string, string> = { codex: '.codex/config.toml', claude: '.claude/settings.json', opencode: 'opencode.json' };
  return name === configs[target] ? name : null;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    console.log('Usage: node install-team.mjs --project <existing directory> [--check]\nInstalls bundled definitions and companion skills locally; no network, global writes, or agent invocation.');
    return;
  }
  let requested: string | undefined;
  let check = false;
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--project' && args[index + 1] && !args[index + 1].startsWith('--')) requested = args[++index];
    else if (args[index] === '--check') check = true;
    else throw Error(`Unknown or incomplete argument: ${args[index]}`);
  }
  if (!requested) throw Error('--project is required.');
  if (process.platform !== 'win32' && /^(?:[a-z]:[\\/]|\\\\)/i.test(requested)) throw Error('Windows drive and UNC project paths require a Windows Node runtime.');
  if (lstatSync(resolve(requested)).isSymbolicLink()) throw Error('Project root must not be a symlink.');
  const root = realpathSync(resolve(requested));
  if (!statSync(root).isDirectory()) throw Error('Project must be an existing directory.');
  const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const bundleRoot = join(skillRoot, 'tooling');
  const manifest = JSON.parse(readFileSync(join(bundleRoot, 'bundle-manifest.json'), 'utf8')) as Bundle;
  if (manifest.schemaVersion !== 1 || !/^[a-z][a-z0-9-]*$/.test(manifest.teamId) || !Array.isArray(manifest.entries) || !Array.isArray(manifest.skills) || !Array.isArray(manifest.authoringEntries) || !Array.isArray(manifest.installerEntries)) throw Error('Unsupported or malformed bundle manifest.');
  const entries = new Map<string, Entry>();
  const keys = new Set<string>();
  for (const entry of manifest.entries) {
    safeRelative(entry.path);
    const folded = entry.path.normalize('NFC').toLowerCase();
    if (keys.has(folded)) throw Error(`Case-insensitive bundle path collision: ${entry.path}`);
    keys.add(folded);
    if (!/^[a-f0-9]{64}$/.test(entry.sha256)) throw Error(`Invalid digest for ${entry.path}`);
    if (hash(readFileSync(pathWithin(bundleRoot, entry.path))) !== entry.sha256) throw Error(`Bundle integrity failed: ${entry.path}`);
    entries.set(entry.path, entry);
  }
  const actual = walk(bundleRoot).filter(name => name !== 'bundle-manifest.json');
  if (actual.length !== entries.size || actual.some(name => !entries.has(name))) throw Error('Bundle inventory differs from its manifest.');
  const authoringKeys = new Set<string>();
  for (const entry of manifest.authoringEntries) {
    safeRelative(entry.path);
    if (/^(?:scripts|tooling|node_modules|\.git)(?:\/|$)/.test(entry.path)) throw Error(`Authoring package recursion rejected: ${entry.path}`);
    const folded = entry.path.normalize('NFC').toLowerCase();
    if (authoringKeys.has(folded)) throw Error(`Duplicate authoring package path: ${entry.path}`);
    authoringKeys.add(folded);
    if (hash(readFileSync(pathWithin(skillRoot, entry.path))) !== entry.sha256) throw Error(`Authoring package integrity failed: ${entry.path}`);
  }
  const authoringFiles = walk(skillRoot, '', ['scripts', 'tooling', 'node_modules', '.git', '.DS_Store']);
  if (authoringFiles.length !== manifest.authoringEntries.length || authoringFiles.some(name => !authoringKeys.has(name.normalize('NFC').toLowerCase()))) throw Error('Authoring package inventory differs from its manifest.');
  const installerKeys = new Set<string>();
  for (const entry of manifest.installerEntries) {
    safeRelative(entry.path);
    if (!entry.path.startsWith('scripts/')) throw Error(`Installer path must stay under scripts: ${entry.path}`);
    const folded = entry.path.normalize('NFC').toLowerCase();
    if (installerKeys.has(folded)) throw Error(`Duplicate installer path: ${entry.path}`);
    installerKeys.add(folded);
    if (hash(readFileSync(pathWithin(skillRoot, entry.path))) !== entry.sha256) throw Error(`Installer integrity failed: ${entry.path}`);
  }
  const installerFiles = walk(join(skillRoot, 'scripts')).map(name => `scripts/${name}`);
  if (installerFiles.length !== manifest.installerEntries.length || installerFiles.some(name => !installerKeys.has(name.normalize('NFC').toLowerCase()))) throw Error('Installer inventory differs from its manifest.');
  const runtime = join(bundleRoot, 'creator-runtime');
  const { validateTeam } = await import(pathToFileURL(join(runtime, 'validation.mjs')).href);
  const { commitChanges } = await import(pathToFileURL(join(runtime, 'project-files.mjs')).href);
  const teamText = readFileSync(join(bundleRoot, 'team/team.json'), 'utf8');
  const team = validateTeam(JSON.parse(teamText));
  if (team.id !== manifest.teamId) throw Error('Bundle identity and team manifest disagree.');
  const changes = new Map<string, Change>();
  const conflicts: string[] = [];
  const diagnostics: string[] = [];
  const plannedKeys = new Map<string, string>();
  function stage(name: string, after: string, merge = false): void {
    const absolute = pathWithin(root, name);
    const folded = name.normalize('NFC').toLowerCase();
    const previous = plannedKeys.get(folded);
    if (previous && previous !== name) throw Error(`Case-insensitive destination collision: ${name}`);
    plannedKeys.set(folded, name);
    const existing = existsSync(absolute) ? readFileSync(absolute, 'utf8') : null;
    const prior = changes.get(absolute);
    if (prior && prior.after !== after) throw Error(`Conflicting planned writes: ${name}`);
    if (existing === after) return;
    if (existing !== null && !merge) { conflicts.push(name); return; }
    changes.set(absolute, { file: name, absolute, before: existing, after });
  }
  const attributes = readFileSync(join(skillRoot, '.gitattributes'), 'utf8');
  stage(`.agent-team/${team.id}/.gitattributes`, attributes);
  stage(`.agent-team/${team.id}/team.json`, teamText);
  const skillNames = new Set<string>(['authentic-digital-twin-content']);
  for (const entry of [...manifest.authoringEntries, ...manifest.installerEntries]) {
    const data = readFileSync(join(skillRoot, entry.path));
    if (!Buffer.from(data.toString('utf8'), 'utf8').equals(data)) throw Error(`Non-UTF-8 authoring payload is unsupported: ${entry.path}`);
    for (const directory of skillDirectories) stage(`${directory}/authentic-digital-twin-content/${entry.path}`, data.toString('utf8'));
  }
  // The tooling snapshot contains companions/exports, never the parent authoring
  // skill. Copying it preserves redistributability without recursive nesting.
  for (const name of [...manifest.entries.map(entry => entry.path), 'bundle-manifest.json']) {
    const data = readFileSync(join(bundleRoot, name));
    if (!Buffer.from(data.toString('utf8'), 'utf8').equals(data)) throw Error(`Non-UTF-8 tooling payload is unsupported: ${name}`);
    for (const directory of skillDirectories) stage(`${directory}/authentic-digital-twin-content/tooling/${name}`, data.toString('utf8'));
  }
  for (const skill of manifest.skills) {
    if (!/^[a-z][a-z0-9-]*$/.test(skill.name) || skillNames.has(skill.name)) throw Error(`Invalid or duplicate skill name: ${skill.name}`);
    skillNames.add(skill.name);
    safeRelative(skill.path);
    if (!entries.has(`${skill.path}/SKILL.md`)) throw Error(`Missing skill entrypoint: ${skill.name}`);
    for (const directory of skillDirectories) stage(`${directory}/${skill.name}/.gitattributes`, attributes);
    for (const entry of manifest.entries.filter(item => item.path.startsWith(`${skill.path}/`))) {
      const relativeName = entry.path.slice(skill.path.length + 1);
      const data = readFileSync(join(bundleRoot, entry.path));
      // Portable skill bundles intentionally consist of UTF-8 instructions/runtime text.
      if (!Buffer.from(data.toString('utf8'), 'utf8').equals(data)) throw Error(`Non-UTF-8 skill payload is not supported: ${entry.path}`);
      for (const directory of skillDirectories) stage(`${directory}/${skill.name}/${relativeName}`, data.toString('utf8'));
    }
  }
  const definitions: Record<string, string[]> = {};
  for (const target of targets) {
    const prefix = `exports/${target}/`;
    const native = manifest.entries.filter(entry => entry.path.startsWith(prefix));
    if (!native.length) throw Error(`Missing target export: ${target}`);
    definitions[target] = [];
    for (const entry of native) {
      const name = entry.path.slice(prefix.length);
      const destination = nativeDestination(target, name);
      if (!destination) continue;
      const content = readFileSync(join(bundleRoot, entry.path), 'utf8');
      const config = ['.codex/config.toml', '.claude/settings.json', 'opencode.json'].includes(destination);
      const destinationPath = pathWithin(root, destination);
      if (config && existsSync(destinationPath)) {
        if (readFileSync(destinationPath, 'utf8') !== content) diagnostics.push(`Preserved existing configuration ${destination}; bundled options require deliberate review, while native role definitions are installed separately.`);
      } else stage(destination, content);
      if (!config) {
        stage(`${dirname(destination).split(sep).join('/')}/.gitattributes`, attributes);
        definitions[target].push(destination);
      }
    }
    if (!definitions[target].length) throw Error(`Export contains no installable native definitions: ${target}`);
  }
  stage(`.agent-team/${team.id}/launch-minimax.mjs`, readFileSync(join(skillRoot, 'scripts/launch-minimax.mjs'), 'utf8'));
  const instructionFiles = [...new Set(['AGENTS.md', 'CLAUDE.md', zedPriority.find(name => existsSync(pathWithin(root, name))) || 'AGENTS.md'])];
  for (const name of instructionFiles) {
    const path = pathWithin(root, name);
    stage(name, mergeInstructions(existsSync(path) ? readFileSync(path, 'utf8') : ''), true);
  }
  const routingName = '.agent-team/project-routing.json';
  const routingPath = pathWithin(root, routingName);
  let routing: Routing = { schemaVersion: 1, activeTeam: team.id, manifest: `.agent-team/${team.id}/team.json`, target: 'codex' };
  if (existsSync(routingPath)) {
    const previous = JSON.parse(readFileSync(routingPath, 'utf8')) as Routing;
    if (previous.schemaVersion !== 1 || typeof previous.activeTeam !== 'string' || typeof previous.manifest !== 'string' || typeof previous.target !== 'string') throw Error('Existing project routing is malformed; preserve it for deliberate repair.');
    safeRelative(previous.manifest);
    if (previous.activeTeam !== team.id && !existsSync(pathWithin(root, previous.manifest))) throw Error('Existing team selection is stale.');
    routing = { ...previous };
    if (routing.activeTeam !== team.id) diagnostics.push(`Preserved existing selected team ${routing.activeTeam}; installed ${team.id} as an available team.`);
  }
  const updated = {
    ...routing,
    ...(routing.activeTeam === team.id ? {
      nativeDefinitions: Object.values(definitions).flat().sort(),
      nativeDefinitionsByTarget: definitions,
      instructionFiles,
      delegation: 'native-definitions',
      limitations: ['Definition presence is not live discovery or execution evidence.', 'Native clients own permissions, models, concurrency, and delegation.', 'Zed uses shared instructions and configured ACP agents; no automatic delegation API is claimed.', 'MiniMax requires MINIMAX_DATA_DIR to point at the project .minimax directory.'],
    } : {}),
    installedBundles: { ...(routing.installedBundles as Record<string, unknown> || {}), [team.id]: { bundleManifestSha256: hash(readFileSync(join(bundleRoot, 'bundle-manifest.json'))), nativeDefinitionsByTarget: definitions } },
  };
  const routingNewline = existsSync(routingPath) && readFileSync(routingPath, 'utf8').includes('\r\n') ? '\r\n' : '\n';
  stage(routingName, `${JSON.stringify(updated, null, 2)}\n`.replaceAll('\n', routingNewline), true);
  const report = { schemaVersion: 1, project: root, team: team.id, selectedTeam: routing.activeTeam, selectedTarget: routing.target, check, changed: [...changes.values()].map(change => change.file), conflicts, skills: [...skillNames], nativeDefinitionsByTarget: definitions, diagnostics, invokedAgents: false };
  if (conflicts.length) {
    console.log(JSON.stringify({ ...report, installed: false, reason: 'Existing differing files preserved; resolve conflicts before installation.' }, null, 2));
    process.exitCode = 2;
    return;
  }
  if (check) {
    console.log(JSON.stringify({ ...report, installed: changes.size === 0 }, null, 2));
    if (changes.size) process.exitCode = 2;
    return;
  }
  const recovery = commitChanges(root, [...changes.values()], { operation: 'standalone-team-bundle', team: team.id });
  console.log(JSON.stringify({ ...report, installed: true, recovery }, null, 2));
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
