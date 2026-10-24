#!/usr/bin/env python3
"""Bundle the checked films, used source media and editable assembly."""
from pathlib import Path
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "exports"


def sha256(path):
    with path.open("rb") as source:
        return hashlib.file_digest(source, "sha256").hexdigest()


reports = json.loads((ROOT / "verification.json").read_text())
assert {r["project"] for r in reports} == {"cli", "ide", "harness"}
for report in reports:
    assert sha256(ROOT / report["file"]) == report["sha256"], "Recheck the changed export before packaging."

files = {ROOT / name for name in ["README.md", "STORIES.md", "PUBLISHING.md", "REFERENCE-REVIEW.md", "VERIFICATION.md", "verification.json", "index.html", "package.json", "package-lock.json", ".gitignore"]}
for directory in ["assets", "capture", "edits", "scripts", "sources", "raw/cli/clean", "raw/harness/evidence", "raw/harness/terminal"]:
    files.update(p for p in (ROOT / directory).rglob("*")
                 if p.is_file() and p.suffix.lower() not in {".mp3", ".wav", ".flac", ".aac", ".m4a"})
for name in ["raw/harness/recording.json", "raw/harness/scenes.json"]:
    files.add(ROOT / name)
for project in ["cli", "ide", "harness"]:
    edit = json.loads((ROOT / "edits" / f"{project}.json").read_text())
    files.update(ROOT / cut["source"] for cut in edit["cuts"])
    for suffix in ["launch.mp4", "poster.png"]:
        files.add(OUT / f"ejm-{project}-{suffix}")
    for suffix in ["render.json", "render.log", "filter.txt"]:
        files.add(ROOT / "build" / f"{project}-{suffix}")
files.update((ROOT / "build").glob("*-intro.png"))
files.update((ROOT / "build").glob("*-end.png"))
assert all(path.is_file() for path in files), "A package source is missing."

members = sorted(files, key=lambda p: str(p.relative_to(ROOT)))
manifest = {
    "date": "2026-10-19",
    "archive": "exports/ejmlabs-launch-kit.zip",
    "format": "1920x1080, 30fps, H.264 High 4.1, AAC 48kHz stereo, MP4 fast start",
    "capture": "Actual native products and public SDKs. CLI and harness use fixed local model replies with real tool effects; IDE shows native index navigation.",
    "review": "VERIFICATION.md",
    "files": [{"file": str(p.relative_to(ROOT)), "bytes": p.stat().st_size, "sha256": sha256(p)} for p in members],
    "exclusions": "Standalone music, dependencies, failed takes, unselected captures, reference footage and temporary build caches remain outside the archive. The manifest does not hash itself. Download music under its stated terms before rebuilding."
}
manifest_path = ROOT / "delivery-manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
members.append(manifest_path)
archive = OUT / "ejmlabs-launch-kit.zip"
with zipfile.ZipFile(archive, "w") as bundle:
    for path in members:
        compression = zipfile.ZIP_STORED if path.suffix in {".mp4", ".mov", ".png", ".gz"} else zipfile.ZIP_DEFLATED
        bundle.write(path, "launch-videos/" + str(path.relative_to(ROOT)), compress_type=compression)
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None, "ZIP integrity check failed."
    assert len(bundle.namelist()) == len(members)
checksummed = [archive] + sorted(OUT.glob("ejm-*-launch.mp4")) + sorted(OUT.glob("ejm-*-poster.png"))
(OUT / "SHA256SUMS").write_text("".join(f"{sha256(p)}  {p.name}\n" for p in checksummed))
print(f"Packaged {len(members)} files, {archive.stat().st_size / 1048576:.2f} MiB. ZIP integrity passed.")
