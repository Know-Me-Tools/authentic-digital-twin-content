---
name: adt-retrieval-engineering
description: >-
  Design and evaluate author-scoped RAG and GraphRAG for digital twin evidence.
  Use when selecting vector, lexical, graph, or hybrid retrieval, integrating
  EdgeQuake and Surreal memory, defining lineage, or measuring retrieval quality.
license: Apache-2.0
compatibility: Documentation is standalone. EdgeQuake, Surreal memory, embedding providers, and other graph services are optional configured integrations.
metadata:
  version: "1.0.0"
  author: Know Me Tools
---

# Evidence-grounded retrieval

Read [the retrieval contract](references/retrieval.md). Begin with the question
and evidence needs, not a preferred database.

1. Classify lookup, semantic paraphrase, entity relationship, multi-hop reasoning,
   or corpus-wide synthesis. Establish a lexical/vector baseline before adding a
   graph. Record why graph extraction cost is justified for the actual questions.
2. Define author, source, permission, time, register, and provenance filters before
   retrieval. Preserve original text and offsets; derived entities and summaries
   must point back to evidence. Similarity is not authorship or factual certainty.
3. Inspect available tools and their schemas. EdgeQuake, Surreal memory, and direct
   SurrealDB are separate adapters with different contracts. Connected does not
   mean authorized to upload. Use only approved sources and destinations.
4. Keep filesystem substrates canonical. Build versioned, replayable projections
   with idempotent ingestion and explicit processing status. A queued document is
   not searchable evidence until the backend reports completion.
5. Compare candidate retrievers on a held-out, synthetic or authorized dataset:
   recall/ranking, evidence coverage, citation correctness, contradictions, stale
   evidence, refusal when unsupported, latency, and cost. Include isolation tests.
6. Return evidence handles and citations alongside answers. Report exact evaluated
   backend/model/index versions and unanswered questions. Do not call a plausible
   synthesis grounded when its sources do not entail it.

Hand the completed implementation and fixed evaluation corpus to the separate
`adt-retrieval-evaluation` role skill when bundled. Its assessment must not be
presented as independent if the same agent/context produced the implementation.

Use Context7 for current database/SDK usage, starting with library resolution.
If EdgeQuake itself is not indexed, use its official docs and deployed tool schema;
do not substitute the similarly named PDF conversion library.

The uncomfortable thing: graph extraction can turn a mistaken interpretation into
many confidently retrieved relationships. Preserve uncertainty and provenance at
the edge level, and test whether the graph improves this dataset's outcomes.
