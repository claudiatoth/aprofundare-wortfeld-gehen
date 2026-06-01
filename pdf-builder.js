// ============================================
// PDF BUILDER — Wortfeld GEHEN (Aprofundare)
// Claudia Toth · model PDF MODEL TV1
// ============================================

(function () {
    if (typeof document === 'undefined') return;
    document.addEventListener('DOMContentLoaded', buildPDF);

    function buildPDF() {
        const root = document.getElementById('pdf-content');
        if (!root) return;
        let html = '';
        html += buildTheory();
        html += buildDialog();
        html += buildExercises();
        html += buildFlashcards();
        html += buildVerbs();
        root.innerHTML = html;
    }

    function buildTheory() {
        if (typeof theoryHTML !== 'string') return '';
        let t = theoryHTML;
        t = t.replace(/<div class="lesson-audio">[\s\S]*?<\/span>\s*<\/div>/g, '');
        t = t.replace(/<button[^>]*onclick="[^"]*"[^>]*>[^<]*<\/button>/g, '');
        t = t.replace(/<div class="sub-section-header"[^>]*>\s*<span>([^<]+)<\/span>\s*<span class="sub-arrow">[^<]*<\/span>\s*<\/div>/g, '<h2 class="sub-chapter">$1</h2>');
        t = t.replace(/<div class="sub-section">/g, '<div>');
        t = t.replace(/<div class="sub-section-content"[^>]*>/g, '<div>');
        t = t.replace(/<div class="theory-box"\s+style="background:\s*#fef3c7[^"]*"[^>]*>/g, '<div class="theory-box warn-box">');
        return `<h1 class="chapter">📘 1. Teorie — Wortfeld GEHEN (verbele lui „a merge")</h1>` + t;
    }

    function buildDialog() {
        if (typeof dialog1Data === 'undefined') return '';
        let html = `<h1 class="chapter new-section">🎬 2. Dialog — ${dialog1Data.title}</h1>`;
        html += `<div class="dlg-context"><strong>📍 Situația:</strong> ${dialog1Data.context}</div>`;
        dialog1Data.replici.forEach(r => {
            const sp = r.speaker === 'andreea' ? 'Andreea' : 'Annette';
            html += `<div class="dlg-line ${r.speaker}"><span class="sp">${sp}:</span> <span class="de">${r.de}</span><br><span class="ro">${r.ro}</span></div>`;
        });
        return html;
    }

    function buildExercises() {
        let html = `<h1 class="chapter new-section">📝 3. Exerciții — cu rezolvări complete</h1>`;

        html += `<div class="ex-block"><h3>Übung 1 — Asociază verb ↔ traducere</h3>
            <div class="instruction">În aplicație: click pe verb + click pe traducere.</div>
            <div class="rezolvare-banner">✓ Rezolvare</div>
            <table><thead><tr><th style="width:35%">🇩🇪 Verb</th><th>🇷🇴 Traducere</th></tr></thead><tbody>`;
        if (typeof ex1Pairs !== 'undefined') ex1Pairs.forEach(p => { html += `<tr><td class="verb">${p.de}</td><td class="ro-text">${p.ro}</td></tr>`; });
        html += `</tbody></table></div>`;

        html += `<div class="ex-block"><h3>Übung 2 — Care verb se potrivește?</h3>
            <div class="instruction">Alege verbul precis pentru fiecare situație.</div>
            <div class="rezolvare-banner">✓ Rezolvare</div>`;
        if (typeof ex2Items !== 'undefined') ex2Items.forEach((it, i) => {
            html += `<div class="ex-item"><span class="ex-num">${i + 1}</span><div class="ex-body"><div class="ex-q">${it.q}</div><div class="ex-a">${it.options[it.correct]}</div><div class="ex-explanation">${it.explanation}</div></div></div>`;
        });
        html += `</div>`;

        html += `<div class="ex-block"><h3>Übung 3 — Ergänze richtig (completează)</h3>
            <div class="instruction">Forma corectă a verbului (multe la Präteritum).</div>
            <div class="rezolvare-banner">✓ Rezolvare</div>`;
        if (typeof ex3Items !== 'undefined') ex3Items.forEach((it, i) => {
            html += `<div class="ex-item"><span class="ex-num">${i + 1}</span><div class="ex-body"><div class="ex-q">${it.before} <strong>[ ${it.answer} ]</strong> ${it.after}</div><div class="ex-a">${it.answer}</div><div class="ex-explanation">🇷🇴 ${it.ro}</div></div></div>`;
        });
        html += `</div>`;

        html += `<div class="ex-block"><h3>Übung 4 — Înlocuiește „gehen"</h3>
            <div class="instruction">Alege verbul care descrie cel mai bine mișcarea.</div>
            <div class="rezolvare-banner">✓ Rezolvare</div>`;
        if (typeof ex4Items !== 'undefined') ex4Items.forEach((it, i) => {
            html += `<div class="ex-item"><span class="ex-num">${i + 1}</span><div class="ex-body"><div class="ex-q">${it.q}</div><div class="ex-a">${it.options[it.correct]}</div><div class="ex-explanation">${it.explanation}</div></div></div>`;
        });
        html += `</div>`;

        html += `<div class="ex-block"><h3>Übung 5 — Sortează verbele pe nuanțe</h3>
            <div class="instruction">Fiecare verb intră într-o categorie de nuanță.</div>
            <div class="rezolvare-banner">✓ Rezolvare — gruparea corectă</div>`;
        if (typeof ex5Items !== 'undefined' && typeof ex5Cats !== 'undefined') {
            html += `<table><thead><tr>`;
            Object.keys(ex5Cats).forEach(k => { html += `<th>${ex5Cats[k]}</th>`; });
            html += `</tr></thead><tbody><tr>`;
            Object.keys(ex5Cats).forEach(k => {
                const verbs = ex5Items.filter(it => it.c === k).map(it => '<strong>' + it.v + '</strong>').join('<br>');
                html += `<td>${verbs}</td>`;
            });
            html += `</tr></tbody></table>`;
        }
        html += `</div>`;
        return html;
    }

    function buildFlashcards() {
        let html = `<h1 class="chapter new-section">📇 4. Vocabular complet (Flashcards)</h1>
            <p style="margin-bottom:14px">Cele <strong>${typeof flashcardsData !== 'undefined' ? flashcardsData.length : 0} de carduri</strong> din Wortfeld GEHEN. Dicționar de referință.</p>
            <div class="flashcards-grid">`;
        if (typeof flashcardsData !== 'undefined') flashcardsData.forEach(c => { html += `<div class="fc-row"><span class="de">${c.de}</span><span class="ro">— ${c.ro}</span></div>`; });
        html += `</div>`;
        return html;
    }

    function buildVerbs() {
        let html = `<h1 class="chapter new-section">🔁 5. Verb-Konjugation — verbele-cheie</h1>
            <div class="theory-box warn-box"><p><strong>📌 Reamintire:</strong> Präteritum = IMPERFECT (el alerga). Perfekt = perfect compus (el a alergat). Cele mai multe verbe de mișcare formează Perfekt cu SEIN.</p></div>`;
        if (typeof verbsData !== 'undefined') verbsData.forEach((v, idx) => {
            const typeBadge = v.type === 'strong' ? '<span class="badge strong">TARE (neregulat)</span>' : '<span class="badge weak">REGULAT</span>';
            const auxBadge = v.aux === 'sein' ? '<span class="badge sein">Perfekt + sein</span>' : '<span class="badge haben">Perfekt + haben</span>';
            html += `<div class="verb-card"><div class="vh"><span class="name">${idx + 1}. ${v.infinitiv}</span><span class="ro">— ${v.ro}</span>${typeBadge}${auxBadge}</div>
                <h5>Präsens</h5><table><thead><tr><th>Pronume</th><th>Formă</th><th>Traducere RO</th></tr></thead><tbody>`;
            v.praesens.forEach(r => { html += `<tr><td><strong>${r.p}</strong></td><td class="verb">${r.f}</td><td class="ro-text">${r.ro}</td></tr>`; });
            html += `</tbody></table><h5>Präteritum (imperfect / timp scris)</h5><table><thead><tr><th>Pronume</th><th>Formă</th><th>Traducere RO</th></tr></thead><tbody>`;
            v.praeteritum.forEach(r => { html += `<tr><td><strong>${r.p}</strong></td><td class="verb">${r.f}</td><td class="ro-text">${r.ro}</td></tr>`; });
            html += `</tbody></table><h5>Perfekt (timp vorbit)</h5><div class="perfekt-box"><div class="de">${v.perfekt}</div><div class="ro">${v.perfektRo}</div></div>
                <div class="note"><strong>📌 Notă:</strong> ${v.notes}</div></div>`;
        });
        html += `<div class="theory-box"><h4>🎯 Model pentru verbele REGULATE din Wortfeld</h4><p>Se conjugă ca <strong>spazieren</strong> (rădăcină + -te): bummeln, schlendern, wandern, eilen, hasten, hetzen, flitzen, sausen, stapfen, trampeln, waten, trotten, torkeln, wanken, stolpern, marschieren, überqueren, hüpfen. Verbele în -ieren NU iau „ge-" (spaziert, marschiert).</p></div>`;
        return html;
    }
})();
