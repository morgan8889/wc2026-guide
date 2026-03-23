---
name: check
description: Run all quality gates. Use before committing or opening a PR.
context: fork
disable-model-invocation: true
---

Run all quality gates in order. Fix any failures before proceeding.

1. `npx biome check .` — lint and format
2. `npx tsc --noEmit` — TypeScript strict
3. `npx vitest run` — tests
4. `npm run build` — Next.js build
5. `npx prisma validate` — schema

If any fail: fix → re-run ALL from start.
