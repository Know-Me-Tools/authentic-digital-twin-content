import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { bounded, projectRoot, readInput, readJson } from './common.mjs';
const root = projectRoot(readInput());
const waypointPath = join(root, '.kbd-orchestrator', 'current-waypoint.json');
console.log('## RE-ANCHOR');
if (existsSync(waypointPath)) {
    const waypoint = readJson(waypointPath);
    const current = waypoint?.schemaVersion === '5' && waypoint.generatedBy === 'kbd-runtime'
        && Number.isInteger(waypoint.sourceRevision) && Number(waypoint.sourceRevision) >= 0
        && waypoint.revision === waypoint.sourceRevision && typeof waypoint.lifecycle === 'string';
    if (current) {
        const fields = ['sourceRevision', 'activePhase', 'phase', 'childPointer', 'change', 'currentTask', 'nextChange', 'nextTask', 'lifecycle', 'stageId', 'stageStatus'];
        const position = Object.fromEntries(fields.filter(key => waypoint[key] != null).map(key => [key, bounded(typeof waypoint[key] === 'string' ? waypoint[key] : JSON.stringify(waypoint[key]))]));
        console.log(`Waypoint: ${JSON.stringify(position)}`);
        const note = bounded(waypoint.exactNextCommand);
        if (note)
            console.log(`Operator note (intent, NOT a work selector): ${note}`);
    }
    else
        console.log('Waypoint: unavailable or unmigrated — requires a schemaVersion 5 kbd-runtime projection with matching revision/sourceRevision and canonical lifecycle. Use canonical KBD status; do not interpret legacy fields.');
}
else
    console.log('Waypoint: none — establish project position before resuming historical work.');
if (existsSync(join(root, 'versions.toml')))
    console.log('Pins: versions.toml is authoritative for architecture and dependencies.');
console.log('Authority: canonical KBD runtime journal (resolve via prometheus kbd status --json and project identity); waypoint is a derived projection. Confirm its revision against canonical KBD status before resuming. versions.toml governs decisions; current user task governs scope.');
try {
    const gotchas = readFileSync(join(root, '.prometheus', 'gotchas.md'), 'utf8');
    const bullets = gotchas.split(/\r?\n/).filter(line => /^[-*] /.test(line)).slice(-3);
    if (bullets.length)
        console.log(`Recent gotchas:\n${bullets.map(line => `  ${bounded(line)}`).join('\n')}`);
}
catch { /* Optional learning file; absence does not block a session. */ }
console.log('Rules: AGENTS.md is resident. Scoped detail lives in .claude/rules/ and the routed task guides.');
