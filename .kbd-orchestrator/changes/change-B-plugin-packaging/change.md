# Change B — Plugin & marketplace packaging

**Phase:** phase-1-distribution-compliance
**Depends on:** Change A
**Recommended agent:** general-purpose
**Status:** [ ] not started

## Goal

Skill is installable as a Claude Code plugin and listable in a marketplace.

## Tasks

- [ ] Resolve Open Question 1 (wrap vs. restructure) and Open Question 2 (repo hosting)
- [ ] Create `.claude-plugin/plugin.json` (name, description, version, author, homepage, repository, license)
- [ ] Establish `skills/authentic-digital-twin-content/SKILL.md` plugin layout
- [ ] Create `.claude-plugin/marketplace.json` for self-hosted distribution
- [ ] `git init`, initial commit, push to the public repo from OQ2
- [ ] Verify `claude --plugin-dir ./` loads the skill; namespaced invocation resolves
- [ ] Add install instructions to `README.md`

## Done when

`plugin.json` and `marketplace.json` validate; `claude --plugin-dir` loads the skill; repo is public; README documents install.

## Out of scope

Official marketplace submission (documented in Change C); scope expansion.
