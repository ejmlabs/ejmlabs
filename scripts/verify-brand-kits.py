#!/usr/bin/env python3
"""Read-only checks for the ejmlabs brand and X kits. Use --packaged after copying mirrors and ZIPs."""

import argparse
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
import struct
import sys
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

try:
    from PIL import Image
except ImportError:
    Image = None

ROOT = Path(__file__).resolve().parents[1]
KITS = [ROOT / "design-kit", ROOT / "x-kit"]
SVG = "{http://www.w3.org/2000/svg}"
PALETTE = {"sage": (138, 154, 123), "forest": (41, 68, 59),
           "paper": (246, 245, 239), "ink": (32, 39, 33)}
failures, deferred = [], []


def check(condition, message):
    if not condition:
        failures.append(message)


def label(path):
    return str(path.relative_to(ROOT))


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.descriptions = [], [], []

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if "id" in attributes:
            self.ids.append(attributes["id"])
        for key in ("href", "src", "poster"):
            if key in attributes:
                self.links.append(attributes[key])
        for key in ("aria-describedby", "aria-labelledby"):
            self.descriptions.extend(attributes.get(key, "").split())


def pending_package(path):
    parts = path.relative_to(ROOT).parts if path.is_relative_to(ROOT) else ()
    return (path.suffix == ".zip" or parts[:3] == ("design-kit", "social", "x-kit")
            or "mockups" in parts)


