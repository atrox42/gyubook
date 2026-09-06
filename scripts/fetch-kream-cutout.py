#!/usr/bin/env python3
"""Fetch a product's main image (KREAM first) and rembg it for loadout cards.

Usage:
  python3 scripts/fetch-kream-cutout.py IQ7354-039 public/products/look-01/IQ7354-039.png
  python3 scripts/fetch-kream-cutout.py --id 787409 IO9678-097 public/products/look-01/IO9678-097.png
  python3 scripts/fetch-kream-cutout.py --name "Nike ACG Zegama" HV8113-103 public/products/look-01/HV8113-103.png
"""

from __future__ import annotations

import json
import re
import sys
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)


def http_get(url: str, accept: str = "*/*") -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": accept,
            "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
            "Referer": "https://kream.co.kr/",
        },
    )
    with urllib.request.urlopen(req, timeout=20) as res:
        return res.read()


def take_flag(argv: list[str], flag: str) -> tuple[str, list[str]]:
    if flag not in argv:
        return "", argv
    index = argv.index(flag)
    if index + 1 >= len(argv):
        raise SystemExit(f"{flag} needs a value")
    return argv[index + 1], argv[:index] + argv[index + 2 :]


def kream_image(query: str, product_id: str = "") -> str | None:
    candidates: list[str] = []
    if product_id:
        candidates += [
            f"https://kream.co.kr/products/{product_id}",
            f"https://kream.co.kr/api/p/products/{product_id}",
        ]
    if query:
        encoded = urllib.parse.quote(query)
        candidates += [
            f"https://kream.co.kr/api/p/products?keyword={encoded}&per_page=8&sort=popular_score",
            f"https://kream.co.kr/search?keyword={encoded}",
        ]
    for url in candidates:
        try:
            raw = http_get(url, "application/json, text/html")
        except Exception as exc:
            print(f"kream miss {url}: {exc}")
            continue
        text = raw.decode("utf-8", "ignore")
        try:
            data = json.loads(text)
            blob = data.get("data") if isinstance(data.get("data"), dict) else data
            direct = (
                (blob or {}).get("image_url")
                or (blob or {}).get("imageUrl")
                or (blob or {}).get("mainImage")
            )
            if direct:
                return direct
            items = (
                data.get("items")
                or data.get("products")
                or (blob or {}).get("items")
                or []
            )
            for item in items:
                image = item.get("image_url") or item.get("imageUrl") or item.get("image")
                if image:
                    return image
        except json.JSONDecodeError:
            pass
        for pat in (
            r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)',
            r'https://kream-phinf\.pstatic\.net/[^"\']+\.(?:png|jpg|jpeg|webp)',
        ):
            match = re.search(pat, text, re.I)
            if match:
                return match.group(1) if match.lastindex else match.group(0)
    return None


def cutout(image_bytes: bytes) -> Image.Image:
    src = Image.open(BytesIO(image_bytes)).convert("RGB")
    session = new_session("u2netp")
    rgba = remove(src, session=session, alpha_matting=False, post_process_mask=True).convert(
        "RGBA"
    )
    red, green, blue, alpha = rgba.split()
    kept = alpha.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.5))
    out = Image.merge("RGBA", (red, green, blue, kept))
    box = kept.getbbox()
    if box:
        out = out.crop(box)
    out.thumbnail((480, 480), Image.Resampling.LANCZOS)
    return out


def main() -> int:
    argv = sys.argv[1:]
    name, argv = take_flag(argv, "--name")
    product_id, argv = take_flag(argv, "--id")
    if len(argv) < 2:
        print(
            "Usage: fetch-kream-cutout.py [--id 787409] [--name 'product'] SKU dest.png"
        )
        return 1
    sku, dest_s = argv[0], argv[1]
    dest = Path(dest_s)
    if not dest.is_absolute():
        dest = ROOT / dest
    dest.parent.mkdir(parents=True, exist_ok=True)

    image_url = None
    if product_id:
        image_url = kream_image("", product_id)
    if not image_url:
        image_url = kream_image(sku, product_id)
    if not image_url and name:
        image_url = kream_image(name, product_id)
    if not image_url:
        print(f"no KREAM image for {sku} / {name} / {product_id}")
        return 2
    print(f"kream {sku} ← {image_url}")
    blob = http_get(image_url)
    cutout(blob).save(dest, "PNG")
    print(f"wrote {dest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
