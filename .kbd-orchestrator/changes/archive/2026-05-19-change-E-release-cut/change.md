# Change E — Release cut

**Phase:** phase-2-substrate-enrichment
**Depends on:** — (no blockers)
**Recommended agent:** general-purpose
**Status:** [x] DONE — 2026-05-19

## Goal

Create clean semantic versioning state: retroactive v1.0.0 tag, v2.0.0 release at HEAD, CHANGELOG promoted, version bumped.

## Tasks

- [x] Create retroactive git tag `v1.0.0` pointing at commit `28580dc` (Change C)
- [x] Update `metadata.version` in `skills/authentic-digital-twin-content/SKILL.md` from `"1.0.0"` to `"2.0.0"`
- [x] Promote `[Unreleased]` items in `CHANGELOG.md` to `[2.0.0] — 2026-05-18`; fix v1.0.0 standard path; add v2 standard reference
- [x] Push `v1.0.0` tag to origin
- [x] Create `v2.0.0` git tag at HEAD; push to origin
- [x] Create GitHub releases for both tags via `gh release create`
- [x] Re-run `skills-ref validate skills/authentic-digital-twin-content` — green

## Verification

```
$ gh release list
v2.0.0 — Standard v2: tiered provenance model, all communication surfaces  Latest  v2.0.0
v1.0.0 — Initial release: agentskills.io compliance, Claude Code plugin...          v1.0.0

$ npx skills-ref validate skills/authentic-digital-twin-content
Valid skill: skills/authentic-digital-twin-content
```

Two GitHub releases exist. `metadata.version` reads `"2.0.0"`. CHANGELOG has `[2.0.0]` entry. `skills-ref validate` green. ✓

## Done when

Two GitHub release tags exist (`v1.0.0`, `v2.0.0`); `metadata.version` reads `"2.0.0"`; CHANGELOG has `[2.0.0]` entry; `skills-ref validate` green. ✓
