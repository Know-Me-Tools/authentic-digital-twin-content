---
name: authentic-digital-twin-content
description: Generate published content (articles, posts, emails, proposals) in a specific human author's voice — not in generic AI default voice — and annotate the result so a reader can audit which blocks are human-authored, which are AI-drafted-then-human-edited, and which are AI verbatim. Use this skill whenever the user asks to write, rewrite, or refine long-form content that must read as authored by them rather than as AI output. Triggers include "write in my voice", "rewrite this as me", "make this sound like me", "apply my brand voice", "this reads too AI", "make this authentic", "annotate authorship", "content provenance", "digital twin content", "build my digital twin", or any uploaded substrate of writing samples and personality assessments that should drive future generation. Also triggers when the user wants to set up the substrate scaffolding for a new digital twin from scratch.
license: Apache-2.0
compatibility: Works with any agent that supports the Agent Skills format. Optionally integrates with a surreal-memory MCP server for substrate persistence; falls back to filesystem-only state when unavailable.
metadata:
  author: Prometheus AGS
  version: "1.0.0"
  homepage: https://github.com/Know-Me-Tools/authentic-digital-twin-content
  repository: https://github.com/Know-Me-Tools/authentic-digital-twin-content
---

# Authentic Digital Twin Content

A skill for generating long-form content in a named human author's voice, with explicit per-block provenance annotation so readers can audit authorship.

This skill produces content under the **Authentic Digital Twin Content Standard v1** — every block declares whether it was authored by the human, drafted by AI and edited by the human, or kept verbatim from AI. The model provider, model name, and authoring tool are reported for every AI-involved block.

The skill is generic — it works for any author once their substrate is in place. The bundled `docs/digital-twin-travis/` directory is the reference implementation for Travis James and serves as a worked example of what good substrate looks like.

---

## When to use this skill

Trigger this skill when any of the following are true:

- The user is publishing content under their name (articles, blog posts, op-eds, LinkedIn posts, newsletters, proposals, internal memos with named authorship)
- The user has been disappointed that AI-drafted content "doesn't sound like them"
- The user wants to disclose AI involvement in their writing without hiding it
- The user wants to set up the substrate scaffolding for a new author's digital twin
- An existing article exists that was 100% AI-generated and the user wants it rewritten in their voice with provenance annotations

Do **not** trigger this skill for:

- Pure code generation (no authorship voice involved)
- Conversational responses inside chat (annotation overhead would dominate)
- Technical specifications where machine-default voice is the correct register
- Anonymous or institutional content with no named author

---

## How the skill operates

The skill runs in three modes. Pick the mode based on what's available.

### Mode A — Generate (substrate is in place)

The author's substrate directory is populated (12 documents — index plus 11 numbered substrate files; see `references/substrate-template.md`). The user wants new content produced.

Steps:

1. **Read the substrate.** Load all eleven numbered files in the substrate directory. The personality profile and the rejection filters in the corrections document are non-negotiable inputs.
2. **Classify content type** against the table in `references/annotation-scheme.md`. Code samples, JSON output, and mechanical tables default to `AI verbatim`. Strategic, narrative, rhetorical, and editorial content defaults to `Travis James` (or named author).
3. **Generate the prose** using the voice substrate. Apply the rejection filters (no "leverage" as a verb, no "harness", no "delve", no "revolutionary"; em-dashes over commas at clause boundaries; specific numbers over rounded; named alternatives in comparisons; trade-offs surfaced; closes that land on stakes, not invitations).
4. **Apply annotations** per `references/annotation-scheme.md`. Each major block gets an italic eyebrow line declaring authorship. Each AI-involved block names model provider, model, and tool.
5. **Produce the provenance manifest** at the article footer — a table mapping every section to its authorship category, plus definitions of the three categories.
6. **Run the rejection check** before returning. If any sentence matches the rejection-filter patterns, rewrite that sentence and re-check.

### Mode B — Rewrite (article exists in wrong voice)

