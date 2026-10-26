# Project constraints

Derived from AGENTS.md, CLAUDE.md, versions.toml and the implemented stack during
kbd-init using Prometheus Skill Pack 1.13.1. Current instructions override generic
examples. The runtime journal owns workflow state; generated projections are read-only.

## Blocking rules

```yaml
constraints:
  - id: canonical-kbd-state
    severity: blocking
    description: Use typed prometheus kbd commands for all workflow mutations. No legacy/shadow state writers or manual edits of generated projections.
  - id: portable-runtime
    severity: blocking
    description: Maintained runtime uses TypeScript 7 sources and shipped Node.js 22+ .mjs entrypoints. No shell/Python hooks, symlink privileges or machine-specific runtime paths. Small build launchers/tests may be .mjs.
  - id: hook-source-output-consistency
    severity: blocking
    command: 'node scripts/portability/build.mjs --check'
  - id: installer-source-output-consistency
    severity: blocking
    command: 'node scripts/team-bundle/compile.mjs --check'
  - id: distributable-integrity
    severity: blocking
    command: 'node scripts/team-bundle/build.mjs --check'
  - id: authorized-author-evidence
    severity: blocking
    description: Preserve attribution, raw/derived distinctions and source receipts. Private author inputs stay outside the distributable skill. Human acceptance cannot be supplied by an agent.
  - id: preserve-authored-history
    severity: blocking
    description: Preserve prior phase reports, outstanding human-review blockers, plugin manifests, existing native settings and authored OpenSpec specs/changes. Runtime-owned projections may be replaced only through supported migration.
  - id: source-license-exception
    severity: blocking
    description: Preserve Apache-2.0 licensing and the all-rights-reserved docs/digital-twin-travis exception, plus vendor licenses/provenance.
  - id: actual-capabilities-only
    severity: blocking
    description: Use current documented APIs and actual schemas. Do not claim Rust services, MCP compatibility, client invocation or Windows execution without evidence.
  - id: phase-boundary-integration
    severity: blocking
    command: 'node --test tests/portability/hooks.test.mjs tests/portability/line-endings.test.mjs tests/team-bundle/installer.test.mjs'
```

## Warnings and command policy

```yaml
constraints:
  - id: whitespace
    severity: warning
    command: 'git diff --check'
  - id: independent-final-review
    severity: warning
    description: At the completed implementation boundary, use an independent reviewer and report observed limitations.
```

There is no Cargo workspace, dev server, mandatory external build mount or Cargo
environment policy in the implemented project. Do not invent Cargo commands or
create target directories during initialization. Future Rust work must discover
its real toolchain, storage policy and compile commands before configuring gates.
Node compiler dependencies are pinned under scripts/portability/package-lock.json.
No workflow automatically commits, pushes, publishes, sends messages or collects
private sources. Required checks run at a coherent phase boundary.

The repository owns .kbd-orchestrator, .prometheus and native integration paths;
their hidden names do not make them disposable. Historical reports remain evidence,
not alternative state authorities. Native KBD is a supported change backend and
does not mean legacy state mode. OpenSpec commands use the installed orchestrator's
shared/openspec/cli.mjs managed runner after a successful freshness preflight.
