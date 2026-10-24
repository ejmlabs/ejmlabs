#!/usr/bin/env python3
"""Assemble the product films with FFmpeg. Edit the cuts in edits/*.json."""
from pathlib import Path
import argparse
import hashlib
import json
import resource
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
BUILD, EXPORTS = ROOT / "build", ROOT / "exports"
INK = "0x202721"
FPS = 30


def run(command, log):
    started = time.monotonic()
    with log.open("w") as output:
        subprocess.run(command, stdout=output, stderr=subprocess.STDOUT, check=True)
    return round(time.monotonic() - started, 3)


def render(project):
    edit_path = ROOT / "edits" / f"{project}.json"
    edit = json.loads(edit_path.read_text())
    cuts = edit["cuts"]
    count = len(cuts)
    if not 3 <= count <= 6 or any(c["end"] <= c["start"] for c in cuts):
        raise ValueError("Each film needs three to six nonempty product cuts.")
    output = EXPORTS / f"ejm-{project}-launch.mp4"
    staging = output.with_name(output.stem + ".rendering.mp4")
    command = ["ffmpeg", "-hide_banner", "-y", "-filter_complex_threads", "2"]
    command += ["-loop", "1", "-framerate", str(FPS), "-i", str(BUILD / f"{project}-intro.png")]
    for cut in cuts:
        command += ["-ss", str(cut["start"]), "-t", str(cut["end"] - cut["start"]), "-i", str(ROOT / cut["source"])]
    command += ["-loop", "1", "-framerate", str(FPS), "-i", str(BUILD / f"{project}-end.png")]
    music = json.loads((ROOT / "assets/music-license.json").read_text())
    command += ["-ss", str(edit.get("musicStart", 0)), "-i", str(ROOT / "assets/music.wav")]

    intro = edit.get("problemSeconds", 3)
    ending = edit.get("outcomeSeconds", 3.6)
    transition = 0.1
    if not 2.5 <= intro <= 3.5 or not 3 <= ending <= 4.5:
        raise ValueError("Problem and outcome cards must allow time to read.")
    durations = [intro] + [round(c["end"] - c["start"] + c.get("hold", 0), 6) for c in cuts] + [ending]
    total = round(sum(durations) - 2 * transition, 6)
    if not 20 <= total <= 35:
        raise ValueError(f"Film duration {total} is outside the 20 to 35 second budget.")
    graph = [f"[0:v]trim=duration={intro},setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v0]"]
    for i, cut in enumerate(cuts, 1):
        crop = ""
        if "crop" in cut:
            c = cut["crop"]
            y = str(c["y"])
            if "panY" in cut:
                pan = cut["panY"]
                if pan["at"] < 0 or not 0 < pan["seconds"] <= 1:
                    raise ValueError("A detail pan must settle within one second.")
                progress = f"min(max((t-{pan['at']})/{pan['seconds']},0),1)"
                y = f"'{c['y']}+({pan['to']}-{c['y']})*(1-pow(1-{progress},3))'"
            crop = f"crop={c['width']}:{c['height']}:{c['x']}:{y},"
        hold = f"tpad=stop_mode=clone:stop_duration={cut['hold']}," if cut.get("hold") else ""
        # Product pixels fill the canvas. Crops in the edit list direct attention.
        # A pan, when supplied, follows a native control or result.
        graph += [
            f"[{i}:v]setpts=PTS-STARTPTS,{hold}fps={FPS},{crop}"
            f"scale=1920:1080:force_original_aspect_ratio=decrease:flags=lanczos,"
            f"pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color={INK},"
            f"setsar=1,format=yuv420p[v{i}]",
        ]
    graph += [f"[{count + 1}:v]trim=duration={ending},setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v{count + 1}]"]
    product_inputs = "".join(f"[v{i}]" for i in range(1, count + 1))
    graph += [f"{product_inputs}concat=n={count}:v=1:a=0,fps={FPS},settb=1/{FPS}[product]",
              f"[v0][product]xfade=transition=fade:duration={transition}:offset={intro - transition:.6f}[body]",
              f"[body][v{count + 1}]xfade=transition=fade:duration={transition}:offset={total - ending:.6f}[video]"]
    graph += [f"[{count + 2}:a]atrim=duration={total},asetpts=PTS-STARTPTS,"
              f"afade=t=in:d=0.03,afade=t=out:st={total - 0.35}:d=0.35,"
              "loudnorm=I=-16:TP=-1.5:LRA=7,aresample=48000[audio]"]
    filter_file = BUILD / f"{project}-filter.txt"
    filter_file.write_text(";\n".join(graph) + "\n")
    command += ["-filter_complex", filter_file.read_text(), "-map", "[video]", "-map", "[audio]",
                "-t", str(total), "-r", str(FPS), "-c:v", "libx264", "-preset", "slow", "-crf", "18",
                "-profile:v", "high", "-level:v", "4.1", "-refs", "4", "-g", "60", "-maxrate", "12M", "-bufsize", "24M",
                "-threads", "4", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ac", "2",
                "-movflags", "+faststart", "-metadata", f"title=ejm-{project} | Open source",
                "-metadata", f"comment=Actual native product footage and public SDKs. Capture details in source notes. {music['credit']}", str(staging)]
    elapsed = run(command, BUILD / f"{project}-render.log")
    staging.replace(output)
    poster_time = edit.get("posterTime", total - ending - 2)
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", str(poster_time),
                    "-i", str(output), "-frames:v", "1", str(EXPORTS / f"ejm-{project}-poster.png")], check=True)
    record = {"project": project, "duration": total, "width": 1920, "height": 1080, "fps": FPS,
              "bytes": output.stat().st_size, "renderSeconds": elapsed,
              "sha256": hashlib.sha256(output.read_bytes()).hexdigest(), "command": command, "edit": edit}
    peak = resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss
    record["batchChildPeakResidentBytes"] = peak if sys.platform == "darwin" else peak * 1024
    (BUILD / f"{project}-render.json").write_text(json.dumps(record, indent=2) + "\n")
    print(f"ejm-{project}: {total:.2f}s, {record['bytes'] / 1048576:.2f} MiB, encoded in {elapsed:.1f}s", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("projects", nargs="*", choices=["cli", "ide", "harness"])
    args = parser.parse_args()
    BUILD.mkdir(parents=True, exist_ok=True)
    EXPORTS.mkdir(parents=True, exist_ok=True)
    for name in args.projects or ["cli", "ide", "harness"]:
        render(name)
