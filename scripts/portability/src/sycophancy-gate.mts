import { existsSync, unlinkSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { projectRoot, readInput } from './common.mjs';

const input = readInput();
const root = projectRoot(input);
const marker = join(root, '.prometheus', '.review-pending');
if (existsSync(marker)) {
  const configured = process.env.PROMETHEUS_SYCOPHANCY_CHECKER;
  const candidates = configured
    ? [isAbsolute(configured) ? configured : resolve(root, configured)]
    : [join(root, 'scripts', 'check-findings-sycophancy.mjs'), join(root, '.claude', 'hooks', 'check-findings-sycophancy.mjs')];
  const checker = candidates.find(path => path.endsWith('.mjs') && existsSync(path));
  if (!checker) {
    console.error(`sycophancy-gate: no portable .mjs checker found; review NOT verified. Pending marker retained: ${marker}`);
  } else if (input.stop_hook_active) {
    console.error('sycophancy-gate: recursive Stop invocation; review remains pending and NOT verified.');
  } else {
    const result = spawnSync(process.execPath, [checker], {
      cwd: root, shell: false, encoding: 'utf8', timeout: 30_000,
      maxBuffer: 1024 * 1024, input: JSON.stringify(input),
    });
    if (result.status === 0 && !result.error) {
      try { unlinkSync(marker); } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          console.error('sycophancy-gate: checker passed but pending marker could not be removed.');
          process.exitCode = 2;
        }
      }
    } else {
      const diagnostics = [result.error?.message, result.stdout, result.stderr].filter(Boolean).join('\n');
      console.error(`ANTI-SYCOPHANCY GATE — pending review did not pass.\n${diagnostics.split(/\r?\n/).slice(0, 40).join('\n')}\nFix the findings; do not delete the marker to bypass review.`);
      process.exitCode = 2;
    }
  }
}
