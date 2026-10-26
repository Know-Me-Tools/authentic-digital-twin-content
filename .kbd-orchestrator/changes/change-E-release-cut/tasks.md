# Tasks — change-E-release-cut

Generated view of tasks.json. Canonical change status comes from the registered KBD runtime.

- [x] 1 Create retroactive git tag `v1.0.0` pointing at commit `28580dc` (Change C)
- [x] 2 Update `metadata.version` in `skills/authentic-digital-twin-content/SKILL.md` from `"1.0.0"` to `"2.0.0"`
- [x] 3 Promote `[Unreleased]` items in `CHANGELOG.md` to `[2.0.0] — 2026-05-18`; fix v1.0.0 standard path; add v2 standard reference
- [x] 4 Push `v1.0.0` tag to origin
- [x] 5 Create `v2.0.0` git tag at HEAD; push to origin
- [x] 6 Create GitHub releases for both tags via `gh release create`
- [x] 7 Re-run `skills-ref validate skills/authentic-digital-twin-content` — green
