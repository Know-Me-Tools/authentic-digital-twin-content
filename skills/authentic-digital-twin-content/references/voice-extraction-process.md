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
| Email / correspondence samples | Recommended for Tier 2 surfaces | 3–5 examples | Correspondence register — salutation style, formality per recipient tier, sign-off patterns |
| Social post samples | Recommended for Tier 2 surfaces | 5–10 examples across platforms | Ultra-short and written social registers |
| Spoken samples (transcripts, notes, talk recordings) | Recommended for Tier 3 surfaces | 1,000+ words of spoken content | Spoken/conversational register — pace, hedges, filler patterns, informal vocabulary |

The 2,000-word minimum traces to Eder (2017) stylometric reliability work. The two-register requirement traces to the TwinVoice (ACL 2026) three-dimension framework — single-register samples produce a twin that cannot code-switch, which fails every time the author writes outside the captured register. v2 adds three first-class registers (correspondence, ultra-short, spoken/conversational) required for full Tier 2 and Tier 3 surface coverage.

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

## Natural-vs-effortful heuristic classification

After writing document 11 (decision heuristics), classify each heuristic as **natural** or **effortful**:

- **Natural heuristic:** amplifies the author's dominant traits — the behavior flows automatically from their personality profile. The twin can apply it implicitly via substrate reading.
- **Effortful heuristic:** compensates for a trait gap — the behavior runs counter to the author's natural profile and the author applies it inconsistently as a result. The twin must enforce it explicitly, because the author does not do so reliably.

**The classification question to ask for each heuristic:** Does this heuristic require the author to act against their lowest-scoring or absent personality themes? If so, it is effortful; otherwise it is natural.

**How to express the classification in document 11:** Add a two-column table at the end of the document — one row per heuristic, columns: heuristic name and number | natural/effortful + one-line justification citing the personality theme that makes it natural or the theme gap that makes it effortful.

**Downstream use:** Effortful heuristics become the explicit enforcement list for Mode A step 4b — they are named and applied consciously during generation. Natural heuristics remain implicit via substrate reading — no explicit enforcement needed.

**Reference implementation — Travis James substrate:** 5 effortful heuristics (4 — Phase Discipline, 7 — Don't Pivot Silently, 9 — Champion Over Cold Outreach, 11 — Cedar Governance, 16 — Acknowledge Before Analyzing), all grounded in CliftonStrengths bottom-tercile themes (Empathy #34, Deliberative #33, Developer #32, Discipline #26). 11 natural heuristics flow from Strategic Thinking domain dominance (Futuristic #1, Activator #3, Achiever #4, Focus #6, Strategic #7, Analytical #8) and Enneagram 8 directness.

For new author substrates, the same classification applies — the specific heuristics and themes will differ, but the mechanism (cross-reference heuristics against the personality framework's low-scoring or absent themes) is universal.

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

## Stylometric reliability gates (v2)

After extraction, run three reliability checks before declaring the substrate complete.

**Gate 1 — Sample volume (unchanged from v1).** The combined word count of documents 02 and 03 must be at least 2,000 words. Below that, the substrate is unreliable as stylometric input. Below 5,000 words, the substrate is reliable for known registers but may fail on unseen registers.

**Gate 2 — Register coverage (updated in v2).** The samples must span at least two registers from the full register list: written formal, written casual, written directional, written social, ultra-short, correspondence, spoken/conversational, technical. A substrate with only one register produces a twin that flattens to that register every time. Common register pairs for adequate baseline coverage:
- written formal + written casual
- technical + stakeholder-facing
- correspondence + written social

For authors who will use the skill on Tier 2 or Tier 3 surfaces, the register list must also include at least one of: correspondence, ultra-short, spoken/conversational.

**Gate 3 — Surface-register match (new in v2).** Before generating for a specific surface, the skill checks whether the substrate covers that surface's primary register. If not:

- **Missing correspondence register:** Warn before drafting email, LinkedIn DMs, or cover letters. Proceed with written formal as approximation.
- **Missing ultra-short register:** Warn before drafting Twitter/X, Instagram captions, SMS. Proceed with written social as approximation.
- **Missing spoken/conversational register:** Warn before preparing voice call talking points, podcast prep, or real-time chat content. Proceed with written casual as approximation.

Gate 3 triggers a warning, not a refusal. The author may intentionally accept the approximation.

If Gate 1 or Gate 2 fails, the skill should refuse to enter Generate mode and report what additional inputs are required.

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

**v2 addition — new register triggers:** Re-extract (or extend) when the author begins using a new communication surface class that their substrate does not yet cover. Specifically:
- Author starts writing email newsletters → add correspondence samples to 02, update 06 and 10
- Author starts posting on social media → add ultra-short samples to 02, update 07
- Author starts giving talks or podcasts → add spoken-register samples to 02 (transcripts, notes), add a spoken-register section to 07 capturing pace, informal vocabulary, and self-correction moves

### Personality-framework re-test cadence

When the author retakes a personality assessment, use the following protocol to determine what needs updating.

**Categorical/ranked assessments (e.g., CliftonStrengths):**

A material shift is any theme crossing the natural-vs-effortful boundary:
- An effortful theme (previously in the bottom tercile) enters the top 15 — it may no longer need explicit enforcement
- A natural theme drops below #20 — it may shift from implicit to effortful

When a boundary crossing occurs, update documents 01, 04, 10, and 11. Re-run the effortful-heuristic classification in document 11 and revise Mode A step 4b accordingly.

When rank shifts are within the same zone (no boundary crossing), update the document 01 table only. The natural-vs-effortful classification is unchanged.

**Probabilistic assessments (e.g., SoulTrace):**

A material shift is either: (a) the primary archetype changes, or (b) any color dimension moves ≥10 percentage points from the prior result.

When a material shift occurs, update documents 01, 07, 10, and 11. Re-run the effortful-heuristic classification if the color dimensions that ground the bottom-trait cluster shift.

When the same archetype and similar color distribution persist across re-tests (as with Travis James — Green 5% consistent across a seven-year gap, two different methodologies), record this stability explicitly in document 01 as durable-substrate signal. It strengthens the confidence level of all patterns grounded in that dimension.

**Partial vs. full re-extraction:**

Partial re-extraction (only affected documents) is sufficient when the shift is limited to one framework. Full 11-document re-run is warranted when: (a) multiple frameworks shift simultaneously, or (b) the author self-reports that the substrate "no longer feels right" — their own voice judgment takes precedence over framework stability.

**Effortful-heuristic re-classification trigger:**

Always re-run the effortful-heuristic classification in document 11 when the bottom-theme cluster changes, regardless of whether the primary archetype changes. The classification is derived from low-scoring themes — even a modest shift in the bottom tercile can change which heuristics require explicit enforcement.
