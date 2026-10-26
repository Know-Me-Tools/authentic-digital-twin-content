# Worked Example: Tier 2 — LinkedIn Post
# Topic: Agentic programming and the workspace identity problem

---

## Post

(AI-assisted, edited by Travis James — Standard v2)

ACP solved agent portability. Nobody solved workspace identity.

That distinction matters more than it sounds. The Agent Client Protocol decouples AI agents from editors — implement the protocol once, and every compatible editor gets the agent. It is a genuine architectural advance, the same structural move LSP made for language intelligence a decade ago. But ACP says nothing about what the agent is told about the workspace it just connected to.

What does the agent receive on session start? A directory tree rooted at whatever folder the editor has open. Open files. Active cursor position. That is the full context envelope.

For a single-repository session this is fine. For multi-repository work — the kind of work where a feature crosses a runtime, a gateway, and an orchestration layer simultaneously — it breaks immediately. The agent sees two `handler.rs` files in two different roots and has no machine-readable contract telling it which service it's in, which build command applies, or which environment variables are expected. It infers from directory path. Inference works until directory names collide, which they do, because naming conventions are shared across a codebase by design.

This is not an edge case. It is the default condition of any serious production system built as a set of cooperating services.

The field has started calling the broader category "context engineering" — the systematic discipline of structuring what agents know, rather than relying on the model to infer it from ambient signals. The specific finding worth quoting: a well-crafted prompt in a poorly constructed context fails. Workspace identity is where context engineering has to start. The agent needs to know its namespace — not guess it.

What I built in `zed-workspace` is three Rust crates and roughly 1,800 lines of code: a manifest format (`.zworkspace.toml`), a CLI binary that resolves workspace state, and an MCP server that surfaces named workspace context to any connected agent before it executes a single tool call. The agent initializes knowing its workspace name, its constituent repositories, their task definitions, and the environment it is expected to operate in. Not inferred. Named.

The infrastructure for agent portability exists. The infrastructure for workspace identity is catching up — and the gap between those two things is where agents currently hallucinate their own context.

---

## Annotation Block

### 1. Disclosure Tag Used

**Tag:** `(AI-assisted, edited by Travis James — Standard v2)`

This is the Tier 2 disclosure, appropriate for a post that is AI-drafted and then substantively edited by Travis to
match his voice, correct any substrate mismatches, and sharpen the argument. The tag appears on its own line at the
top of the post, before the body, per the Standard v2 specification. It is not embedded in the post prose and does
not appear after the closing sentence — placement is deliberate: it discloses before the reader encounters the
content.

Tier 2 is the right designation for a LinkedIn post produced by the skill. The skill generates the draft; Travis
edits it to completion. Posts where Travis writes from scratch without any AI assistance would be Tier 1 (no tag
required under Standard v2). Posts where AI generates and Travis reviews lightly without structural editing would
be Tier 3. The line between Tier 2 and Tier 3 is substantive editing — reshaping structure, correcting voice,
adding or removing claims — which is the expected workflow for this surface.

---

### 2. Register Applied: Written-Social

The post is written in **written-social register** — Travis's public professional voice on LinkedIn.

This register sits between the two poles documented in `02-writing-samples-prompts.md`:

- **Mode A (Casual Directive):** lowercase, fast, informal — used for AI agent prompts and mid-stream redirects.
  This is not that. LinkedIn is a public professional surface; casual-lowercase would read as unfinished.
- **Mode B (Architect Specification):** structured, properly cased, stakeholder-dense — used for formal external
  artifacts like bank proposals and brand documents. This is closer, but stakeholder register carries citations,
  phased roadmaps, and team naming that are not appropriate for a social post.

Written-social is what `10-collaboration-style.md` calls the **LinkedIn post register** specifically:
> *"More declarative and architectural than email. Written-social register, not stakeholder register."*

Properly cased throughout. First-person. No hashtag stacks. No "Excited to share..." openers. The close lands on a
stake — the consequence of the gap between agent portability infrastructure and workspace identity infrastructure —
not on an invitation to respond.

The register constraint means several Mode A features are absent here: no lowercase "i", no "etc." as a trailing
closer, no parenthetical chains like "(e.g., like Chime, Varo, etc.)". Those are appropriate to Travis's voice
but to a different surface.

---

### 3. Gate 3 Status

**Gate 3** is the register completeness check for the substrate. As of Change F (the phase-2-substrate-enrichment
in progress), the following registers exist in the substrate:

- **Written-social (LinkedIn post):** Present — documented in `10-collaboration-style.md` under "LinkedIn post"
  correspondence register, plus cross-signal from Mode A/B in `02-writing-samples-prompts.md`.
- **Correspondence — internal:** Derived in `02-writing-samples-prompts.md` and `10-collaboration-style.md`.
  Marked as derived; no raw email samples in substrate yet.
