# Content and skill maintenance

## Read the actual contract

The distributable package is `skills/authentic-digital-twin-content/`. Paths in
its `SKILL.md` are relative to that package, not the repository root.

Read the package's `SKILL.md`, then the relevant references:

- `docs/standards/authentic-digital-twin-content-standard-v2.md`: new content,
  annotation tiers, and reliability gates.
- `references/authenticity-standard.md`: v1 category definitions and full-manifest
  requirements inherited by v2 Tier 1.
- `references/annotation-scheme.md` and `references/communication-surface-taxonomy.md`:
  operational annotation and surface/register mapping.
- `references/voice-extraction-process.md`, `references/substrate-template.md`, and
  `templates/`: author bootstrap and enrichment.
- `references/surreal-memory-schema.md`: optional projection of canonical files.
- `references/shadow-pattern-detector.md`: scoped soft warnings, not a personality
  diagnosis or a substitute for author review.

When examples or summaries disagree with a versioned standard, follow the declared
standard and record the discrepancy. Do not silently alter a standard to match an
example. The README mixes historical v1 wording with v2 documentation; it is not
the final authority on new-content behavior.

## Select the workflow

- **Generate:** identify the author, target surface, register, and tier; read the
  author's index, state, and all eleven numbered substrate documents. Apply that
  author's rejection filters and supported heuristics. Draft and annotate output.
- **Rewrite:** preserve source provenance, classify blocks by actual contribution,
  and retain blocks designated AI verbatim unchanged. An agent's rewrite is still
  AI-generated until a human's substantive contribution is evidenced.
- **Bootstrap/enrich:** preserve raw inputs, extract evidence into the appropriate
  dimensions, and update the author's index and extraction ledger. Keep inferred
  patterns distinguishable from explicit statements or supplied assessments.

The substrate inventory is **13 files**: `00-INDEX.md`, `STATE.md`, and eleven
numbered documents `01` through `11`. Some prose calls it twelve; use the enumerated
layout, not that count. Do not invent assessments or mark missing evidence complete.

## Reliability and provenance

Gate 1 requires at least 2,000 words across sample documents 02 and 03; Gate 2
requires at least two registers. Check that the evidence is real author material,
not padding from headings or AI passages. Record counts and the counting method.
Insufficient evidence must not be reported as passing. Gate 3 checks the target
surface's register and warns on missing coverage; under the v2 Gate 3 contract,
that warning alone does not block generation.

Tier 1 uses per-block eyebrows, a version declaration, and the full footer manifest.
Tier 2 uses compact disclosure matched to the surface. Tier 3 uses visible channel,
session, or document disclosure. Select categories from observed contribution,
not whether the prose sounds human. Never invent a model identity, author approval,
or a substantive human edit. Pending human review must remain pending.

Travis-specific names, heuristic numbers, framework results, and lexical filters
in examples are not universal defaults. New authors need their own evidence.
Respect the reference substrate's separate rights; tests and demos should use
synthetic authors unless reuse is explicitly authorized.

## Filesystem and optional memory

Preserve stable author slugs and source identifiers. Record source, date when known,
register, authorship, extraction status, and affected documents when adding evidence.
Retain corrections and negative examples. Update `STATE.md` and `00-INDEX.md` to
describe actual progress, including unresolved questions and review status.

The filesystem is canonical. A graph projection must be scoped to the same author
and traceable to its source files. Use the connected server's actual tool schema;
query examples in the reference are conceptual, not proof of executable syntax.
On projection failure, record the failure and pending sync without losing the local
work or claiming successful persistence. Never send private inputs to an external
service merely because that service is connected.

## Verification at the task boundary

For skill/template changes, check referenced paths, YAML frontmatter, and a worked
scenario for the affected mode and tier. Confirm templates enumerate the actual
files and work for a synthetic author without inheriting Travis's identity. Keep
relative references inside the distributable package where downstream agents need
them; repository maintenance guides are not runtime dependencies of the skill.

For authored output, check reliability evidence, disclosure placement, manifest/body
agreement where applicable, and unchanged verbatim blocks. Voice fidelity still
requires author feedback; a structural check cannot certify it.

For packaging changes, parse both plugin manifests, confirm their references and
intended release versions, and reconcile affected registration docs and changelog.
Standard v2 does not automatically mean plugin version 2. Keep old published
artifacts valid at their declared version. Finish with `git diff --check` and report
exactly which checks ran. No build or test runner currently exists for the content
package; do not invent a successful test suite.
