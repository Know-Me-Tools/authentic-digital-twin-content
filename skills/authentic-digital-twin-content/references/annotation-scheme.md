# Annotation Scheme

How to apply the Authentic Digital Twin Content Standard at content-generation time. The standards are in `authenticity-standard.md` (v1) and `docs/standards/authentic-digital-twin-content-standard-v2.md` (v2). This document is the operational playbook for actually emitting the annotations across all tiers and surfaces.

**v2 summary:** v2 introduces three annotation tiers. Tier 1 (full manifest) is unchanged from v1 and applies to long-form published artifacts. Tier 2 (compact inline tag) applies to email, social posts, and short-form correspondence. Tier 3 (channel-level disclosure) applies to voice, video, and real-time chat. The authorship categories are the same at all tiers; only the annotation format adapts to what the surface can carry.

---

## The block classification decision

Before generating or rewriting any content, classify each block into one of the three categories. The default classifications are these.

| Content type | Default category | Notes |
|---|---|---|
| Strategic narrative | `<Author>` | The author's voice is the whole point |
| Opening scenes | `<Author>` | High-signal voice surface |
| Rhetorical reframes | `<Author>` | These are signature moves |
| Thesis statements | `<Author>` | The author's argument, by definition |
| Closing paragraphs | `<Author>` | Always author-certified |
| Author bio | `<Author>` | Self-evidently |
| Explanatory prose with technical content | `<Author> ← AI` | AI can structure; human edits for voice |
| Architecture descriptions with diagrams | `<Author> ← AI` | Same — structure from AI, voice from human |
| Vibe-coding / context-engineering arc passages | `<Author> ← AI` | Research-anchored content benefits from AI draft |
| Code blocks (any language) | `AI verbatim` | Machine-default register is correct |
| JSON / YAML / TOML output | `AI verbatim` | Mechanical data |
| Tool reference tables | `AI verbatim` | Mechanical reference |
| Shell command listings | `AI verbatim` | Mechanical |
| Specification quotes (direct quotes from external specs) | `AI verbatim` if reproduced verbatim | Not authored; attribute to source |

These are defaults, not laws. The author overrides when warranted — for instance, an author who wrote their own code samples blocks `Travis James` instead of `AI verbatim`.

---

## Tier selection — which annotation format to use

Before emitting any annotation, determine the surface tier.

| Surface type | Tier | Annotation format |
|---|---|---|
| Articles, op-eds, blog posts, newsletters (>500 words), reports, proposals | **1** | Per-block eyebrow + footer manifest |
| Email, LinkedIn, Twitter/X, Substack Notes, Slack (authored), social captions, slide decks | **2** | Single compact disclosure tag |
| Voice calls, video, real-time chat, meeting notes, dictation, comments | **3** | Channel/session-level disclosure statement |

See `docs/standards/authentic-digital-twin-content-standard-v2.md` for the full surface taxonomy and edge cases.

---

## Tier 1 annotation — eyebrow line format

The eyebrow appears on its own line, immediately before the block it annotates, separated from the preceding content by a blank line.

**Human-authored:**

```markdown
_— Travis James._
```

**AI-drafted, human-edited:**

```markdown
_— Travis James ← AI: Anthropic Claude Opus 4.7 via Claude Code._
```

**AI verbatim:**

```markdown
_— AI verbatim: Anthropic Claude Opus 4.7 via Claude Code._
```

Format rules:

- Always wrapped in single underscores for italic. Single underscores render reliably across Markdown processors, including Medium.
- Always opens with an em-dash (`—`) preceded by a space, then the author or category name.
- Ends with a period for typographic finish.
- The model identifier follows the form `<Provider> <Model Name>` — e.g., "Anthropic Claude Opus 4.7", not "claude-opus-4.6" or "Claude". Model names should be human-readable; internal API strings belong in the manifest, not the eyebrow.
- The tool identifier names the user-visible product, not the underlying API — e.g., "Claude Code", "Cursor", "GPT desktop app", not "Anthropic Messages API."

---

## Tier 2 annotation — compact inline tag

For short-form surfaces (email, social posts, Slack authored messages, slide decks), emit a single compact disclosure tag rather than per-block eyebrows.

**Tag placement:**
- Email: end of the message, after the sign-off
- Social post (LinkedIn, Twitter/X, Substack Notes): beginning of the post, on the first line
- Slack authored message: end of the message
- Slide deck: speaker notes on the first slide

**Tag forms:**

```
(AI-assisted, edited by <Author Name>)
(AI draft, unedited — <Provider> <Model>)
(<Author Name>, written without AI assistance)
```

**Mixed content:** If the piece is mixed (e.g., an email with a human-authored opening and an AI-generated body paragraph), the tag names both:

```
(Opening: <Author Name>. Body: AI draft, unedited — Anthropic Claude Opus 4.7)
```

The compact tag does not require a block-level manifest. One tag covers the whole piece.

---

## Tier 3 annotation — channel-level disclosure

For voice, video, real-time chat, and ephemeral communication, emit one disclosure at the session, channel, or document level before or at the start of the content.

**Forms:**

- *Spoken at session start:* "I prepared these talking points with AI assistance."
- *Transcript header:* `[Prep notes: AI-assisted draft, speaker edited before delivery]`
- *Chat thread opener:* `These responses are AI-drafted; I review before sending.`
- *Video description:* `Presentation notes prepared with AI assistance.`
- *Meeting notes header:* `[AI-generated from voice memo; reviewed by <Author Name>]`

