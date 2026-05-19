# Change J — Tier 1 v2 Format Demo

**Phase:** phase-3-voice-validation
**Track:** A (Travis-independent)
**Risk:** Low — new file only; no existing files modified
**Recommended agent:** prompt-engineer
**Status:** TODO

---

## Goal

Write a compact Tier 1 v2 format demonstration document in `docs/worked-examples/` showing all three authorship categories with correct v2 eyebrow-line annotation, a "How to read this piece" section, and a footer content provenance manifest.

## File to create

`skills/authentic-digital-twin-content/docs/worked-examples/tier-1-format-demo.md`

## Tasks

- [ ] Write "How to read this piece" section at the top with `v2` version declaration and brief explanation of the eyebrow-line annotation system
- [ ] Write per-block eyebrow lines in correct v2 format:
  - `*[Travis James — Human-authored]*`
  - `*[AI-drafted, human-edited — Claude Sonnet 4.6 via authentic-digital-twin-content v2.0.0]*`
  - `*[AI verbatim — Claude Sonnet 4.6 via authentic-digital-twin-content v2.0.0]*`
- [ ] Write at least one block of each authorship category (Human-authored, AI-drafted-human-edited, AI verbatim)
- [ ] Write footer content provenance manifest table in Standard v2 format:

  | Block | Category | Model | Tool |
  |---|---|---|---|
  | Opening paragraph | Human-authored | — | — |
  | Technical explanation | AI-drafted, human-edited | Claude Sonnet 4.6 | authentic-digital-twin-content v2.0.0 |
  | Code sample | AI verbatim | Claude Sonnet 4.6 | authentic-digital-twin-content v2.0.0 |

- [ ] Write annotation block after the manifest explaining: what this file is (format demo, not full worked example); how to read the eyebrow lines; what the three categories mean; difference from Tier 2 and Tier 3 examples in this directory
- [ ] Update `docs/worked-examples/README.md` to reference the new file

## Done when

- `docs/worked-examples/tier-1-format-demo.md` exists with all three authorship categories, correct v2 eyebrow lines, manifest table, and annotation block
- `docs/worked-examples/README.md` references the new file

## Content constraints

- Article excerpt topic: agentic programming (workspace identity, context infrastructure) — consistent with existing worked examples
- ~300–500 words of article-style content
- Human-authored block must demonstrate Travis voice patterns from substrate (hard-stop sentences, dry understatement, intensity context, no filler)
- AI-drafted-human-edited block: slightly less compressed version of the same thought
- AI verbatim block: technical explanation or code structure
- Travis James substrate is all-rights-reserved — this is a demonstrative format example, not a raw substrate extract
