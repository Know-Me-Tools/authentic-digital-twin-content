# Agent-team protocol and storage research

Checked 2026-10-26. Scope: engineering role guidance and distributable companion
skills. No private evidence was read, ingested, or written to a graph service.

## Findings that change the team design

1. **Protocol compatibility needs explicit ownership.** The official documentation
   lists public revisions 2024-11-05, 2025-03-26, 2025-06-18, 2025-11-25, and
   2026-07-28, plus a separate draft. The newest revision removes the initialization
   handshake and introduces per-request metadata/discovery. A server designed only
   around the older lifecycle will not meet the user's full compatibility objective.
   [Official index](https://modelcontextprotocol.io/llms.txt),
   [2026 changes](https://modelcontextprotocol.io/specification/2026-07-28/changelog).
2. **Newest rmcp alone is insufficient for every transport.** The observed latest
   release is rmcp 3.4.0. Its current documentation explicitly omits the original
   HTTP+SSE transport, so legacy transport support needs an adapter and its own
   regression evidence. [Release history](https://github.com/modelcontextprotocol/rust-sdk/releases),
   [SDK](https://github.com/modelcontextprotocol/rust-sdk).
3. **Retrieval selection needs measurement.** Microsoft distinguishes basic,
   local, global, and DRIFT retrieval, with different question shapes and costs.
   Use this as design evidence, not a blanket claim that graphs outperform vectors.
   [Query overview](https://microsoft.github.io/graphrag/query/overview/),
   [GraphRAG research](https://arxiv.org/abs/2404.16130).
4. **Database configuration must carry engine capabilities.** SurrealDB's Rust SDK
   supports embedded and remote engines, including runtime selection. Docs observed
   SDK/server 3.3.4 and Rust 1.95+; check again before pinning. [SDK](https://surrealdb.com/docs/reference/rust),
   [Connect](https://surrealdb.com/docs/reference/rust/methods/connect).

## Protocol acceptance scope

The MCP engineer owns implementation; an interoperability/quality role owns an
independent revision × transport × client × OS matrix. Current status is **unbuilt
and untested** for the proposed service. Test stdio on every published revision;
test legacy HTTP+SSE for 2024-11-05 and Streamable HTTP for later revisions with
their corresponding lifecycle semantics. Compatibility bridges must preserve
authorization, errors, cancellation, and provenance rather than merely forwarding
JSON. [Legacy transport](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports),
[Streamable HTTP introduction](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports).

Account for batching changes in 2025-06-18 and optional/experimental feature changes
in 2025-11-25. Modern stdio requires EOF handling suitable for Windows, and modern
HTTP has different streaming/cancellation behavior. Optional capabilities must be
tested before advertisement. [2025-06 changes](https://modelcontextprotocol.io/specification/2025-06-18/changelog),
[2025-11 changes](https://modelcontextprotocol.io/specification/2025-11-25/changelog),
[Stdio](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio),
[HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http).

The official [TypeScript SDK guide](https://ts.sdk.modelcontextprotocol.io/v2/protocol-versions)
mentions 2024-10-07 as a historical legacy value. Track it separately if a client
requires it; do not describe it as a currently published specification. Keep draft
and extension support distinct from stable protocol compliance. One rmcp README
paragraph still says “draft” for 2026-07-28; the dated official specification and
SDK overview establish its published status. Prefer versioned normative sources.

## Storage boundaries and additional roles

EdgeQuake, Surreal memory MCP, and direct SurrealDB are separate integration
contracts. EdgeQuake provides graph-aware document retrieval; its REST modes and
connected MCP modes must be checked independently. Surreal memory stores scoped
operational memories and entities; direct SurrealDB owns application-defined graph
and vector persistence. None automatically synchronizes the others.
[EdgeQuake query modes](https://github.com/raphaelmansuy/edgequake/blob/edgequake-main/docs/deep-dives/query-modes.md),
[SurrealDB multi-tenancy](https://surrealdb.com/docs/reference/rust/concepts/multi-tenancy),
[Vector indexes](https://surrealdb.com/docs/learn/data-models/vector-search/vector-indexes).

The five requested roles benefit from these additional bounded responsibilities:

| Role | Concrete ownership reason |
|---|---|
| System architect / integration lead | Shared evidence contract, adapter boundaries, versioned compatibility decisions |
| Evidence provenance and privacy steward | Author authorization, quote/AI/human classification, retention and projection lineage |
| Ingestion/data engineer | Parsing, deduplication, extraction jobs, immutable source identity, replay |
| Retrieval evaluation / interoperability engineer | Held-out evidence benchmarks and real protocol/client/OS acceptance |
| Skill and documentation maintainer | Portable skill packaging, source references, freshness, license notices |
| Release / portability engineer | Node/TypeScript automation, Rust build matrix, upgrade and recovery procedures |

These are project design recommendations derived from the integration boundaries,
not claims that a publication mandates particular job titles. Combine them when
there is too little independent work to justify extra agents. Product management
owns assignment; reviewers must not silently become implementation owners.

## Added skill packages and provenance

- `skills/adt-mcp-compatibility/`: protocol inventory, current rmcp lookup, legacy
  transport gap, and acceptance matrix.
- `skills/adt-retrieval-engineering/`: evidence-grounded selection and evaluation
  across RAG/GraphRAG services.
- `skills/adt-surrealdb-engineering/`: configurable embedded/remote Rust persistence,
  graph/vector schemas, author isolation, and recovery.

All three are newly authored Apache-2.0 project guidance based on linked primary
documentation; no third-party implementation code is copied into these packages.
Each is self-contained with a SKILL.md and local reference file. Third-party skill
downloads and their license receipts are handled separately by the skill inventory.

Context7 resolved the official Rust SDK and SurrealDB docs. Its EdgeQuake lookup
returned only the PDF converter; research therefore used EdgeQuake's official
repository instead of treating that different library as the GraphRAG product.

The uncomfortable thing: historical protocol support, reliable evidence extraction,
and secure cross-store synchronization remain implementation work. These role
definitions prepare that work; they cannot certify it in advance.
