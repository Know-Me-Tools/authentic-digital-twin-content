import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Installed at <project>/.agent-team/<team-id>/launch-minimax.mjs.
const project = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const executableIndex = args.indexOf('--executable');
const explicit = executableIndex >= 0 ? args[executableIndex + 1] : undefined;
if (executableIndex >= 0 && !explicit) {
  console.error('--executable requires a native executable or .mjs/.js entrypoint.');
  process.exitCode = 1;
} else {
  if (executableIndex >= 0) args.splice(executableIndex, 2);
  const executable = explicit || 'mcode';
  if (/\.(?:cmd|bat|sh|ps1)$/i.test(executable)) {
    console.error('Shell launchers are unsupported. Supply the native executable or Node .mjs/.js entrypoint with --executable.');
    process.exitCode = 1;
  } else {
    const isNode = /\.(?:mjs|js)$/i.test(executable);
    const result = spawnSync(isNode ? process.execPath : executable, isNode ? [resolve(executable), ...args] : args, {
      cwd: project, stdio: 'inherit', shell: false,
      env: { ...process.env, MINIMAX_DATA_DIR: resolve(project, '.minimax') },
    });
    if (result.error) console.error(`MiniMax was not launched: ${result.error.message}. On Windows supply a native executable or the package's Node entrypoint with --executable.`);
    process.exitCode = result.status ?? 1;
  }
}
