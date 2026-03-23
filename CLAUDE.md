# World Cup 2026 Guide

@README.md for project overview.
@package.json for scripts and dependencies.

## Stack

- Next.js 15 (App Router) · TypeScript strict · Prisma 7 + SQLite · Tailwind v4 · Biome v2

## Commands

```bash
npm run build        # Build
npx tsc --noEmit     # Type check
npx biome check .    # Lint + format
npx vitest run       # Tests
npx prisma validate  # Schema
npx prisma migrate dev  # Run migrations
```

## Structure

```
src/app/             → Pages (App Router)
src/components/ui/   → Shared UI primitives
src/components/<feature>/ → Feature components
src/lib/prisma.ts    → Prisma client singleton (@prisma/adapter-better-sqlite3)
src/lib/utils.ts     → cn() utility
src/lib/data/        → Data access functions
prisma/schema.prisma → DB schema (Team, Player, Venue, Match)
prisma/seed.ts       → Seed data (World Cup 2026 teams, venues, schedule)
```

## Key Rules

- Server Components by default
- DB pages: `export const dynamic = "force-dynamic"` as first line
- Import Prisma from `@/lib/prisma` only
- `@/` path alias for `src/`
- Conventional commits
- Biome only — NO ESLint, NO Prettier
- No `any` types
- Write tests alongside implementation (Vitest)

## Banned

❌ ESLint / Prettier · ❌ `import *` · ❌ inline styles · ❌ `any` type · ❌ direct PrismaClient instantiation
