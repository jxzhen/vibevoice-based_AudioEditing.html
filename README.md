# vibevoice-based_AudioEditing.html

A small **local-experiment dashboard** for the side-project audio editing
research that combines `MiniCPM-o` (ModelBest) with `microsoft/VibeVoice`.

**This is NOT the official ICASSP 2027 Audio Editing Challenge submission.**

The official submission lives in
<https://github.com/jxzhen/aec-2027-editx-lora> (LoRA on top of
`stepfun-ai/Step-Audio-EditX`). The two repos are independent.

## Metric scope (please read before quoting any number here)

This dashboard shows **reference-signal metrics**: SI-SDR, PESQ, STOI, Mel L1
and LSD, computed on one local clip.

Those are **not** the official ICASSP 2027 AEC metrics. The official
metrics are **IFR** (instruction fulfilment rate), **CR** (content retention)
and **EMR** (exact-match rate), produced by the unmodified official
evaluator (`python -m eval.score`). No number in the official metric space
is published in this repository, and nothing on this page should be read as
an AEC leaderboard score.

Two reference rows (`audioeditor-icassp2025`, `audit-neurips2023`) carry
values that were attributed to those papers. The AudioEditor ICASSP 2025
paper reports FD / KL / FAD / IS / CLAP-cosine and MOS, and AUDIT reports
FD / KL / FAD / IS and MOS -- neither reports SI-SDR / PESQ / STOI / Mel L1 /
LSD. Those values therefore could not be traced to a primary source. They
are kept verbatim under `reported_values_unverified` in
`data/summary.json`, they are **not** shown in the metric columns, and the
per-row *Provenance* column says so.

## Why this site exists

The author is running a side-project that uses the HuggingFace HK
lightweight server (1-month rental) to download a curated set of audio
editing models, then transfers them once to the local machine and runs
small-model experiments combining `MiniCPM-o` + `VibeVoice`. The final
goal is to see if a small-model hybrid can match or exceed published
SOTA on the ICASSP 2027 AEC metrics.

This repo is the **local experiment dashboard**: a static HTML/CSS/JS
page that lets the author run comparison experiments and review results
without setting up a backend.

## Repo vs sibling weight repo

| Repo | Role |
|---|---|
| `jxzhen/vibevoice-based_weight` | weight manifest, HK download pipeline, benchmark runners (SOTA comparison + ASR comparison) |
| **`jxzhen/vibevoice-based_AudioEditing.html`** (this) | local experiment dashboard: UI to view runs, compare metrics, and visualize spectrograms |

The weight repo's `benchmarks/audio_editing/aggregate.py` writes a
`summary.json` that this dashboard consumes.

## Local preview

```bash
python -m http.server 8000
# Open http://localhost:8000
```

The page makes **no outbound requests** -- everything loads from
`data/summary.json` and `data/spectrograms/`. Safe to host on any local
machine.

## Repo layout

```
.
+- index.html              dashboard
+- style.css               styling
+- app.js                  load + render
+- data/
|   +- summary.json        audio editing comparison results
|   +- asr_summary.json    ASR comparison results
+- README.md
+- LICENSE
```

## License

MIT for the dashboard code. Benchmark numbers belong to the weight repo
and its underlying papers (AudioEditor, Audit, InstructSpeech, etc.).

## Contact

Jianxi Zheng · `hunan08182026@126.com`