#!/bin/bash
# Stop hook: run quality gates when Claude finishes a turn with actual file changes.
# Exit 0 = allow, Exit 2 = reject with feedback (stderr → Claude).
# Fires on every Stop event — guards against no-change turns with early exit.

cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

# Check for any changes vs main — committed OR uncommitted OR untracked
DIFF=$(git diff main --stat 2>/dev/null; git diff --stat 2>/dev/null; git diff --cached --stat 2>/dev/null)
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null | head -1)

if [ -z "$DIFF" ] && [ -z "$UNTRACKED" ]; then
  exit 0
fi

ERRORS=""

# 1. Biome lint + format
echo "Running biome check..." >&2
BIOME_OUT=$(npx biome check . 2>&1)
if [ $? -ne 0 ]; then
  ERRORS="${ERRORS}\n❌ BIOME CHECK FAILED:\n${BIOME_OUT}\n\nRun: npx biome check --write . then fix remaining issues.\n"
fi

# 2. TypeScript
echo "Running tsc..." >&2
TSC_OUT=$(npx tsc --noEmit 2>&1)
if [ $? -ne 0 ]; then
  ERRORS="${ERRORS}\n❌ TYPESCRIPT CHECK FAILED:\n${TSC_OUT}\n"
fi

# 3. Tests
echo "Running tests..." >&2
TEST_OUT=$(npx vitest run 2>&1)
if [ $? -ne 0 ]; then
  ERRORS="${ERRORS}\n❌ TESTS FAILED:\n${TEST_OUT}\n"
fi

if [ -n "$ERRORS" ]; then
  echo "Quality gates failed. Fix these issues before completing:" >&2
  echo -e "$ERRORS" >&2
  exit 2
fi

# All gates passed — notify Nick
openclaw message send \
  --channel telegram \
  --account lovelace \
  --target 7775782519 \
  --message "✅ Quality gates passed (Stop hook)
• biome: clean
• tsc: clean
• vitest: all passing

Changes ready to commit + PR." 2>/dev/null || true

echo "✅ All quality gates passed." >&2
exit 0
