import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { bounded, projectRoot, readInput, readJson } from './common.mjs';
const input = readInput();
const command = typeof input.tool_input?.command === 'string' ? input.tool_input.command : '';
// A workflow guard, not a shell parser or security boundary. The host owns authorization.
const finalArtifact = /\bcargo(?:\.exe)?\s+(?:\+\S+\s+)?(?:build|test)\b[^\r\n]*--release\b|\btauri(?:\.exe)?\s+build\b|\bflutter(?:\.bat|\.exe)?\s+build\s+(?:ios|apk|appbundle)\b|\bgo(?:\.exe)?\s+test\b[^\r\n]*-race\b|\bwasm-pack(?:\.exe)?\s+test\s+--headless\b|\bplaywright(?:\.cmd)?\s+test\b/i;
if (finalArtifact.test(command)) {
    const root = projectRoot(input);
    const waypointPath = join(root, '.kbd-orchestrator', 'current-waypoint.json');
    const waypoint = readJson(waypointPath);
    const current = waypoint?.schemaVersion === '5' && waypoint.generatedBy === 'kbd-runtime'
        && Number.isInteger(waypoint.sourceRevision) && Number(waypoint.sourceRevision) >= 0
        && waypoint.revision === waypoint.sourceRevision && typeof waypoint.lifecycle === 'string';
    const lifecycle = current ? bounded(waypoint.lifecycle) : '';
    const explicit = process.env.PROMETHEUS_TIER3 === '1' || existsSync(join(root, '.kbd-orchestrator', 'tier3.allow'));
    const boundary = lifecycle === 'completed';
    if (!explicit && !boundary) {
        console.error(`FINAL ARTIFACT GATE — release command outside a completed change or release boundary.

  command: ${bounded(command, 1500)}
  lifecycle: ${lifecycle || '<unavailable or unmigrated>'}
  stage: ${current ? bounded(waypoint.stageId) || '<none>' : '<unverified>'}
  stageStatus: ${current ? bounded(waypoint.stageStatus) || '<none>' : '<unverified>'}
  phase: ${current ? bounded(waypoint.activePhase) || bounded(waypoint.phase) || '<unknown>' : '<unverified>'}
  source: ${waypointPath}

Finish the coherent implementation and relevant integration check first.
Only a current kbd-runtime projection's canonical lifecycle can establish this
automatic boundary; legacy status/stage aliases never authorize a release.
For an authorized final artifact, set PROMETHEUS_TIER3=1 in the hook process
environment, or create .kbd-orchestrator/tier3.allow for that delivery session.
Remove that marker when finished. Do not edit the waypoint to bypass this gate.`);
        process.exitCode = 2;
    }
}
