# Surreal-Memory Graph Schema

The schema for ingesting an author's substrate into the surreal-memory MCP server. Persistence is recommended but not required — the skill operates correctly with filesystem-only substrate. When the surreal-memory server is available, ingestion unlocks graph queries that pure filesystem substrate cannot answer ("which patterns reinforce each other?", "which heuristics are natural and which are effortful?", "which vocabulary signatures are register-conditional?").

---

## Why a graph

The substrate documents reference each other heavily:

- Patterns in `04-thought-patterns.md` reinforce or correct patterns in `01-personality-profile.md`
- Vocabulary in `05` is register-conditional on patterns in `06`
- Heuristics in `11` are CliftonStrengths-anchored to specific themes in `01`
- Aesthetic preferences in `09` connect to brand systems referenced in `08`

A flat-file substrate represents these references textually. A graph represents them queryably. For generation-time retrieval — "what does the author's voice do when intensity is needed?" — a graph traversal is faster and more accurate than reading every file.

The flat-file substrate is canonical. The graph is a projection of it for queryable retrieval. If the graph and the files disagree, the files win and the graph is re-ingested.

---

## Entity types

| Entity type | Description | Required attributes |
|---|---|---|
| `Person` | The author being modeled | `name`, `aliases[]`, `bio` |
| `PersonalityFramework` | An assessment framework | `name`, `methodology_summary` |
| `PersonalityResult` | A specific result for a person under a framework | `framework`, `result_label`, `assessment_date`, `summary` |
| `PersonalityTheme` | A named theme within a framework (e.g., a CliftonStrengths theme) | `framework`, `name`, `domain` |
| `ColorDimension` | A dimension in color-distribution frameworks like SoulTrace | `framework`, `name`, `percentage` |
| `ShadowPattern` | A failure mode identified by an assessment | `framework`, `name`, `description`, `reset_practice` |
| `WritingSample` | A raw text artifact | `role` (`prompt`/`correction`/`published`), `text`, `register`, `date` |
| `Signature` | A stylistic pattern (lexical, rhetorical, etc.) | `kind`, `description`, `register_scope[]` |
| `CognitivePattern` | A reasoning move | `name`, `description`, `signature_phrases[]` |
| `RhetoricalSignature` | A composition pattern at sentence / paragraph / section level | `level`, `name`, `description` |
| `LexicalProfile` | A word- or phrase-level signature | `kind`, `lemma`, `frequency_band`, `register_scope[]` |
| `RejectionFilter` | A word, phrase, or pattern the author rejects | `kind`, `value`, `reason` |
| `DomainAnchor` | A topic the author is fluent in | `name`, `vocabulary_field[]` |
| `DecisionHeuristic` | A judgment rule the author applies | `number`, `name`, `decision_pattern`, `nature` (`natural`/`effortful`) |
| `Mantra` | A self-statement the author has affirmed | `text`, `function` |
| `AestheticPreference` | A visual or structural taste signal | `kind`, `direction` (`approved`/`rejected`), `description` |
| `CommunicationScript` | A direct or softer-register communication template | `scenario`, `register`, `template` |
| `ContentBlock` | A block from a published article (for the provenance manifest) | `article_id`, `section`, `category`, `model`, `tool` |
| `AuthorshipCategory` | One of the three categories under v1 | `name`, `definition` |

---

## Relation types

