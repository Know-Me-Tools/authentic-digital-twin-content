# Retrieval and projection contract

## Choose by question

| Need | Starting method | Evaluation question |
|---|---|---|
| Exact phrase, identifier, date | Lexical/structured lookup | Did the source match exactly? |
| Similar wording or topic | Vector or lexical/vector fusion | Does the returned passage support the claim? |
| Named entity and relationships | Local graph plus source chunks | Are edges correctly grounded and author-scoped? |
| Broad themes across a collection | Global graph/community summaries | Are minority and contradictory evidence represented? |
| Broad question needing specific follow-ups | Iterative graph/vector retrieval | Does added retrieval improve coverage within budget? |

Microsoft's [query overview](https://microsoft.github.io/graphrag/query/overview/)
distinguishes basic vector search, entity-centered local search, corpus-level global
search, and DRIFT's community-informed exploration. The [original research](https://arxiv.org/abs/2404.16130)
studies global summarization; it is not evidence that GraphRAG wins every retrieval
task. The table above is a project decision aid requiring measurement.

## Separate service responsibilities

- **EdgeQuake:** document ingestion, source chunks, extracted entities/relationships,
  and graph-aware document retrieval. The [official query-mode guide](https://github.com/raphaelmansuy/edgequake/blob/edgequake-main/docs/deep-dives/query-modes.md)
  describes naive, local, global, hybrid, mix, and bypass. Its current REST fusion
  behavior is version-specific; a connected MCP adapter may expose a narrower or
  different mode contract. Bypass is not evidence retrieval.
- **Surreal memory MCP:** scoped operational memories, entities, relations, and
  task context through its discovered tools. Do not assume its schema is the same
  as the project's substrate schema or direct database tables.
- **Direct SurrealDB:** explicitly modeled graph/vector records, transactions,
  indexes, and embedded/remote persistence under the project's application API.
  It does not automatically replicate either service above.
- **Other graph tools:** discover names, schema, version, scope controls, supported
  query features, and data destination. Add a capability adapter only after those
  facts are known. Never route writes merely by name similarity.

In the researched environment, EdgeQuake tool names included `eq_workspace_list`,
`eq_document_list`, `eq_ingest`, `eq_task_get`, `eq_search`, and `eq_fetch`.
Surreal memory exposed entity/relation operations and scoped memory search. These
are discovery observations, not universally installed services. Inspect each live
schema before invocation; do not copy assumed arguments from this document.

For EdgeQuake inventory, list the selected workspace's documents rather than
inventing a document list from semantic search. After async admission, retain the
document/task identifiers and poll status; only `indexed` means the observed
adapter reports ready. Search first, then fetch bounded relevant evidence.

## Durable evidence and evaluation

Keep immutable source identity/hash, author, channel, capture time when known,
permission scope, source authorship, redaction history, source spans, extraction
version, embedding model/dimensions, and derived-record links. Distinguish explicit
statements, inference, contradiction, and unknown provenance. Avoid collapsing
different people with the same name or treating quoted text as the sender's voice.

Define deletion/correction propagation across chunks, vectors, graph edges,
summaries, caches, and operational memories. Preserve audit receipts without
retaining the deleted private payload in logs. Test duplicate ingestion, partial
failure, stale projections, author-switch queries, and unauthorized traversal.

Use a fixed query set with expected evidence, not just expected prose. Compare
baseline and graph approaches under the same corpus, permission scope, model,
token/cost budget, and time cutoff. Record ranking/evidence recall, citation
precision, unsupported-claim rate, coverage, latency, and ingestion/query cost.
No benchmark can replace the author's approval of voice or interpretation.
