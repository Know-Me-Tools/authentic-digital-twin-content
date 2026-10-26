# decisions

Append-only. Dated entries. Mark superseded entries; do not delete them.

## 2026-10-26
- Initialized by prometheus-context-bootstrap.

## 2026-10-26 — Shared repository context

- Use the default bootstrap layout with the mixed profile: AGENTS.md is canonical
  and CLAUDE.md is a relative symlink. Seven configured clients may use different
  models; no fleet measurement supports omitting the execution scaffold.
- Keep domain and future tooling procedures in `docs/agent-*-workflows.md`, routed
  explicitly from AGENTS.md so non-Claude clients receive the same guidance.
- Filesystem substrates are canonical; optional graph memory is a projection.
  This specializes the bootstrap's generic memory-primary statement.
- Prepare Rust guidance without creating Cargo packages. Future CLI and MCP
  adapters share domain logic and explicit write services alongside the skill.
- Preserve existing KBD review obligations and OpenSpec integration files. This
  context setup does not resolve the historical author-review blocker.
- The invoked bootstrap installed its portable UI catalog into both development
  skill directories. Keep its routing conditional on rendered UI/HTML work; it is
  not part of the distributable content skill under `skills/`.

## 2026-10-26 — Portable specialist team

- Supersedes the shared-context symlink decision above: CLAUDE.md is an ordinary
  file importing AGENTS.md, so installation does not require Windows symlink rights.
- Supersedes shell-based bootstrap hooks: maintain TypeScript 7 runtime sources,
  ship Node.js 22+ .mjs entrypoints, and use direct argument arrays without a shell.
  Small compiler launchers and tests may remain .mjs. Do not rerun the original
  shell bootstrap over these portable replacements.
- Maintain twelve role definitions and six native exports, with Zed instruction
  routing. Roles declare ownership, handoffs and skill bindings; clients retain
  their own permissions, models and concurrency. No unverified model ID is pinned.
- Bundle original project companions and licensed vendor skills inside the content
  skill, including a standalone installer. An installed copy must remain capable
  of installing the same bundle into another project without global dependencies.
- Keep source hash checks strict. Protect distributed text with scoped LF Git
  attributes so Windows autocrlf does not corrupt integrity or repeat-install checks.
- MCP revision and transport support is a future implementation/test contract.
  Current rmcp alone is not evidence of support for historical HTTP+SSE clients.
  Keep raw evidence canonical, with authorized graph/vector projections and receipts.

## 2026-10-26 — Canonical KBD cutover

- Supersedes treating the old waypoint as independently authoritative. The registered
  runtime owns state; JSON waypoint, position and phase progress are derived views.
  Runtime storage resolves through .prometheus/project.json and canonical status.
- Use the current 1.13.1 pack writer contracts with typed runtime mutations. No
  legacy/shadow writers or legacy-read-only phases. Component/schema versions are
  independent; do not stamp every artifact with the pack version.
- Historical unchecked task boxes do not reopen changes whose phase ledgers record
  implementation complete. Preserve exact task snapshots/provenance and the existing
  Change Q author-review blocker; no human acceptance can be inferred by migration.
