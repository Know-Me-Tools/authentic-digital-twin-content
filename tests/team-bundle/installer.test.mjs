import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const source = join(repository, 'skills/authentic-digital-twin-content');
const manifest = JSON.parse(readFileSync(join(source, 'tooling/bundle-manifest.json'), 'utf8'));
const digest = data => createHash('sha256').update(data).digest('hex');

function fixture(t, copy = true) {
  const temporary = mkdtempSync(join(tmpdir(), 'adt standalone team '));
  const skill = join(temporary, 'copied standalone skill');
  const project = join(temporary, 'destination project with spaces');
  mkdirSync(project);
  if (copy) cpSync(source, skill, { recursive: true, dereference: false });
  t.after(() => rmSync(temporary, { recursive: true, force: true }));
  return { temporary, skill, project };
}

function run(skill, project, extra = []) {
  const result = spawnSync(process.execPath, [join(skill, 'scripts/install-team.mjs'), '--project', project, ...extra], {
    cwd: project, shell: false, encoding: 'utf8', timeout: 120_000,
    env: { ...process.env, HOME: project, USERPROFILE: project, CODEX_HOME: join(project, 'unused-user-home') },
    maxBuffer: 16 * 1024 * 1024,
  });
  assert.ifError(result.error);
  return result;
}

function files(root, prefix = '') {
  return readdirSync(join(root, prefix), { withFileTypes: true }).flatMap(entry => {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.ok(!entry.isSymbolicLink(), `Unexpected installed symlink ${name}`);
    return entry.isDirectory() ? files(root, name) : [name];
  }).sort();
}

function snapshot(root) {
  return Object.fromEntries(files(root).map(name => [name, digest(readFileSync(join(root, name)))]));
}

