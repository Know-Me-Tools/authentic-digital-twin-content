# Digital Twin Travis — Substrate Documents

This directory contains the raw substrate for the **Travis James digital twin**: writing samples, personality data, thought patterns, and contextual signals extracted from the travisjames.ai Claude project.

**Status:** In progress — files added as extraction proceeds. See `STATE.md` for current checkpoint.

**Source:** Claude Desktop project knowledge + past LLM conversations + Claude's persistent memory of Travis + recent conversation transcripts.

**Purpose:** Input to the `authentic-digital-twin-content` skill's Assess phase. These documents are the source-of-truth substrate that the extraction pipeline will analyze to derive voice, tone, diction, thought patterns, and personality-anchored linguistic signatures.

## File Roles

| Filename | Role | Content type |
|---|---|---|
| `00-INDEX.md` | This file | Navigation + status |
| `STATE.md` | Extraction ledger | Karpathy-style progress tracking |
| `SURREAL-MEMORY-FAILURES.log.md` | Failure log | For debugging surreal-memory MCP later |
| `01-personality-profile.md` | Core identity facts | Personality types, professional roles, business context |
| `02-writing-samples-prompts.md` | First-person prompts | Raw user messages — Travis writing TO an AI |
| `03-writing-samples-corrections.md` | Editorial corrections | Where Travis corrected AI output, showing editorial voice |
| `04-thought-patterns.md` | Reasoning structures | How Travis frames problems, the moves he makes |
| `05-vocabulary-and-diction.md` | Lexicon | Distinctive word choices, technical/business register mixing |
| `06-rhetorical-patterns.md` | Style mechanics | Sentence rhythms, paragraph shapes, emphasis tendencies |
| `07-humor-and-emphasis.md` | Voice texture | Brand of humor, sharp turns, where intensity lives |
| `08-domain-anchors.md` | Subject-matter grounding | Topics Travis is fluent in, vocabulary fields |
| `09-aesthetic-preferences.md` | Taste signals | Brand system, design philosophy, what he flags as good/bad |
| `10-collaboration-style.md` | Working patterns | How Travis directs agents, what he tolerates and what he rejects |
| `11-decision-heuristics.md` | Judgment patterns | Trade-offs surfaced, risk evaluations, hard rules |

Each file is structured for downstream ingestion by either (a) a stylometric extractor reading raw text, or (b) a graph database creating entities and relations.

## Research grounding

The structure draws from three converging frameworks identified in prior research (see `STATE.md`):

1. **Stylometric reliability:** Eder's 2017 work suggests 2,000+ words minimum with diverse register coverage.
2. **TwinVoice (ACL 2026) three-dimension model:** Social, Interpersonal, Narrative persona dimensions are each represented in the document set.
3. **Personality-anchored signals:** ENTP cognitive style, Enneagram 8w7 behavioral patterns, and StrengthsFinder Futurist orientation each have documented linguistic markers that the substrate captures explicitly.
