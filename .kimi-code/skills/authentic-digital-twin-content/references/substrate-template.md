# Substrate Template

The recommended structure for a new author's digital twin substrate directory. Use this when bootstrapping a new twin (Mode C). The worked example for Travis James lives in `docs/digital-twin-travis/`.

---

## Directory layout

```
docs/digital-twin-<author-slug>/
├── 00-INDEX.md
├── STATE.md
├── 01-personality-profile.md
├── 02-writing-samples-prompts.md
├── 03-writing-samples-corrections.md
├── 04-thought-patterns.md
├── 05-vocabulary-and-diction.md
├── 06-rhetorical-patterns.md
├── 07-humor-and-emphasis.md
├── 08-domain-anchors.md
├── 09-aesthetic-preferences.md
├── 10-collaboration-style.md
└── 11-decision-heuristics.md
```

The `<author-slug>` is the author's name in lowercase with hyphens (e.g., `digital-twin-travis`, `digital-twin-jane-smith`). Slug stability matters because downstream tooling references the directory by path.

---

## 00-INDEX.md template

```markdown
# Digital Twin <Author> — Substrate Documents

This directory contains the raw substrate for the **<Author> digital twin**: writing samples, personality data, thought patterns, and contextual signals.

**Status:** <Status — e.g., "Complete — Five-Framework Integration", or "In progress — Step N of M">. See `STATE.md` for current checkpoint.

**Source:** <Where the substrate came from — e.g., "User-supplied writing samples, formal personality assessment reports, prior LLM conversations">.

**Purpose:** Input to the `authentic-digital-twin-content` skill's Generate phase. These documents are the source-of-truth substrate that downstream content generation reads to produce content in <Author>'s voice.

## File Roles

| Filename | Role | Content type |
|---|---|---|
| `00-INDEX.md` | This file | Navigation + status |
| `STATE.md` | Extraction ledger | Karpathy-style progress tracking |
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
```

---

## STATE.md template

```markdown
# STATE — Substrate Extraction Ledger
## <author-slug>

**Last updated:** <ISO date>

## Status: <COMPLETE | IN PROGRESS — STEP N>

<Narrative summary of where the extraction stands and what was just completed.>

## Document Manifest

| # | File | Status |
|---|---|---|
| 0 | `00-INDEX.md` | <✅ or pending> |
| 1 | `01-personality-profile.md` | <✅ or pending> |
| ... | ... | ... |
| 11 | `11-decision-heuristics.md` | <✅ or pending> |

**Total substrate:** ~<N> words across 11 documents.

## Research-Informed Structure

<Cite any external research that informed the substrate structure for this author. The skill's default citations are Eder (2017) stylometric reliability and TwinVoice (ACL 2026) three-dimension framework.>

## Personality Frameworks Used

| Framework | Result | Date taken | Notes |
|---|---|---|---|
| <MBTI/Enneagram/CliftonStrengths/SoulTrace/etc.> | <Result> | <Date> | <Notes> |

## Open Questions For Downstream Phases

<List of questions the extraction surfaced but didn't answer — they belong in Assess or Plan downstream.>
```

---

## Per-document templates

Each numbered substrate file (01 through 11) follows a similar shape. Look at the Travis James equivalents in `docs/digital-twin-travis/0X-*.md` as the worked example for that document.

The common structure of each file:

1. **Front matter** — entity type, source, use.
2. **Anchor section** — the core content of this dimension.
3. **Cross-reference section** — connections to other substrate files.
4. **Implications for the digital twin** — how downstream generation should use this document.

The Travis substrate is roughly 22,000 words across the eleven documents. New twins do not need to hit that volume — they need enough to satisfy the two reliability gates (2,000 words of samples minimum, two registers minimum). Substrate quality matters more than substrate volume.

---

## Required inputs to begin

Before scaffolding the directory, collect from the author:

1. **At least 2,000 words of writing samples** across at least two registers (e.g., casual-directive + stakeholder-facing). These populate documents 02 and seed documents 04, 05, 06, 07.
2. **At least one personality assessment** (MBTI, Enneagram, CliftonStrengths, SoulTrace, Big Five, or similar). This anchors document 01. Multiple assessments enable cross-validation, which produces a more durable profile.
3. **Editorial-correction examples** if available (where the author corrected AI output). These populate document 03 — the highest-signal source of voice gaps.
4. **Domain context** — a list of topics the author writes about with depth. Populates document 08.
5. **Brand guide or aesthetic examples** if available. Populates document 09. Without this input, document 09 captures whatever surfaces in the writing samples.

---

## What success looks like

The substrate is ready for Generate mode when:

- All twelve files exist
- Both reliability gates pass (2,000+ words of samples, two+ registers)
- Documents cross-reference each other (patterns named in one appear as evidence in another)
- Documents include both positive patterns (what the author does) and negative patterns (what the author rejects)
- The personality framework results in document 01 are referenced from documents 04, 07, 10, and 11 where applicable
- A worked example of the author's voice exists (a piece they would point to and say "this sounds like me")

The worked-example check is the most reliable. If the substrate cannot be used to identify, sentence by sentence, why the worked example reads as the author and not as AI, the substrate is incomplete.
