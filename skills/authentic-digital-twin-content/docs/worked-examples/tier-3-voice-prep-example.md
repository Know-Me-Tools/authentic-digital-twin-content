[Preparation notes: AI-assisted draft, speaker edited — Standard v2 Tier 3]

---

# Voice Prep: Agentic Programming and the Workspace Identity Problem

**Format:** 5–10 minute segment — podcast opening, panel contribution, or conference talk
**Topic:** Why agents still don't know where they are, and why that's the next unsolved layer

---

## 1. Opening Hook

- Agents don't know where they are. Not in a poetic sense. Structurally. Right now. The agent runtime is largely solved. The workspace layer is not.

- The context problem gets framed as a prompt problem. It isn't. Prompt engineering is the symptom. Missing context infrastructure is the disease.

---

## 2. Core Claim / Thesis

- The gap isn't capability — it's identity. An agent in Zed and the same agent in VSCode are running the same model, same protocol, same tools. What they don't share: any concept of the workspace they're operating in. No project state. No methodology. No running context. Every session starts blind.

- ACP and MCP are integration substrates. They're not context infrastructure. They tell agents how to connect to things. They don't tell agents where they are, what they're working on, or what the project has already learned.

- The UAR (Universal Agent Runtime) approach bets that the workspace layer is the next protocol-level problem. Not another agent capability, not another model release — a missing layer between the runtime and the task.

---

## 3. Evidence / Grounding

- VSCode with a folder open: 3,549 MB. That's not an editor. That's a hostage situation. Zed solves the resource problem — it's fast, it's light, it's architected differently. What it's missing is workspace support that ACP-driven tools can actually use.

- MCP is everywhere now. Anthropic shipped the integration substrate. What you can't do with MCP is tell an agent "you are in the Prometheus banking project, here's the methodology, here's what we decided last session, here's the constraint set." MCP connects. It doesn't situate.

- 1B parameter models can route intent just fine. They cannot hold regulated-domain knowledge, multi-session context, or project-level state without external infrastructure. The models aren't going to solve this — they have hard ceilings on context depth that don't move with parameter count.

- Every agentic IDE right now simulates workspace context through hacks. Folder-open heuristics. .cursorrules files. Pinned context blocks. These never provided enough. The agent can see the files — it can't see the project's intent, its history, or its methodology.

