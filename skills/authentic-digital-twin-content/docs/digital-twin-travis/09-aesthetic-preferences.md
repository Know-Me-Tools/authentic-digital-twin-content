# 09 — Aesthetic Preferences

> **Entity type:** `AestheticProfile`
> **Source:** Brand artifacts, design directions, accept/reject moments across visual work.
> **Use:** Captures what Travis flags as *good* vs *bad* in visual and structural design. The taste signature.

This document focuses on visual, structural, and compositional preferences. Word-level diction is in document 05.

---

## Core Aesthetic Principle

> **"Architectural, engineered, deliberate."**
>
> *— Recurring formulation across brand work*

Anything Travis approves of feels like a building blueprint that has been pared to its load-bearing structure. Anything Travis rejects feels assembled rather than designed.

Three subordinate principles flow from this:
1. **Precision** — every element placed with intent; no accidental ornament
2. **Restraint** — single-accent rule, vast neutral space, scarcity of color
3. **Warmth** — restrained does not mean cold; the work must feel made by a person, not generated

---

## Visual Preferences (Approved)

### Color philosophy
- **Deep charcoal foundation** (`#0B0F14` is the canonical), almost-black with blue undertone
- **Single muted-ember accent** — used like a "single lit terminal in a darkened server room"
- **Vast neutral space** — the negative space is part of the design, not absence-of-design
- **Sacred/warm accents** layered carefully — `#CE3012` Sacred Fire, `#E96A12` Ember, `#F49E12` Gold

### Typography
- **Cinzel** for wordmarks — Roman-classical, architectural geometry
- **Syne** or **Space Grotesk** for headings — geometric sans, slightly wide proportions
- **DM Sans** or **Roboto** for body — neutral, high readability
- **JetBrains Mono** for code and technical eyebrows — single chosen monospace, used consistently

### Composition
- **Asymmetric grids** with intentional weight
- **Generous line-height** in body prose (1.7–1.85)
- **Section numbers** as eyebrow labels ("01 — Brand Philosophy")
- **Dividers** — thin gold/ember rules, never full-width black lines
- **Sticky navigation** with brand wordmark left, eyebrow right
- **Code blocks** styled as terminal-aesthetic: deep charcoal background, mono font, syntax highlighting in muted greens/ambers/blues

### Visual signatures
- The "ember dot" — a single small accent shape, often centered in negative space
- "Polished concrete" texture references — restrained but not raw
- Architecture/blueprint metaphor in section illustrations
- SVG diagrams over PNG screenshots
- Geometric letterforms with engineered proportions

---

## Visual Anti-Patterns (Rejected)

### Color rejections
- **Bright/saturated** color palettes — looks like a startup
- **Gradient backgrounds** — Travis's brand explicitly excludes them
- **Drop shadows on primary elements** — "no shadows, no 3D effects"
- **Texture/grain overlays** on UI
- **Rainbow accent palettes** — single-accent rule violated

### Typography rejections
- **Comic Sans / playful display fonts** (obvious)
- **Mixed mono fonts** (e.g., JetBrains Mono in one section, Courier in another)
- **Decorative serifs** (e.g., Old English, Lobster) — the only acceptable serif is Cinzel
- **All-caps body text** — caps reserved for eyebrows and emphasis
- **Light weight body text** on dark backgrounds — accessibility fail

### Compositional rejections
- **Marketing hero illustrations** — flat-design 2D vector illustrations of people at laptops
- **Stock photography** — almost never appropriate
- **Decorative dividers** — fancy SVG flourishes, art-deco borders
- **Glassmorphism** / heavy blur effects — "frosted glass" trend
- **Neumorphism** — extruded soft shadows
- **Ghost / outline buttons** — explicitly forbidden in Flat 2.0 system
- **Bordered cards** — surfaces differentiated by background color only
- **Mobile menu hamburger drawer** when a sticky nav would work

---

## Structural Preferences (Documents)

### Document structure
- **Numbered section markers** as eyebrow labels
- **Section titles** in display-sans, larger than expected
- **One concept per section** — sections don't sprawl
- **Pull quotes** styled distinctly from inline italics
- **Tables** preferred over bullet lists for comparative data
- **Code blocks** properly styled, never raw `<pre>`
- **Callout boxes** with single-color tinted background, no border

### Reading flow
- **Top-down narrative** — establish context, then walk the structure, then close
- **Visual rhythm** — short-sentence paragraphs alternating with compound buildouts
- **Frequent section breaks** — generous use of horizontal rules
- **Sticky table of contents** for long documents (in HTML artifacts)

