## ADDED Requirements

### Requirement: Portable specialist ownership
The package SHALL include the five requested specialist roles and complementary
architecture, ingestion, provenance, maintenance, security, evaluation, and release
roles with explicit skills, inputs, outputs, dependencies and write ownership.

#### Scenario: A client cannot spawn agents
- **WHEN** native delegation is unavailable
- **THEN** the client uses the selected role instructions sequentially and reports
  that limitation without claiming independent review in the builder context.

### Requirement: Self-contained distribution
The authoring skill SHALL carry an optional team installer and all required
companion skill files with retained third-party licenses and provenance.

#### Scenario: The standalone skill is copied
- **WHEN** its installer runs in a new destination whose path contains spaces
- **THEN** native definitions and skill discovery are installed without relying on
  the original maintainer's home directory, symlinks, or downloaded runtime code.

### Requirement: Portable hooks and honest compatibility
All repository hooks SHALL execute through Node.js .mjs entrypoints; maintained
sources SHALL use TypeScript 7. No hook SHALL require shell scripts.

#### Scenario: Protocol support is documented before implementation
- **WHEN** an MCP version or transport has not passed an actual integration test
- **THEN** its matrix status remains unverified and is not advertised as supported.

### Requirement: Scoped evidence handling
Evidence roles SHALL preserve author identity, source provenance, permission scope,
raw versus inferred distinctions, and pending remote ingestion status.

#### Scenario: A graph ingestion returns pending
- **WHEN** an EdgeQuake ingestion is admitted asynchronously
- **THEN** the collector retains the receipt and waits for indexed status before
  claiming retrieval readiness, while preserving canonical local evidence.