def expected_png_size(path):
    relative = label(path)
    match = re.search(r"(\d+)x(\d+)", path.stem)
    if match:
        return tuple(map(int, match.groups()))
    if "avatars/" in relative:
        size = int(path.stem.rsplit("-", 1)[1])
        return (size, size)
    known = {"x-kit/UPLOAD-avatar.png": (400, 400), "x-kit/UPLOAD-header.png": (1500, 500),
             "x-kit/guides/banner-safe-area.png": (1500, 500),
             "design-kit/social/avatar.png": (1024, 1024),
             "design-kit/social/social-card.png": (1200, 630),
             "design-kit/favicon/apple-touch-icon.png": (180, 180)}
    if relative in known:
        return known[relative]
    match = re.search(r"(?:favicon|android-chrome)-(\d+)$", path.stem)
    return (int(match[1]),) * 2 if match else None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--packaged", action="store_true", help="Require linked archives and mirrors too")
    args = parser.parse_args()
    files = sorted({path for kit in KITS for path in kit.rglob("*") if path.is_file()})
    pages, vectors, images = {}, {}, []
    for path in files:
        try:
            if path.suffix == ".html":
                page = Page()
                page.feed(path.read_text())
                pages[path] = page
                check(len(page.ids) == len(set(page.ids)), f"Duplicate HTML IDs: {label(path)}")
                check(set(page.descriptions) <= set(page.ids), f"Missing ARIA target: {label(path)}")
            elif path.suffix == ".svg":
                root = ET.parse(path).getroot()
                vectors[path] = root
                check(root.tag == SVG + "svg", f"Invalid SVG root: {label(path)}")
                viewbox = list(map(float, root.get("viewBox", "0 0 0 0").split()))
                check(len(viewbox) == 4 and min(viewbox[2:]) > 0, f"Invalid SVG dimensions: {label(path)}")
            elif path.suffix == ".png":
                data = path.read_bytes()
                check(data[:8] == b"\x89PNG\r\n\x1a\n" and data[12:16] == b"IHDR", f"Invalid PNG header: {label(path)}")
                size = struct.unpack(">II", data[16:24])
                check(min(size) > 0, f"Empty PNG dimensions: {label(path)}")
                expected = expected_png_size(path)
                check(not expected or size == expected, f"PNG dimensions {size}, expected {expected}: {label(path)}")
                images.append((path, size))
                if Image:
                    with Image.open(path) as image:
                        image.verify()
            elif path.suffix == ".ico":
                data = path.read_bytes()
                count = struct.unpack_from("<H", data, 4)[0]
                sizes = {(data[6 + 16 * n] or 256, data[7 + 16 * n] or 256) for n in range(count)}
                check({(16, 16), (32, 32), (48, 48)} <= sizes, f"Missing ICO dimensions: {label(path)}")
        except (OSError, ValueError, ET.ParseError, struct.error) as error:
            failures.append(f"Unreadable asset {label(path)}: {error}")

    for path, page in pages.items():
        for reference in page.links:
            url = urlsplit(reference)
            if url.scheme or url.netloc:
                continue
            target = (ROOT / unquote(url.path).lstrip("/") if url.path.startswith("/")
                      else path.parent / unquote(url.path)).resolve() if url.path else path
            if not target.exists() and not args.packaged and pending_package(target):
                deferred.append(label(target))
                continue
            check(target.exists(), f"Missing local link in {label(path)}: {reference}")
            if url.fragment and target in pages:
                check(unquote(url.fragment) in pages[target].ids, f"Missing fragment in {label(path)}: {reference}")

    for path, size in images:
        vector = vectors.get(path.with_suffix(".svg"))
        if vector is not None and vector.get("width") and vector.get("height"):
            dimensions = [re.fullmatch(r"([\d.]+)(?:px)?", vector.get(key)) for key in ("width", "height")]
            # Text outliners can write pt attributes; their viewBox retains the export canvas.
            expected = (tuple(round(float(value[1])) for value in dimensions) if all(dimensions)
                        else tuple(round(float(value)) for value in vector.get("viewBox").split()[2:]))
            check(size == expected, f"PNG/SVG dimensions differ: {label(path)}")
        if path.parent.name == "logos":
            check(size[0] == (1024 if path.stem.startswith("symbol-") else 2400), f"Logo export width: {label(path)}")

    source = vectors.get(ROOT / "design-kit/logos/symbol-sage.svg")
    check(source is not None, "Missing source symbol SVG")
    source_paths = [node.get("d") for node in source.iter(SVG + "path")] if source is not None else []
    for theme, opacity in (("forest", 0.3), ("paper", 0.28)):
        path = ROOT / f"x-kit/banners/{theme}-1500x500.svg"
        root = vectors.get(path)
        if root is None:
            check(False, f"Missing banner SVG: {label(path)}")
            continue
        groups = root.findall(SVG + "g")
        motif = next((node for node in groups if node.get("transform", "").startswith("translate(1120 -100)")), None)
        check(motif is not None, f"Missing banner motif: {label(path)}")
        if motif is not None:
            check(float(motif.get("opacity", "1")) == opacity, f"Banner motif opacity: {label(path)}")
            paths = list(motif.iter(SVG + "path"))
            check([node.get("d") for node in paths] == source_paths, f"Banner symbol paths changed: {label(path)}")
            check(all(node.get("fill", "").upper() == "#8A9A7B" for node in paths), f"Banner motif color: {label(path)}")
        check(not list(root.iter(SVG + "text")), f"Production banner has live text: {label(path)}")
        if Image:
            with Image.open(path.with_suffix(".png")) as image:
                colors = Counter(dict((color, count) for count, color in image.convert("RGB").getcolors(image.width * image.height)))
                check(colors[PALETTE[theme]] > 500_000, f"Banner background pixels: {theme}")
                expected = tuple(opacity * a + (1 - opacity) * b for a, b in zip(PALETTE["sage"], PALETTE[theme]))
                motif_pixels = sum(count for color, count in colors.items() if all(abs(a - b) <= 1 for a, b in zip(color, expected)))
                check(motif_pixels > 50_000, f"Missing translucent motif in PNG: {theme}")

    for kind, source in (("avatar", "avatars/sage-400.png"), ("header", "banners/sage-1500x500.png")):
        upload = ROOT / f"x-kit/UPLOAD-{kind}.png"
        if not upload.exists():
            check(False, f"Missing upload PNG: {kind}")
            continue
        check(upload.read_bytes() == (ROOT / "x-kit" / source).read_bytes(), f"Stale upload copy: {kind}")
        check(upload.stat().st_size < 2_000_000, f"Upload exceeds conservative 2 MB budget: {kind}")
        width, height = expected_png_size(upload)
        print(f"Upload {kind}: {width} x {height}, {upload.stat().st_size:,} bytes")

    docs = files + list((ROOT / "scripts").glob("*")) + [ROOT / "README.md"]
    extensions = {".md", ".html", ".css", ".js", ".mjs", ".cjs", ".py", ".svg"}
    for path in docs:
        if (path.suffix not in extensions or "OFL" in path.name or "LICENSE" in path.name.upper()
                or path.parent.name == "logos" or "reference" in path.parts):
            continue
        check("\u2014" not in path.read_text(), f"Em dash in authored file: {label(path)}")

    print(f"Checked {len(pages)} HTML files, {len(vectors)} SVGs, and {len(images)} PNG dimensions.")
    if not Image:
        print("Pillow unavailable: PNG headers checked; pixel decoding and banner colors skipped.")
    if deferred:
        print("Deferred packaging links: " + ", ".join(sorted(set(deferred))))
    unique_failures = list(dict.fromkeys(failures))
    for failure in unique_failures:
        print("FAIL: " + failure, file=sys.stderr)
    print(f"{'PASS' if not failures else 'FAIL'}: {len(unique_failures)} failures")
    return bool(failures)


if __name__ == "__main__":
    sys.exit(main())
