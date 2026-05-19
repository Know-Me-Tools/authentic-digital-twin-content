# Assessment — phase-4

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Implement two Travis-independent skill behavior features: effortful-heuristic enforcement in Mode A, and shadow-pattern detection. Resolve any open distribution watch items that have become actionable.
**Date:** 2026-05-19
**Phase status:** ASSESS complete — no artifacts or code generated

---

## 0. Method note

This assessment reads from:
- Phase 3 reflection (`phases/phase-3-voice-validation/reflection.md`) — recommended scope for phase 4
- `STATE.md` OQs 5–7 — the open design questions carried since Phase 1
- `SKILL.md` — current Mode A behavior (the target of the effortful-heuristic feature)
- `docs/digital-twin-travis/11-decision-heuristics.md` — the full 16-heuristic ledger with natural-vs-effortful classification
- `docs/digital-twin-travis/07-humor-and-emphasis.md` — shadow-pattern signals (SoulTrace)
- `docs/DISTRIBUTION-STATUS.md` — distribution channel statuses
- SKILL.md character count: 928/1024 (96 chars headroom on description field)

---

## 1. Current state

### 1.1 Mode A generation behavior

Mode A (Generate) runs the following steps:

1. Identify the surface
2. Read the substrate (all 11 files)
3. Check Gate 3 (surface-register match)
4. Classify content type (Human-authored / AI-drafted-human-edited / AI verbatim)
5. **Generate content** using the voice substrate
6. Apply annotations per tier
7. Run the rejection check before returning

**Effortful heuristics are not explicitly enforced at any step.** The substrate documents describe what the effortful heuristics are (particularly `11-decision-heuristics.md`), and the skill reads the substrate before generating. But reading the substrate is not the same as enforcing the effortful heuristics. The current mode A relies on the model to implicitly apply heuristics it read — which is unreliable for counter-default behaviors.

### 1.2 Effortful-heuristic inventory (from doc 11)

The natural-vs-effortful classification from the CliftonStrengths grounding table identifies five heuristics as **effortful** (counter-default):

| # | Heuristic | Why effortful | Missed-by-twin risk |
|---|---|---|---|
| 4 | Phase Discipline | Discipline #26 is middle-ranked; phase boundary is learned behavior, not natural rigidity | Twin generates plan-level content during assess-level outputs |
| 7 | Don't Pivot Silently | Activator+Achiever bias → keep moving; silence is faster than surfacing | Twin substitutes approaches without naming the failure |
| 9 | Champion Over Cold Outreach | Natural Operator default is to optimize systems; champion-strategy is deliberate counter-move | Twin recommends cold-outreach tactics Travis would not use |
| 11 | Cedar Governance Is Non-Negotiable | Belief #12 is not top 5; consistency is architectural discipline, not a natural value-orientation | Twin omits governance framing in regulated vertical content |
| 16 | Acknowledge Before Analyzing | Empathy #34 (absolute bottom) | Twin jumps to analysis in conflict/repair contexts |

