---
name: adt-retrieval-evaluation
description: Independently evaluate RAG, GraphRAG, hybrid retrieval, evidence ingestion and author isolation using source-grounded scenarios, reproducible configurations, and real integration paths. Use at completed feature boundaries or when comparing retrieval strategies.
license: Apache-2.0
compatibility: Portable evaluation procedure. Use actual project test entry points; Node.js .mjs and TypeScript 7 for maintained automation, Rust for engine integration tests.
metadata:
  version: "1.0.0"
---

# Retrieval evaluation

Define acceptance before tuning. Keep evaluator output and fixtures separate from
implementation ownership. For independent review, receive the artifact, requirements
and evidence without the builder's persuasive narrative. If the same agent must
review its own work, report that limitation rather than claiming independence.

## Scenario set

Use synthetic or explicitly authorized fixtures. Include exact fact lookup,
paraphrase, multi-hop relationship questions, corpus-level themes, temporal changes,
contradictory claims, no-answer cases, ambiguous identity, and cross-author negative
cases. Track primary evidence spans and expected permitted scopes. Separate tuning
queries from held-out evaluation; do not contaminate the corpus with expected answers.

## Compare controlled alternatives

Hold corpus revision, query set, filters, generator, embedding model, chunking,
token budget and environment fixed where possible. Record unavoidable differences.
Compare a lexical/vector baseline, graph traversal, and chosen hybrid; do not assume
GraphRAG is universally superior. Measure index build cost and maintenance cost as
well as query performance. Tune retrieval and generation independently.

## Evidence to report

- Retrieval: recall at k, precision/ranking when labels exist, source coverage,
  graph path validity, filter correctness and empty-result behavior.
- Answers: citation correctness/completeness, grounding to original spans,
  contradiction handling, unsupported assertions, and appropriate abstention.
- Isolation: no foreign-author hits, summaries, cache entries or graph expansions;
  revoked/deleted evidence cannot reappear through a stale derived index.
- Operations: latency distribution, cost/token use, index freshness, failed-task
  visibility, repeated-ingest idempotency and sync recovery.
- Voice: eligible sample counts and register gates, with actual human review kept
  distinct from automated metrics. An LLM judge cannot certify author acceptance.

At the completed boundary, exercise real public entry points and stores in an
isolated test scope: ingestion → accepted evidence → index completion → retrieval
→ cited answer. Exercise CLI and MCP calls where implemented, including structured
errors and no-output/partial states. A configuration parse or mocked unit result is
not evidence that a remote store or client works.

Return a reproducible report with corpus/config hashes, query labels, commands,
raw result paths, metric definitions, thresholds chosen before the run, failures,
and unavailable environments. Use Node.js `.mjs` rather than shell-only runners;
record Windows execution separately from portability-oriented static checks.

The uncomfortable failure is a high aggregate score that conceals one author's
private evidence leaking into another's response. Treat isolation failures as
release blockers, independent of average answer quality.

## Research grounding

[Ragas](https://arxiv.org/abs/2309.15217) separates retrieval context quality from
faithful generation and answer quality. Automated model-based scores are useful
signals, not ground truth. [Microsoft GraphRAG](https://microsoft.github.io/graphrag/)
motivates relational and global-summary cases; measure those separately from simple
lookup. Consult current framework docs through Context7 before adding evaluator APIs.
