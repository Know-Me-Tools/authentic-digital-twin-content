# Change C — Registration documentation

**Phase:** phase-1-distribution-compliance
**Depends on:** Change A, Change B
**Recommended agent:** doc-updater
**Status:** [ ] not started

## Goal

A written, followable guide for registering the skill across all major distribution channels.

## Tasks

- [ ] Write `docs/REGISTRATION.md`:
  - [ ] agentskills.io — contribution path via `agentskills/agentskills` GitHub repo + Discord
  - [ ] Anthropic official marketplace — in-app submission (`claude.ai/settings/plugins/submit`, `platform.claude.com/plugins/submit`)
  - [ ] Community git-repo marketplaces — how others add this repo's `marketplace.json` as a source
  - [ ] OpenCode — `.claude/skills/` read natively; recommended `opencode.json` permissions
  - [ ] Generic clients (Cursor, Goose, Gemini CLI, Junie, etc.) — automatic via standard format
- [ ] Add `CHANGELOG.md`
- [ ] Cross-link `REGISTRATION.md` from `README.md`

## Done when

`docs/REGISTRATION.md` and `CHANGELOG.md` exist, are accurate against Change B's artifacts, and are linked from README.

## Out of scope

Performing the actual submissions (maintainer action; deliverable is the instructions).