| Relation | From → To | Semantics |
|---|---|---|
| `TESTED_AS` | `Person` → `PersonalityResult` | Person took an assessment and got this result |
| `BELONGS_TO_FRAMEWORK` | `PersonalityResult`, `PersonalityTheme`, `ColorDimension`, `ShadowPattern` → `PersonalityFramework` | Categorical membership |
| `RANKED_AS` | `Person` → `PersonalityTheme` | With rank attribute (e.g., rank=1 for top theme) |
| `LEADS_DOMAIN` | `Person` → `Domain` | Person's profile-dominant domain |
| `BELONGS_TO_DOMAIN` | `PersonalityTheme` → `Domain` | A theme's framework-assigned domain |
| `EXPRESSED_BY` | `PersonalityResult` / `ColorDimension` / `PersonalityTheme` → `Signature` / `CognitivePattern` / `RhetoricalSignature` / `LexicalProfile` | Personality maps to observable substrate |
| `AVOIDED_BY` | `RejectionFilter` → `Person` | Person rejects this pattern |
| `APPROVED_BY` | `AestheticPreference` → `Person` | Person prefers this aesthetic |
| `AUTHORED` | `Person` → `WritingSample` | Person wrote the sample |
| `CORRECTED` | `Person` → `WritingSample` | Person edited AI output (sample's role = `correction`) |
| `EXEMPLIFIES` | `WritingSample` → `Signature` / `CognitivePattern` / `RhetoricalSignature` / `LexicalProfile` | Sample exhibits the pattern |
| `CONTRADICTS` | `Signature` → `Signature` | Patterns that conflict (e.g., approved vs. rejected) |
| `REINFORCES` | `Signature` → `Signature` | Patterns that compound |
| `GROUNDED_IN` | `DecisionHeuristic` → `PersonalityTheme` | Heuristic's CliftonStrengths anchor |
| `CORRECTS_GAP_IN` | `DecisionHeuristic` → `PersonalityTheme` | Heuristic exists because the theme is structurally low |
| `EVOKED_BY` | `IntensifierPattern` → `ColorDimension` | Intensifier surfaces a specific color dimension |
| `RECOMMENDS_RESET` | `ShadowPattern` → `Practice` | The reset behavior for a shadow |
| `CARRIES_PROVENANCE` | `ContentBlock` → `AuthorshipCategory` | The v1 classification of a published block |
| `AUTHORED_USING` | `ContentBlock` → `Tool` / `Model` | What produced the block |

---

## Ingestion order

Entities and relations are created in this order to satisfy referential integrity:

1. `Person` (the author)
2. `PersonalityFramework` entities (one per framework used)
3. `PersonalityResult` entities (one per framework the author took)
4. `PersonalityTheme`, `ColorDimension`, `ShadowPattern` entities (framework-specific)
5. `WritingSample` entities (prompts first, then corrections, then published)
6. `Signature`, `CognitivePattern`, `RhetoricalSignature`, `LexicalProfile`, `RejectionFilter`, `DomainAnchor` entities
7. `DecisionHeuristic`, `Mantra`, `AestheticPreference`, `CommunicationScript` entities
8. `AuthorshipCategory` entities (the three v1 categories — one-time setup)
9. Relations:
   - `TESTED_AS`, `RANKED_AS`, `BELONGS_TO_DOMAIN`, `LEADS_DOMAIN`
   - `EXPRESSED_BY`, `AVOIDED_BY`, `APPROVED_BY`
   - `AUTHORED`, `CORRECTED`, `EXEMPLIFIES`
   - `GROUNDED_IN`, `CORRECTS_GAP_IN`, `EVOKED_BY`
   - `CONTRADICTS`, `REINFORCES`

`ContentBlock` and `CARRIES_PROVENANCE` relations are added per published article — they accumulate over time as the author publishes more content under the standard.

---

## Example ingestion: Travis James

A subset of the relations the Travis James substrate produces:

```
Travis James -[TESTED_AS]-> ENTP (MBTI)
Travis James -[TESTED_AS]-> 8w7 (Enneagram)
Travis James -[TESTED_AS]-> Operator (SoulTrace)
Travis James -[RANKED_AS {rank: 1}]-> Futuristic (CliftonStrengths)
Travis James -[RANKED_AS {rank: 34}]-> Empathy (CliftonStrengths)
Travis James -[LEADS_DOMAIN]-> Strategic Thinking
Futuristic -[BELONGS_TO_DOMAIN]-> Strategic Thinking
Empathy -[BELONGS_TO_DOMAIN]-> Relationship Building
Operator -[EXPRESSED_BY]-> Asymmetric Leverage Hunting (CognitivePattern)
Operator -[EXPRESSED_BY]-> Reframe Before Solving (CognitivePattern)
DecisionHeuristic#10 -[GROUNDED_IN]-> Futuristic
DecisionHeuristic#16 -[CORRECTS_GAP_IN]-> Empathy
"leverage" (as verb) -[AVOIDED_BY]-> Travis James
"revolutionary" -[AVOIDED_BY]-> Travis James
Hard Stop Sentence -[REINFORCES]-> Compound Buildout
Sample_02 -[EXEMPLIFIES]-> Lowercase Casual Opener
Sample_02 -[EXEMPLIFIES]-> Run-on Chain With "and"
```

---

## Generation-time queries

Once ingested, content generation can issue targeted queries against the graph rather than reading every substrate file:

| Query | Purpose |
|---|---|
| `MATCH (p:Person)-[:RANKED_AS]->(t:PersonalityTheme) WHERE p.name = "Travis James" ORDER BY rank LIMIT 10` | Top themes for grounding |
| `MATCH (r:RejectionFilter)-[:AVOIDED_BY]->(p:Person) WHERE p.name = "Travis James"` | Full rejection filter for output validation |
| `MATCH (h:DecisionHeuristic) WHERE h.nature = "effortful"` | Effortful heuristics that need explicit attention |
| `MATCH (s:Signature)-[:REINFORCES]->(s2:Signature) WHERE s.register_scope CONTAINS "stakeholder-facing"` | Reinforcing signatures within a register |
| `MATCH (b:ContentBlock {category: "AI verbatim"})-[:AUTHORED_USING]->(m:Model)` | Audit historical AI-verbatim usage by model |

The graph projection is denormalized for read speed. Updates are full re-ingests from the canonical filesystem substrate.

---

## Schema versioning

The graph schema is versioned alongside the standard. v1 of the standard pairs with v1 of the schema. Schema changes that add entity types or relations are additive in minor versions (v1.1, v1.2). Schema changes that rename or remove entity types or relations are major-version changes (v2.0) and require a full re-ingestion.

---

## What the schema does not capture

- **Emotional tone of individual conversations.** The signatures aggregate across samples; individual conversation-level mood is lost in aggregation.
- **Co-authorship.** When an article is genuinely co-authored by two humans, the v1 schema treats each authorship row as one-author. Co-authorship is a v2 candidate.
- **Time-evolving voice.** Voice drifts over months and years. The schema captures a snapshot; re-ingestion is the mechanism for tracking drift.
- **Cross-author influence.** When an author's voice is shaped by named influences, those influences are documented in `08-domain-anchors.md` as text but are not modeled as graph entities under v1.

These gaps are acknowledged. The schema is a working tool, not a complete theory of authorial voice.