test('isolated skill installs all native formats, original/companion skills, and Zed instructions; rerun is idempotent', t => {
  const { temporary, skill, project } = fixture(t);
  const attributes = readFileSync(join(source, '.gitattributes'));
  assert.deepEqual(attributes, readFileSync(join(repository, '.gitattributes')));
  assert.equal(manifest.authoringEntries.find(entry => entry.path === '.gitattributes')?.sha256, digest(attributes));
  const settings = '{"hooks":{"SessionStart":[]},"permissions":{"deny":["Read(secret)"]}}\n';
  const opencode = '{"plugin":["existing-plugin"]}\n';
  mkdirSync(join(project, '.claude'));
  writeFileSync(join(project, '.claude/settings.json'), settings);
  writeFileSync(join(project, 'opencode.json'), opencode);
  writeFileSync(join(project, 'AGENTS.md'), '# Operator guidance\r\nPreserve this prose.\r\n');
  writeFileSync(join(project, '.rules'), 'Zed operator guidance\n');
  const result = run(skill, project);
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.installed, true);
  assert.equal(report.invokedAgents, false);
  assert.equal(report.selectedTarget, 'codex');
  assert.deepEqual(Object.keys(report.nativeDefinitionsByTarget), ['codex', 'claude', 'kimi', 'opencode', 'minimax', 'deepseek']);
  for (const paths of Object.values(report.nativeDefinitionsByTarget)) {
    assert.ok(paths.length > 0);
    for (const path of paths) {
      assert.ok(existsSync(join(project, path)), path);
      assert.deepEqual(readFileSync(join(project, dirname(path), '.gitattributes')), attributes);
    }
  }
  for (const directory of ['.agents/skills', '.claude/skills', '.opencode/skills', '.kimi-code/skills', '.dsh/skills', '.minimax/skills']) {
    for (const name of ['authentic-digital-twin-content', ...manifest.skills.map(item => item.name)]) {
      assert.ok(existsSync(join(project, directory, name, 'SKILL.md')), `${directory}/${name}`);
      assert.deepEqual(readFileSync(join(project, directory, name, '.gitattributes')), attributes);
    }
    assert.ok(existsSync(join(project, directory, 'authentic-digital-twin-content/tooling/bundle-manifest.json')));
    assert.ok(existsSync(join(project, directory, 'authentic-digital-twin-content/scripts/install-team.mjs')));
    assert.ok(existsSync(join(project, directory, 'authentic-digital-twin-content/scripts/README.md')));
    assert.deepEqual(readFileSync(join(project, directory, 'authentic-digital-twin-content/.gitattributes')), attributes);
    assert.ok(!existsSync(join(project, directory, 'authentic-digital-twin-content/tooling/skills/authentic-digital-twin-content')));
  }
  assert.equal(readFileSync(join(project, '.claude/settings.json'), 'utf8'), settings);
  assert.equal(readFileSync(join(project, 'opencode.json'), 'utf8'), opencode);
  assert.ok(!existsSync(join(project, '.gitattributes')), 'Installation must not impose a root Git policy.');
  assert.deepEqual(readFileSync(join(project, '.agent-team/authentic-digital-twin/.gitattributes')), attributes);
  assert.match(readFileSync(join(project, 'AGENTS.md'), 'utf8'), /^# Operator guidance\r\nPreserve this prose\.\r\n/);
  assert.match(readFileSync(join(project, 'CLAUDE.md'), 'utf8'), /prometheus-team-routing:start/);
  assert.match(readFileSync(join(project, '.rules'), 'utf8'), /^Zed operator guidance\n/);
  assert.match(readFileSync(join(project, '.rules'), 'utf8'), /not an automatic delegation API/);
  const before = snapshot(project);
  const again = run(skill, project);
  assert.equal(again.status, 0, again.stderr);
  assert.deepEqual(JSON.parse(again.stdout).changed, []);
  assert.deepEqual(snapshot(project), before);
  const check = run(skill, project, ['--check']);
  assert.equal(check.status, 0, check.stderr);
  assert.deepEqual(JSON.parse(check.stdout).changed, []);
  const routingFile = join(project, '.agent-team/project-routing.json');
  const routing = JSON.parse(readFileSync(routingFile, 'utf8'));
  routing.target = 'kimi';
  writeFileSync(routingFile, `${JSON.stringify(routing, null, 2)}\n`);
  const selected = run(skill, project, ['--check']);
  assert.equal(selected.status, 0, selected.stderr);
  assert.equal(JSON.parse(selected.stdout).selectedTarget, 'kimi');
  const gitProject = join(temporary, 'downstream Git repository');
  const gitExport = join(temporary, 'Git checkout with autocrlf');
  cpSync(project, gitProject, { recursive: true });
  // This sibling has no attributes: its CRLF checkout proves conversion is active.
  writeFileSync(join(gitProject, 'line-ending-control.txt'), 'outside the skill\n');
  const emptyAttributes = join(temporary, 'empty global attributes');
  writeFileSync(emptyAttributes, '');
  const git = (...args) => {
    const result = spawnSync('git', ['-c', 'core.autocrlf=true', '-c', 'core.safecrlf=false', '-c', `core.attributesFile=${emptyAttributes}`, ...args], {
      cwd: gitProject, shell: false, encoding: 'utf8', timeout: 120_000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
    return result;
  };
  git('init', '--quiet');
  git('add', '--all', '--force');
  git('checkout-index', '--all', `--prefix=${gitExport.replaceAll('\\', '/')}/`);
  assert.equal(readFileSync(join(gitExport, 'line-ending-control.txt'), 'utf8'), 'outside the skill\r\n');
  for (const name of ['AGENTS.md', 'CLAUDE.md', '.rules', '.agent-team/project-routing.json']) {
    assert.ok(readFileSync(join(gitExport, name), 'utf8').includes('\r\n'), `${name} should exercise CRLF preservation`);
  }
  const checkedOutSkill = join(gitExport, '.agents/skills/authentic-digital-twin-content');
  const downstream = run(checkedOutSkill, gitExport, ['--check']);
  assert.equal(downstream.status, 0, `${downstream.stderr}\n${downstream.stdout}`);
  assert.deepEqual(JSON.parse(downstream.stdout).changed, []);
  const redistributed = join(temporary, 'redistributed installed skill only');
  cpSync(checkedOutSkill, redistributed, { recursive: true });
  assert.deepEqual(snapshot(redistributed), snapshot(join(project, '.agents/skills/authentic-digital-twin-content')));
  const second = join(temporary, 'second clean destination');
  mkdirSync(second);
  const transitive = run(redistributed, second);
  assert.equal(transitive.status, 0, transitive.stderr);
  assert.equal(JSON.parse(transitive.stdout).installed, true);
  const secondSkill = join(second, '.claude/skills/authentic-digital-twin-content');
  assert.ok(existsSync(join(secondSkill, 'scripts/install-team.mjs')));
  const transitiveCheck = run(secondSkill, second, ['--check']);
  assert.equal(transitiveCheck.status, 0, transitiveCheck.stderr);
});

test('differing same-role definition refuses before any partial installation', t => {
  const { skill, project } = fixture(t);
  const exported = manifest.entries.find(entry => entry.path.startsWith('exports/codex/.codex/agents/'));
  assert.ok(exported);
  const destination = exported.path.slice('exports/codex/'.length);
  mkdirSync(dirname(join(project, destination)), { recursive: true });
  writeFileSync(join(project, destination), '# deliberate local role\n');
  writeFileSync(join(project, 'AGENTS.md'), '# Keep exactly\n');
  const before = snapshot(project);
  const result = run(skill, project);
  assert.equal(result.status, 2, result.stderr);
  assert.ok(JSON.parse(result.stdout).conflicts.includes(destination));
  assert.deepEqual(snapshot(project), before);
});

test('check mode is read-only for a fresh destination', t => {
  const { skill, project } = fixture(t);
  const result = run(skill, project, ['--check']);
  assert.equal(result.status, 2, result.stderr);
  assert.ok(JSON.parse(result.stdout).changed.length > 0);
  assert.deepEqual(readdirSync(project), []);
});

test('differing scoped Git attributes fail preflight and preserve root policy', t => {
  const { skill, project } = fixture(t);
  writeFileSync(join(project, '.gitattributes'), '* text eol=crlf\n');
  mkdirSync(join(project, '.claude/agents'), { recursive: true });
  writeFileSync(join(project, '.claude/agents/.gitattributes'), '*.md text eol=crlf\n');
  const before = snapshot(project);
  const result = run(skill, project);
  assert.equal(result.status, 2, result.stderr);
  assert.ok(JSON.parse(result.stdout).conflicts.includes('.claude/agents/.gitattributes'));
  assert.deepEqual(snapshot(project), before);
});

test('tampered bundle path and payload fail before destination writes', t => {
  const { skill, project } = fixture(t);
  const path = join(skill, 'tooling/bundle-manifest.json');
  const altered = JSON.parse(readFileSync(path, 'utf8'));
  altered.entries[0].path = '../escape';
  writeFileSync(path, JSON.stringify(altered));
  let result = run(skill, project);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unsafe bundle path/);
  assert.deepEqual(readdirSync(project), []);
  writeFileSync(path, JSON.stringify(manifest));
  writeFileSync(join(skill, 'tooling', manifest.entries[0].path), 'tampered');
  result = run(skill, project);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /integrity failed/);
  assert.deepEqual(readdirSync(project), []);
});