An article exists, written in AI-default voice or in a voice that does not match the author's substrate. The user wants it rewritten under the standard.

Steps:

1. **Read the existing article and the substrate.**
2. **Classify every block** of the existing article. Code, JSON, and mechanical tables stay as `AI verbatim`. Strategic and narrative prose gets rewritten as `Travis James`. Hybrid technical-explanatory prose where the AI draft is structurally correct but tonally off becomes `Travis ← AI`.
3. **Rewrite the human-voice blocks** following Mode A step 3.
4. **Preserve the AI-verbatim blocks unchanged.**
5. **Apply annotations and produce the manifest** as in Mode A.

### Mode C — Bootstrap (no substrate yet)

The user wants to establish a digital twin from scratch.

Steps:

1. **Confirm the directory** the substrate will live in. Default: `<workspace>/docs/digital-twin-<author-name>/`.
2. **Scaffold the substrate** using the templates in `templates/`. Twelve files: `00-INDEX.md`, `STATE.md`, and `01` through `11` per the substrate spec.
3. **Collect raw inputs.** Ask the user for: (a) any formal personality assessments (MBTI, Enneagram, CliftonStrengths, SoulTrace, Big Five, or similar), (b) at least 2,000 words of writing samples spanning two or more registers (casual-directive and stakeholder-facing minimum), (c) any prior content the user has flagged as on-voice or off-voice.
4. **Run the extraction pipeline** described in `references/voice-extraction-process.md` against the raw inputs. Populate the eleven substrate files.
5. **Persist to surreal-memory** per the schema in `references/surreal-memory-schema.md` if the surreal-memory MCP server is available. Fall back to filesystem-only state if it is not.
6. **Hand off to Mode A** once the substrate is complete.

---

## Substrate structure

The substrate is the durable knowledge base about the author's voice. It lives in a `digital-twin-<author-name>/` directory and follows this layout:

| File | Role |
|---|---|
| `00-INDEX.md` | Navigation, status, file role table |
| `STATE.md` | Extraction ledger (Karpathy-style progress tracking) |
| `01-personality-profile.md` | Identity anchors, personality framework results, professional context |
| `02-writing-samples-prompts.md` | Raw first-person writing samples (highest stylometric signal) |
| `03-writing-samples-corrections.md` | Editorial corrections (where author rejected AI output) |
| `04-thought-patterns.md` | Recurring reasoning moves and cognitive gestures |
| `05-vocabulary-and-diction.md` | Lexical preferences, distinctive phrases, words avoided |
| `06-rhetorical-patterns.md` | Sentence rhythm, paragraph architecture, argumentation moves |
| `07-humor-and-emphasis.md` | Brand of humor, intensity placement, register shifts |
| `08-domain-anchors.md` | Subjects the author is fluent in; vocabulary fields |
| `09-aesthetic-preferences.md` | Visual and structural taste signals |
| `10-collaboration-style.md` | Working patterns, communication scripts, tolerance / rejection signals |
| `11-decision-heuristics.md` | Judgment patterns, trade-offs surfaced, hard rules |

The corrections document (`03`) is the most under-recognized signal. Where the author corrected AI output, the gap between the AI draft and the published version is the substrate. The rejection filter is half the voice.

---

## The Authentic Digital Twin Content Standard v1

Full specification: `references/authenticity-standard.md`. Quick reference:

Every block of substantive content declares its authorship via an italic eyebrow line placed immediately before the block.

| Tag form | Meaning |
|---|---|
| `_— <Author Name>._` | Original prose by the named author. No AI involvement, or AI involvement limited to spell-check and grammar that did not alter voice. |
| `_— <Author Name> ← AI: <Provider> <Model> via <Tool>._` | Drafted by AI, edited by the human for voice, framing, and accuracy. Published voice is the human's; provenance of the original draft is reported. |
| `_— AI verbatim: <Provider> <Model> via <Tool>._` | Generated by the named model via the named tool and reproduced without editorial intervention. |

