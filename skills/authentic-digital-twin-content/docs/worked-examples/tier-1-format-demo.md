# Tier 1 Format Demo — Per-Block Annotation

> **Standard version:** `v2`
> **Tier:** 1 (full per-block eyebrow lines + footer content provenance manifest)
> **Surface:** long-form article excerpt

## How to read this piece

This file demonstrates the **Tier 1 annotation format** of the `authentic-digital-twin-content` skill. Tier 1 is the most granular disclosure mode: every block of the article carries its own provenance, and a manifest at the foot of the document summarizes the whole.

**Eyebrow lines.** Each block is preceded by a short italic line in square brackets — the *eyebrow line*. It names who authored that specific block. Eyebrow lines appear inline, immediately above the block they describe, so a reader scanning the piece always knows the provenance of the paragraph in front of them. They are not footnotes and they are not collected at the end.

**The three categories.** Tier 1 uses three authorship categories:

1. **Human-authored** — written by the named author (Travis James). No model involved. Must pass the rejection filter before it can carry this label.
2. **AI-drafted, human-edited** — drafted by a model in the author's voice, then substantively revised by the human. The voice is the author's; the first draft was not.
3. **AI verbatim** — produced by a model and published without voice-matching edits. Accurate and useful, but not represented as the author's prose.

**This is a format demo, not a full article.** The excerpt below is roughly 350 words across three blocks. It exists to show what each eyebrow line looks like and how the three categories sit next to each other in a real document. It is not a complete worked example and it is not a published Travis James article.

---

## Article excerpt — "Where the agent thinks it is"

*[Travis James — Human-authored]*

An agent opens a project and starts working. It does not know where it is. It has the files in front of it and nothing else — no project history, no methodology, no record of the last three sessions. The hacks we use to fake that context never carried enough of it. A pinned file. A pasted summary. A naming convention everyone forgets by Thursday. Workspace identity is not a convenience feature. It is the layer that tells the agent what it is allowed to assume, and right now that layer is missing.

*[AI-drafted, human-edited — Claude Sonnet 4.6 via authentic-digital-twin-content v2.0.0]*

When an agent begins a task inside a project, it works from the files it can see and very little else. It typically has no durable sense of the project's history, the methodology in use, or what happened across earlier sessions. Teams have tried to compensate with workarounds — a pinned context file, a pasted summary at the top of a prompt, a folder-naming convention — but each of these tends to drift or get dropped over time. Workspace identity should be treated as core infrastructure rather than a nice-to-have, because it defines the context an agent is entitled to assume before it acts.

*[AI verbatim — Claude Sonnet 4.6 via authentic-digital-twin-content v2.0.0]*

A workspace-identity layer for agentic programming typically provides four kinds of context:

1. **Project scope** — the boundaries of the codebase, including which directories are in scope and which are excluded.
2. **Methodology state** — the active process or framework (for example, phase trackers, task ledgers, or review gates) that governs how work proceeds.
3. **Session continuity** — a durable record of prior sessions so the agent can resume work without re-deriving decisions already made.
4. **Capability and permission scope** — what tools, credentials, and actions the agent is authorized to use within this workspace.

Without an explicit layer carrying this context, each of the four must be reconstructed from incomplete signals at the start of every session.

---

## Content provenance manifest

| Block | Category | Model | Tool |
|---|---|---|---|
| Where the agent thinks it is | Human-authored | — | — |
| Compensating for missing context | AI-drafted, human-edited | Claude Sonnet 4.6 | authentic-digital-twin-content v2.0.0 |
| What a workspace-identity layer provides | AI verbatim | Claude Sonnet 4.6 | authentic-digital-twin-content v2.0.0 |

---

## About this document

**What this file is.** This is a format demonstration, not a full worked example. Its only purpose is to show the Tier 1 annotation format in context: the per-block eyebrow lines, the three authorship categories side by side, and the footer content provenance manifest. The article excerpt is deliberately short and incomplete. Do not treat it as a finished piece or as a published Travis James article.

**How to read the eyebrow lines.** Each eyebrow line states, operationally:

- *Travis James — Human-authored* — the human wrote this block himself. No model produced any part of it. The skill applied no generation step here; it only verified the block against the rejection filter.
- *AI-drafted, human-edited* — a model produced the first draft of this block in the author's voice, and the human then revised it substantively. The named model and tool version are the ones that produced the draft.
- *AI verbatim* — a model produced this block and it is published as the model wrote it. It is accurate, but it is not claimed as the author's voice. The eyebrow line names the model and tool so the reader knows exactly what produced it.

**Difference from the Tier 2 and Tier 3 examples in this directory.** Tier 2 and Tier 3 worked examples annotate at coarser granularity — a single disclosure tag for an entire post or artifact, plus an annotation block explaining the substrate signals behind it. Tier 1 is per-block: every block carries its own eyebrow line, and the footer manifest aggregates them. Tier 1 is used for long-form articles where authorship genuinely varies block to block; Tier 2 and Tier 3 fit shorter surfaces with uniform provenance.

**Why the Human-authored block must pass the rejection filter.** A block can only carry the *Human-authored* label if it reads as the named author and contains nothing the author would never write. The rejection filter screens for the anti-patterns documented in the substrate — exclamation points, "I'm excited to share" openers, relational throat-clearing, a "Thoughts?" close, vocative address of the reader, hedge stacks, and filler. The Block 1 paragraph above is built from hard-stop pivots, one-clause-per-idea compression, dry understatement ("a naming convention everyone forgets by Thursday"), a named technical claim followed by its implication, and intentional sentence fragments used as emphasis. It opens at ordinary intensity and escalates to the strategic claim only at the end. If a block fails the filter, it cannot be labeled Human-authored — it is relabeled to the category that honestly describes how it was produced.
