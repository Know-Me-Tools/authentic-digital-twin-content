# Change B — Plugin & marketplace packaging

**Phase:** phase-1-distribution-compliance
**Depends on:** Change A
**Recommended agent:** general-purpose
**Status:** [x] DONE — 2026-05-18

## Goal

Skill is installable as a Claude Code plugin and listable in a marketplace.

## Tasks

- [x] Resolve OQ1 (wrap) and OQ2 (git@github.com:Know-Me-Tools/authentic-digital-twin-content.git)
- [x] Create `.claude-plugin/plugin.json` (name, description, version, author, homepage, repository, license, keywords)
- [x] Move skill content into `skills/authentic-digital-twin-content/` — plugin wrap layout
- [x] Updated SKILL.md metadata.repository to correct GitHub URL
- [x] `git init` at plugin root; remote set to origin
- [x] Initial commit (48 files); pushed to main
- [x] Verify `claude --plugin-dir ./` — skill loads as `authentic-digital-twin-content:authentic-digital-twin-content`
- [x] Updated README.md with install instructions for Claude Code, OpenCode, and generic agents
- [x] Second commit (README); pushed

## Verification

```
$ claude --plugin-dir . --print "List the skills available from this plugin"
→ authentic-digital-twin-content:authentic-digital-twin-content  ✓
```

```
$ git log --oneline
9a13cd6 docs: update README with plugin install instructions and corrected paths
9764ca7 feat: initial plugin packaging — agentskills.io compliant, Claude Code plugin structure
```

## Note: marketplace.json deferred

The `marketplace.json` for a self-hosted community marketplace was scoped into this change but is more correctly a Change C deliverable — it documents the distribution channel, not the plugin itself. Moved to Change C.

## Done when

Plugin loads; manifests valid; repo public; README documents install. ✓
