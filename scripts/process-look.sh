#!/usr/bin/env bash
# Usage: ./scripts/process-look.sh look-01
# Pipeline: drop 4 angles → bg remove → data entry
# Expects raw/looks/<id>/{front,left,right,back}.jpg
# Aliases: side-left.jpg → left, side-right.jpg → right
set -euo pipefail

ID="${1:-}"
if [ -z "$ID" ]; then
  echo "Usage: $0 <look-id>"
  echo "Drop 4 angles into raw/looks/<id>/{front,left,right,back}.jpg then rerun."
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
exec python3 "$ROOT/scripts/process-look.py" "$ID"
