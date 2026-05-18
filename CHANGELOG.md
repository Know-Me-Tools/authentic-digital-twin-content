# Changelog

All notable changes to this project are documented here. The standard is versioned separately — standard version changes are noted under each release.

Format: [Semantic Versioning](https://semver.org/). Standard version is noted where it changes.

---

## [1.0.0] — 2026-05-18

### Added

- **Plugin packaging** — wrapped as a Claude Code plugin with `.claude-plugin/plugin.json` and `marketplace.json`; skill at `skills/authentic-digital-twin-content/SKILL.md`
- **agentskills.io compliance** — frontmatter conforms to the spec: `license`, `compatibility`, `metadata` (author, version, homepage, repository); `version` relocated from top-level to `metadata.version`; `skills-ref validate` passes
- **LICENSE** — Apache-2.0; `docs/digital-twin-travis/` all-rights-reserved
- **REGISTRATION.md** — step-by-step guide for registering in all major distribution channels
- **CHANGELOG.md** — this file
- **`.gitignore`** — macOS, editor, OS, Node, KBD session artifacts

### Standard version

Implements **Authentic Digital Twin Content Standard v1** (see `skills/authentic-digital-twin-content/docs/standards/authentic-digital-twin-content-standard-v1.md`).

---

## [Unreleased]

- Standard v2 — tiered provenance model for all communication surfaces (email, chat, social, voice)
- Communication-surface taxonomy reference file
- Expanded substrate register coverage (spoken, conversational, ultra-short)