- **Correspondence — external champion:** Derived in same documents. Marked as derived.
- **Correspondence — formal enterprise:** Derived. Marked as derived.
- **Ultra-short (sub-280-character):** Derived in `02-writing-samples-prompts.md`. Marked as derived; no actual
  Twitter/X samples in substrate.
- **Spoken/conversational:** Derived in `02-writing-samples-prompts.md` and `07-humor-and-emphasis.md`. Marked as
  derived; no spoken transcripts in substrate.

**Gate 3 warning for other surfaces:** The correspondence and spoken registers are derived, not extracted from raw
samples. Content generated for those surfaces carries higher reconstruction uncertainty than content generated for
written-social, which has stronger cross-signal support. When generating email drafts or talk notes, the skill
should surface the derivation caveat. This post is written-social — the highest-signal register in the current
substrate — so Gate 3 does not block or warn here.

---

### 4. Substrate Documents That Drove the Content

**08 — Domain Anchors** (load-bearing for content):
The post's claims are grounded in Anchor 3 (Agent Orchestration Protocols) and Anchor 1 (Rust Systems
Programming). Specific substrate items drawn from Anchor 3: ACP (Agent Client Protocol) framing, the distinction
between A2A/AG-UI/ACP roles, MCP as the integration substrate, and `universal-agent-runtime` (UAR) as the
architecture Travis is building. The project name `zed-workspace`, the crate count (three), and the line count
(1,800) come directly from the article in `docs/zed-workspace-article.md`, which is the long-form piece this
LinkedIn post stands alongside. The `.zworkspace.toml` manifest format is named from the same source.
The phrase "context engineering" and the Thoughtworks Technology Radar citation are present in the source article
and are used verbatim here because they are factual anchors, not fabricated.

**07 — Humor and Emphasis** (load-bearing for voice texture):
- **Architectural anthropomorphization:** "The agent needs to know its namespace — not guess it." The agent is
  assigned a cognitive condition (guessing vs. knowing). This is the documented "Agents don't know where they are"
  pattern from 07, applied at this post's specific argument.
- **Hard-stop pivot:** "For a single-repository session this is fine. For multi-repository work — the kind of work
  where a feature crosses a runtime, a gateway, and an orchestration layer simultaneously — it breaks immediately."
  The pivot from the benign case to the failure mode is paced as a short sentence followed by a longer one.
- **Red intensifier:** "genuine architectural advance" — "genuine" is in the documented Red intensifier list in
  07, column: authenticity of claim. Used once, not stacked.
- **Dry understatement:** "which they do, because naming conventions are shared across a codebase by design" —
  the absurdity of colliding names in a well-designed system is stated flatly. The reader discovers the irony.

**02 — Writing Samples: Prompts** (load-bearing for register calibration):
The Mode A/B distinction and the written-social LinkedIn register are derived from 02. The opening ("ACP solved
agent portability. Nobody solved workspace identity.") is a direct application of the "Declarative Reframe" hook
type documented in `06-rhetorical-patterns.md` and cross-validated by the reframe examples in 02. The two-sentence
opener with no preamble is a signature from the ultra-short and written-social registers.

**10 — Collaboration Style** (load-bearing for register and close):
The LinkedIn post subsection in 10 provides the explicit rule: "Opens with a hard-stop sentence or a reframe
('Not A. B.') — never 'Excited to share...'"; "the post closes on a stake, a consequence, or a specific forward
projection." The post's closing sentence ("the gap between those two things is where agents currently hallucinate
their own context") is a stake — a consequence — not an invitation.

**06 — Rhetorical Patterns** (load-bearing for structure):
The "Statement → Mechanism → Stakes" paragraph triplet appears in the central body paragraphs. The "Not A. B."
reframe move appears in the opener. The "Compound Buildout" sentence structure (long sentence threading a complete
argument in one clause) is used in the ACP description paragraph.

---

### 5. Authorship Note

This post is a **demonstrative worked example** written as part of the `authentic-digital-twin-content` skill's
reference implementation. It is written *in* Travis James's voice, using the substrate documents that define that
voice, for the purpose of showing what the skill produces when operating correctly.

It is **not** Travis's actual published content. Travis has not posted this to LinkedIn. The post exists here as
a quality benchmark: a concrete, evaluable artifact that skill maintainers and reviewers can use to assess whether
the voice, register, disclosure, and content claims are correctly operationalized.

The long-form source article (`docs/zed-workspace-article.md`) is Travis's actual work — the LinkedIn post is
a standalone surface artifact derived from the same domain, written in the same voice, making a related but
independent argument. The post does not summarize the article. It declares the core insight directly.

All substrate documents referenced above are all-rights-reserved as part of the skill's substrate layer. This
worked example carries the same restriction.
