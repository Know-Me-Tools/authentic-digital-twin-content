# Shadow-Pattern Detector

Reference document for the shadow-pattern check in Mode A step 8. This file holds the expanded detection signals, false-positive watch-fors, and the escalation protocol. SKILL.md step 8 holds the compact operator checklist for use during generation.

---

## Overview

The shadow-pattern detector scans Tier 1 long-form output for structural voice failures — patterns that pass the lexical rejection filter (no buzzwords) but represent the author operating in their personality-type shadow rather than their authentic mode.

**Soft warn, not hard gate.** The detector appends an annotation block to the output and returns the content regardless. Shadow patterns are structural-semantic, not lexical — the false-positive cost of blocking on a misidentified pattern is higher than the cost of a flagged-but-proceeding soft warn.

**Tier 1 only.** Tier 2 and Tier 3 surfaces are too short for reliable structural detection. A LinkedIn post is unlikely to exhibit Analysis Fortress (which requires three or more trade-off qualifications). A voice prep note is unlikely to exhibit Puppet Master framing in a detectable form. The detector runs after the rejection filter passes (step 7) and only when the surface tier is Tier 1.

For the compact operator checklist and annotation block format used during generation, see SKILL.md Mode A step 8.

---

## Four Operator shadow patterns

These four patterns are the reference implementation for the SoulTrace Operator archetype. They are not universal across all author types — see the generic design note at the end of this document for how to adapt the detector to a different author.

### Puppet Master

**What it is structurally:** The content steers the reader toward a predetermined conclusion by presenting only the evidence and framing that supports that conclusion, without naming or genuinely engaging a counter-position.

**Detection signal:** The argument has a clear thesis, and every section builds toward it — but no named counter-position appears anywhere in the piece. The framing is "position X and then Y will inevitably follow" without acknowledging the strongest objection to X. The reader is guided rather than persuaded.

**False-positive watch-for:** A persuasive argument with a strong thesis is not Puppet Master. Puppet Master requires the *absence* of a genuinely named counter-position — not merely a strong thesis or confident tone. An argument that names and then defeats a real objection is not Puppet Master, even if the author wins the argument decisively.

---

### Transactional Tunnel Vision

**What it is structurally:** The close of the content lands exclusively on metrics, ROI, or quantifiable return — without acknowledging the relational, human, or organizational stake. The cost side of the equation is framed only in financial or efficiency terms.

**Detection signal:** The close lands only on metrics with no relational stake. Human cost, team cost, or relationship cost is unacknowledged. "The ROI case" or "the business case" is the sole close — the argument ends on a number or a percentage, not on a consequence to people.

**False-positive watch-for:** A metrics-dense section in the *middle* of a piece is not Transactional Tunnel Vision. TTV is detected at the *close* — the final paragraph or final claim. If the close, even briefly, names a human or relational stake alongside the metric, TTV does not trigger. The test is: what is the last thing the reader is left with?

---

### Analysis Fortress

**What it is structurally:** The content surfaces three or more trade-off qualifications without ever committing to a direction. Analysis continues indefinitely without landing on a stake, a decision, or a recommended path.

**Detection signal:** Three or more trade-off qualifications (e.g., "on the one hand… on the other hand…", "this approach has the advantage of… but the risk of…") appear across the piece, and no commitment sentence follows. The author retreats into analysis as a form of self-protection. The reader comes away knowing the tradeoffs but not knowing what the author recommends.

**False-positive watch-for:** Three trade-off qualifications with a commitment sentence elsewhere in the piece is not Analysis Fortress. The detector is looking for *unresolved* qualification stacking — analysis that runs but never lands. If the piece ends with a stake, a direction, or an explicit recommendation, Analysis Fortress does not trigger even if it surfaced multiple trade-offs along the way.

---

### Lone Wolf Lockdown

**What it is structurally:** GTM, sales, or relationship content recommends building new outreach systems (processes, pipelines, sequences, tools) where named champion engagement is the structurally correct move. The author reaches for scale infrastructure when the situation calls for a relationship.

**Detection signal:** The content is about reaching a market, closing a deal, or building a relationship — and the recommended path is to build or optimize an outreach *system* (sequence, cadence, funnel, process) rather than identifying and engaging a named person who can open the door. The system recommendation displaces the relationship recommendation.

**False-positive watch-for:** Recommending a new tool, process, or workflow is not Lone Wolf Lockdown unless the subject is specifically a GTM, sales, or relationship problem. LWL is domain-specific: it only triggers when the content is *about reaching people* and the recommendation *routes around people*. A technical recommendation to build a new system in a non-relationship context is not LWL.

---

## Escalation protocol

The soft-warn disposition is intentional at current maturity. The following protocol defines when escalation to hard-gate is eligible for evaluation.

### Observation threshold

Evaluate escalation eligibility after **20 or more Tier 1 outputs** where step 8 ran. Below that threshold, the sample is too small to characterize false-positive rate reliably.

### False-positive rate cap

For each pattern independently: if **more than 30% of soft-warn triggers** are judged false positives by the author (after the author reviews the flagged outputs), do not escalate that pattern. Keep it at soft-warn. The detection signal needs refinement before escalation is appropriate.

### Escalation threshold

For each pattern independently: if the false-positive rate is **≤15% on 20 or more observations**, the pattern is eligible for hard-gate evaluation.

### Per-pattern independence

Each of the four patterns evaluates independently. One pattern can be escalated to hard gate while others remain soft-warn. Do not bundle the four patterns into a single escalation decision.

### Author confirmation gate

Hard-gate escalation requires author confirmation:
1. Present the author with 3 representative triggered instances for the pattern under consideration
2. Author confirms that the detection signal is valid in each case (not a false positive)
3. Author explicitly approves escalation to hard gate

Hard-gate behavior once escalated: block output and require the author to revise the flagged structural pattern before the skill returns the content.

---

## Generic design note

The four patterns above are the reference implementation for the **SoulTrace Operator archetype**. They are derived from the Operator's documented failure modes: Puppet Master and Transactional Tunnel Vision from the Black 42% dominance pattern (action-bias without relational grounding), Analysis Fortress from Blue 25% overcorrection (mastery-seeking that stalls on completeness), Lone Wolf Lockdown from the Operator's structural independence bias (building over connecting).

**For a new author substrate:** Identify the author's primary archetype from their personality framework results. Look up that archetype's documented failure modes or shadow patterns. Adapt the detection signals to those failure modes. Do not import Travis's four patterns unchanged to a different archetype — a Connector archetype's shadow patterns are structurally different from an Operator's.

The general design principle: any twin should include shadow-pattern detection adapted to its author's documented personality failure modes. The Operator reference implementation demonstrates the mechanism; the specific patterns belong to the specific archetype.
