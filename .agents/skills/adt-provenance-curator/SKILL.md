---
name: adt-provenance-curator
description: Curate author substrates and knowledge claims from collected evidence while preserving source lineage, contribution categories, uncertainty, register coverage, and human approval status. Use before promoting collected material into an author twin.
license: Apache-2.0
compatibility: Portable Markdown workflow; optional configured graph services. No mandatory runtime.
metadata:
  version: "1.0.0"
---

# Provenance and substrate curation

Read the installed content skill's versioned standard, substrate template, extraction
process, and author's index/state. Use the actual package location; do not hardcode
one developer's filesystem. The default inventory is index plus STATE plus eleven
numbered documents. Apply the declared standard and preserve historical versions.

## Review evidence before promotion

1. Establish the author identity and permitted scope. Read the collector's source
   record and original artifact, not only its summary. Separate own writing,
   corrections, third-party observations, quotations, AI output, and assessments.
2. Check provenance chain, capture gaps, timestamps, edit versions, and duplicates.
   A hash proves equality to captured bytes, not truth or human authorship.
3. Decide permitted use per item: voice sample, contextual claim, correction signal,
   assessment input, evaluation fixture, or excluded. Quarantine attribution gaps.
4. Extract positive and negative patterns with source anchors and register scope.
   Keep explicit author statements separate from inferred tendencies; retain
   contradictory evidence and indicate recency rather than silently resolving it.
5. Update only the authorized author's canonical Markdown files and extraction
   ledger. Keep private raw evidence outside distributed packages. The bundled
   reference author's traits and rights do not transfer to new authors.
6. Calculate sample-volume and register gates from eligible evidence with a declared
   counting method. Exclude AI passages, quoted correspondents, metadata and repeated
   exports. Missing target-register evidence must remain visible.
7. Prepare author-scoped projection changes for the retrieval/storage engineer.
   Preserve source IDs, extraction versions, uncertainty and deletion/tombstone
   lineage. A graph relationship is not a new independent source.

## Authorship claims

Human-authored, AI-drafted/human-edited, and AI-verbatim are contribution categories,
not quality scores. Matching someone's voice does not establish human authorship.
Human editing or certification needs actual evidence; mark review pending when
unknown. Unknown model/provider/tool identities remain unknown.

## Acceptance

Return a promotion ledger with accepted/rejected/quarantined items, reasons,
affected documents, gate evidence, unresolved contradictions and projection status.
Do not certify voice fidelity for the author. The uncomfortable failure is a
clean graph whose claims trace only to model-generated summaries; always preserve
the primary source chain.

Reference model: [W3C PROV](https://www.w3.org/TR/prov-overview/) supports entity,
activity, agent and derivation distinctions. This workflow does not claim a PROV
serialization implementation. The companion `adt-evidence-collection` skill has
a portable proposed evidence-envelope reference when installed.
