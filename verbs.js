// ============================================
// VERB-KONJUGATION - Wortfeld GEHEN (Aprofundare)
// Claudia Toth · verbele-cheie · PONS-verified
// Präteritum = IMPERFECT (timp scris). Perfekt = timp vorbit.
// ============================================

const verbsData = [
    {
        infinitiv: 'laufen', ro: 'a alerga / a merge', type: 'strong', aux: 'sein',
        praesens: [
            { p: 'ich', f: 'laufe', ro: 'alerg' },
            { p: 'du', f: 'läufst', ro: 'alergi' },
            { p: 'er/sie/es', f: 'läuft', ro: 'aleargă' },
            { p: 'wir', f: 'laufen', ro: 'alergăm' },
            { p: 'ihr', f: 'lauft', ro: 'alergați' },
            { p: 'sie/Sie', f: 'laufen', ro: 'aleargă / alergați' }
        ],
        praeteritum: [
            { p: 'ich', f: 'lief', ro: 'alergam' },
            { p: 'du', f: 'liefst', ro: 'alergai' },
            { p: 'er/sie/es', f: 'lief', ro: 'alerga' },
            { p: 'wir', f: 'liefen', ro: 'alergam (noi)' },
            { p: 'ihr', f: 'lieft', ro: 'alergați' },
            { p: 'sie/Sie', f: 'liefen', ro: 'alergau' }
        ],
        perfekt: 'er ist gelaufen', perfektRo: 'a alergat',
        notes: 'Verb tare (neregulat): a→äu la persoana a 2-a și a 3-a Präsens (du läufst, er läuft). Perfekt cu SEIN (verb de mișcare).'
    },
    {
        infinitiv: 'rennen', ro: 'a fugi', type: 'strong', aux: 'sein',
        praesens: [
            { p: 'ich', f: 'renne', ro: 'fug' },
            { p: 'du', f: 'rennst', ro: 'fugi' },
            { p: 'er/sie/es', f: 'rennt', ro: 'fuge' },
            { p: 'wir', f: 'rennen', ro: 'fugim' },
            { p: 'ihr', f: 'rennt', ro: 'fugiți' },
            { p: 'sie/Sie', f: 'rennen', ro: 'fug / fugiți' }
        ],
        praeteritum: [
            { p: 'ich', f: 'rannte', ro: 'fugeam' },
            { p: 'du', f: 'ranntest', ro: 'fugeai' },
            { p: 'er/sie/es', f: 'rannte', ro: 'fugea' },
            { p: 'wir', f: 'rannten', ro: 'fugeam (noi)' },
            { p: 'ihr', f: 'ranntet', ro: 'fugeați' },
            { p: 'sie/Sie', f: 'rannten', ro: 'fugeau' }
        ],
        perfekt: 'er ist gerannt', perfektRo: 'a fugit',
        notes: 'Verb mixt (neregulat): schimbă vocala (rennen → rannte → gerannt) DAR ia terminații de verb regulat. Perfekt cu SEIN.'
    },
    {
        infinitiv: 'schleichen', ro: 'a se furișa', type: 'strong', aux: 'sein',
        praesens: [
            { p: 'ich', f: 'schleiche', ro: 'mă furișez' },
            { p: 'du', f: 'schleichst', ro: 'te furișezi' },
            { p: 'er/sie/es', f: 'schleicht', ro: 'se furișează' },
            { p: 'wir', f: 'schleichen', ro: 'ne furișăm' },
            { p: 'ihr', f: 'schleicht', ro: 'vă furișați' },
            { p: 'sie/Sie', f: 'schleichen', ro: 'se furișează / vă furișați' }
        ],
        praeteritum: [
            { p: 'ich', f: 'schlich', ro: 'mă furișam' },
            { p: 'du', f: 'schlichst', ro: 'te furișai' },
            { p: 'er/sie/es', f: 'schlich', ro: 'se furișa' },
            { p: 'wir', f: 'schlichen', ro: 'ne furișam' },
            { p: 'ihr', f: 'schlicht', ro: 'vă furișați' },
            { p: 'sie/Sie', f: 'schlichen', ro: 'se furișau' }
        ],
        perfekt: 'er ist geschlichen', perfektRo: 's-a furișat',
        notes: 'Verb tare (neregulat): ei→i (schleichen → schlich → geschlichen). Perfekt cu SEIN. Reflexiv: sich anschleichen = a se apropia pe furiș.'
    },
    {
        infinitiv: 'springen', ro: 'a sări', type: 'strong', aux: 'sein',
        praesens: [
            { p: 'ich', f: 'springe', ro: 'sar' },
            { p: 'du', f: 'springst', ro: 'sari' },
            { p: 'er/sie/es', f: 'springt', ro: 'sare' },
            { p: 'wir', f: 'springen', ro: 'sărim' },
            { p: 'ihr', f: 'springt', ro: 'săriți' },
            { p: 'sie/Sie', f: 'springen', ro: 'sar / săriți' }
        ],
        praeteritum: [
            { p: 'ich', f: 'sprang', ro: 'săream' },
            { p: 'du', f: 'sprangst', ro: 'săreai' },
            { p: 'er/sie/es', f: 'sprang', ro: 'sărea' },
            { p: 'wir', f: 'sprangen', ro: 'săream (noi)' },
            { p: 'ihr', f: 'sprangt', ro: 'săreați' },
            { p: 'sie/Sie', f: 'sprangen', ro: 'săreau' }
        ],
        perfekt: 'er ist gesprungen', perfektRo: 'a sărit',
        notes: 'Verb tare (neregulat): i→a→u (springen → sprang → gesprungen). Perfekt cu SEIN. Apare în dialog: vor Freude in die Luft springen.'
    },
    {
        infinitiv: 'spazieren', ro: 'a se plimba', type: 'weak', aux: 'sein',
        praesens: [
            { p: 'ich', f: 'spaziere', ro: 'mă plimb' },
            { p: 'du', f: 'spazierst', ro: 'te plimbi' },
            { p: 'er/sie/es', f: 'spaziert', ro: 'se plimbă' },
            { p: 'wir', f: 'spazieren', ro: 'ne plimbăm' },
            { p: 'ihr', f: 'spaziert', ro: 'vă plimbați' },
            { p: 'sie/Sie', f: 'spazieren', ro: 'se plimbă / vă plimbați' }
        ],
        praeteritum: [
            { p: 'ich', f: 'spazierte', ro: 'mă plimbam' },
            { p: 'du', f: 'spaziertest', ro: 'te plimbai' },
            { p: 'er/sie/es', f: 'spazierte', ro: 'se plimba' },
            { p: 'wir', f: 'spazierten', ro: 'ne plimbam' },
            { p: 'ihr', f: 'spaziertet', ro: 'vă plimbați' },
            { p: 'sie/Sie', f: 'spazierten', ro: 'se plimbau' }
        ],
        perfekt: 'er ist spaziert', perfektRo: 's-a plimbat',
        notes: 'Verb REGULAT, model pentru grupul de verbe slabe din Wortfeld. 🚨 Verbele în -ieren NU iau „ge-" la Partizip: spaziert, marschiert (NU gespaziert). Perfekt cu SEIN (mișcare).'
    }
];

