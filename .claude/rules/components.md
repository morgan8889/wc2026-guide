---
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---

# Component Rules

- Server Components by default — only add `"use client"` when using hooks, event handlers, or browser APIs
- UI primitives in `src/components/ui/` — feature components in `src/components/<feature>/`
- Use `cn()` from `@/lib/utils` for conditional class names
- All pages querying DB: `export const dynamic = "force-dynamic"` as first line
- Use Tailwind classes only — no inline styles
- Responsive: every page must work on mobile
- Use semantic HTML and ARIA attributes for accessibility
