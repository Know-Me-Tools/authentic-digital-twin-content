---
paths: ['**/*.rs', '**/Cargo.toml']
---

# Rust

Loaded when a Rust file is read. Not resident.

This repository has no Rust application yet. Read `docs/agent-tooling-workflows.md`
before introducing one. These rules prepare for requested CLI/MCP extensions;
they do not authorize implementing a tool during documentation work. Once code
exists, document actual integration targets here instead of inventing selectors.

Load `prometheus-rust-workspace` before Rust implementation, review, refactoring,
or architecture work. It routes installed skills and owns Cargo timing; loading a
skill does not authorize immediate command execution.

Use `rust-best-practices` for general Rust work, `rust-async-patterns` for Tokio,
async I/O, concurrency, or cancellation, and `rust-mcp-server-generator` for Rust
MCP servers and transports. Project dependency pins and protocol versions win over
skill examples.

## Phase-gated integration verification

- Batch related edits and use static reasoning or rust-analyzer during implementation.
- Run one consolidated Cargo validation batch after a meaningful production path is
  complete at a change or phase boundary. Use a narrow compiler check earlier only
  when compiler feedback is required to unblock progress or the user requests it.
- Start with the smallest integration target that exercises the completed public
  entry point and real collaborators. Unit, module-local, mock-only, and filtered
  function tests do not count as completion evidence.
- Escalate only when the change or diagnostics cross package boundaries. Reserve
  broad, release, cross-compile, feature-matrix, Miri, fuzzing, coverage, benchmark,
  and documentation commands for a final boundary or explicit request.
- After failure, read all diagnostics, batch fixes, and rerun only the smallest
  integration command that can confirm the completed behavior.
- Report commands, results, intentional deferrals, and any remaining integration gate.

## Hard rules

- Never `--release` during implementation. It invalidates incremental artifacts
  and pays full optimization for code that will change.
- Never cross-compile or run a vendored native build before the affected integration gate passes.
- One build profile per session. Switching profiles thrashes the incremental cache.
- Do not use `--all-features` unless the project supports combined features or the user requests it.

## Build concurrency

Within one workspace or target directory, serialize every Cargo command. Before an
expensive command, account for any Cargo process already running. Across isolated
worktrees, retain separate default target directories and a shared `CARGO_HOME`;
serialize dependency-mutating commands such as `cargo fetch`, `cargo update`, and
`cargo add`. Do not create extra target directories merely to bypass ordinary lock
contention, and never run `cargo clean` unless cleanup is the requested task.

## Capability inversion

Keep agent kernels independent of write-capable crates; mutations belong in
explicit host/application services. This is an architectural requirement, not
an existing compiler guarantee. When such crates are introduced, define and test
the dependency boundary (for example with a dependency audit or architecture
check). Do not claim compile-time enforcement without an actual mechanism and
evidence that a prohibited dependency fails it.

<!-- Replace example integration selectors with this project's real production-path gates. -->
