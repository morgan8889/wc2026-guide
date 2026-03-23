#!/bin/bash
# TaskCompleted hook: run code-review before allowing task completion
# Exit 0 = allow completion, Exit 2 = reject with feedback (stderr → Claude)

cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

# Get the diff against main
DIFF=$(git diff main --stat 2>/dev/null)
if [ -z "$DIFF" ]; then
  # No changes from main — nothing to review
  exit 0
fi

# Run a lightweight review via claude --print
REVIEW=$(claude -p --bare "Review the git diff of this branch against main. Run: git diff main

Focus on:
- Bugs and correctness issues
- Security problems (hardcoded secrets, missing auth, injection)
- TypeScript type safety issues
- Missing error handling

If you find CRITICAL or HIGH severity issues, output them as a numbered list starting with 'ISSUES FOUND:'.
If everything looks acceptable, output exactly 'LGTM'.

Be concise — only flag real problems, not style preferences." 2>/dev/null)

if echo "$REVIEW" | grep -q "ISSUES FOUND:"; then
  echo "Code review found issues that must be fixed before completion:" >&2
  echo "" >&2
  echo "$REVIEW" >&2
  exit 2
fi

exit 0
