---
name: adt-surrealdb-engineering
description: >-
  Build configuration-driven embedded and remote SurrealDB storage for digital
  twin evidence using Rust. Use for graph schemas, vector indexes, tenant isolation,
  migrations, durability, retrieval queries, and database adapter testing.
license: Apache-2.0
compatibility: Requires the selected Rust and SurrealDB versions for implementation. Remote services and embeddings are optional. Portable automation uses Node.js .mjs and TypeScript 7, not shell scripts.
metadata:
  version: "1.0.0"
  author: Know Me Tools
---

# SurrealDB graph and vector engineering

Read [the storage contract](references/storage.md). Do not confuse direct SurrealDB
with the separately configured Surreal memory MCP server.

1. Resolve SurrealDB in Context7 and fetch docs for the actual SDK/server versions.
   Inspect the manifest and dependency features. Record the Rust minimum version,
   SDK version, server version, storage engine, and schema version independently.
2. Use explicit configuration to select ephemeral test memory, persistent embedded
   storage, or remote access. Missing/invalid production configuration must not
   silently fall back to ephemeral memory. Keep credentials outside checked-in files.
3. Model immutable source evidence and derived graph/vector records with author
   ownership, provenance links, timestamps, extraction state, and version metadata.
   Keep canonical Markdown export/import viable; projections are rebuildable.
4. Parameterize values, bound queries, restrict mutation paths, and enforce tenant
   isolation in host/database policy. Inspect statement-level errors, not only
   transport success. Make ingestion and index/ledger updates consistent.
5. Specify embedding model, dimension, metric, and normalization before indexing.
   Compare approximate retrieval against an exact baseline. Verify author/time
   filtering in the actual query plan and results, not only in prompt instructions.
6. At the completed boundary, test both an actual embedded engine and a remote
   server when both are supported. Cover reopen/durability, migrations, duplicate
   import, transaction failure, scope isolation, graph traversal, and vector search.
   Report unavailable remote/Windows execution as unverified.

A database configuration switch is not proof that both engines behave identically.
Keep feature support, backup/recovery, concurrency, and OS acceptance evidence
specific to the engine/version combinations shipped.
