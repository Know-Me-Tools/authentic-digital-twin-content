# Distribution Status — authentic-digital-twin-content

**Last updated:** 2026-05-19
**Skill version:** 2.0.0
**Standard:** Authentic Digital Twin Content Standard v2

---

## Channel Ledger

| Channel | Status | Notes |
|---|---|---|
| GitHub release (Know-Me-Tools/authentic-digital-twin-content) | **live** | v2.0.0 released at https://github.com/Know-Me-Tools/authentic-digital-twin-content |
| agentskills.io community showcase | **not yet — submissions not open** | Skill directories not accepted per current CONTRIBUTING.md; watch repo for update |

---

## agentskills.io Submission

**Checked:** 2026-05-19
**Outcome:** Not submitted — skill directories not currently accepted

**Reason:** The `agentskills/agentskills` CONTRIBUTING.md explicitly states under "What We're Not Accepting (Yet)": _"Skill submissions — We don't maintain a directory of community skills. This may change in the future."_ No community showcase registry exists in the repo. A PR would be premature and outside their stated contribution scope.

**Recommended action:**
- Watch `https://github.com/agentskills/agentskills` for when skill submissions open
- Join the Discord (`https://discord.gg/MKPE9g8aUy`) to announce the release and stay current on when a skill directory is introduced
- When a skill directory opens, submit using the drafted entry below

**Drafted showcase entry (for use when submissions open):**

```yaml
name: authentic-digital-twin-content
version: "2.0.0"
author: Travis James
organization: Prometheus AGS
repository: https://github.com/Know-Me-Tools/authentic-digital-twin-content
homepage: https://github.com/Know-Me-Tools/authentic-digital-twin-content
license: Apache-2.0
description: >-
  Generates long-form content in a named author's voice with block-level
  provenance annotation — declaring which content is human-authored,
  AI-drafted-human-edited, or AI verbatim. Implements the Authentic Digital
  Twin Content Standard v2 with tiered disclosure for 35+ communication
  surfaces (long-form articles, email, social posts, voice/video prep, and more).
compatibility: Works with Claude Code or any agent implementing the Agent Skills open standard.
install: |
  git clone https://github.com/Know-Me-Tools/authentic-digital-twin-content
  claude --plugin-dir ./authentic-digital-twin-content
tags:
  - content-generation
  - voice
  - provenance
  - digital-twin
  - authorship
  - disclosure
```

---

## Notes

- The skill passes `skills-ref validate` as of v2.0.0.
- `SKILL.md` description is ≤ 1024 characters.
- Apache-2.0 license; `docs/digital-twin-travis/` is all-rights-reserved (non-distributable reference substrate).
