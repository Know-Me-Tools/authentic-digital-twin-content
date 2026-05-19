# Current Waypoint

**Project:** authentic-digital-twin-content
**Phase:** phase-2-substrate-enrichment
**Stage:** ASSESS complete — blocked on 4 open questions before planning
**Change backend:** native KBD

## Assessment summary

Four gaps identified:
1. Travis substrate missing three v2 registers (correspondence, ultra-short, spoken) in docs 02, 07, 10
2. No Tier 2 or Tier 3 worked examples exist
3. Version not bumped to 2.0.0; no GitHub release tag
4. CHANGELOG Unreleased items not promoted

## Open Questions (must resolve before /kbd-plan)

**OQ1 — Sample sourcing:** How to extend substrate docs 02, 07, 10 with v2 registers?
- (a) Travis provides real email/LinkedIn/transcript samples → highest signal
- (b) Placeholders written, marked "needs sample infill" → partial
- (c) Derived from existing personality + stylistic cross-signals, no raw samples → lowest but workable

**OQ2 — Tier 2 worked example subject:** Which domain for the LinkedIn post or professional email example? (fintech, community banking, AI infrastructure, agentic programming — or allow executor to choose)

**OQ3 — Release tag strategy:** Create retroactive `v1.0.0` tag before `v2.0.0`, or go straight to `v2.0.0` from HEAD?

**OQ4 — v1 standard path:** Confirm `skills/authentic-digital-twin-content/docs/standards/authentic-digital-twin-content-standard-v1.md` exists before publishing release.

## Recommended changes (pending OQ resolution)

- **Change E** — Release cut: v2.0.0 version bump, CHANGELOG, GitHub tag (no blockers)
- **Change F** — Substrate register extension: docs 02, 07, 10 (depends on OQ1)
- **Change G** — Tier 2 worked example: LinkedIn post or professional email (depends on OQ2 + F)
- **Change H** — Tier 3 worked example: voice/talk prep (can run in parallel with G)

See `phases/phase-2-substrate-enrichment/assessment.md` for full detail.
