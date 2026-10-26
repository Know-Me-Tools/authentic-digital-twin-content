# Current KBD resume entrypoint

Use `prometheus kbd status --json` for current canonical state. The registered
project identity is `.prometheus/project.json`; the runtime owns its journal in
platform application data. This navigation document is not a mutable state ledger.

The generated `current-waypoint.json`, `position.json`, and per-phase `progress.json`
use the current skill-pack schemas and are read-only runtime projections. Verify
provenance/revisions against canonical status; never fall back to the old narrative.

The prior narrative is preserved in [history/pre-canonical-waypoint.md](history/pre-canonical-waypoint.md).
Migration details and evidence are in [migration-report.md](migration-report.md).
Use typed runtime commands for updates; no legacy or shadow writers are enabled.
