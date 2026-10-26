import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const hooks = join(repository, '.claude', 'hooks');

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'adt hooks with spaces '));
  mkdirSync(join(root, '.prometheus'));
  mkdirSync(join(root, '.kbd-orchestrator'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

function run(name, root, input = {}, env = {}) {
  const environment = { ...process.env, CLAUDE_PROJECT_DIR: root, ...env };
  delete environment.PROMETHEUS_TIER3;
  if (env.PROMETHEUS_TIER3) environment.PROMETHEUS_TIER3 = env.PROMETHEUS_TIER3;
  const result = spawnSync(process.execPath, [join(hooks, `${name}.mjs`)], {
    input: typeof input === 'string' ? input : JSON.stringify(input),
    encoding: 'utf8', cwd: root, env: environment, shell: false, timeout: 5000,
  });
  assert.ifError(result.error);
  return result;
}

test('release gate covers ordinary and Windows executable commands; local work passes', t => {
  const root = fixture(t);
  for (const command of ['cargo build --release', 'cargo.exe test --release', 'playwright.cmd test', 'flutter.bat build apk']) {
    const result = run('tier-guard', root, { tool_input: { command } });
    assert.equal(result.status, 2, command);
    assert.match(result.stderr, /FINAL ARTIFACT GATE/);
  }
  assert.equal(run('tier-guard', root, { tool_input: { command: 'cargo test' } }).status, 0);
});

test('release gate requires current canonical lifecycle and provenance; explicit opt-in remains available', t => {
  const root = fixture(t);
  const path = join(root, '.kbd-orchestrator/current-waypoint.json');
  const input = { tool_input: { command: 'cargo build --release' } };
  const current = { schemaVersion: '5', generatedBy: 'kbd-runtime', sourceRevision: 12, revision: 12, phase: 'release', stageId: 'reflect', stageStatus: 'complete' };
  writeFileSync(path, JSON.stringify({ ...current, lifecycle: 'running', status: 'completed' }));
  assert.equal(run('tier-guard', root, input).status, 2);
  writeFileSync(path, JSON.stringify({ ...current, lifecycle: 'completed', status: 'running' }));
  assert.equal(run('tier-guard', root, input).status, 0);
  for (const waypoint of [
    { phase: 'release', status: 'completed', lifecycle_stage: 'reflect-complete' },
    { ...current, lifecycle: 'completed', schemaVersion: '4' },
    { ...current, lifecycle: 'completed', generatedBy: 'legacy-writer' },
    { ...current, lifecycle: 'completed', revision: 13 },
    { ...current, lifecycle: 'completed', sourceRevision: -1, revision: -1 },
  ]) {
    writeFileSync(path, JSON.stringify(waypoint));
    const result = run('tier-guard', root, input);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /unavailable or unmigrated/);
  }
  writeFileSync(path, '{malformed');
  assert.equal(run('tier-guard', root, input).status, 2);
  assert.equal(run('tier-guard', root, input, { PROMETHEUS_TIER3: '1' }).status, 0);
  writeFileSync(join(root, '.kbd-orchestrator/tier3.allow'), '');
  assert.equal(run('tier-guard', root, input).status, 0);
});

test('malformed or absent hook input fails open with no false verification', t => {
  const root = fixture(t);
  const result = run('tier-guard', root, '{invalid');
  assert.equal(result.status, 0);
  assert.match(result.stderr, /malformed.*NOT|malformed.*verified/i);
  assert.equal(run('tier-guard', root, '').status, 0);
  assert.equal(run('tier-guard', root, { tool_input: { command: 7 } }).status, 0);
});

test('writer record allows same session, reports another holder, and permits stale takeover', t => {
  const root = fixture(t);
  const lock = join(root, '.prometheus/.writer.lock');
  assert.equal(run('single-writer', root, {}, { CLAUDE_SESSION_ID: 'first' }).status, 0);
  assert.equal(run('single-writer', root, {}, { CLAUDE_SESSION_ID: 'first' }).status, 0);
  const collision = run('single-writer', root, {}, { CLAUDE_SESSION_ID: 'second' });
  assert.equal(collision.status, 2);
  assert.match(collision.stderr, /cannot prevent/);
  assert.match(readFileSync(lock, 'utf8'), /^first\n/);
  writeFileSync(lock, 'first\n1\n');
  assert.equal(run('single-writer', root, {}, { CLAUDE_SESSION_ID: 'second' }).status, 0);
  assert.match(readFileSync(lock, 'utf8'), /^second\n/);
});

test('review checker absence stays explicitly unverified and retains pending marker', t => {
  const root = fixture(t);
  const marker = join(root, '.prometheus/.review-pending');
  assert.equal(run('sycophancy-gate', root).status, 0);
  writeFileSync(marker, 'pending');
  const result = run('sycophancy-gate', root, {}, { PROMETHEUS_SYCOPHANCY_CHECKER: '' });
  assert.equal(result.status, 0);
  assert.match(result.stderr, /NOT verified/);
  assert.ok(existsSync(marker));
});

test('review invokes .mjs checker without a shell; failure retains marker and pass removes it', t => {
  const root = fixture(t);
  const marker = join(root, '.prometheus/.review-pending');
  const checker = join(root, 'review checker.mjs');
  const env = { PROMETHEUS_SYCOPHANCY_CHECKER: checker };
  writeFileSync(marker, 'pending');
  writeFileSync(checker, 'console.error("finding"); process.exitCode = 1;');
  assert.equal(run('sycophancy-gate', root, {}, env).status, 2);
  assert.ok(existsSync(marker));
  writeFileSync(checker, 'console.log("reviewed");');
  assert.equal(run('sycophancy-gate', root, {}, env).status, 0);
  assert.ok(!existsSync(marker));
});

test('recursive stop does not endlessly block and leaves review pending', t => {
  const root = fixture(t);
  writeFileSync(join(root, '.prometheus/.review-pending'), 'pending');
  const checker = join(root, 'checker.mjs');
  writeFileSync(checker, 'process.exitCode = 1;');
  const result = run('sycophancy-gate', root, { stop_hook_active: true }, { PROMETHEUS_SYCOPHANCY_CHECKER: checker });
  assert.equal(result.status, 0);
  assert.match(result.stderr, /recursive Stop/);
});

test('reanchor prints bounded current projection facts without arbitrary payload', t => {
  const root = fixture(t);
  writeFileSync(join(root, '.kbd-orchestrator/current-waypoint.json'), JSON.stringify({
    schemaVersion: '5', generatedBy: 'kbd-runtime', sourceRevision: 12, revision: 12,
    phase: 'phase-3b', activePhase: 'phase-3b', lifecycle: 'blocked', stageId: 'reflect', stageStatus: 'complete',
    lifecycle_stage: 'LEGACY_NOT_FOR_CONTEXT', status: 'LEGACY_ALIAS_NOT_FOR_CONTEXT', private: 'SECRET_NOT_FOR_CONTEXT',
    exactNextCommand: 'Historical intent',
  }));
  writeFileSync(join(root, 'versions.toml'), '[pins]\n');
  writeFileSync(join(root, '.prometheus/gotchas.md'), '# Log\n- First\n- Second\n- Third\n- Fourth\n');
  const result = run('reanchor', root);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /"lifecycle":"blocked"/);
  assert.match(result.stdout, /"stageId":"reflect"/);
  assert.match(result.stdout, /"sourceRevision":"12"/);
  assert.match(result.stdout, /intent, NOT a work selector/);
  assert.doesNotMatch(result.stdout, /SECRET_NOT_FOR_CONTEXT|LEGACY_NOT_FOR_CONTEXT|LEGACY_ALIAS_NOT_FOR_CONTEXT|First/);
  assert.match(result.stdout, /canonical KBD runtime journal.*prometheus kbd status --json and project identity/);
  assert.doesNotMatch(result.stdout, /\.kbd-orchestrator\/runtime\/events\.jsonl/);
  assert.match(result.stdout, /Fourth/);
});

