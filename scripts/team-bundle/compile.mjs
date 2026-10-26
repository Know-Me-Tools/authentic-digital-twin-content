import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const output = resolve(here, '../../skills/authentic-digital-twin-content/scripts');
const scratch = process.argv.includes('--check') ? mkdtempSync(join(tmpdir(), 'adt-installer-build-')) : null;
try {
  const args = [resolve(here, '../portability/node_modules/typescript/bin/tsc'), '-p', join(here, 'tsconfig.json')];
  if (scratch) args.push('--outDir', scratch);
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else if (scratch) {
    for (const name of readdirSync(scratch)) {
      if (!readFileSync(join(scratch, name)).equals(readFileSync(join(output, name)))) throw Error(`Installer source drift: ${name}`);
    }
    console.log('PASS: TypeScript 7 installer sources match committed .mjs output.');
  } else console.log('Built standalone installer with TypeScript 7.');
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  if (scratch) rmSync(scratch, { recursive: true, force: true });
}
