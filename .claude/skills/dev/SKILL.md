---
name: dev
description: Development workflow for implementing a feature.
context: fork
disable-model-invocation: true
---

# Development Workflow

1. **Understand** — read requirements in $ARGUMENTS
2. **Plan** — list files to create/modify, test cases needed
3. **TDD** — write tests first or alongside, run `npx vitest run` frequently
4. **Implement** — build the feature
5. **Verify** — start dev server `npm run dev`, check affected routes
6. **Quality** — run `/check`
7. **Commit** — `npx biome check --write .` then conventional commit
