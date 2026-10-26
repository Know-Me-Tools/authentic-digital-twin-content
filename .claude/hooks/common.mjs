import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
export function readInput() {
    try {
        const raw = readFileSync(0, 'utf8').trim();
        if (!raw)
            return {};
        const input = JSON.parse(raw);
        if (!input || typeof input !== 'object' || Array.isArray(input))
            throw new Error('expected object');
        return input;
    }
    catch {
        console.error('Hook input unavailable or malformed; no input-dependent decision was verified.');
        return {};
    }
}
export function projectRoot(input) {
    const root = process.env.CLAUDE_PROJECT_DIR || (typeof input.cwd === 'string' ? input.cwd : process.cwd());
    return resolve(root);
}
export function readJson(path) {
    if (!existsSync(path))
        return null;
    try {
        const parsed = JSON.parse(readFileSync(path, 'utf8'));
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
            ? parsed : null;
    }
    catch {
        return null;
    }
}
export function bounded(value, limit = 400) {
    return typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').slice(0, limit) : '';
}
