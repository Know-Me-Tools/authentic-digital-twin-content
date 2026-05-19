---
name: authentic-digital-twin-content
description: >-
  Generate content in a specific human author's voice — articles, emails, social posts, proposals, or voice prep — and annotate provenance so readers can audit which blocks are human-authored, AI-drafted-then-edited, or AI verbatim. Use when the user asks to write, rewrite, or refine content that must read as authored by them. Triggers include write in my voice, rewrite this as me, make this sound like me, apply my brand voice, this reads too AI, make this authentic, annotate authorship, content provenance, digital twin content, build my digital twin, draft this email for me, write a LinkedIn post, help me prepare talking points, or any uploaded substrate of writing samples and personality assessments. Also triggers when the user wants to bootstrap a new digital twin substrate from scratch. Supports Standard v2 — full manifest for long-form, compact disclosure for short-form, channel-level disclosure for voice/video.
license: Apache-2.0
compatibility: Works with any agent that supports the Agent Skills format. Optionally integrates with a surreal-memory MCP server for substrate persistence; falls back to filesystem-only state when unavailable.
metadata:
  author: Prometheus AGS
  version: "2.0.0"
  homepage: https://github.com/Know-Me-Tools/authentic-digital-twin-content
  repository: https://github.com/Know-Me-Tools/authentic-digital-twin-content
---

# Authentic Digital Twin Content

A skill for generating long-form content in a named human author's voice, with explicit per-block provenance annotation so readers can audit authorship.

This skill produces content under the **Authentic Digital Twin Content Standard v2** — every block, post, email, or piece of voice prep declares whether it was authored by the human, drafted by AI and edited by the human, or kept verbatim from AI. v2 introduces three annotation tiers matched to surface type: full per-block manifest for long-form articles; compact inline disclosure for email and social; channel-level disclosure for voice and real-time chat. The model provider, model name, and authoring tool are reported for every AI-involved block (Tier 1) or in the disclosure tag (Tier 2).

The skill is generic — it works for any author once their substrate is in place. The bundled `docs/digital-twin-travis/` directory is the reference implementation for Travis James and serves as a worked example of what good substrate looks like.

---

## When to use this skill

Trigger this skill when any of the following are true:

- The user is publishing content under their name — articles, blog posts, op-eds, newsletters, proposals, technical reports, internal memos with named authorship
- The user is drafting email, LinkedIn posts, Twitter/X threads, Substack Notes, or other short-form content that should sound like them, not generic AI
- The user is preparing talking points, a podcast outline, meeting notes, or any voice/video content where they want to speak in their own voice
- The user has been disappointed that AI-drafted content "doesn't sound like them"
- The user wants to disclose AI involvement in their writing without hiding it
- The user wants to set up the substrate scaffolding for a new author's digital twin
- An existing article or post was 100% AI-generated and the user wants it rewritten in their voice with provenance annotations

Do **not** trigger this skill for:

- Pure code generation (no authorship voice involved)
- Purely conversational back-and-forth chat where no authored content is being produced
- Technical specifications or API documentation where machine-default voice is the correct register and the author is not claiming personal voice
- Anonymous or institutional content with no named author
- Content produced on behalf of an author who has not authorized a substrate (do not impersonate)

---

## How the skill operates

The skill runs in three modes. Pick the mode based on what's available.

### Mode A — Generate (substrate is in place)

The author's substrate directory is populated (12 documents — index plus 11 numbered substrate files; see `references/substrate-template.md`). The user wants new content produced.

Steps:

1. **Identify the surface.** What is the user producing? If not stated, ask. Surface determines the annotation tier (see `references/communication-surface-taxonomy.md`) and the register to draw from the substrate.
2. **Read the substrate.** Load all eleven numbered files. The personality profile and rejection filters in the corrections document are non-negotiable inputs. For Tier 2 / Tier 3 surfaces, pay particular attention to documents 07 (humor and emphasis), 10 (collaboration style), and the register-specific patterns.
3. **Check Gate 3 (surface-register match).** If the substrate does not cover the target surface's primary register, warn the user before generating.
4. **Classify content type** against the table in `references/annotation-scheme.md`. Code samples, JSON output, and mechanical tables default to `AI verbatim`. Strategic, narrative, rhetorical, and editorial content defaults to `<Author>` (or `<Author> ← AI`).
5. **Generate the content** using the voice substrate and the register appropriate to the surface. Apply the rejection filters (no "leverage" as a verb, no "harness", no "delve", no "revolutionary"; em-dashes over commas at clause boundaries; specific numbers over rounded; named alternatives in comparisons; trade-offs surfaced; closes that land on stakes, not invitations).
6. **Apply annotations** per `references/annotation-scheme.md` at the correct tier:
   - Tier 1: per-block italic eyebrow line + footer manifest
   - Tier 2: single compact disclosure tag at top or end
   - Tier 3: channel-level disclosure statement
7. **Run the rejection check** before returning. If any sentence matches the rejection-filter patterns, rewrite that sentence and re-check.

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

## The Authentic Digital Twin Content Standard v2

Full specification: `docs/standards/authentic-digital-twin-content-standard-v2.md`. v1 specification (for articles already published under v1): `references/authenticity-standard.md`.

**Three authorship categories — same across all tiers:**

| Category | Definition |
|---|---|
| `Human-authored` | Original voice of the named author. No AI involvement, or AI limited to spell-check that did not alter voice. |
| `AI-drafted, human-edited` | AI drafted; human edited substantively for voice, framing, accuracy, or structure. |
| `AI verbatim` | AI output reproduced without editorial intervention. |

**Three annotation tiers — format adapts to surface:**

| Tier | Surfaces | Format |
|---|---|---|
| 1 — Full manifest | Long-form articles, reports, proposals | Per-block italic eyebrow line + footer manifest table |
| 2 — Compact tag | Email, social posts, Slack authored, slide notes | Single `(AI-assisted, edited by <Author Name>)` tag |
| 3 — Channel disclosure | Voice, video, real-time chat, meeting notes | One spoken or written statement at session/document start |

Tier selection uses the surface taxonomy in `references/communication-surface-taxonomy.md`. A **content provenance manifest** at the article footer enumerates every Tier 1 block's authorship category. See the worked example in `zed-workspace-article.md` for Tier 1 format.

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
| Standard v2 (current) | `docs/standards/authentic-digital-twin-content-standard-v2.md` |
| Standard v1 (for prior published articles) | `references/authenticity-standard.md` |
| Communication surface taxonomy | `references/communication-surface-taxonomy.md` |
| Annotation scheme and tier playbook | `references/annotation-scheme.md` |
| Voice extraction process (bootstrap mode) | `references/voice-extraction-process.md` |
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

- It does not impersonate authors who have not authorized a substrate. The substrate must be supplied by the author or by someone with the author's explicit consent.
- It does not produce content marked as authored by a human when it was actually AI verbatim. The provenance annotation is the integrity boundary — no tier of annotation permits understating AI involvement.
- It does not generate personality assessments. Existing assessments (MBTI, Enneagram, CliftonStrengths, SoulTrace, etc.) are inputs, not outputs.
- It does not replace editorial judgment. The author remains responsible for what is published, sent, or spoken under their name, at every tier.
- It does not annotate image, audio, or video provenance. The standard covers textual content only.
- It does not guarantee voice accuracy on registers not covered by the substrate. Gate 3 warns when a surface-register gap exists; the author decides whether to proceed.