A **content provenance manifest** at the article footer enumerates every block's authorship category. See the worked example in `zed-workspace-article.md`.

---

## Critical voice patterns (default-on for Travis James)

These patterns are the default when generating in Travis James's voice. For other authors, the substrate's documents 04–07 govern the equivalent patterns. The pattern *categories* are universal; the specific instantiations are author-specific.

**Rejection filters (Travis):**

Never produce any of these in `Travis James` or `Travis ← AI` blocks:

- *Buzzwords:* revolutionary, game-changing, paradigm-shifting, disruptive, leverage (as a verb when "use" works), harness, delve, navigate (metaphorical), utilize, myriad, plethora, multifaceted, holistic, showcase (as a verb), unleash, empower, journey (process), synergy, alignment (when meaning agreement).
- *Throat-clearing:* "To address your question…", "Let me break this down…", "It's worth considering that…", "I'd be happy to help…", "Great question!", "I hope this helps."
- *Tepid hedges:* "It might be worth considering", "could potentially be a good fit", "various stakeholders", "several options", "many community banks" (use 4,500).
- *Invitational closes:* "Let me know your thoughts", "Happy to discuss", "Feel free to reach out."

**Required positive patterns (Travis):**

- **Statement → Mechanism → Stakes** paragraph architecture.
- **Reframe Move:** "Not A. B." sentence pairs that force the reader to abandon A and adopt B in adjacent breath.
- **Hard-stop sentences** (6–12 words) at paragraph beginnings, paragraph endings, and between two longer sentences for pacing.
- **Comparative framing:** never evaluate a thing in isolation; name the alternative at the same architectural layer.
- **Specific numbers** over rounded ones (4,500 community banks; 16× memory gap; 58 ms; ~1,800 lines).
- **Trade-offs surfaced** on every architectural claim — strong claim followed by quiet limit.
- **Closes that land on stakes**, not invitations. Forward projection where possible.
- **Architectural anthropomorphization** sparingly — "agents don't know where they are", "the manifest is the source of truth."

For other authors, the equivalent positive patterns and rejection filters live in the corresponding `digital-twin-<author>/` substrate files. The skill must read those files before generating.

---

## File pointers

| Resource | Path |
|---|---|
| The full v1 standard | `references/authenticity-standard.md` |
| Voice extraction process (bootstrap mode) | `references/voice-extraction-process.md` |
| Annotation scheme details and edge cases | `references/annotation-scheme.md` |
| Surreal-memory graph schema | `references/surreal-memory-schema.md` |
| Substrate file templates | `templates/` |
| Worked example: rewritten article | `zed-workspace-article.md` |
| Worked example: Travis James substrate | `docs/digital-twin-travis/` |
| Project decision history | `docs/authentic-digital-twin-conversation-transcript.md` |

---

## Required operating discipline

The skill enforces three rules that exist because they were violated in earlier drafts and the failures were diagnostic:

1. **Read the substrate before writing.** Skipping the substrate produces voice-flat output. The substrate documents are not optional context.
2. **Apply the rejection filter before returning.** Sentences that match the rejection-filter patterns must be rewritten. There is no acceptable use of the listed buzzwords inside `Travis James` or `Travis ← AI` blocks.
3. **Never silently omit the provenance manifest.** The reader-facing audit is the point of the skill. An article without the manifest is non-compliant with the standard, regardless of how well the prose reads.

---

## What this skill does not do

- It does not impersonate authors who have not authorized a substrate. The substrate must be supplied by the author or by someone with the author's consent.
- It does not produce content marked as authored by a human when it was actually AI verbatim. The provenance manifest is the integrity boundary.
- It does not generate personality assessments. Existing assessments (MBTI, Enneagram, CliftonStrengths, SoulTrace, etc.) are inputs, not outputs.
- It does not replace editorial judgment. The author remains responsible for what is published under their name.