### Document length philosophy
- **Long enough to be load-bearing** — under 800 words usually means under-developed
- **Short enough to be read** — over 4,000 words usually means there should be two documents
- **Sweet spot:** 1,500–3,000 words for technical articles; 800–2,000 for strategic briefs

---

## Interface Preferences (Apps & UI)

### Approved patterns
- **Local-first** architecture (offline-capable, sync optional)
- **Sovereign by design** — user owns their data
- **Keyboard-driven** workflows over click-driven
- **CLI parity** — anything in the GUI should be doable from CLI
- **Inspectable internals** — logs, traces, audit trails visible to the operator
- **Composability** — small focused tools that combine, not megalithic suites

### Rejected patterns
- **Forced cloud sign-in** for desktop apps
- **Telemetry without opt-out**
- **Hidden internal state**
- **Magic** workflows where you can't trace what happened
- **Subscription paywalls on basic functionality**
- **Account-required configuration** (settings should be local)

---

## Code Style Preferences

### Approved
- **Explicit over implicit** — no clever metaprogramming for cleverness's sake
- **Crate workspaces** with focused single-purpose crates
- **Heavy use of types** — Rust newtypes, branded TypeScript types
- **`thiserror`** for errors, not `anyhow` for libraries
- **Structured logs** (`tracing`) over `println!`
- **Doc comments on public APIs** — non-negotiable
- **Tests live next to code** in Rust (`#[cfg(test)] mod tests`)
- **Async by default** for I/O code

### Rejected
- **Untyped JSON in production paths** — always serde structs
- **`unwrap()` in library code** — `?` propagation or explicit error handling
- **God-files** — modules over 1,000 lines need refactoring
- **Mixed concerns** — handler doing parsing, validation, business logic, and serialization in one function
- **Implicit error swallowing** — `let _ = ...` is suspicious
- **Magical macros** that hide control flow

---

## Brand Application Decision Tree

When a new artifact needs brand application, Travis's implicit decisions follow:

| Question | Approved choice |
|---|---|
| What's the primary surface color? | Deep charcoal (`#0B0F14`) for dark; off-white (`#F7F7F8`) for light |
| Where does color go? | Single ember accent, used sparingly |
| What font for the title? | Cinzel (if wordmark) or Syne (if heading) |
| What font for body? | DM Sans / Roboto |
| What font for technical eyebrows? | JetBrains Mono |
| Borders or surfaces? | Surfaces — different background colors, no borders |
| Buttons? | Solid filled, no outline/ghost variants |
| Section dividers? | Thin gold/ember horizontal rules |
| Code blocks? | Terminal-aesthetic with mono syntax highlighting |
| Hero illustration? | SVG geometric/architectural, never stock photo |
| Logo? | Geometric monogram or wordmark with eyebrow tagline |

---

## Things Travis Has Specifically Flagged As Beautiful

These came up across conversations as approvals:

- Single lit terminal in a darkened server room (metaphor he uses)
- Polished concrete (texture reference)
- A well-designed building's blueprint (the "load-bearing" frame)
- Architectural plans drawn at scale
- Vintage maps and infrastructure schematics
- Brutalist minimalism (with warmth)
- The way a Cinzel inscription sits on a Roman triumphal arch
- Code that looks like prose — readable left-to-right
- Terminal output that looks composed, not vomited

---

## Things Travis Has Specifically Flagged As Ugly

- "Crap" / "garbage" — used to describe Flux 2.0 generic logo output that was generated by default templates
- "Decorative nodes," "blueprint overlays," "noisy gradients" — listed as exclusions in design prompts
- "Construction site" — opposite of "polished concrete"
- "Rotation of junior resources" — applied to teams (aesthetics extend to organizational design)
- Generic AI hero illustrations — "I do not want this energy"
- Marketing-site aesthetics applied to engineering tools

---

## Aesthetic Principle Stated In His Own Words

From the travisjames.ai brand guide (Travis-authored):

> "Architectural Precision — Clean lines, deliberate spacing, structural grids. Every element is placed with the intentionality of a well-designed system. Nothing is accidental."
>
> "Ember Signature — A single, muted ember accent against vast neutral space. The restraint makes it powerful — like a single lit terminal in a darkened server room."
>
> "Technical Elegance — Monospace type, code aesthetics, and infrastructure references — but always refined, never raw. Think polished concrete, not construction site."

These three formulations are the canonical statement of Travis's visual aesthetic. The digital twin should treat them as load-bearing.
