# Communication Surface Taxonomy

Reference for `docs/standards/authentic-digital-twin-content-standard-v2.md`. Maps every communication surface to its annotation tier, register requirements, and generation mode.

---

## Tier 1 — Full manifest surfaces

| Surface | Register | Generation mode | Notes |
|---|---|---|---|
| Long-form article (blog, op-ed, publication) | Written formal / written casual | A or B | Full eyebrow + footer manifest. Minimum 500 words to justify overhead. |
| Newsletter (body) | Written formal | A or B | Full manifest unless under 500 words, in which case Tier 2 acceptable. |
| Technical report or whitepaper | Written technical | A or B | Full manifest. Code sections AI verbatim by default. |
| Research summary or lit review | Written formal | A or B | Full manifest. Citation blocks are AI verbatim or human-authored depending on who selected/framed them. |
| Proposal or pitch document | Written formal | A | Full manifest. Human-authored executive summary strongly recommended. |
| Internal memo (named authorship) | Written formal / written directional | A or B | Full manifest when the memo will be cited or filed. |
| Case study | Written formal | A or B | Full manifest. Quote blocks from subjects are not annotated under the standard (they are third-party, not the author's content). |

---

## Tier 2 — Compact inline tag surfaces

| Surface | Register | Generation mode | Tag placement |
|---|---|---|---|
| Professional email | Correspondence | A (draft) | End of message, after sign-off |
| LinkedIn post | Written social | A | Top of post, first line |
| Twitter/X post or thread | Ultra-short | A | First tweet in thread |
| Substack Note | Written social | A | Top or bottom |
| Slack message (authored, not conversational) | Written directional | A | End of message |
| Teams / Discord message (authored) | Written directional | A | End of message |
| Instagram caption | Ultra-short / written social | A | End of caption |
| Facebook post | Written social | A | End of post |
| Short-form video description (YouTube, etc.) | Written social | A | Bottom of description |
| Internal announcement (email blast, intranet) | Written directional | A | End of message |
| Slide deck presenter notes | Written directional | A | First slide speaker notes |
| Cover letter | Correspondence | A | After sign-off |
| Bio or about-page copy | Written formal | A or B | End of bio |
| SMS / WhatsApp (authored content) | Correspondence | A | End of message |

**Note on slide decks:** Tier 2 applies to the *preparation and notes* layer, not the slide text itself. The slide text is often ultra-abbreviated; Tier 3 channel-level disclosure covers the live delivery context.

---

## Tier 3 — Channel-level disclosure surfaces

| Surface | Register | Disclosure timing | Form |
|---|---|---|---|
| Voice call (phone, VoIP) | Spoken | Session start | Spoken statement: "I prepared these notes with AI assistance." |
| Podcast or recorded audio | Spoken | Episode description or intro | Text note in description; verbal disclosure in intro optional |
| Video presentation (recorded) | Spoken | Video description | Text note in description or on-screen graphic in intro |
| Live video (streaming, webinar) | Spoken | Session start | Verbal disclosure at session opening |
| Real-time chat (Slack thread, Teams chat, Discord) | Conversational | Thread opener | Pinned or first-message disclosure |
| Meeting notes / minutes | Written directional | Document header | `[Meeting notes: AI-generated from transcript, reviewed by <Author>]` |
| Action items or follow-ups | Written directional | Document header | Same header pattern as meeting notes |
| Voice memo (personal) | Spoken | N/A — personal use | No disclosure required for personal notes not shared |
| Voice memo (shared with team) | Spoken | Recording header | `[AI transcript, not reviewed]` or `[AI transcript, reviewed by <Author>]` |
| Comment or reply in a thread | Conversational | Not required | Tier 3 disclosure not required unless the comment is published as authored content (e.g., a LinkedIn comment that becomes a post). |
| Dictated content (voice-to-text) | Spoken | Context-dependent | If dictation was AI-completed: Tier 2 or Tier 1 based on final surface. If dictation is transcription only: treat as Author. |

---

## Register index

Registers are the dimensions of an author's voice that shift across surfaces. The substrate must cover the registers the author uses. v2 requires coverage of at least two registers; Tier 2 and Tier 3 surfaces work best with their specific registers captured.

| Register | Surfaces it activates | Substrate document most relevant |
|---|---|---|
| Written formal | Articles, reports, proposals, newsletters | 02, 06 |
| Written casual | Blog posts, op-eds, personal newsletters | 02, 07 |
| Written directional | Internal memos, Slack (authored), email to team | 10, 06 |
| Written social | LinkedIn, Substack Notes, Facebook, YouTube descriptions | 02, 07, 06 |
| Ultra-short | Twitter/X, Instagram captions, SMS | 02, 07 |
| Correspondence | Professional email, cover letters, LinkedIn DMs | 10, 06 |
| Spoken / conversational | Voice calls, podcasts, video talks, real-time chat | 07, 04 |
| Technical | Technical reports, code commentary, architecture docs | 08, 06 |

---

## Generation mode by surface

| Mode | When to use |
|---|---|
| **A — Generate** | Substrate is in place; user wants new content for a specific surface. The skill selects tier, register, and generates with appropriate annotation. |
| **B — Rewrite** | Existing content in wrong voice or unannotated. Classify each block, rewrite human-voice sections, apply tier-appropriate annotation. |
| **C — Bootstrap** | No substrate yet. Collect raw inputs. For full Tier 2 / Tier 3 coverage, inputs should include correspondence samples and (ideally) spoken-register samples (transcripts, notes). |

---

## OQ5 resolution — Generate vs. Bootstrap modes

Open Question 5 from the plan asked whether Generate and Bootstrap should be split into separate, more discoverable skill commands or kept as modes A and C within one skill.

**Decision: keep as modes within one skill, with surface-aware routing added to Mode A.**

Rationale: The substrate is the unit of identity. Once the substrate exists, every surface is a variation of the same operation — read the substrate, select the register, generate with the appropriate tier annotation. Splitting into separate skills would force the user to manage two entry points for what is conceptually one task (generating in their voice). The discoverability cost of one three-mode skill is lower than the coordination cost of two skills that share the same substrate.

**v2 change to Mode A:** Mode A now selects the annotation tier based on the surface the user specifies before generating. If the user does not specify a surface, the skill asks. The surface determines the register to load from the substrate and the annotation format to emit.

---

## Edge cases

**Email with a structured attachment:** The email body is Tier 2. The attachment (a report, proposal, or slide deck) follows its own tier based on the attachment's surface type. Two separate disclosures — one for the email, one for the attachment.

**Thread that becomes a post:** If a chat thread or email exchange is later edited into a LinkedIn post, the post's authorship is re-annotated based on the post's final form, not the thread's authorship history.

**Quoted social content:** If an author quotes an AI-generated post they find elsewhere, that quote does not trigger a Tier 2 disclosure — they are not claiming authorship. The surrounding commentary follows the author's tier normally.

**Ghostwriting:** If the author is producing content on behalf of another named person who has authorized a substrate, the disclosure follows the same tier rules, with the named person as the author in the tag. The skill does not produce content for unnamed or unauthorized subjects.

**AI-generated images or media captions:** The standard covers textual content. Image or media provenance is out of scope. If the author writes a caption for an AI-generated image, the caption's authorship follows the standard; the image provenance is not reported by this standard.
