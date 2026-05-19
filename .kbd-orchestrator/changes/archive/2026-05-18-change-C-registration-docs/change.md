# Change C — Registration documentation

**Phase:** phase-1-distribution-compliance
**Depends on:** Change A, Change B
**Recommended agent:** doc-updater
**Status:** [x] DONE — 2026-05-18

## Goal

A written, followable guide for registering the skill across all major distribution channels.

## Tasks

- [x] Write `docs/REGISTRATION.md`:
  - [x] agentskills.io — contribution path via `agentskills/agentskills` GitHub repo + Discord
  - [x] Anthropic official marketplace — in-app submission (`claude.ai/settings/plugins/submit`, `platform.claude.com/plugins/submit`)
  - [x] Community git-repo marketplaces — how others add this repo's `marketplace.json` as a source
  - [x] OpenCode — `.claude/skills/` read natively; recommended `opencode.json` permissions
  - [x] Generic clients (Cursor, Goose, Gemini CLI, Junie, etc.) — automatic via standard format
  - [x] npm registry — documented as optional future path
  - [x] Update checklist for each release
- [x] Add `.claude-plugin/marketplace.json` — self-hosted community marketplace (moved from Change B)
- [x] Add `CHANGELOG.md`
- [x] Cross-link `REGISTRATION.md` and `CHANGELOG.md` from `README.md`

## Verification

```
$ git log --oneline -3
28580dc feat: registration docs, marketplace.json, CHANGELOG
9a13cd6 docs: update README with plugin install instructions and corrected paths
9764ca7 feat: initial plugin packaging — agentskills.io compliant, Claude Code plugin structure
```

All files committed and pushed. ✓

## Done when

`docs/REGISTRATION.md` and `CHANGELOG.md` exist, are accurate against Change B's artifacts,
and are linked from README. ✓
