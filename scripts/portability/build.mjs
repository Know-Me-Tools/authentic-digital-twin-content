import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const check = process.argv.includes('--check');
const scratch = check ? mkdtempSync(join(tmpdir(), 'adt-hook-build-')) : null;
try {
  const args = [join(here, 'node_modules/typescript/bin/tsc'), '-p', join(here, 'tsconfig.json')];
  if (scratch) args.push('--outDir', scratch);
  const result = spawnSync(process.execPath, args, { cwd: here, stdio: 'inherit', shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else if (scratch) {
    for (const name of readdirSync(scratch)) {
      const generated = readFileSync(join(scratch, name));
      const committed = readFileSync(resolve(here, '../../.claude/hooks', name));
      if (!generated.equals(committed)) throw new Error(`Compiled hook drift: ${name}`);
    }
    console.log('PASS: TypeScript 7 sources match compiled .mjs hooks.');
  } else console.log('Built portable hooks with TypeScript 7.');
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  if (scratch) rmSync(scratch, { recursive: true, force: true });
}