test('reanchor refuses legacy or revision-mismatched projections instead of interpreting their fields', t => {
  const root = fixture(t);
  for (const waypoint of [
    { phase: 'DO_NOT_RESUME', lifecycle_stage: 'reflect-complete', exactNextCommand: 'DO_NOT_EXECUTE' },
    { schemaVersion: '5', generatedBy: 'kbd-runtime', sourceRevision: 12, revision: 13, lifecycle: 'completed', phase: 'DO_NOT_RESUME' },
  ]) {
    writeFileSync(join(root, '.kbd-orchestrator/current-waypoint.json'), JSON.stringify(waypoint));
    const result = run('reanchor', root);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /unavailable or unmigrated/);
    assert.doesNotMatch(result.stdout, /DO_NOT_RESUME|DO_NOT_EXECUTE|reflect-complete/);
  }
});

test('all hook settings use direct exec arguments and resolve paths containing spaces', t => {
  const root = fixture(t);
  const settings = JSON.parse(readFileSync(join(repository, '.claude/settings.json'), 'utf8'));
  for (const groups of Object.values(settings.hooks)) {
    for (const group of groups) for (const hook of group.hooks) {
      assert.equal(hook.command, 'node');
      assert.equal(hook.args.length, 1);
      assert.match(hook.args[0], /^\$\{CLAUDE_PROJECT_DIR\}\/\.claude\/hooks\/[a-z-]+\.mjs$/);
      const expanded = hook.args[0].replace('${CLAUDE_PROJECT_DIR}', root);
      assert.ok(expanded.includes('with spaces'));
      assert.ok(!expanded.startsWith('"'), 'exec argv must not include shell quoting');
    }
  }
  assert.ok(!readdirSync(hooks).some(name => name.endsWith('.sh')));
});
