#!/usr/bin/env python3
"""Cut out a look's 4 angles and pack them onto one white composite.

add a look = drop 4 angles → gentle rembg → <id>-quad-white.png → data entry

Usage:
  python3 scripts/process-look.py look-01

Reads raw/looks/<id>/{front,left,right,back}.jpg
Writes:
  public/looks/<id>/{front,left,right,back}.png
  public/looks/<id>/<id>-quad-white.png
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
WHITE = (255, 255, 255)
ANGLES = ("front", "left", "right", "back")
ALIASES = {
    "front": ("front", "Front", "FRONT", "정면"),
    "left": ("left", "side-left", "side_left", "Left", "LEFT", "좌측"),
    "right": ("right", "side-right", "side_right", "Right", "RIGHT", "우측"),
    "back": ("back", "rear", "Back", "BACK", "후면", "등"),
}
EXTS = (".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP")

# 2×2, almost no gaps
CELL = 920
GAP = 6
PAD = 10


def find_source(folder: Path, angle: str) -> Path | None:
    for name in ALIASES[angle]:
        for ext in EXTS:
            candidate = folder / f"{name}{ext}"
            if candidate.is_file() and candidate.stat().st_size > 0:
                return candidate
    return None


def gentle_cutout(raw: Image.Image, session) -> Image.Image:
    """u2netp, no alpha-matting — keep edges instead of eating them."""
    cutout = remove(
        raw.convert("RGB"),
        session=session,
        alpha_matting=False,
        post_process_mask=True,
    ).convert("RGBA")
    red, green, blue, alpha = cutout.split()
    # Dilate + slight blur so hair / shoe / bandana edges survive
    kept = alpha.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    return Image.merge("RGBA", (red, green, blue, kept))


def subject_bbox(cutout: Image.Image, pad: int = 12) -> tuple[int, int, int, int]:
    alpha = cutout.split()[-1]
    box = alpha.getbbox()
    if box is None:
        return (0, 0, cutout.width, cutout.height)
    left, top, right, bottom = box
    return (
        max(0, left - pad),
        max(0, top - pad),
        min(cutout.width, right + pad),
        min(cutout.height, bottom + pad),
    )


def fit_on_white(cutout: Image.Image, cell: int) -> Image.Image:
    cropped = cutout.crop(subject_bbox(cutout))
    cropped.thumbnail((cell - 8, cell - 8), Image.Resampling.LANCZOS)
    tile = Image.new("RGBA", (cell, cell), (*WHITE, 255))
    x = (cell - cropped.width) // 2
    y = cell - cropped.height
    tile.paste(cropped, (x, y), cropped)
    return tile


def pack_quad(cells: dict[str, Image.Image]) -> Image.Image:
    width = PAD * 2 + CELL * 2 + GAP
    height = PAD * 2 + CELL * 2 + GAP
    canvas = Image.new("RGB", (width, height), WHITE)
    layout = {
        "front": (PAD, PAD),
        "left": (PAD + CELL + GAP, PAD),
        "right": (PAD, PAD + CELL + GAP),
        "back": (PAD + CELL + GAP, PAD + CELL + GAP),
    }
    for angle, origin in layout.items():
        canvas.paste(cells[angle].convert("RGB"), origin)
    return canvas


def process_look(look_id: str) -> int:
    src_dir = ROOT / "raw" / "looks" / look_id
    out_dir = ROOT / "public" / "looks" / look_id
    out_dir.mkdir(parents=True, exist_ok=True)

    session = new_session("u2netp")
    cells: dict[str, Image.Image] = {}
    missing: list[str] = []

    for angle in ANGLES:
        src = find_source(src_dir, angle)
        if src is None:
            missing.append(angle)
            print(f"skip {angle} (no source in {src_dir})")
            continue
        print(f"cutout {angle} ← {src.name} (gentle, no matting)")
        cutout = gentle_cutout(Image.open(src), session)
        white = Image.new("RGB", cutout.size, WHITE)
        white.paste(cutout, mask=cutout.split()[-1])
        dest = out_dir / f"{angle}.png"
        white.save(dest, "PNG", optimize=True)
        cells[angle] = fit_on_white(cutout, CELL)
        print(f"  → {dest.relative_to(ROOT)}")

    if len(cells) == 0:
        print(
            f"\nNo photos in {src_dir}.\n"
            "Drop 4 angles as front.jpg left.jpg right.jpg back.jpg then rerun."
        )
        return 1

    if missing:
        print(f"\nPartial: missing {', '.join(missing)}")
        return 2

    quad = pack_quad(cells)
    quad_path = out_dir / f"{look_id}-quad-white.png"
    quad.save(quad_path, "PNG", optimize=True)
    print(f"  → {quad_path.relative_to(ROOT)}")
    print(f"\nWrote 4 cutouts + packed quad to {out_dir.relative_to(ROOT)}")
    return 0


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/process-look.py <look-id>")
        print("Pipeline: drop 4 angles → gentle rembg → <id>-quad-white.png")
        return 1
    return process_look(sys.argv[1])


if __name__ == "__main__":
    raise SystemExit(main())