test('destination symlink escape is rejected instead of followed', t => {
  const { temporary, skill, project } = fixture(t);
  const outside = join(temporary, 'outside');
  mkdirSync(outside);
  try { symlinkSync(outside, join(project, '.agents'), process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) {
    if (['EPERM', 'EACCES'].includes(error.code)) { t.skip('Host does not permit test symlink creation.'); return; }
    throw error;
  }
  const result = run(skill, project);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Symlink is not allowed/);
  assert.deepEqual(readdirSync(outside), []);
  assert.deepEqual(readdirSync(project), ['.agents']);
});

test('portable MiniMax launcher scopes data without a shell or real client invocation', t => {
  const { temporary, project } = fixture(t, false);
  const launcherDirectory = join(project, '.agent-team/authentic-digital-twin');
  mkdirSync(launcherDirectory, { recursive: true });
  cpSync(join(source, 'scripts/launch-minimax.mjs'), join(launcherDirectory, 'launch-minimax.mjs'));
  const fakeClient = join(temporary, 'fake minimax entry.mjs');
  writeFileSync(fakeClient, 'console.log(JSON.stringify({data:process.env.MINIMAX_DATA_DIR,cwd:process.cwd(),args:process.argv.slice(2)}));');
  const result = spawnSync(process.execPath, [join(launcherDirectory, 'launch-minimax.mjs'), '--executable', fakeClient, 'test-argument'], { encoding: 'utf8', shell: false });
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.data, join(realpathSync(project), '.minimax'));
  assert.equal(payload.cwd, realpathSync(project));
  assert.deepEqual(payload.args, ['test-argument']);
  const refused = spawnSync(process.execPath, [join(launcherDirectory, 'launch-minimax.mjs'), '--executable', 'mcode.cmd'], { encoding: 'utf8', shell: false });
  assert.equal(refused.status, 1);
  assert.match(refused.stderr, /Shell launchers are unsupported/);
});
