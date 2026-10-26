# Digital Twin {{AUTHOR_NAME}} — Substrate Documents

This directory contains the raw substrate for the **{{AUTHOR_NAME}} digital twin**: writing samples, personality data, thought patterns, and contextual signals.

**Status:** {{STATUS — e.g., "Complete — Five-Framework Integration", or "In progress — Step N of M"}}. See `STATE.md` for current checkpoint.

**Source:** {{SOURCE_DESCRIPTION — where the substrate came from}}.

**Purpose:** Input to the `authentic-digital-twin-content` skill's Generate phase. These documents are the source-of-truth substrate that downstream content generation reads to produce content in {{AUTHOR_NAME}}'s voice.

## File Roles

| Filename | Role | Content type |
|---|---|---|
| `00-INDEX.md` | This file | Navigation + status |
| `STATE.md` | Extraction ledger | Progress tracking |
| `01-personality-profile.md` | Core identity facts | Personality types, professional roles, business context |
| `02-writing-samples-prompts.md` | First-person prompts | Raw author messages — author writing TO an AI |
| `03-writing-samples-corrections.md` | Editorial corrections | Where author corrected AI output, showing editorial voice |
| `04-thought-patterns.md` | Reasoning structures | How author frames problems, the moves they make |
| `05-vocabulary-and-diction.md` | Lexicon | Distinctive word choices, register mixing |
| `06-rhetorical-patterns.md` | Style mechanics | Sentence rhythms, paragraph shapes, emphasis tendencies |
| `07-humor-and-emphasis.md` | Voice texture | Brand of humor, sharp turns, where intensity lives |
| `08-domain-anchors.md` | Subject-matter grounding | Topics author is fluent in, vocabulary fields |
| `09-aesthetic-preferences.md` | Taste signals | Brand system, design philosophy, what flags as good/bad |
| `10-collaboration-style.md` | Working patterns | How author directs agents, what they tolerate and reject |
| `11-decision-heuristics.md` | Judgment patterns | Trade-offs surfaced, risk evaluations, hard rules |

Each file is structured for downstream ingestion by either (a) a stylometric extractor reading raw text, or (b) a graph database creating entities and relations per `references/surreal-memory-schema.md`.

## Research grounding

This substrate structure draws from:

1. **Stylometric reliability** (Eder 2017) — 2,000+ words minimum with diverse register coverage
2. **TwinVoice three-dimension model** (ACL 2026) — Social, Interpersonal, Narrative persona dimensions represented in the document set
3. **Personality-anchored linguistic markers** — each framework result in document 01 has documented linguistic markers that the substrate captures explicitly
