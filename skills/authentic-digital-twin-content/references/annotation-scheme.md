# Annotation Scheme

How to apply the Authentic Digital Twin Content Standard v1 at content-generation time. The standard itself is in `authenticity-standard.md`. This document is the operational playbook for actually emitting the annotations.

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

## The eyebrow line format

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

## Where the eyebrow does not appear

Avoid annotation clutter by skipping eyebrows in these positions:

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

Before declaring an article v1-compliant, run this checklist:

- [ ] Every prose block has an eyebrow
- [ ] Every code, JSON, table, and command block has an eyebrow
- [ ] Every AI-involved eyebrow names provider, model, and tool
- [ ] The "How to read this article" section appears in the article top matter
- [ ] The provenance manifest appears at the article footer
- [ ] Definitions of the three categories are reproduced in the manifest
- [ ] Every `<Author>` block has been passed through the rejection filter
- [ ] No buzzword from the rejection list survives in a `<Author>` or `<Author> ← AI` block
- [ ] The article declares the standard version (`v1`) in the top matter

A failure on any line is a compliance failure. There is no acceptable partial compliance.

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
