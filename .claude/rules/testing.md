---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "**/*.test.ts"
  - "**/*.test.tsx"
---

# Testing Rules

- Write tests alongside implementation — TDD preferred
- Test framework: Vitest + React Testing Library
- Test files: `<name>.test.ts` or `<name>.test.tsx` next to source file
- Run tests: `npx vitest run`
- Every data utility and server function must have tests
