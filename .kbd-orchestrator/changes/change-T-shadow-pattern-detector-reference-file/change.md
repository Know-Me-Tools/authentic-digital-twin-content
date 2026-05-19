# Change T — Create references/shadow-pattern-detector.md

**Phase:** phase-5
**Status:** PENDING
**File:** `skills/authentic-digital-twin-content/references/shadow-pattern-detector.md` (new)
**Type:** documentation / new file

## Goal

Create a dedicated reference document for the shadow-pattern detector: expanded detection signals (richer than the compact SKILL.md table), an escalation protocol (the decision framework for soft-warn → hard-gate), and a generic-design note framing Travis's four patterns as the Operator archetype reference implementation.

## Tasks

- [ ] Create `references/shadow-pattern-detector.md` with four sections:

**Section 1 — Overview (~80 words)**
- What the shadow-pattern detector is
- Why soft-warn and not hard-gate (false-positive cost of blocking > cost of soft-warn on a flagged-but-proceeding output)
- Scope constraint: Tier 1 long-form only; Tier 2 and Tier 3 surfaces too short for reliable structural detection
- This file is the authoritative reference; SKILL.md step 8 holds the compact operator checklist

**Section 2 — Four Operator shadow patterns (~300 words)**
- One subsection per pattern (h3 level): Puppet Master, Transactional Tunnel Vision, Analysis Fortress, Lone Wolf Lockdown
- Per pattern: what it is structurally (one sentence), detection signal (1–2 sentences, richer than SKILL.md compact table), false-positive watch-for (one sentence — common benign case that superficially resembles the pattern)
- Puppet Master false-positive: a persuasive argument with a clear thesis is not Puppet Master; Puppet Master requires the *absence* of a genuinely named counter-position, not merely a strong thesis
- Transactional Tunnel Vision false-positive: a metrics-dense section is not TTV; TTV requires the *close* to land only on metrics with no relational stake
- Analysis Fortress false-positive: three trade-off qualifications in a single section is not AF if a commitment sentence is present elsewhere in the piece
- Lone Wolf Lockdown false-positive: recommending a new tool or process is not LWL; LWL requires recommending *outreach systems* where named champion engagement is the structurally correct move

**Section 3 — Escalation protocol (~200 words)**
- Observation threshold: evaluate after 20+ Tier 1 outputs where step 8 ran
- False-positive rate cap: >30% FPR = do not escalate that pattern (keep soft-warn)
- Escalation threshold: ≤15% FPR on 20+ observations = pattern eligible for hard-gate evaluation
- Per-pattern independence: each of the four patterns evaluates independently; one can be hard-gated while others remain soft-warn
- Author confirmation gate: hard gate requires author review of 3 representative triggered instances; author confirms detection signal is valid before escalation
- Hard-gate behavior (when escalated): block output and require the author to revise before the skill returns content

**Section 4 — Generic design note (~80 words)**
- The effortful/shadow-pattern design pattern is generalizable: any twin should consider shadow-pattern detection adapted to its author's documented personality failure modes
- Travis's four patterns are the reference implementation for the SoulTrace Operator archetype
- For a new author: identify the author's primary archetype (from their personality framework results); look up that archetype's documented failure modes or shadow patterns; adapt the detection signals accordingly
- A new author with a different archetype will have different shadow patterns — do not import Travis's four patterns unchanged

## Acceptance criteria

- File created at `references/shadow-pattern-detector.md`
- All four sections present
- Each pattern subsection has: structural definition, detection signal, false-positive watch-for
- Escalation protocol specifies all five elements: observation threshold, FPR cap, escalation threshold, per-pattern independence, author confirmation gate
- Generic design note frames Travis's patterns as Operator-archetype reference implementation, not universal patterns
