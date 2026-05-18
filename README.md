# Authentic Digital Twin Content

A Claude Code plugin and Agent Skill for generating long-form content in a named human author's voice — with explicit, block-level provenance annotation so readers can audit which content is human-authored, which is AI-drafted-then-human-edited, and which is AI verbatim.

## Installation

### Claude Code (plugin — recommended)

```bash
/plugin install https://github.com/Know-Me-Tools/authentic-digital-twin-content
```

The skill is available as `/authentic-digital-twin-content:authentic-digital-twin-content` after installation.

### Claude Code (standalone, dev/local)

```bash
git clone git@github.com:Know-Me-Tools/authentic-digital-twin-content.git
claude --plugin-dir ./authentic-digital-twin-content
```

### OpenCode

OpenCode discovers skills from `.claude/skills/` automatically. Copy or symlink the skill directory:

```bash
cp -r authentic-digital-twin-content/skills/authentic-digital-twin-content ~/.config/opencode/skills/
```

Or point OpenCode at `.claude/skills/authentic-digital-twin-content` if you have the repo checked out in your project.

### Other agents (Cursor, Goose, Gemini CLI, Junie, etc.)

This skill conforms to the [Agent Skills](https://agentskills.io) open format. Install per your agent's skill discovery mechanism, pointing it at `skills/authentic-digital-twin-content/SKILL.md`.

---

## What this is

Modern published writing is increasingly co-produced by a human author and one or more AI tools. The reader has no way to tell, from the surface of an article, which sentences carry the author's certification and which are AI output passing under their byline. This skill closes that gap.

Every block of substantive content in an article produced by this skill declares its authorship via an italic eyebrow line:

- `_— Author Name._` for original prose by the human author
- `_— Author Name ← AI: <Provider> <Model> via <Tool>._` for AI-drafted content the author edited substantively
- `_— AI verbatim: <Provider> <Model> via <Tool>._` for AI output reproduced without editorial intervention

A **content provenance manifest** at the article footer reports every block, its category, and (for AI-involved blocks) the model provider, model name, and authoring tool used to produce it.

This is the **Authentic Digital Twin Content Standard v1**. Full specification: `skills/authentic-digital-twin-content/references/authenticity-standard.md`.

---

## Repository layout

| Path | Purpose |
|---|---|
| `.claude-plugin/plugin.json` | Claude Code plugin manifest |
| `skills/authentic-digital-twin-content/SKILL.md` | The skill definition |
| `skills/authentic-digital-twin-content/references/authenticity-standard.md` | The v1 standard specification |
| `skills/authentic-digital-twin-content/references/voice-extraction-process.md` | How to build a new author's substrate from raw inputs |
| `skills/authentic-digital-twin-content/references/annotation-scheme.md` | Operational playbook for applying annotations |
| `skills/authentic-digital-twin-content/references/surreal-memory-schema.md` | Graph schema for persistence (optional) |
| `skills/authentic-digital-twin-content/references/substrate-template.md` | Directory structure for a new author's twin |
| `skills/authentic-digital-twin-content/zed-workspace-article.md` | Worked example: rewritten article under the standard |
| `skills/authentic-digital-twin-content/docs/digital-twin-travis/` | Worked example: complete substrate for Travis James |
| `skills/authentic-digital-twin-content/docs/authentic-digital-twin-conversation-transcript.md` | Decision history for this skill |

---

## How to use

The skill operates in three modes.

**Mode A — Generate.** The author's substrate is already in place in a `docs/digital-twin-<author>/` directory. Ask for new content. The skill reads the substrate and produces voice-aligned output with annotations.

**Mode B — Rewrite.** An existing article is in AI-default voice. Ask the skill to rewrite it under the standard. The skill classifies each block, rewrites the human-voice blocks against the substrate, preserves the AI-verbatim blocks, and applies annotations.

**Mode C — Bootstrap.** No substrate exists yet for the author. The skill scaffolds the substrate directory using the template, collects raw inputs from the author, runs the extraction process, and produces a complete twelve-file substrate ready for Generate mode.

---

## Reliability gates

Before Generate mode runs, the substrate must pass two gates:

1. **Sample volume** — at least 2,000 words of first-person writing samples (per Eder 2017)
2. **Register coverage** — samples must span at least two registers (per the TwinVoice ACL 2026 three-dimension framework)

The skill refuses to generate from substrate that fails either gate. Voice-flat output wastes review cycles; failing fast is correct.

---

## What this skill does not do

- It does not impersonate authors who have not authorized a substrate
- It does not produce content claiming human authorship when it was AI verbatim
- It does not replace editorial judgment — the author remains responsible for what is published under their name
- It does not generate personality assessments; existing assessments are inputs

---

## Distribution and registration

See [docs/REGISTRATION.md](docs/REGISTRATION.md) for step-by-step instructions for every distribution channel: agentskills.io community showcase, Anthropic official marketplace, community git-repo marketplaces, OpenCode, and generic agent clients.

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## License and re-use

Licensed under the Apache License 2.0 — see [LICENSE](LICENSE).

The standard, the schema, and the methodology are intended to be re-used. Any author can bootstrap a substrate and apply the v1 standard to their own publishing. The standard is versioned; articles declare which version they were produced under.

**Exception:** `skills/authentic-digital-twin-content/docs/digital-twin-travis/` — All rights reserved. Published as a reference implementation only; do not reproduce or use to train models without explicit written permission from Travis James.
