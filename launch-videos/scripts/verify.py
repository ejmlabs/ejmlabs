#!/usr/bin/env python3
"""Decode finished files and record measurable export checks."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "exports"
proofs = ROOT / "build" / "verification"
proofs.mkdir(parents=True, exist_ok=True)
reports = []
for project in ["cli", "ide", "harness"]:
    path = OUT / f"ejm-{project}-launch.mp4"
    result = subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-show_streams", "-show_format", "-of", "json", str(path)], capture_output=True, text=True, check=True)
    probe = json.loads(result.stdout)
    video = next(s for s in probe["streams"] if s["codec_type"] == "video")
    audio = next(s for s in probe["streams"] if s["codec_type"] == "audio")
    duration = float(probe["format"]["duration"])
    assert video["codec_name"] == "h264" and video["pix_fmt"] == "yuv420p"
    assert video["profile"] == "High" and video["level"] <= 41
    assert (video["width"], video["height"], video["avg_frame_rate"]) == (1920, 1080, "30/1")
    assert 20 <= duration <= 35 and path.stat().st_size <= 50 * 1048576
    assert abs(int(video["nb_read_frames"]) - round(duration * 30)) <= 1
    assert audio["codec_name"] == "aac" and audio["sample_rate"] == "48000" and audio["channels"] == 2
    subprocess.run(["ffmpeg", "-v", "error", "-xerror", "-i", str(path), "-f", "null", "-"], check=True)
    analysis = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path),
        "-vf", "blackdetect=d=0.10:pix_th=0.02,freezedetect=n=-55dB:d=2", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True, check=True)
    log = analysis.stderr
    (proofs / f"{project}-analysis.log").write_text(log)
    loudness = re.findall(r"I:\s*(-?[\d.]+) LUFS", log)
    peaks = re.findall(r"Peak:\s*(-?[\d.]+) dBFS", log)
    assert loudness and -18 <= float(loudness[-1]) <= -14
    assert peaks and float(peaks[-1]) <= -1
    assert "black_start:" not in log, "Unexpected black interval"
    frame_dir = proofs / project
    frame_dir.mkdir(exist_ok=True)
    for old_frame in frame_dir.glob("*.png"):
        old_frame.unlink()
    frame_files = []
    times = [0.5, 2.5, 5, 8, 11, 14, 17, 20, 23, duration - 0.6]
    for n, at in enumerate(sorted(set(min(t, duration - 0.1) for t in times))):
        frame_path = frame_dir / f"{n:02d}-{at:.2f}.png"
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", str(at), "-i", str(path),
                        "-frames:v", "1", str(frame_path)], check=True)
        frame_files.append(str(frame_path.relative_to(ROOT)))
    # The opening and end slate intentionally hold. The freeze log is review data.
    header = path.read_bytes()[:2 * 1048576]
    assert header.find(b"moov") < header.find(b"mdat") and header.find(b"moov") >= 0
    reports.append({"project": project, "file": str(path.relative_to(ROOT)), "duration": duration,
        "bytes": path.stat().st_size, "frames": int(video["nb_read_frames"]),
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "integratedLufs": float(loudness[-1]),
        "truePeakDbfs": float(peaks[-1]), "fullDecode": "passed", "fastStart": True,
        "sceneFrames": str(frame_dir.relative_to(ROOT)), "sceneFrameFiles": frame_files, "probe": probe})
    print(f"ejm-{project}: full decode and media checks passed", flush=True)
(ROOT / "verification.json").write_text(json.dumps(reports, indent=2) + "\n")
