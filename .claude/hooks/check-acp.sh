#!/bin/bash
# SessionStart hook: verify ACP is working by checking acpx binary
# Only alert if ACP is enabled but broken.
# Exit 0 always — never block session start.

ACP_ENABLED=$(openclaw config get acp.enabled 2>/dev/null)

if [ "$ACP_ENABLED" != "true" ]; then
  # ACP disabled by config — not an error, just skip
  exit 0
fi

# Check if acpx binary is available (plugin-local path first, then PATH)
ACPX_BIN=""
PLUGIN_BIN="/opt/homebrew/lib/node_modules/openclaw/extensions/acpx/node_modules/.bin/acpx"
DEV_BIN="/Users/nick/Code/openclaw/dist-runtime/extensions/acpx/node_modules/.bin/acpx"

if [ -x "$DEV_BIN" ]; then
  ACPX_BIN="$DEV_BIN"
elif [ -x "$PLUGIN_BIN" ]; then
  ACPX_BIN="$PLUGIN_BIN"
elif command -v acpx &>/dev/null; then
  ACPX_BIN="acpx"
fi

if [ -z "$ACPX_BIN" ]; then
  openclaw message send \
    --channel telegram \
    --account lovelace \
    --target 7775782519 \
    --message "⚠️ ACP broken: acpx binary not found. TaskCompleted hooks won't run. Fix: openclaw plugins install acpx && openclaw gateway restart" 2>/dev/null || true
fi

# ACP looks healthy — no alert needed
exit 0
