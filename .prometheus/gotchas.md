# gotchas

Append-only. Dated entries. Mark superseded entries; do not delete them.

## 2026-10-26
- Initialized by prometheus-context-bootstrap.

## 2026-10-26 — Source inconsistencies to account for

- Some substrate instructions say twelve files, but the enumerated layout is 13:
  index, STATE.md, and eleven numbered documents. Use the explicit inventory.
- The README and manifests retain historical v1 wording while the skill and new
  content standard are v2. Plugin version and standard version are independent;
  do not bulk-bump versions or rewrite historical artifacts during unrelated work.
- Some workflow examples use Travis's name and rules as defaults. New authors
  require their own authorized evidence; do not copy his identity or certify an
  AI rewrite as human-authored merely because it matches his voice.
- The preserved KBD waypoint uses `lifecycle_stage` and has no `status` field.
  The bootstrap release gate reads `status`; for an authorized final build use its
  documented per-command opt-in instead of editing historical position to pass it.
- Hooks are wired for Claude Code only. The single-writer hook warns after edits;
  it is not a cross-client build lock. Other clients must follow shared discipline.

## 2026-10-26 — Team and distribution constraints

- The creator's UI binding heuristic initially interpreted an architecture role's
  description as UI work. Corrected the manifest through team-update and regenerated
  native definitions; superseded exports are in ignored recovery storage.
- A standalone installer that omits its own scripts/tooling from installed skill
  copies breaks the second distribution hop. Test an installed copy in isolation,
  not only installation from this source repository.
- Exact SHA-256 checks need LF preservation inside the distributed skill as well
  as this repository. Downstream native definitions and companion skills also need
  scoped attributes; existing managed prose/routing must retain newline style.
- PATH's `zed` executable on this host is Authzed/SpiceDB, not the Zed editor.
  The Zed application's bundled CLI reports the actual editor version.
- Kimi and MiniMax executables were absent during probes. DeepSeek Harness's
  executable failed on its own pnpm version mismatch. Definitions are installed;
  none of these observations establishes native discovery or invocation.
- Tool-schema discovery for EdgeQuake, Surreal-memory, Compass and Prometheus
  knowledge is not connectivity evidence or authorization to read/upload sources.

## 2026-10-26 — Current KBD metadata

- Supersedes the old lifecycle_stage hook note: waypoint schema 5 now has canonical
  lifecycle and runtime provenance. Hooks reject legacy/mismatched projections and
  retain explicit authorized release opt-in. Check canonical status for freshness.
- Old ordered_changes arrays plus change_status maps require explicit migration
  rows; the current importer otherwise sees pending rows and conflicts with totals.
- Runtime task registration recalculates parent implementation. Do not backfill
  stale unchecked historical checklists as executable tasks under completed changes.
- The current registered runtime uses platform-data CRDT/journal storage. The
  installed orchestrator's older checkout-local journal example is not this project's
  storage location; do not recreate that legacy layout.
- To refresh all already-owned phase projections after a typed mutation, supported
  migrate --apply regenerates them without reimport once canonical phases exist.
  migrate --projections only adopts unmarked views; it does not refresh owned views.
