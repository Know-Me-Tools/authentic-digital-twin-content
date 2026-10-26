# Worked Examples — Standard v2

This directory contains Standard v2 worked examples for the `authentic-digital-twin-content` skill.

Each file demonstrates a specific **tier + surface combination**: the disclosure tag, the full post or artifact body,
and an annotation block explaining every substrate signal that drove the output.

The examples are demonstrative. They show what the skill produces when operating correctly — they are not Travis's
actual published posts or correspondence. Any post here is written in Travis's voice as a reference implementation,
not as a representation of his public record.

File naming convention: `tier-{n}-{surface}-example.md`

Where `n` is the disclosure tier (1 = fully human, 2 = AI-drafted and substantively edited, 3 = AI-generated
lightly reviewed, 4 = fully AI-generated disclosed) and `surface` is the content type (linkedin-post, email,
article-intro, etc.).

## Format demo files

Format demonstration files use the convention `tier-{n}-format-demo.md`. Unlike worked examples, a format demo
shows only the annotation format for a tier — the eyebrow lines, authorship categories, and manifest — using a
short, intentionally incomplete excerpt. It is not a full worked example.

- `tier-1-format-demo.md` — Demonstrates the Standard v2 Tier 1 format: per-block eyebrow lines for all three
  authorship categories (Human-authored, AI-drafted human-edited, AI verbatim) plus a footer content provenance
  manifest, on a short agentic-programming article excerpt.
