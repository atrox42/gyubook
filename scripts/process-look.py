#!/usr/bin/env python3
"""Cut out a look's 4 angles onto a white canvas.

add a look = drop 4 angles → bg remove → data entry

Usage:
  python3 scripts/process-look.py look-01

Reads raw/looks/<id>/{front,left,right,back}.jpg
(also accepts side-left / side-right / rear aliases)
Writes public/looks/<id>/{front,left,right,back}.png
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
CANVAS = (255, 255, 255)
ANGLES = ("front", "left", "right", "back")
ALIASES = {
    "front": ("front", "Front", "FRONT", "정면"),
    "left": ("left", "side-left", "side_left", "Left", "LEFT", "좌측"),
    "right": ("right", "side-right", "side_right", "Right", "RIGHT", "우측"),
    "back": ("back", "rear", "Back", "BACK", "후면", "등"),
}
EXTS = (".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP")


def find_source(folder: Path, angle: str) -> Path | None:
    for name in ALIASES[angle]:
        for ext in EXTS:
            candidate = folder / f"{name}{ext}"
            if candidate.is_file() and candidate.stat().st_size > 0:
                return candidate
    return None


def flatten_white(cutout: Image.Image) -> Image.Image:
    rgba = cutout.convert("RGBA")
    canvas = Image.new("RGB", rgba.size, CANVAS)
    canvas.paste(rgba, mask=rgba.split()[-1])
    return canvas


def process_look(look_id: str) -> int:
    src_dir = ROOT / "raw" / "looks" / look_id
    out_dir = ROOT / "public" / "looks" / look_id
    out_dir.mkdir(parents=True, exist_ok=True)

    missing: list[str] = []
    written = 0
    for angle in ANGLES:
        src = find_source(src_dir, angle)
        if src is None:
            missing.append(angle)
            print(f"skip {angle} (no source in {src_dir})")
            continue
        print(f"cutout {angle} ← {src.name}")
        raw = Image.open(src)
        cutout = remove(raw)
        flattened = flatten_white(cutout)
        dest = out_dir / f"{angle}.png"
        flattened.save(dest, "PNG", optimize=True)
        written += 1
        print(f"  → {dest.relative_to(ROOT)}")

    if written == 0:
        print(
            f"\nNo photos in {src_dir}.\n"
            "Drop 4 angles as front.jpg left.jpg right.jpg back.jpg\n"
            "(side-left.jpg / side-right.jpg also work) then rerun."
        )
        return 1

    if missing:
        print(f"\nPartial: missing {', '.join(missing)}")
        return 2

    print(f"\nWrote 4 white cutouts to {out_dir.relative_to(ROOT)}")
    return 0


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/process-look.py <look-id>")
        print("Pipeline: drop 4 angles → bg remove → data entry")
        return 1
    return process_look(sys.argv[1])


if __name__ == "__main__":
    raise SystemExit(main())
