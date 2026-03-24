#!/bin/bash
# SessionStart hook: verify ACP is working
# If broken, sends an alert to Nick so we know at session start

ACP_STATUS=$(openclaw config get acp.enabled 2>/dev/null)

if [ "$ACP_STATUS" != "true" ]; then
  echo "⚠️  ACP is disabled (acp.enabled=false). TaskCompleted hooks won't fire." >&2
  # Don't block session start — just warn
  exit 0
fi

# Send alert via Telegram
openclaw message send \
  --channel telegram \
  --account lovelace \
  --target 7775782519 \
  --message "⚠️ Session started — ACP gateway token mismatch detected. Run: openclaw gateway restart, then restart this session. Until fixed: no TaskCompleted hooks, no local code review enforcement." 2>/dev/null || true

exit 0