function buildVerbs() {
    const container = document.getElementById('verbs-container');
    if (!container) return;
    let html = `
        <div class="theory-box" style="background:#F5F0E8;border-left:4px solid #D4A574">
            <h4>📌 Cum se conjugă verbele din Wortfeld GEHEN?</h4>
            <p>Cele mai multe sunt <strong>REGULATE</strong> (rădăcină + <strong>-te</strong> la Präteritum: bummeln → bummelte). Doar câteva sunt <strong>TARI / neregulate</strong> — pe acelea le vezi complet mai jos.</p>
            <p style="margin-top:8px"><strong>Reamintire:</strong> Präteritum = IMPERFECT (el alerga, el sărea). Perfekt = perfect compus (el a alergat). Aproape toate sunt verbe de mișcare → Perfekt cu <strong>SEIN</strong>.</p>
        </div>
    `;
    verbsData.forEach((v, idx) => {
        const auxColor = v.aux === 'sein' ? '#3b82f6' : '#10b981';
        const typeColor = v.type === 'strong' ? '#dc2626' : '#10b981';
        const typeLabel = v.type === 'strong' ? 'TARE (neregulat)' : 'REGULAT';
        let praesensRows = ''; v.praesens.forEach(r => { praesensRows += `<tr><td><strong>${r.p}</strong></td><td class="verb">${r.f}</td><td class="ro-text">${r.ro}</td></tr>`; });
        let praeteritumRows = ''; v.praeteritum.forEach(r => { praeteritumRows += `<tr><td><strong>${r.p}</strong></td><td class="verb">${r.f}</td><td class="ro-text">${r.ro}</td></tr>`; });
        html += `
            <div class="sub-section">
                <div class="sub-section-header" onclick="toggleSubSection(${idx + 100})">
                    <span><strong>${idx + 1}. ${v.infinitiv}</strong> — <em>${v.ro}</em>
                        <span style="background:${typeColor};color:white;padding:2px 8px;border-radius:4px;font-size:0.8rem;margin-left:8px">${typeLabel}</span>
                        <span style="background:${auxColor};color:white;padding:2px 8px;border-radius:4px;font-size:0.8rem;margin-left:4px">Perfekt + ${v.aux}</span>
                    </span>
                    <span class="sub-arrow">▼</span>
                </div>
                <div class="sub-section-content" id="sub-section-${idx + 100}">
                    <h4 style="color:#065f46;margin-bottom:8px">📘 Präsens</h4>
                    <table class="grammar-table"><thead><tr><th>Pronume</th><th>Formă</th><th>Traducere RO</th></tr></thead><tbody>${praesensRows}</tbody></table>
                    <h4 style="color:#065f46;margin:14px 0 8px">📗 Präteritum (imperfect / timp scris)</h4>
                    <table class="grammar-table"><thead><tr><th>Pronume</th><th>Formă</th><th>Traducere RO</th></tr></thead><tbody>${praeteritumRows}</tbody></table>
                    <h4 style="color:#065f46;margin:14px 0 8px">📕 Perfekt (timp vorbit)</h4>
                    <div class="example-box"><div class="de">${v.perfekt}</div><div class="ro">${v.perfektRo}</div></div>
                    <div class="theory-box" style="margin-top:12px;background:#FBF7EF"><p><strong>📌 Notă:</strong> ${v.notes}</p></div>
                </div>
            </div>
        `;
    });
    html += `
        <div class="theory-box" style="margin-top:20px;background:#ecfdf5;border-left:4px solid #10b981">
            <h4>🎯 Model pentru verbele REGULATE din Wortfeld</h4>
            <p>Se conjugă identic ca <strong>spazieren</strong> (rădăcină + -te la Präteritum, Perfekt cu sein la mișcare):</p>
            <p style="margin-top:8px"><strong>bummeln, schlendern, wandern, eilen, hasten, hetzen, flitzen, sausen, stapfen, trampeln, waten, trotten, torkeln, wanken, stolpern, marschieren, überqueren, hüpfen.</strong></p>
            <p style="margin-top:8px;color:#5A5147;font-style:italic">Ex: wandern → wanderte → ist gewandert · eilen → eilte → ist geeilt · stolpern → stolperte → ist gestolpert.</p>
        </div>
    `;
    container.innerHTML = html;
}

buildVerbs();
