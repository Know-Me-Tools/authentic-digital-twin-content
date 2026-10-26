# Current KBD metadata migration

Completed 2026-10-26 using the invoked Prometheus Skill Pack **1.13.1** payload.
The init skill is **1.1.0**, orchestrator skill **2.0.0**, and installed canonical
runtime **1.11.3**. These are independent component versions, not interchangeable
schema numbers. Installed skill payloads were treated as read-only.

## Current authority and state

The registered canonical runtime owns workflow state. `.prometheus/project.json`
identifies project `fc7e5931-e8c0-49de-9cd6-5a491afe5fe7`; `prometheus kbd status
--json` resolves its current state. This runtime stores the journal and CRDT project
in platform application data, not a checkout-local `.kbd-orchestrator/runtime`.
No legacy/shadow writer or legacy-read-only phase is enabled.

| Artifact | Current contract |
|---|---|
| Project configuration | Bundled kbd-init project writer schema; `activePhase`, no `active_phase` |
| Canonical runtime state | Schema 2, revision 4 |
| Waypoint JSON | Schema 5, `generatedBy: kbd-runtime`, source revision 4 |
| Position JSON | Schema 1, `generatedBy: kbd-runtime`, source revision 4 |
| Six phase progress files | Schema 2, `generatedBy: kbd-runtime`, source revision 4 |
| 36 native change task files | Current schema 1; 21 unique change identities |
| Markdown waypoint | Navigation to canonical status; no independent mutable state |

The current projection schemas intentionally include some compatibility aliases.
Those runtime-generated fields do not enable a legacy mode and must not be removed
by hand. All workflow mutations use typed runtime commands.

Active phase: **phase-3b-substrate-hardening**, implementation **3/4**, blocked on
Change Q's author review. Across all six historical phases, **20/21** changes are
complete. Run lifecycle is **ready**; phase/change blocking and run lifecycle are
separate facts. Phase evidence/certification/publication are **NOT_TRACKED**; the
run-wide unset dimensions remain pending. No human verdict was invented.

## Preservation and reconciliation

Before migration, all 69 existing KBD files were copied with a SHA-256 inventory to
ignored recovery storage at `.agent-team/recovery/kbd-before-canonical-2026-10-26`.
The runtime also retained its own pre-migration backups in project application data.
Original phase reports, plans, source inputs and change documents remain unchanged.
The old Markdown waypoint is preserved byte-for-byte at
`history/pre-canonical-waypoint.md`.

The initial inventory showed six counter conflicts and 21 uncertain rows because
the importer reads explicit `changes[]`, while these old ledgers stored statuses
in `change_status`. Before cutover, ungenerated inputs were normalized from the
recorded per-change statuses: twenty DONE and one explicitly BLOCKED. Supported
`migrate --apply` imported every phase and regenerated the current projections.
The human-review blocker and migration decision were recorded through typed commands.
A final supported migration refresh aligned all projection revisions.

Native change source metadata now has `spec.md`, schema-1 `tasks.json`, a generated
`tasks.md` view and `verification.md`, without shell conversion scripts. Archived
final documents were preferred over stale active duplicates; original `change.md`
files remain historical evidence. Unknown completion timestamps/actors stay null.
Change Q's current spec/task records its already-documented blocked review prerequisite.

Twelve completed changes have historical checklists whose boxes were never updated.
Their exact flags remain in the new task snapshots with provenance notes. They were
not registered as new executable runtime tasks: doing so would incorrectly reopen
completed implementation. The canonical phase/change ledger remains authoritative.
See `task-migration-receipt.json` for every source, hash, destination and discrepancy.
Old stage flags remain in preserved phase reports and the provenance decision; no
new assessment, execution, reflection or approval event was fabricated.

## Configuration and validation

Project discovery found Node.js 22+ and TypeScript 7 tooling, no Cargo workspace,
no required external build mount and no dev server. Commands and constraints reflect
that actual stack. Seven client preferences follow the configured project team;
model selection inherits the authorized client rather than template model IDs.
Ancestor workspace files describe other projects, so this checkout uses single-project
scope. Execution prerequisites are ready; the historical author-review dependency
remains a separate work blocker.

OpenSpec's managed refresh resolved **1.15.0**, with `latestVerified: true` and
`authoredPathsChanged: []`. Generated integrations were refreshed; historical native
KBD phases were not silently switched to another backend. The completed portable-team
OpenSpec change remains in its existing current OpenSpec state, rather than being
invented as a new historical KBD phase.

Observed checks:

- Bundled kbd-init validator: configuration valid; execution prerequisites ready.
- Full JSON Schema draft 2020-12 validation against the exact installed pack:
  **45 files valid** (project, waypoint, position, six phase projections, 36 task ledgers).
- Runtime migration audit: **0** migrated files remaining, uncertain rows, invalid
  files, alias conflicts, legacy-read-only phases, stale projections or unreplayable history.
- Canonical assertions: all six phases represented, 20/21 implementation preserved,
  unresolved human blocker retained, every generated source revision matches 4.
- Portable hook subprocess suite: **10 passed**; TypeScript source/output check passed.
- Bundle drift check: clean; installed team check: current with zero changes/conflicts.
- Managed OpenSpec strict validation: one change passed, zero failed. Whitespace check passed.
- Independent review: original sources/task flags preserved; no remaining material finding.

The revision is a snapshot of this completed migration. Use current canonical status
after subsequent work rather than treating this report as a live state source.
