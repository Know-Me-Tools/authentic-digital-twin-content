import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

test('Git checkout keeps hashed text LF even with core.autocrlf=true', () => {
  const directory = mkdtempSync(join(tmpdir(), 'adt line endings '));
  const git = args => {
    const result = spawnSync('git', args, { cwd: directory, encoding: 'utf8', shell: false });
    assert.equal(result.status, 0, result.stderr || result.error?.message);
  };
  try {
    git(['init', '--quiet']);
    writeFileSync(join(directory, '.gitattributes'), readFileSync(fileURLToPath(new URL('../../.gitattributes', import.meta.url))));
    const contents = 'first line\nsecond line\n';
    const names = ['sample.md', 'sample.json', 'sample.mts', 'sample.mjs', 'sample.toml', 'sample.yml'];
    for (const name of names) writeFileSync(join(directory, name), contents);
    git(['-c', 'core.autocrlf=true', 'add', '.']);
    for (const name of names) unlinkSync(join(directory, name));
    git(['-c', 'core.autocrlf=true', 'checkout-index', '--all', '--force']);
    for (const name of names) assert.equal(readFileSync(join(directory, name), 'utf8'), contents, name);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
