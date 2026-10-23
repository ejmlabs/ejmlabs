#!/usr/bin/env python3
"""Build the three films' title art with librsvg and canonical token assets."""
from pathlib import Path
import base64
import hashlib
import html
import json
import os
import subprocess

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
BUILD = ROOT / "build"
INK, PAPER, SAGE, MIST = "#202721", "#F6F5EF", "#8A9A7B", "#E8EDE3"
STORIES = {
    "cli": {
        "problem": ["Time’s up.", "The code still retries."],
        "outcome": ["At the limit,", "it stops."],
        "proof": "The same five tests pass.",
        "url": "cli.ejmlabs.com",
    },
    "ide": {
        "problem": ["Before changing discounts,", "follow the pricing code."],
        "outcome": ["Quote and payment.", "One shared calculation."],
        "proof": "Trace the links. Open the source.",
        "url": "ide.ejmlabs.com",
    },
    "harness": {
        "problem": ["A worker closes.", "Its history should stay."],
        "outcome": ["New process. New language.", "Same saved run."],
        "proof": "The completion and tool result are still there.",
        "url": "harness.ejmlabs.com",
    },
}
MUSIC = json.loads((ASSETS / "music-license.json").read_text())


def svg(content):
    return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920" height="1080" viewBox="0 0 1920 1080">{content}</svg>'


def text(value, x, y, size, color=PAPER, weight=500, family="Manrope"):
    return f'<text x="{x}" y="{y}" fill="{color}" font-family="{family}" font-size="{size}" font-weight="{weight}">{html.escape(value)}</text>'


def image(path, x, y, width, height):
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return f'<image xlink:href="data:image/svg+xml;base64,{data}" x="{x}" y="{y}" width="{width}" height="{height}" preserveAspectRatio="xMidYMid meet"/>'


def raster(name, content):
    source = BUILD / f"{name}.svg"
    target = BUILD / f"{name}.png"
    source.write_text(svg(content))
    subprocess.run(["rsvg-convert", str(source), "-o", str(target)], check=True, env=FONT_ENV)


BUILD.mkdir(parents=True, exist_ok=True)
config = BUILD / "fonts.conf"
cache = BUILD / "font-cache"
cache.mkdir(exist_ok=True)
config.write_text(f'<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd"><fontconfig><dir>{ASSETS / "fonts"}</dir><cachedir>{cache}</cachedir></fontconfig>')
FONT_ENV = {**os.environ, "FONTCONFIG_FILE": str(config)}

for project, story in STORIES.items():
    mark = ASSETS / "projects" / project / "mark-paper.svg"
    top = image(mark, 72, 56, 56, 56) + text(f"ejm-{project}", 148, 98, 38, weight=600)
    top += text("OPEN SOURCE / MIT", 1450, 94, 23, MIST, family="IBM Plex Mono")
    intro = '<rect width="1920" height="1080" fill="' + INK + '"/>'
    intro += top
    intro += text(story["problem"][0], 104, 466, 112, weight=650)
    intro += text(story["problem"][1], 104, 622, 112, SAGE, weight=650)
    raster(f"{project}-intro", intro)
    end = f'<rect width="1920" height="1080" fill="{INK}"/>'
    end += top
    end += text(story["outcome"][0], 104, 386, 108, weight=650)
    end += text(story["outcome"][1], 104, 532, 108, SAGE, weight=650)
    end += text(story["proof"], 110, 640, 42, MIST)
    end += text(story["url"], 110, 838, 54, weight=600)
    end += image(ASSETS / "logos" / "ejmlabs-paper.svg", 1510, 810, 288, 120)
    end += text(MUSIC["credit"], 110, 1026, 20, SAGE)
    raster(f"{project}-end", end)

audio_target = ASSETS / "music.wav"
with audio_target.open("rb") as audio:
    assert hashlib.file_digest(audio, "sha256").hexdigest() == MUSIC["files"][audio_target.name]["sha256"], "The soundtrack no longer matches its source record."
(BUILD / "stories.json").write_text(json.dumps(STORIES, indent=2) + "\n")
print("Built matching title art for three films with Manrope and canonical project marks.")
