# Changelog

All notable changes to this project are documented here. The standard is versioned separately — standard version changes are noted under each release.

Format: [Semantic Versioning](https://semver.org/). Standard version is noted where it changes.

---

## [Unreleased]

---

## [2.0.0] — 2026-05-18

### Added

- **Standard v2** — tiered provenance model for all communication surfaces: full per-block manifest (Tier 1, long-form), compact inline disclosure tag (Tier 2, email/social), channel-level disclosure (Tier 3, voice/video/real-time chat). Full spec: `skills/authentic-digital-twin-content/docs/standards/authentic-digital-twin-content-standard-v2.md`
- **Communication-surface taxonomy** — 35+ surfaces mapped to annotation tier, register, and generation mode: `skills/authentic-digital-twin-content/references/communication-surface-taxonomy.md`
- **Expanded substrate register coverage** — correspondence, ultra-short, and spoken/conversational registers added as first-class inputs in the voice extraction process; Gate 3 (surface-register match) added
- **Annotation scheme v2** — tier selection table, Tier 2/3 operational formats, tri-tier QA checklist: `skills/authentic-digital-twin-content/references/annotation-scheme.md`

### Changed

- `SKILL.md` description expanded to cover all communication surfaces (email, social, voice prep); `metadata.version` bumped to `2.0.0`; "When to use" and "Do not trigger" sections updated for v2 scope; Mode A now surface-aware (selects annotation tier before generating)
- `references/voice-extraction-process.md` — expanded required inputs table; Gate 3 added; v2 re-extraction triggers documented

### Standard version

Implements **Authentic Digital Twin Content Standard v2** (see `skills/authentic-digital-twin-content/docs/standards/authentic-digital-twin-content-standard-v2.md`). Standard v1 articles remain valid at their declared version.

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
