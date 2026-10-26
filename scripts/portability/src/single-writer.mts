import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { bounded, projectRoot, readInput } from './common.mjs';

const input = readInput();
const lock = join(projectRoot(input), '.prometheus', '.writer.lock');
const session = bounded(process.env.CLAUDE_SESSION_ID || input.session_id || `pid-${process.ppid}`);
const now = Math.floor(Date.now() / 1000);
const contents = `${session}\n${now}\n`;
try {
  mkdirSync(dirname(lock), { recursive: true });
  try {
    writeFileSync(lock, contents, { flag: 'wx' });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
    const [holder, since] = readFileSync(lock, 'utf8').split(/\r?\n/);
    const timestamp = Number(since);
    const age = now - (Number.isFinite(timestamp) ? timestamp : 0);
    if (holder && holder !== session && age < 14_400) {
      console.error(`SINGLE-WRITER COLLISION — another session holds an advisory writer record.
Holder: ${bounded(holder)}; age: ${age}s; record: ${lock}
This PostToolUse hook runs after the edit. It cannot prevent that edit or lock
Cargo builds. Coordinate ownership or use an isolated worktree before further writes.
Remove the record only after confirming the other session has ended.`);
      process.exitCode = 2;
    } else {
      // Refresh/takeover is advisory, not a distributed mutual-exclusion primitive.
      writeFileSync(lock, contents);
    }
  }
} catch (error) {
  console.error(`single-writer: advisory record unavailable; coordination NOT verified (${(error as NodeJS.ErrnoException).code || 'I/O error'}).`);
}
