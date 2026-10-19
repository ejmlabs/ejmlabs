#!/usr/bin/env python3
"""Turns the <text> elements of an SVG into outlined <path> elements.

Usage: outline-text.py in.svg out.svg
Needs fontTools (pip install fonttools) and hb-shape from HarfBuzz, so kerning matches the browser.
Reads only the fonts in design-kit/fonts. Every <text> needs x, y, font-family, font-weight, font-size and fill.
"""
import html
import json
import re
import subprocess
import sys
from functools import lru_cache
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

FONTS = Path(__file__).resolve().parents[1] / "fonts"
FILES = {"Manrope": "Manrope-Variable.ttf", "IBM Plex Mono": "IBMPlexMono-Medium.ttf"}


@lru_cache(maxsize=None)
def instance(family, weight):
    font = TTFont(FONTS / FILES[family])
    if "fvar" in font:
        font = instancer.instantiateVariableFont(font, {"wght": weight})
    return font


def shape(family, weight, content):
    command = ["hb-shape", f"--font-file={FONTS / FILES[family]}", "--output-format=json", "--no-glyph-names",
               f"--text={content}"]
    if family == "Manrope":
        command.append(f"--variations=wght={weight}")
    return json.loads(subprocess.run(command, check=True, capture_output=True, text=True).stdout)


def attr(tag, name):
    return re.search(rf'\b{name}="([^"]*)"', tag).group(1)


def outline(match):
    tag = match.group(1)
    content = html.unescape(match.group(2))
    family, weight = attr(tag, "font-family"), int(attr(tag, "font-weight"))
    size, x, y, fill = float(attr(tag, "font-size")), float(attr(tag, "x")), float(attr(tag, "y")), attr(tag, "fill")
    font = instance(family, weight)
    scale = size / font["head"].unitsPerEm
    glyphs, order, pen_x, out = font.getGlyphSet(), font.getGlyphOrder(), 0.0, []
    for item in shape(family, weight, content):
        pen = SVGPathPen(glyphs, ntos=lambda value: f"{value:.3f}".rstrip("0").rstrip("."))
        glyphs[order[item["g"]]].draw(TransformPen(pen, (scale, 0, 0, -scale, (pen_x + item["dx"]) * scale, -item["dy"] * scale)))
        pen_x += item["ax"]
        d = pen.getCommands()
        if d:
            out.append(f'<path fill="{fill}" transform="translate({x:g} {y:g})" d="{d}"/>')
    return "".join(out)


source, target = Path(sys.argv[1]), Path(sys.argv[2])
target.write_text(re.sub(r"(<text\b[^>]*>)([\s\S]*?)</text>", outline, source.read_text()))
