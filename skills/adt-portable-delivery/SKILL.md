---
name: adt-portable-delivery
description: Build and verify Windows, macOS and Linux agent-team packages, Node hooks and TypeScript 7 tooling with explicit native-client compatibility evidence.
license: Apache-2.0
compatibility: Node.js 22+; pinned TypeScript 7 for maintainers only.
metadata:
  version: "1.0.0"
---

# Portable delivery

Inspect the package manifests, native adapter receipts and actual release scope.
Do not overwrite existing native settings, activate teams, or publish implicitly.

Use Node built-ins for filesystem paths, processes and environment variables.
Launch child processes with executable plus argument arrays, shell disabled.
Compile maintained .mts using the exact TypeScript 7 pin and ship .mjs so users
need only Node. Hooks cannot depend on Bash, PowerShell, Python, chmod, shell
expansion, Unix home paths or symlink privileges.

At a completed boundary:

1. Rebuild output and verify source/output drift. Record the actual compiler version.
2. Verify skill names, licenses, hashes, required bundled files and relative links.
3. Test a standalone copy in an isolated path with spaces, idempotent reinstallation,
   conflicting existing files, path traversal/symlink rejection and native-config
   preservation. Test from an unrelated working directory.
4. Run actual supported Windows/macOS/Linux jobs. Local path simulation is useful
   but cannot certify a different OS. Keep unrun cells unverified.
5. Distinguish syntax, CLI availability, definition discovery and real invocation.
   Zed instructions do not create a delegation API; MiniMax agent files need the
   selected user-data directory and supported native selection.
6. Preserve explicit user-only skills, model selection and existing credential
   configuration. Tool availability and metadata do not imply permission to read
   private sources or send data to another service.

Report the package/version, changed files, test evidence, platform/client gaps and
any recovery steps. Stop after the authorized delivery action.

Source contract: original project guidance, Apache-2.0, 2026-10-26.