Tier 3 disclosure covers the entire session or document. No per-block annotation is required or expected. The disclosure must still be accurate — if the author prepared the material with no AI involvement, no disclosure is required. If AI was involved at any level, the disclosure is mandatory.

---

## Where the Tier 1 eyebrow does not appear

Avoid annotation clutter by skipping Tier 1 eyebrows in these positions:

- **Article title and subtitle.** The author owns the title by default. If the title was AI-generated, declare it in the manifest only.
- **Inline `code` formatting** within a prose block. Inherits the prose block's category.
- **Inline links and references** within a prose block. Inherits the prose block's category.
- **Block quotes** that are quoted material from a third-party source. Attribute the source inline; the block inherits the surrounding prose's category for the surrounding commentary.
- **Footnotes** that are author-written commentary on the block. Inherits the block's category.

---

## Multi-block sections

When a section contains multiple blocks of different categories (e.g., an introductory paragraph by the human, then an AI-verbatim code block, then human commentary), each block gets its own eyebrow.

Pattern:

```markdown
## Section title

_— Travis James._

Human-authored introductory prose. Sets up what the code shows.

_— AI verbatim: Anthropic Claude Opus 4.7 via Claude Code._

​```rust
fn example() {
    // AI-generated code, kept verbatim
}
​```

_— Travis James._

Human-authored commentary on the code. Surfaces the trade-off.
```

The pattern of returning to human voice after a verbatim code block is common — the code anchors the technical example; the prose around it carries the argument.

---

## When the author cannot remember which model produced a draft

The standard requires honest attribution. When the model or tool is genuinely uncertain:

- Use the form `_— Travis James ← AI: model unknown via <tool>._` if the tool is known but the model is not.
- Use the form `_— Travis James ← AI: model and tool unknown._` if neither is known.
- In the manifest, mark the model and tool columns with `unknown` and add a footnote explaining when the draft was produced.

Marking provenance as unknown is preferable to fabricating a model name. The integrity of the standard depends on the manifest being auditable.

---

## When the author is mixing models within one block

If a single block was drafted by one model, then edited by another model's suggestions before the human's final pass:

- The eyebrow names the dominant draft source.
- The manifest row lists all models involved in the Model column, comma-separated, with the dominant model first.

Example eyebrow: `_— Travis James ← AI: Anthropic Claude Opus 4.7 via Claude Code._`

Example manifest row: `| Section X | Travis James ← AI | Anthropic Claude Opus 4.7, OpenAI GPT-5 | Claude Code, Cursor |`

---

## Workflow: applying annotations during generation (Mode A)

1. Generate the block.
2. Classify the block per the table at the top of this document.
3. Emit the eyebrow immediately before the block.
4. Append a manifest row to the running manifest.
5. Continue.

The manifest is built incrementally as blocks are generated. At the end of the article, emit the manifest with all rows.

---

## Workflow: applying annotations during rewrite (Mode B)

1. Read the existing article.
2. For each existing block, classify it.
3. For `AI verbatim` blocks: leave the content unchanged, add the eyebrow.
4. For `<Author> ← AI` blocks: leave the content unchanged if it's already voice-correct; rewrite if not. Add the eyebrow.
5. For `<Author>` blocks: rewrite if the existing content is in AI default voice, leave unchanged if it's already in author voice. Add the eyebrow.
6. Insert the manifest at the article footer.
7. Insert the "How to read this article" section near the top.

---

## Quality check before emitting

**Tier 1 checklist (long-form articles):**

- [ ] Every prose block has an eyebrow
- [ ] Every code, JSON, table, and command block has an eyebrow
- [ ] Every AI-involved eyebrow names provider, model, and tool
- [ ] The "How to read this article" section appears in the article top matter
- [ ] The provenance manifest appears at the article footer
- [ ] Definitions of the three categories are reproduced in the manifest
- [ ] Every `<Author>` block has been passed through the rejection filter
- [ ] No buzzword from the rejection list survives in a `<Author>` or `<Author> ← AI` block
- [ ] The article declares the standard version (`v2`) in the top matter

**Tier 2 checklist (short-form posts and correspondence):**

- [ ] A compact disclosure tag is present (end for email; top for social posts)
- [ ] The tag accurately states the dominant authorship category
- [ ] If the piece is mixed, the tag names both categories
- [ ] The rejection filter was applied to any `<Author>` or `<Author> ← AI` sections

**Tier 3 checklist (voice, video, real-time):**

- [ ] A channel-level or session-level disclosure was made before or at the start of content
- [ ] The disclosure is visible to the intended audience
- [ ] The disclosure accurately states whether AI was involved

A failure on any applicable line is a compliance failure. There is no acceptable partial compliance.

---

## Reader-facing UX considerations

The eyebrows are a balance between auditability and readability. Some readers will find them distracting; others will rely on them. Two practical mitigations:

- **The "How to read this article" section** at the top explains the scheme. Readers who do not want to audit can read past the eyebrows after that explanation.
- **The manifest at the bottom** consolidates the audit. Readers who do want to audit can read the manifest first and check specific blocks they care about.

The eyebrows themselves are kept minimal — italic, single line, no boxes or borders. The cost to flowing reading is low; the value to the auditing reader is high.

---

## What this annotation scheme is not

- It is not a license to claim more AI involvement than actually occurred. Over-attribution is dishonest.
- It is not a license to claim less AI involvement than actually occurred. Under-attribution is dishonest.
- It is not a substitute for fact-checking. The standard certifies provenance, not accuracy.
- It is not a substitute for editorial responsibility. The author remains responsible for what is published under their name, regardless of which category the offending content is in.