- ACP (Zed's Agent Client Protocol) is the editor-portability layer. It's the right architectural move for multi-agent IDE portability. But portability without context situatedness just means the agent is equally blind in more editors.

---

## 4. The Opportunity / Forward Projection

- The teams solving the context infrastructure layer — not the model layer, not the tool layer — are building the thing that everything else will depend on. That's not a 2028 problem. The migration is happening now.

- Whoever solves workspace identity for agents gets a layer that's sticky in a way that models and protocols are not. Models swap out. Protocols get adopted and commoditized. The workspace context layer, once embedded in how teams work, is the thing that stays.

- The window is structurally favorable right now because the protocol layer just matured. MCP is stable. ACP is real. The integrations are built. What's missing is the layer above them — and that's the exact moment when a well-positioned implementation gets to be the default rather than a replacement.

---

## 5. Possible Q&A Anticipation

- **"Isn't this just better RAG?"** — No. RAG retrieves relevant chunks. Context infrastructure provides situational identity — what project, what methodology, what constraints, what the agent already decided. Those are different problems. RAG answers "what does the codebase contain?" Context infrastructure answers "where am I and what am I supposed to be doing?"

- **"Why doesn't the agent just read the project files?"** — It does. That's the hack. Reading files is not the same as having a structured, session-persistent, methodology-aware context that survives handoffs. The file system is the substrate. It's not the context layer.

- **"What specifically are you calling context infrastructure?"** — A session-aware, project-scoped identity layer that persists agent state across sessions, encodes methodology and constraint sets, and exposes a structured interface that protocols like ACP and MCP can consume. Not a prompt. Not a config file. A runtime-level layer.

---

---

## Annotation Block

### Disclosure form used

**Tier 3 — Channel-level disclosure.** The header `[Preparation notes: AI-assisted draft, speaker edited — Standard v2 Tier 3]` is the Standard v2 Tier 3 form for a voice preparation document. The full form follows the transcript-header-note pattern from the standard: `[Preparation notes: AI-assisted draft, speaker edited]`, extended with the version tag per worked-example convention.

Tier 3 applies here because:
- Real-time voice delivery makes per-block annotation impossible during the segment itself
- The document is an ephemeral preparation aid, not a published citable artifact
- The channel context (podcast, panel, or talk) carries a lower expectation of solo live authorship than a published article

### Authorship classification

**"Speaking from notes is Author."**

The talking points are AI-drafted and have been substantively shaped by the human author (edited, restructured, specific claims verified against the substrate). When Travis delivers these points in his own voice — having synthesized, selected, and modified them — the delivery is **Human-authored** in the Standard v2 taxonomy: the ideas have been internalized and the delivery is original speech, not verbatim reproduction.

The preparation notes themselves are classified as **AI-drafted, human-edited**: drafted by the digital twin skill, edited by the author before use.

The distinction matters: if Travis reads these bullets verbatim without editorial judgment, the delivery would be closer to AI verbatim. If he delivers the underlying argument in his own voice, having processed these points, the result is human authorship. This example is designed for the former use case.

### Register applied

**Spoken/Conversational Register** — derived patterns from:

- **02-writing-samples-prompts.md (Spoken/Conversational Register, Change F):** Bullet structure enters thoughts mid-motion rather than as formal topic statements. Self-correction move present in Evidence section ("These never provided enough. The agent can see the files — it can't see the project's intent"). Architecture anthropomorphization deployed as spoken framing device ("the agent is equally blind in more editors"). Forward-projection close in Opportunity section.
- **07-humor-and-emphasis.md (Spoken Register Humor and Emphasis, Change F):** Hard-stop pivot bullets written as separate bullet points (not collapsed with "but" or "however") to preserve the pause structure. Architecture anthropomorphization leaned into slightly for spoken delivery ("That's not an editor. That's a hostage situation."). Intensity context 4 (strategic opportunity window) used for the Opportunity section — close is forward-projection stated as a fact, not as aspiration.
- At least two hard-stop pivot bullets present: "Agents don't know where they are. Not in a poetic sense. Structurally." and "VSCode with a folder open: 3,549 MB. That's not an editor. That's a hostage situation."
- Red calibration test: architectural anthropomorphization present, hard-stop pivots present, close lands on stakes/timing, Red intensifier ("structurally favorable") present.

### Gate 3 status

**Spoken register: derived patterns only.** The substrate now includes a derived Spoken/Conversational Register section in 02-writing-samples-prompts.md and a Spoken Register Humor and Emphasis section in 07-humor-and-emphasis.md (both added in Change F of Phase 2). These derived patterns provide structurally grounded guidance. Gate 3 coverage for spoken register would improve materially with actual transcripts — podcast appearances, recorded talks, or talk prep notes Travis has personally edited. The derived patterns are high-confidence for structural markers (hard-stop pivots, mid-thought entry, anthropomorphization); prosody and pacing nuance remain unvalidated.

### Substrate documents that drove the content

| Document | Contribution |
|---|---|
| **08-domain-anchors.md** | Anchor 3 (Agent Orchestration Protocols): ACP, MCP, UAR, the workspace identity gap, specific named projects. Anchor 1 (Rust Systems): VSCode 3,549 MB figure, Zed as alternative. Anchor 2 (LLM Inference): 1B model hard ceilings on context depth. |
| **07-humor-and-emphasis.md** | Intensity context 4 (strategic opportunity windows — forward-projection close). Spoken Register Humor and Emphasis section: hard-stop pivot structure, architectural anthropomorphization as spoken device. Dry understatement pattern ("That's not an editor. That's a hostage situation."). |
| **02-writing-samples-prompts.md** | Spoken/Conversational Register derived patterns: mid-thought entry, self-correction marker, spoken behavioral markers, forward-projection close, "etc." verbal close. |
| **10-collaboration-style.md** | How Travis closes (forward-pointing, stakes-oriented). Fight style in Q&A: "What specifically?" before answering vague questions; concrete questions answered directly without preamble. Burst cadence informing density of talking points. |

### Why this is a worked example, not an actual published prep note

This file exists as a reference implementation demonstrating how the skill generates and annotates voice preparation content under Standard v2. It illustrates:

1. Correct Tier 3 disclosure header placement and form
2. Spoken/Conversational Register applied to talking-point structure (not prose)
3. Hard-stop pivot bullets written to preserve the spoken pause
4. Intensity context 4 close (forward-projection as fact, not aspiration)
5. Annotation block structure for an ephemeral voice-prep artifact

An actual prep note Travis uses before a talk would not include this annotation block — the annotation is for skill documentation purposes. The talking points section itself is the output the skill would deliver; the annotation block is the skill's explanation of how it made the choices it made.