Two heuristics are classified as "partially effortful":
- **4 (Phase Discipline)** — a learned discipline, not default trait
- **7 (Don't Pivot Silently)** — exists because Activator+Achiever bias drives keeping-moving

Two "maximally natural" heuristics by contrast: **10 (Forward Projection)** — Futuristic #1; **16 Acknowledge Before Analyzing** is "maximally effortful" — Empathy #34.

### 1.3 Shadow patterns (from OQ6, STATE.md, and SoulTrace substrate)

The SoulTrace Operator archetype surfaces four failure modes in `11-decision-heuristics.md` and `07-humor-and-emphasis.md`:

| Shadow | Description | Detection signal |
|---|---|---|
| Puppet Master | Using strategic analysis to control outcomes rather than open discussion | Manipulation-framed strategic advice; "position X and then Y will follow" framing |
| Transactional Tunnel Vision | Reducing all interactions to measurable outcomes; no relational dimension | All-metrics close; no acknowledgment of human cost or relational stake |
| Analysis Fortress | Too-much-analysis-not-enough-commitment | Surfacing more considerations without a resolution; endless trade-off stacking without commitment |
| Lone Wolf Lockdown | Defaulting to build-own-systems rather than champion-strategy | System-design recommendations in contexts calling for relationship investment |

Currently SKILL.md does not check generated content for shadow-pattern matches before returning. The rejection check (step 7 of Mode A) is a lexical filter — it catches buzzwords and throat-clearing but not deeper voice-pattern failures.

### 1.4 Distribution status

From `docs/DISTRIBUTION-STATUS.md` (checked 2026-05-19):

| Channel | Status |
|---|---|
| GitHub release (v2.0.0) | Live |
| agentskills.io showcase | Not open — skill submissions not accepted per CONTRIBUTING.md |
| Anthropic official marketplace | Not submitted — maintainer action, prerequisites met |
| Discord announcement (agentskills) | Not done — can be done immediately, no PR required |
| npm | Not published — low priority, not needed for current skill shape |

No distribution channel has become newly actionable since the phase-3 check. The only low-effort pending item is the Discord announcement — that is a one-paragraph message, not a KBD change.

---

## 2. Gap analysis

### 2.1 Effortful-heuristic enforcement (HIGH priority for skill quality)

**Current behavior:** Mode A step 5 generates content after reading the substrate. The substrate includes `11-decision-heuristics.md` with the natural-vs-effortful classification. But the generation step does not contain an explicit prompt to apply the effortful heuristics before output.

**The gap:** Travis-the-person sometimes skips the effortful heuristics because they are counter-default. A digital twin that relies on implicit substrate reading will replicate this — exactly the wrong behavior. The twin should be *more* reliable than the person on the effortful heuristics, not equally unreliable.

**What enforcement looks like operationally:**

After step 4 (classify content) and before step 5 (generate), Mode A should check which effortful heuristics are relevant to the current surface and task, and explicitly apply them during generation. The five effortful heuristics have different surface-applicability:

| Heuristic | When it applies in Mode A |
|---|---|
| 4 — Phase Discipline | Always: never let a generate-mode task produce assessment/plan-level output |
| 7 — Don't Pivot Silently | When a Gate 3 warning fired or a substrate gap was found: surface the gap, don't paper over it |
| 9 — Champion Over Cold Outreach | When the content is GTM/sales/relationship content: recommend champion paths, not system-optimization |
| 11 — Cedar Governance | When the surface is in a regulated domain (healthcare, banking, policy): include governance framing |
| 16 — Acknowledge Before Analyzing | When the content is in a conflict/repair/feedback context: open with acknowledgment before analysis |

This is a **SKILL.md Mode A behavior change** — adding a new step between step 4 (classify) and step 5 (generate): "Identify applicable effortful heuristics; apply them explicitly during generation."

**Effort:** Low-to-medium. SKILL.md description headroom is 96 chars — the change is to the Mode A procedure, not the description. The procedure body has no character limit.

**Risk:** Low. This is additive behavior — it adds an explicit check before a step that already happens. The risk is false positives (applying effortful heuristics to content where they don't apply). The surface-applicability table above mitigates this by scoping each heuristic.

### 2.2 Shadow-pattern detector (MEDIUM priority for skill quality)

**Current behavior:** The rejection check (step 7) is lexical. It catches buzzwords listed in the rejection-filter patterns. It does not check for deeper voice-pattern failures corresponding to the four SoulTrace shadow patterns.

**The gap:** A generated piece can pass the lexical rejection check and still exhibit a shadow pattern — e.g., a technically proficient piece that ends on a pure-metrics close with no human-cost acknowledgment (Transactional Tunnel Vision) or a strategic recommendation that recommends building a system when the context calls for a champion conversation (Lone Wolf Lockdown).

**What detection looks like operationally:**

An additional check after the rejection filter (step 7 → step 8) that scans the generated content for shadow-pattern signals:

| Shadow | Detection signals |
|---|---|
| Puppet Master | Framing that guides the reader to a predetermined conclusion without offering genuine alternatives; "position X and then Y will follow" language |
| Transactional Tunnel Vision | Close that lands only on metrics with no relational stake; no acknowledgment of human cost; "the ROI case" as the only close |
| Analysis Fortress | Three or more "on the other hand" / trade-off paragraphs with no commitment sentence; analysis that surfaces indefinitely without landing |
| Lone Wolf Lockdown | GTM content that recommends building new outreach systems rather than leveraging existing relationships; system-design framing in relationship contexts |

**Design question:** Should shadow detection be a hard gate (blocks output and requires revision) or a soft warn (flags the pattern, proceeds)? The rejection filter is a hard gate on lexical patterns. Shadow patterns are structural and harder to binary-classify — soft warn is the correct first implementation. A later phase can escalate to hard gate if the false-positive rate is low.

**Effort:** Medium. Requires extending SKILL.md Mode A with a new post-generation step (step 8 — shadow-pattern check) and documenting the four detection signals clearly enough for the model to apply them reliably.

**Risk:** Medium. Shadow-pattern detection is structural-semantic, not lexical. A poorly specified check can produce false positives (flagging valid strong writing as shadow-mode) or miss true positives (missing a well-disguised Analysis Fortress). The check should be soft-warn, not hard gate, to bound the false-positive cost.

### 2.3 SKILL.md description update (LOW priority)

Current description (928 chars, 96 chars headroom) does not mention the effortful-heuristic enforcement or shadow-pattern detection features. After implementing those features, a brief description update may be useful — but not at the cost of approaching the 1024-char limit.

Assessment: defer the description update to after the behavior changes are implemented and validated. If the changes are clear from the Mode A procedure body, no description update is needed.

### 2.4 agentskills.io Discord announcement (OUT OF KBD SCOPE)

The Discord announcement (agentskills Discord, announcing v2.0.0) is one paragraph and requires no code change. It is a one-time maintainer action. Not a KBD change — it belongs in a maintenance action, not a phase plan.

### 2.5 Surreal-memory ingestion (CARRY-FORWARD, low priority)

STATE.md lists entities and relations to add when the surreal-memory MCP server ingests the CliftonStrengths and SoulTrace data. This is an operational concern, not a skill-content change. Carried forward unchanged.

---

## 3. Prioritized gap summary

| # | Gap | Type | Severity | Effort | Blocker |
|---|---|---|---|---|---|
| 1 | Effortful-heuristic enforcement in Mode A | Behavior | High | Low-Medium | None — fully Travis-independent |
| 2 | Shadow-pattern detector (soft warn) in Mode A | Behavior | Medium | Medium | None — fully Travis-independent |
| 3 | SKILL.md description update (if needed post-changes) | Documentation | Low | Low | Implement #1 and #2 first |
| 4 | Discord announcement (v2.0.0) | Distribution | Low | Trivial | Maintainer action; not a KBD change |

---

## 4. Design questions for the Plan phase

**OQ1 — Effortful heuristic check placement:** Should the effortful-heuristic check be a new numbered step in Mode A (between step 4 and step 5), or integrated into the phrasing of step 5 itself? A numbered step is more visible and harder to skip; integrated phrasing is less disruptive to the existing structure.

**OQ2 — Shadow-pattern check output format:** When a shadow pattern is detected, what should the skill output? Options:
- (a) Prefix the output with a warning block: `[Shadow pattern detected: Analysis Fortress — see annotation]`
- (b) Append an annotation at the end: `## Shadow-pattern check / ⚠ Analysis Fortress: this piece surfaces 4 trade-offs without a commitment sentence — consider adding a closing stake statement`
- (c) Inline the flag at the affected passage

Option (b) is consistent with the annotation-block pattern already in use in worked examples. Option (a) is more visible. Option (c) is most precise but hardest to implement reliably.

**OQ3 — Shadow-pattern check scope:** Should the shadow-pattern check apply to all content tiers and surfaces, or only to Tier 1 long-form where the structural patterns are most detectable? Tier 2 (compact social posts) and Tier 3 (voice prep bullets) may be too short for reliable shadow-pattern detection.

**OQ4 — Natural heuristics — explicit or implicit?** The 11 natural heuristics (1, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15) should apply automatically when the substrate is read. The assessment recommends NOT explicitly enforcing these — the reading of doc 11 substrate should be sufficient. Confirm this assumption in the plan.

---

## 5. What this phase does NOT include

- Track B substrate hardening (deferred to phase-3b — requires Travis input)
- Travis review of Tier 2/3 worked examples (deferred to phase-3b)
- Anthropic official marketplace submission (maintainer-gated)
- npm publication (low priority, no operational need)
- Surreal-memory ingestion (operational, not a skill-content change)
- Architectural refactoring of SKILL.md (no changes to the structure, only additive behavior steps)

---

## 6. Recommended change structure for Plan phase

Two behavior changes, both independent of Travis input:

**Change L — Effortful-heuristic enforcement in Mode A**
- Add a new step to Mode A between classify (step 4) and generate (step 5)
- Step: "Identify which of the five effortful heuristics (4, 7, 9, 11, 16) apply to this surface and task. Apply them explicitly during generation — do not rely on implicit substrate reading."
- Include the surface-applicability table per heuristic
- Document in SKILL.md Mode A procedure

**Change M — Shadow-pattern detector (soft warn)**
- Add a new step after the rejection check (step 7 → step 8)
- Step: "Check generated content for the four Operator shadow patterns. If any pattern is detected, append a shadow-pattern annotation block (format: same as rejection-flag). Output proceeds — this is a soft warn, not a hard gate."
- Document the four detection signals in SKILL.md Mode A procedure
- Consider whether a companion reference doc in `references/` would make the detection signals more maintainable than inline in SKILL.md

Both changes are additive — no existing steps removed or reordered.
