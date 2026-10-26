# Proposed ingestion envelope

This is a design contract for the future engine, not an assertion that an API
already implements it. Adapt field names to the verified engine schema and retain
the following meanings.

| Field | Meaning |
|---|---|
| evidence_id | Stable source-scoped identity or deterministic ID; not a raw private message in a filename |
| author_scope | Explicit author/tenant; never inferred from the currently active UI account alone |
| source | Service, account alias, message/document ID, thread ID, URI/path, acquisition adapter |
| captured_at | Capture timestamp with timezone; separate from the source event timestamp |
| original | Protected local artifact pointer, media type, byte hash, and coverage/omissions |
| attribution | Actual sender/creator, verified identity mapping, quoted/forwarded spans, uncertainty |
| classification | Own writing, human correction, third-party context, AI output, supplied assessment, or unknown |
| permitted_use | Voice sample, factual context, correction evidence, evaluation, or excluded; task authority reference |
| derivation | Parent IDs, parser/model and version, transform, offsets, original/normalized hashes |
| sensitivity | Redactions, retention rule, destination restrictions; never credentials |
| disposition | staged, accepted, quarantined, excluded, or duplicate with rationale |
| ingestion | Destination scope, idempotency key, task/receipt ID and actual processing status |

Quotes and forwarded messages retain their original speaker. A correspondent's
description of the author is contextual evidence, not the author's own writing or
a verified personality assessment. AI suggestions and sample AI drafts remain
excluded from stylometric counts unless the human contribution can be isolated.
Do not infer human editing from a sent message merely because it was sent by the
author; retain uncertainty about creation when evidence is absent.

Preserve contradictory observations. An extracted relationship is an attributed
claim with source and confidence, not automatically a fact. Merging identities
requires evidence beyond a shared display name. Deduplication retains source
lineage and versions rather than deleting evidence of edits.

The distinction between entity, activity, agent, and derivation is informed by
[W3C PROV](https://www.w3.org/TR/prov-overview/). This envelope is a project design;
it does not claim PROV serialization conformance.
