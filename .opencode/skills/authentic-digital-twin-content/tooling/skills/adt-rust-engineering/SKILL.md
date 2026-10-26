---
name: adt-rust-engineering
description: Design and implement Rust ingestion and CLI application services for authorized author evidence, with shared MCP boundaries and provenance-preserving storage.
license: Apache-2.0
compatibility: Rust toolchain selected by the project; Context7 or official current documentation; Node.js 22+ for repository helpers.
metadata:
  version: "1.0.0"
---

# Rust evidence architecture and implementation

Read the current task, architectural decisions, evidence schema and existing
Cargo manifests. No manifest means no implementation exists yet. Resolve current
crate documentation with Context7 before choosing APIs or features. Do not reuse
an old snippet as proof of compatibility.

1. Define source envelopes: author, source identity/hash, capture time when known,
   register, raw versus derived content, contribution/consent scope and lineage.
2. Organize by capability with thin CLI/MCP adapters calling shared application
   services. Keep domain transforms independent of transport and write credentials.
   Split crates only for a demonstrated dependency or ownership boundary.
3. Keep ingestion replay-safe and bounded. Validate canonical roots and symlink
   escapes; use atomic file replacement and report partial failure precisely.
   Preserve original bytes and never convert AI text into human evidence.
4. Use typed errors and propagate cancellation. Avoid secrets or source message
   bodies in logs. Inspect actual failure paths before adding retries; remote
   acceptance may already have committed and requires reconciliation.
5. Match the existing 13-file substrate inventory and versioned standard. Schema,
   content standard, plugin release and transport versions remain distinct.
6. Verify a coherent completed path through the real CLI and temporary synthetic
   evidence. Cover duplicate imports, malformed input, escaping paths, isolation,
   provenance and interrupted writes. Add transport/storage tests with those owners.

Pin actual supported toolchains and dependencies after verification; retain
Cargo.lock for binaries. Serialize Cargo commands sharing a target directory.
Use the actual manifest's formatting/lint/integration commands; never invent a test
selector. Release and cross-platform runs belong to the delivery boundary.

Architecture reviews return a decision with tradeoffs, migration and acceptance
criteria. Implementation handoffs include changed paths, public behavior, commands,
observed results and remaining gaps. Dependencies alone do not guarantee isolation
or compiler enforcement; a tested enforcement mechanism is required for that claim.

Source contract: original project guidance, Apache-2.0, 2026-10-26. For MCP use
`adt-mcp-compatibility`; for database behavior use `adt-surrealdb-engineering`.
