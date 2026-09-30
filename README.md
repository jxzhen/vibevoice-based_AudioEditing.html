# vibevoice-based_AudioEditing.html

A small **local-experiment dashboard** for the side-project audio editing
research that combines `MiniCPM-o` (ModelBest) with `microsoft/VibeVoice`.

**This is NOT the official ICASSP 2027 Audio Editing Challenge submission.**

The official submission lives in
<https://github.com/jxzhen/aec-2027-editx-lora> (LoRA on top of
`stepfun-ai/Step-Audio-EditX`). The two repos are independent.

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