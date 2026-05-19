# Change E — Release cut

**Phase:** phase-2-substrate-enrichment
**Depends on:** — (no blockers)
**Recommended agent:** general-purpose
**Status:** [ ] not started

## Goal

Create clean semantic versioning state: retroactive v1.0.0 tag, v2.0.0 release at HEAD, CHANGELOG promoted, version bumped.

## Tasks

- [ ] Create retroactive git tag `v1.0.0` pointing at commit `28580dc` (Change C — "feat: registration docs, marketplace.json, CHANGELOG")
- [ ] Update `metadata.version` in `skills/authentic-digital-twin-content/SKILL.md` from `"1.0.0"` to `"2.0.0"`
- [ ] Promote `[Unreleased]` items in `CHANGELOG.md` to `[2.0.0] — 2026-05-18`; update standard version note to reference v2; fix v1.0.0 standard path to `docs/standards/authentic-digital-twin-content-standard-v1.md`
- [ ] Push `v1.0.0` tag to origin
- [ ] Create `v2.0.0` git tag at HEAD; push to origin
- [ ] Create GitHub releases for both tags via `gh release create`
- [ ] Re-run `skills-ref validate skills/authentic-digital-twin-content` — confirm green

## Done when

Two GitHub release tags exist (`v1.0.0`, `v2.0.0`); `metadata.version` reads `"2.0.0"`; CHANGELOG has `[2.0.0]` entry; `skills-ref validate` green.

## Out of scope

Anthropic marketplace re-submission, agentskills.io PR (maintainer actions).
