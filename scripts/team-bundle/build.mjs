import { createHash } from 'node:crypto';
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const output = join(repository, 'skills/authentic-digital-twin-content/tooling');
const creator = join(repository, 'skills/vendor/agent-team-creator');
const targets = ['codex', 'claude', 'kimi', 'opencode', 'minimax', 'deepseek'];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const files = new Map();
const sources = new Map();
const skipped = new Set(['.git', 'node_modules', '__pycache__', '.DS_Store']);
const posix = value => value.split(sep).join('/');

function walk(root, prefix = '', rootExclusions = []) {
  return readdirSync(join(root, prefix), { withFileTypes: true }).flatMap(entry => {
    if (skipped.has(entry.name) || (!prefix && rootExclusions.includes(entry.name))) return [];
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw Error(`Bundle source symlink rejected: ${posix(relative(repository, join(root, name)))}`);
    return entry.isDirectory() ? walk(root, name, rootExclusions) : entry.isFile() ? [name] : [];
  }).sort();
}

function add(source, destination) {
  if (lstatSync(source).isSymbolicLink()) throw Error(`Symlink source rejected: ${source}`);
  const bytes = readFileSync(source);
  if (files.has(destination) && !files.get(destination).equals(bytes)) throw Error(`Conflicting bundle destination: ${destination}`);
  files.set(destination, bytes);
  sources.set(destination, posix(relative(repository, source)));
}

function copyTree(source, prefix) {
  for (const name of walk(source)) add(join(source, name), `${prefix}/${name}`);
}

function skillName(file) {
  const text = readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  const raw = frontmatter?.match(/^name:\s*(.+?)\s*$/m)?.[1];
  const name = raw?.replace(/^(?:"([^"]+)"|'([^']+)')$/, '$1$2');
  if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) throw Error(`Portable skill name missing or invalid: ${file}`);
  return name;
}

try {
  const teamSource = join(repository, '.agent-team/authentic-digital-twin/team.json');
  const team = JSON.parse(readFileSync(teamSource, 'utf8'));
  if (team.id !== 'authentic-digital-twin') throw Error('Unexpected team identity.');
  add(teamSource, 'team/team.json');
  for (const target of targets) {
    const source = join(repository, `.agent-team/authentic-digital-twin/exports/${target}`);
    if (!existsSync(source)) throw Error(`Native export not ready: ${target}`);
    copyTree(source, `exports/${target}`);
  }
  const skillRoots = readdirSync(join(repository, 'skills'), { withFileTypes: true })
    .filter(entry => entry.name.startsWith('adt-') && entry.isDirectory())
    .map(entry => join(repository, 'skills', entry.name));
  for (const entry of readdirSync(join(repository, 'skills/vendor'), { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw Error(`Vendor skill symlink rejected: ${entry.name}`);
    if (entry.isDirectory() && existsSync(join(repository, 'skills/vendor', entry.name, 'SKILL.md'))) skillRoots.push(join(repository, 'skills/vendor', entry.name));
  }
  const skillNames = new Set();
  const skills = [];
  for (const root of skillRoots.sort()) {
    const name = skillName(join(root, 'SKILL.md'));
    if (skillNames.has(name)) throw Error(`Duplicate skill frontmatter name: ${name}`);
    skillNames.add(name);
    copyTree(root, `skills/${name}`);
    skills.push({ name, path: `skills/${name}` });
  }
  for (const role of team.roles) {
    for (const skill of role.skills || []) {
      if (skill !== 'authentic-digital-twin-content' && !skillNames.has(skill)) throw Error(`Role ${role.id} references an unbundled skill: ${skill}`);
    }
  }
  // Bundle only the pure Node dependency closure needed by installProject and safe commits.
  const seen = new Set();
  function runtimeFile(name) {
    if (seen.has(name)) return;
    seen.add(name);
    if (!name.endsWith('.mjs') || name.includes('..') || name.startsWith('/')) throw Error(`Unsafe creator runtime dependency: ${name}`);
    const path = join(creator, 'scripts', name);
    add(path, `creator-runtime/${name}`);
    const text = readFileSync(path, 'utf8');
    for (const match of text.matchAll(/(?:from\s+|import\s*)['"]([^'"]+)['"]/g)) {
      if (match[1].startsWith('node:')) continue;
      if (!match[1].startsWith('./')) throw Error(`Nonportable creator dependency in ${name}: ${match[1]}`);
      runtimeFile(posix(join(dirname(name), match[1])));
    }
  }
  runtimeFile('project-install.mjs');
  const provenance = existsSync(join(creator, 'PROVENANCE.json')) ? 'PROVENANCE.json' : 'PROVENANCE.md';
  for (const name of ['LICENSE', provenance]) {
    if (!existsSync(join(creator, name))) throw Error(`Creator license/provenance missing: ${name}`);
    add(join(creator, name), `creator-runtime/${name}`);
  }
  const entries = [...files].sort(([a], [b]) => a.localeCompare(b, 'en')).map(([path, bytes]) => ({ path, sha256: digest(bytes), source: sources.get(path) }));
  const manifest = {
    schemaVersion: 1, teamId: team.id, nativeTargets: targets,
    sourcePolicy: 'Generated snapshot. Source hashes describe bytes; exports are definitions, not live execution evidence.',
    authoringEntries: walk(join(repository, 'skills/authentic-digital-twin-content'), '', ['scripts', 'tooling']).map(path => ({ path, sha256: digest(readFileSync(join(repository, 'skills/authentic-digital-twin-content', path))), source: `skills/authentic-digital-twin-content/${path}` })),
    installerEntries: walk(join(repository, 'skills/authentic-digital-twin-content/scripts')).map(path => ({ path: `scripts/${path}`, sha256: digest(readFileSync(join(repository, 'skills/authentic-digital-twin-content/scripts', path))), source: `skills/authentic-digital-twin-content/scripts/${path}` })),
    skills: skills.sort((a, b) => a.name.localeCompare(b.name, 'en')), entries,
  };
  files.set('bundle-manifest.json', Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
  const expected = [...files.keys()].sort();
  const current = existsSync(output) ? walk(output) : [];
  const drift = expected.filter(name => !existsSync(join(output, name)) || !files.get(name).equals(readFileSync(join(output, name))));
  const obsolete = current.filter(name => !files.has(name));
  if (process.argv.includes('--check')) {
    console.log(JSON.stringify({ checked: true, files: files.size, skills: skills.length, nativeTargets: targets.length, drift, obsolete }, null, 2));
    if (drift.length || obsolete.length) process.exitCode = 1;
  } else {
    mkdirSync(output, { recursive: true });
    for (const name of obsolete) rmSync(join(output, name));
    for (const name of drift) {
      mkdirSync(dirname(join(output, name)), { recursive: true });
      writeFileSync(join(output, name), files.get(name));
    }
    console.log(JSON.stringify({ bundled: true, files: files.size, skills: skills.length, nativeTargets: targets.length, updated: drift.length, removed: obsolete.length }, null, 2));
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
