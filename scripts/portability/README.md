# Portable hook runtime

Sources in `src/*.mts` compile with pinned TypeScript 7.0.2 to committed
`.claude/hooks/*.mjs`. Runtime requires Node.js 22+ and only Node built-ins;
no Bash, PowerShell script, Python, jq, chmod, or shell utilities are required.

From the repository root:

```text
npm ci --prefix scripts/portability --ignore-scripts
node scripts/portability/build.mjs
node scripts/portability/build.mjs --check
node --test tests/portability/hooks.test.mjs
```

The build and check scripts invoke the compiler with argument arrays and
`shell: false`. Paths with spaces are supported. The checked-in runtime runs
without installing compiler dependencies.

Claude settings use `command: "node"` with `args: ["${CLAUDE_PROJECT_DIR}/..."]`.
This is Claude Code's current direct-exec hook form, documented in its
[official changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md).
No shell quoting belongs inside an argv element. Older clients lacking this
feature must be upgraded or supplied a separately validated adapter; silently
dropping `args` would leave the hook unexecuted. Other clients do not automatically
execute Claude's hook configuration.

## Behavior and limits

- `tier-guard.mjs` reads command JSON from stdin and gates known final-artifact
  commands using the current runtime waypoint's canonical `lifecycle: completed`,
  `PROMETHEUS_TIER3=1` in the hook environment, or `.kbd-orchestrator/tier3.allow`.
  Automatic authorization requires schemaVersion `5`, generatedBy `kbd-runtime`
  and matching nonnegative integer `revision`/`sourceRevision`. Legacy `status`
  and `lifecycle_stage` fields do not establish a boundary. The command matcher is workflow guidance,
  not a security parser. Malformed input is explicitly unverified and fails open.
- `single-writer.mjs` maintains a four-hour advisory record. It runs after an edit,
  cannot undo that edit, and is not a cross-client build mutex.
- `sycophancy-gate.mjs` only acts on `.prometheus/.review-pending`. It finds a
  project `scripts/check-findings-sycophancy.mjs` or hook-local equivalent, or an
  explicit `PROMETHEUS_SYCOPHANCY_CHECKER` `.mjs` path. The checker runs through
  Node without a shell. Success removes the marker; failure retains it and blocks.
  A missing checker warns and retains the marker as unverified evidence. Recursive
  Stop events do not repeatedly block.
- `reanchor.mjs` prints bounded current position, lifecycle/stage fields and three
  recent gotcha bullets, not whole files. Unmigrated or revision-mismatched
  waypoints are explicitly unavailable. The runtime event journal is authority;
  resolve its storage through `prometheus kbd status --json` and project identity,
  since the runtime may store it outside the checkout.
  self-consistent projection revisions do not prove freshness against that journal.
  Confirm canonical KBD status before resuming work. Neither hook writes KBD state.

Tests execute real hook subprocesses against temporary files, including paths
with spaces. They do not certify actual Windows execution or every client's hook
loader. Run the same Node tests on Windows before claiming Windows runtime parity.
