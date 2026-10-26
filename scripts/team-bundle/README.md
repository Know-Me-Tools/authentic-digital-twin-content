# Standalone team distribution

`build.mjs` snapshots the canonical team, six staged native exports, each top-level
`skills/adt-*` companion, and each `skills/vendor/*` package with a real SKILL.md
into the original skill's `tooling/` directory. Names come from frontmatter.
Licenses, provenance receipts, and the pure Node creator installation dependency
closure travel with the bundle. Generated source paths are repository-relative.

Run from the repository root after team exports and skills are complete:

```text
node scripts/team-bundle/compile.mjs
node scripts/team-bundle/build.mjs
node scripts/team-bundle/compile.mjs --check
node scripts/team-bundle/build.mjs --check
node --test tests/team-bundle/installer.test.mjs
```

Compiler dependencies are pinned by `scripts/portability/package-lock.json`.
The installer is TypeScript 7 source inside the distributable skill and committed
`.mjs` output. Its runtime uses Node 22+ built-ins and the bundled creator's safe
file commit implementation; it has no npm, shell, global skill path, or network
prerequisite. The optional MiniMax launcher does not run during installation.

Check mode compares exact bytes and SHA-256 inventory. It does not certify native
client discovery or invocation. Source-only exports retain their own receipts.
