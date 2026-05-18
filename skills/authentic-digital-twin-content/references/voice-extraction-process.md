# Voice Extraction Process

How the skill builds an author's substrate from raw inputs. Use this when running the skill in **Bootstrap mode** — when no substrate yet exists for the author.

The process produces twelve documents in a `digital-twin-<author-name>/` directory. The output is durable substrate that downstream content generation reads on every run.

---

## Required inputs

Before extraction starts, the author must supply the inputs in this table. The skill should not begin extraction with fewer than the required inputs — substrate built on insufficient material produces voice-flat output that wastes the author's review cycles.

| Input | Required? | Minimum | Purpose |
|---|---|---|---|
| Writing samples (first-person, the author writing) | Required | ~2,000 words across at least two registers | Primary stylometric substrate |
| Editorial corrections (where the author rejected AI output) | Strongly recommended | 5–10 examples | Rejection-filter signal |
| Personality framework results | Recommended | At least one (MBTI, Enneagram, CliftonStrengths, SoulTrace, Big Five, or similar) | Anchor facts that color every other extraction |
| Domain context | Recommended | Topic list with depth signals | Grounds future content in subjects the author is fluent in |
| Brand or aesthetic preferences | Optional | Brand guide if it exists; visual taste examples otherwise | Calibrates visual / structural taste signals |

The 2,000-word minimum traces to Eder (2017) stylometric reliability work. The two-register requirement traces to the TwinVoice (ACL 2026) three-dimension framework — single-register samples produce a twin that cannot code-switch, which fails every time the author writes outside the captured register.

---

## The eleven extraction documents

The substrate consists of twelve files: an index (`00-INDEX.md`), a state ledger (`STATE.md`), and eleven numbered substrate documents. Each substrate document captures a different slice of the voice signal.

| # | Document | What it captures |
|---|---|---|
| 01 | `personality-profile.md` | Identity anchors. Personality framework results. Professional context. The "spine" the rest of the substrate hangs from. |
| 02 | `writing-samples-prompts.md` | Raw first-person samples preserved with original capitalization and punctuation. Stylistic signatures annotated under each sample. |
| 03 | `writing-samples-corrections.md` | Editorial corrections — where the author corrected AI output. The gap between AI default and the published version is the substrate. |
| 04 | `thought-patterns.md` | Recurring reasoning *moves*. How the author frames problems. Cognitive gestures, not opinions. |
| 05 | `vocabulary-and-diction.md` | Word-level signatures. Distinctive phrases. Words avoided (the rejection filter). |
| 06 | `rhetorical-patterns.md` | Sentence rhythm. Paragraph architecture. Argumentation moves. Section-level patterns. |
| 07 | `humor-and-emphasis.md` | Brand of humor. Where intensity lives. Register shifts (casual vs. serious vs. playful). |
| 08 | `domain-anchors.md` | Subjects the author is fluent in. Vocabulary fields per domain. Active projects per domain. |
| 09 | `aesthetic-preferences.md` | Visual and structural taste. Approved patterns. Anti-patterns. |
| 10 | `collaboration-style.md` | How the author directs work. What they tolerate. What they reject. Communication scripts. |
| 11 | `decision-heuristics.md` | Judgment patterns. Trade-offs habitually surfaced. Hard rules vs. context-dependent rules. |

The numbering is load-bearing — downstream consumers read the documents in order. Inserting new categories should append (12, 13, …), not renumber.

---

## Extraction order and dependencies

The documents are not independent. Some depend on others. The recommended extraction order:

```
01 — Personality profile          (depends on: nothing)
02 — Writing samples (prompts)    (depends on: nothing; source material)
03 — Writing samples (corrections) (depends on: 02 — needs samples to compare AI output against)
04 — Thought patterns             (depends on: 01, 02, 03)
05 — Vocabulary and diction       (depends on: 02, 03)
06 — Rhetorical patterns          (depends on: 02, 03)
07 — Humor and emphasis           (depends on: 02, 03, 06)
08 — Domain anchors               (depends on: 02 — what the author writes about)
09 — Aesthetic preferences        (depends on: brand inputs)
10 — Collaboration style          (depends on: 02, 03 — directives and corrections)
11 — Decision heuristics          (depends on: 02, 03, 04)
```

The personality profile (01) and the raw samples (02) are the only documents that can be written from raw inputs alone. Everything else depends on at least one prior document. The skill should refuse to skip ahead — a `vocabulary` document written before the samples have been catalogued is voice-flat.

---

## What each document looks like at finished state

The Travis James substrate in `docs/digital-twin-travis/` is the worked example. It includes:

- **Personality profile (~5,000 words):** Five-framework convergence model (MBTI / Enneagram / CliftonStrengths / SoulTrace / self-report). Domain distribution. Key signals (highest theme, lowest theme). Mantra. Failure-mode patterns. Professional context.
- **Writing samples (prompts) (~2,500 words):** Ten samples preserved verbatim with stylistic-signature annotations under each. Aggregated lexical-signature table at the end. Voice register section (casual-directive vs. architect-spec).
- **Writing samples (corrections) (~2,000 words):** Ten correction patterns, each showing AI output, author correction, and what the correction reveals. Voice-mismatch patterns the author rejects. Implication-for-the-twin closing.
- **Thought patterns (~2,500 words):** The author's core cognitive loop. Ten recurring patterns. Cognitive shadows to recognize but not reproduce. Counter-default frame.
- **Vocabulary and diction (~1,800 words):** High-frequency substantive vocabulary by register. Distinctive phrases. Sentence-opener tables (author uses vs. AI tends to use). Punctuation signatures. Words visibly avoided. Code-specific diction.
- **Rhetorical patterns (~1,800 words):** Paragraph architecture templates. Sentence rhythm types. Section-level patterns. Argumentation moves. Opening hooks. Closing patterns. What this looks like wrong.
- **Humor and emphasis (~2,000 words):** Where each color/dimension lives in the voice. Brand of humor. Sharp turns. Where intensity ramps up. Where the voice pulls back. Intensifier patterns. Playful vs. serious register. What the author almost never does.
- **Domain anchors (~2,000 words):** Ten domain anchors. Per-domain: comfortable concepts, author-coined patterns, active projects.
- **Aesthetic preferences (~1,800 words):** Core aesthetic principle. Approved visual patterns. Anti-patterns. Document and interface preferences. Code style preferences.
- **Collaboration style (~2,000 words):** Delegation pattern. Communication scripts (direct and softer registers). Conflict and repair. Working cadence. What the author tolerates. What the author rejects. When to ask vs. just do it.
- **Decision heuristics (~3,500 words):** Sixteen heuristics. Per-heuristic: decision pattern (approved / rejected), tension acknowledged, framework grounding. Natural-vs-effortful classification.

Total substrate: roughly 22,000 words across eleven documents for Travis James. The skill should target similar coverage when bootstrapping a new author.

---

## Stylometric reliability gates

After extraction, run two reliability checks before declaring the substrate complete.

**Gate 1 — Sample volume.** The combined word count of documents 02 and 03 must be at least 2,000 words. Below that, the substrate is unreliable as stylometric input. Below 5,000 words, the substrate is reliable for known registers but may fail on unseen registers.

**Gate 2 — Register coverage.** The samples must span at least two registers. Common register pairs: casual-directive + stakeholder-facing, technical + brand-facing, internal + external. A substrate with only one register produces a twin that flattens to that register every time, which is voice-failure for any content outside the captured mode.

If either gate fails, the skill should refuse to enter Generate mode and should report what additional inputs are required.

---

## What good extraction looks like

A correctly extracted substrate has these properties:

- **Specific.** Names actual phrases the author uses, actual numbers from their writing, actual rejected words. Not abstractions like "the author prefers concise language."
- **Cross-validated.** Patterns identified in document 05 (vocabulary) should reappear in document 02 (samples) as evidence. Patterns named in 11 (heuristics) should be visible in 06 (rhetorical patterns) as structural moves.
- **Negative as well as positive.** The rejection filter (words the author avoids) is half the signal. Substrate without explicit negative patterns produces voice-correct-but-buzzword-leaking output.
- **Register-aware.** Each pattern document declares which register it applies to. A pattern that holds in casual writing but breaks in stakeholder writing should be flagged as register-conditional.
- **Framework-grounded where appropriate.** Personality framework signals (MBTI, Enneagram, CliftonStrengths, SoulTrace) should reinforce specific patterns, not float free of them.

---

## Persistence

After extraction, the substrate may be ingested into the surreal-memory MCP server for graph-based retrieval. The graph schema lives in `surreal-memory-schema.md`. Ingestion is recommended but not required — the skill operates correctly with filesystem-only substrate, provided all twelve files are present in the directory.

---

## Re-extraction triggers

The substrate is not frozen. Re-extract when:

- The author retakes a personality assessment and the results shift materially
- The author adopts a new register (e.g., starts writing in a new domain)
- The author flags published content as "off voice" — re-examine 03 and 05 against the off-voice piece
- Six to twelve months elapse — natural drift in vocabulary and topic anchors

Re-extraction does not require regenerating all eleven documents. The most-affected documents update; the dependency chain in the extraction-order table identifies downstream documents that may also need touch-up.
