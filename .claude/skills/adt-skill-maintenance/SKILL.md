---
name: adt-skill-maintenance
description: Maintain the portable digital-twin content skill, templates, provenance rules and bundled companion skills without changing historical authorship or upstream licenses.
license: Apache-2.0
metadata:
  version: "1.0.0"
---

# Skill maintenance

Read the task and the authoring skill's current SKILL.md and declared standard.
Identify whether the change affects Generate, Rewrite, Bootstrap, evidence
classification, annotation tiers, distribution, or a developer companion.

- Keep file references package-relative so a standalone skill copy works. Preserve
  a clear entry point and load detailed references only for the relevant operation.
- Treat human-authored, AI-drafted/human-edited and AI-verbatim as evidence-based
  categories. Matching someone's voice does not prove their contribution.
- Keep new content on the current standard while preserving older artifacts at
  their declared version. Do not conflate standard, schema and plugin versions.
- Maintain the explicit index + STATE + eleven numbered document inventory.
  Synthetic examples must work without adopting Travis's identity or reserved data.
- Check all changed local links and frontmatter, affected worked examples and
  template references. A template check is not a human voice acceptance test.
- Third-party skills retain their license, source revision/hash and user-only
  restrictions. Do not add an external skill merely because it is available.
- Generated tooling bundles and native prompts are rebuilt from the owning
  manifest/source; coordinate with release-engineer before changing shared output.
- Keep scripts portable: TypeScript 7 .mts sources and shipped Node.js .mjs;
  no mandatory shell, Python, symlinks or machine-specific paths.

Report compatibility implications and exact verification. Do not publish or send
external communications without the user's task authorization.

Source contract: original project guidance, Apache-2.0, 2026-10-26.
