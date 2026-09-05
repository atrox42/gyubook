#!/usr/bin/env bash
# Usage: ./scripts/process-look.sh look-01
# Expects raw/looks/<id>/{front,left,right,back}.jpg (or .png)
set -euo pipefail

ID="${1:-}"
if [ -z "$ID" ]; then
  echo "Usage: $0 <look-id>"
  echo "Drop 4 angles into raw/looks/<id>/{front,left,right,back}.jpg then rerun."
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IN="$ROOT/raw/looks/$ID"
OUT="$ROOT/public/looks/$ID"
REMBG="${REMBG_BIN:-$HOME/.local/bin/rembg}"

if [ ! -x "$REMBG" ]; then
  if command -v rembg >/dev/null 2>&1; then
    REMBG="$(command -v rembg)"
  else
    echo "rembg not found. Install: python3 -m pip install rembg"
    exit 1
  fi
fi

mkdir -p "$OUT"

process_one() {
  local angle="$1"
  local src=""
  for ext in jpg jpeg png JPG JPEG PNG webp; do
    if [ -f "$IN/$angle.$ext" ]; then
      src="$IN/$angle.$ext"
      break
    fi
  done
  if [ -z "$src" ]; then
    echo "skip $angle (no source in $IN)"
    return 0
  fi
  echo "rembg $angle ← $src"
  "$REMBG" i "$src" "$OUT/$angle.png"
}

process_one front
process_one left
process_one right
process_one back

echo "Wrote cutouts to $OUT"
