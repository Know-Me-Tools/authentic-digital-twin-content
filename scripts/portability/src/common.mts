import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type HookInput = {
  cwd?: string;
  session_id?: string;
  tool_input?: { command?: unknown };
  stop_hook_active?: boolean;
};

export function readInput(): HookInput {
  try {
    const raw = readFileSync(0, 'utf8').trim();
    if (!raw) return {};
    const input: unknown = JSON.parse(raw);
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('expected object');
    return input as HookInput;
  } catch {
    console.error('Hook input unavailable or malformed; no input-dependent decision was verified.');
    return {};
  }
}

export function projectRoot(input: HookInput): string {
  const root = process.env.CLAUDE_PROJECT_DIR || (typeof input.cwd === 'string' ? input.cwd : process.cwd());
  return resolve(root);
}

export function readJson(path: string): Record<string, unknown> | null {
  if (!existsSync(path)) return null;
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown> : null;
  } catch { return null; }
}

export function bounded(value: unknown, limit = 400): string {
  return typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').slice(0, limit) : '';
}
