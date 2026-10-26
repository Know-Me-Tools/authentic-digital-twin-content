# Storage implementation contract

Research checked 2026-10-26. Official [Rust SDK documentation](https://surrealdb.com/docs/reference/rust)
reported SDK **3.3.4**, current server **3.3.4**, and Rust **1.95+**. These are
observations, not repository pins. Check release metadata again before creating a
Cargo dependency; server and SDK release schedules need not remain identical.

## Configurable engines

The [Rust connect documentation](https://surrealdb.com/docs/reference/rust/methods/connect)
supports runtime selection through the `any` engine and URL schemes. Observed
feature mappings include `mem://` → `kv-mem`, `surrealkv://` → `kv-surrealkv`,
WebSocket → `protocol-ws`, and HTTP → `protocol-http`. Missing engine features
can fail at connection time. Verify enabled features rather than assuming every
scheme is available. Windows paths must be handled by documented SDK path APIs;
do not build malformed file URLs by concatenating drive letters.

Define a configuration contract for mode, endpoint/path, namespace, database,
credential reference, and permitted author scope. Test a persistent embedded
engine separately from in-memory tests. Use TLS for remote credentials where
appropriate and keep remote server capabilities distinct from client options.

## Sessions and author isolation

Current [multi-tenancy guidance](https://surrealdb.com/docs/reference/rust/concepts/multi-tenancy)
describes independent sessions when cloning a v3 client; older versions differed.
Do not reuse assumptions from v2. Avoid mutating a shared session's namespace or
authentication during concurrent author requests. Resolve author identity through
trusted configuration/authorization, not arbitrary input selecting any namespace.

Choose and document namespace/database isolation or tested record-level policy.
Test reads, writes, graph traversal, vector search, exports, and cached results
with two authors and adversarial identifiers. A client-side filter alone is not
the authorization boundary. Operational memory and document evidence remain
separate logical datasets unless a deliberate schema unifies them.

## Graph/vector schema

Model source documents and spans, claims, entities, directed relations, revisions,
and extraction jobs. Keep relation evidence and confidence distinct from relation
existence. Do not infer a knowledge-graph semantic edge from an ANN index's internal
proximity graph. Preserve contradictory claims and effective/capture times.

The [vector index documentation](https://surrealdb.com/docs/learn/data-models/vector-search/vector-indexes)
distinguishes exact search from approximate HNSW and disk-oriented DISKANN. Select
an index using measured recall, corpus size, latency, and memory requirements.
Pin embedding dimension/metric/type; a changed embedding model requires deliberate
re-embedding and index migration. Do not claim an index is used without checking
the query plan for the selected version.

## Acceptance and recovery

Use synthetic evidence. Verify deterministic IDs, idempotent import, rejected
malformed vectors, multi-statement failure handling, transaction rollback,
concurrent import, durable reopen, backup/restore, schema upgrade, deletion of
derived records, and remote reconnect. Exercise real public CLI/MCP entry points
after the storage tests. Report backend-specific limitations, including Windows
execution that has not actually run.

Keep migrations and configuration examples portable. Hooks, installers, validators,
and test launchers use Node.js `.mjs`; maintained typed sources use TypeScript 7.
Do not introduce shell wrappers, platform-specific path roots, or embedded secrets.
