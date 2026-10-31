/* VibeVoice-based Audio Editing -- local experiment dashboard
   Loads two JSONs (audio editing + ASR), renders them as tables,
   no external dependencies. */

(function () {
    "use strict";

    // ---- helpers ----

    function basename(p) {
        if (!p) return "";
        var m = String(p).match(/[^\\/]+$/);
        return m ? m[0] : p;
    }

    function escapeHtml(s) {
        if (s === null || s === undefined) return "";
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function fmt(v, digits) {
        digits = (digits === undefined) ? 2 : digits;
        if (v === null || v === undefined) return "--";
        if (typeof v === "number" && isNaN(v)) return "--";
        if (typeof v === "number" && !isFinite(v)) return (v > 0 ? "+inf" : "-inf");
        return Number(v).toFixed(digits);
    }

    function fetchJson(url) {
        return fetch(url, { cache: "no-cache" })
            .then(function (r) {
                if (!r.ok) throw new Error("HTTP " + r.status);
                return r.json();
            });
    }

    // ---- audio editing table ----

    function renderAudioEditing(rows) {
        var tbody = document.getElementById("aeBody");
        if (!rows || rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="11">No audio editing results yet. ' +
                'Run <code>benchmarks/audio_editing/aggregate.py</code> in the weight repo.</td></tr>';
            return;
        }
        tbody.innerHTML = rows.map(function (r) {
            var region = "[" + fmt(r.region_start) + ", " + fmt(r.region_end) + "] s";
            var params = (r.n_params_B_total === null || r.n_params_B_total === undefined)
                ? "--" : fmt(r.n_params_B_total);
            var audio = r.audio
                ? "<code>" + escapeHtml(basename(r.audio)) + "</code>"
                : "<em>n/a</em>";
            var prov = r.provenance
                ? escapeHtml(r.provenance)
                : "<em>not stated</em>";
            return "<tr>" +
                "<td><strong>" + escapeHtml(r.system || "") + "</strong></td>" +
                "<td>" + audio + "</td>" +
                "<td>" + escapeHtml((r.text_instruction || "").slice(0, 50)) + "</td>" +
                "<td>" + escapeHtml(region) + "</td>" +
                "<td>" + fmt(r.si_sdr) + "</td>" +
                "<td>" + fmt(r.pesq) + "</td>" +
                "<td>" + fmt(r.stoi) + "</td>" +
                "<td>" + fmt(r.mel_l1) + "</td>" +
                "<td>" + fmt(r.lsd) + "</td>" +
                "<td>" + params + "</td>" +
                "<td class=\"prov\">" + prov + "</td>" +
                "</tr>";
        }).join("");
    }

    // ---- ASR table ----

    function renderAsr(rows) {
        var tbody = document.getElementById("asrBody");
        if (!rows || rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8">No ASR results yet. ' +
                'Run <code>benchmarks/aggregate.py</code> in the weight repo.</td></tr>';
            return;
        }
        tbody.innerHTML = rows.map(function (r) {
            var excerpt = (r.transcript || "").replace(/\s+/g, " ").slice(0, 80);
            return "<tr>" +
                "<td><strong>" + escapeHtml(r.system || "") + "</strong></td>" +
                "<td><code>" + escapeHtml(basename(r.audio)) + "</code></td>" +
                "<td>" + escapeHtml(r.language || "") + "</td>" +
                "<td>" + fmt(r.audio_seconds) + "</td>" +
                "<td>" + fmt(r.generation_seconds) + "</td>" +
                "<td>" + fmt(r.rtf) + "</td>" +
                "<td>" + fmt(r.n_params_B) + "</td>" +
                "<td>" + escapeHtml(excerpt) + "</td>" +
                "</tr>";
        }).join("");
    }

    // ---- loaders ----

    function loadAudioEditing() {
        fetchJson("data/summary.json")
            .then(renderAudioEditing)
            .catch(function (err) {
                console.warn("[summary] failed:", err);
                renderAudioEditing([]);
            });
    }

    function loadAsr() {
        fetchJson("data/asr_summary.json")
            .then(renderAsr)
            .catch(function (err) {
                console.warn("[asr_summary] failed:", err);
                renderAsr([]);
            });
    }

    // ---- init ----

    document.addEventListener("DOMContentLoaded", function () {
        loadAudioEditing();
        loadAsr();
    });

})();