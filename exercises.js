// ============================================
// EXERCIȚII - Wortfeld GEHEN (Aprofundare)
// Claudia Toth · 5 exerciții interactive (sursă: fișa proprie © 2025)
// ============================================

function normalizeAnswer(str) {
    return (str || '').toString().toLowerCase().trim()
        .replace(/ß/g, 'ss')
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
        .replace(/[ăâ]/g, 'a').replace(/î/g, 'i')
        .replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
        .replace(/…/g, '...')
        .replace(/\s*\.\.\.\s*/g, ' ')
        .replace(/\s*\/\s*/g, ' ')
        .replace(/\s*,\s*/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/[.!?;:]/g, '');
}

function shuffleArr(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ============================================
// EX1: Click-Match verb ↔ RO
// ============================================
const ex1Pairs = [
    { de: 'bummeln', ro: 'a hoinări (fără grabă)' },
    { de: 'schlendern', ro: 'a se plimba relaxat' },
    { de: 'eilen', ro: 'a se grăbi' },
    { de: 'flitzen', ro: 'a fugi foarte repede' },
    { de: 'rennen', ro: 'a fugi' },
    { de: 'schleichen', ro: 'a se furișa' },
    { de: 'stapfen', ro: 'a călca apăsat (zăpadă)' },
    { de: 'stolpern', ro: 'a se împiedica' },
    { de: 'stürzen', ro: 'a cădea brusc' },
    { de: 'wandern', ro: 'a merge în drumeție' },
    { de: 'überqueren', ro: 'a traversa' },
    { de: 'torkeln', ro: 'a merge clătinându-se' }
];
const ex1State = { matched: {}, selectedDE: null, selectedRO: null };

function buildEx1() {
    const container = document.getElementById('ex1-container');
    if (!container) return;
    ex1State.matched = {}; ex1State.selectedDE = null; ex1State.selectedRO = null;
    const shuffledRO = shuffleArr(ex1Pairs.map(p => p.ro));
    let deHTML = ''; ex1Pairs.forEach(p => { deHTML += `<div class="dm-tile dm-de" data-de="${p.de}" onclick="ex1ClickDE(this)">${p.de}</div>`; });
    let roHTML = ''; shuffledRO.forEach(ro => { roHTML += `<div class="dm-tile dm-ro" data-ro="${ro}" onclick="ex1ClickRO(this)">${ro}</div>`; });
    container.innerHTML = `
        <div class="exercise-instruction"><strong>🔗 Asociază verbul cu traducerea.</strong><br>Click pe un verb din stânga, apoi pe traducerea corectă din dreapta.</div>
        <div class="dm-board">
            <div class="dm-col"><div class="dm-col-title">🇩🇪 Verbe</div>${deHTML}</div>
            <div class="dm-col"><div class="dm-col-title">🇷🇴 Traduceri</div>${roHTML}</div>
        </div>
        <div class="dm-status" id="ex1-status">Perechi formate: 0 / ${ex1Pairs.length}</div>`;
}
function ex1ClickDE(el) { if (el.classList.contains('dm-correct')) return; document.querySelectorAll('.dm-de').forEach(t => t.classList.remove('dm-selected')); el.classList.add('dm-selected'); ex1State.selectedDE = el; ex1TryMatch(); }
function ex1ClickRO(el) { if (el.classList.contains('dm-correct')) return; document.querySelectorAll('.dm-ro').forEach(t => t.classList.remove('dm-selected')); el.classList.add('dm-selected'); ex1State.selectedRO = el; ex1TryMatch(); }
function ex1TryMatch() {
    if (!ex1State.selectedDE || !ex1State.selectedRO) return;
    const de = ex1State.selectedDE.dataset.de, ro = ex1State.selectedRO.dataset.ro;
    const pair = ex1Pairs.find(p => p.de === de);
    if (pair && pair.ro === ro) {
        ex1State.selectedDE.classList.remove('dm-selected'); ex1State.selectedRO.classList.remove('dm-selected');
        ex1State.selectedDE.classList.add('dm-correct'); ex1State.selectedRO.classList.add('dm-correct');
        ex1State.matched[de] = ro;
    } else {
        const wD = ex1State.selectedDE, wR = ex1State.selectedRO;
        wD.classList.add('dm-wrong'); wR.classList.add('dm-wrong');
        setTimeout(() => { wD.classList.remove('dm-wrong', 'dm-selected'); wR.classList.remove('dm-wrong', 'dm-selected'); }, 700);
    }
    ex1State.selectedDE = null; ex1State.selectedRO = null;
    const s = document.getElementById('ex1-status'); if (s) s.textContent = `Perechi formate: ${Object.keys(ex1State.matched).length} / ${ex1Pairs.length}`;
}
function checkEx1() { return { correct: Object.keys(ex1State.matched).length, total: ex1Pairs.length }; }
function resetEx1() { buildEx1(); const s = document.getElementById('score-1'); if (s) s.textContent = ''; }

// ============================================
// Helper generic pentru exerciții multiple-choice
// ============================================
function buildMC(containerId, items, instruction, picked) {
    const container = document.getElementById(containerId + '-container');
    if (!container) return;
    let html = `<div class="exercise-instruction">${instruction}</div>`;
    items.forEach((item, idx) => {
        let opts = '';
        item.options.forEach((opt, oi) => {
            opts += `<div class="mistake-opt" data-item="${item.id}" data-i="${oi}" onclick="mcPick('${containerId}','${item.id}',${oi},this)"><span class="mistake-opt-letter">${String.fromCharCode(65 + oi)}.</span> ${opt}</div>`;
        });
        html += `<div class="exercise-item"><span class="exercise-number">${idx + 1}</span><div class="input-group"><label>${item.q}</label><div class="mistake-options" id="${containerId}-opts-${item.id}">${opts}</div></div><div class="feedback" id="${containerId}-f${item.id}"></div></div>`;
    });
    container.innerHTML = html;
}
const mcPicked = {};
function mcPick(containerId, itemId, optIdx, el) {
    mcPicked[containerId + '-' + itemId] = optIdx;
    const c = document.getElementById(`${containerId}-opts-${itemId}`);
    if (c) c.querySelectorAll('.mistake-opt').forEach(o => o.classList.remove('mistake-picked'));
    el.classList.add('mistake-picked');
}
function checkMC(containerId, items) {
    let correct = 0;
    items.forEach(item => {
        const fb = document.getElementById(`${containerId}-f${item.id}`);
        const pick = mcPicked[containerId + '-' + item.id];
        const correctText = item.options[item.correct];
        if (pick === item.correct) { fb.className = 'feedback correct'; fb.textContent = `✓ Corect: ${correctText} — ${item.explanation}`; correct++; }
        else { fb.className = 'feedback incorrect'; fb.textContent = `✗ Corect: ${correctText} — ${item.explanation}`; }
    });
    return { correct, total: items.length };
}

// ============================================
// EX2: Welches Verb passt? (context → verb)
// ============================================
const ex2Items = [
    { id: 'a', q: '🐱 Pisica se mișcă în liniște, pe ascuns, prin iarbă.', options: ['marschieren', 'schleichen', 'stapfen', 'rennen'], correct: 1, explanation: 'schleichen = a se furișa (în liniște).' },
    { id: 'b', q: '🛍️ Mergem fără nicio grabă prin centrul vechi, ca să ne bucurăm.', options: ['bummeln', 'hetzen', 'stürzen', 'waten'], correct: 0, explanation: 'bummeln = a hoinări, fără grabă.' },
    { id: 'c', q: '🚗 O mașină foarte rapidă trece cu zgomot pe lângă noi.', options: ['spazieren', 'sausen', 'trotten', 'wanken'], correct: 1, explanation: 'sausen = a trece vijelios, cu zgomot.' },
    { id: 'd', q: '🥁 Soldații merg în ritm, în grup, prin oraș.', options: ['marschieren', 'schlendern', 'stolpern', 'eilen'], correct: 0, explanation: 'marschieren = a mărșălui (în ritm).' },
    { id: 'e', q: '❄️ Mergi greu, cu efort, prin zăpada adâncă.', options: ['flitzen', 'stapfen', 'bummeln', 'überqueren'], correct: 1, explanation: 'stapfen = a călca apăsat prin zăpadă/noroi.' },
    { id: 'f', q: '🍺 Bețivul nu poate merge drept, se mișcă instabil.', options: ['torkeln', 'wandern', 'rennen', 'marschieren'], correct: 0, explanation: 'torkeln = a merge clătinându-se.' },
    { id: 'g', q: '🚦 Trecem strada pe partea cealaltă.', options: ['überqueren', 'schleichen', 'trotten', 'hasten'], correct: 0, explanation: 'überqueren = a traversa.' },
    { id: 'h', q: '⛰️ Facem o tură lungă pe jos în munți.', options: ['wandern', 'sausen', 'stolpern', 'trampeln'], correct: 0, explanation: 'wandern = a merge în drumeție.' }
];
function buildEx2() { buildMC('ex2', ex2Items, '<strong>🎯 Care verb se potrivește?</strong><br>Alege verbul precis pentru fiecare situație.', mcPicked); }
function checkEx2() { return checkMC('ex2', ex2Items); }
function resetEx2() { ex2Items.forEach(i => delete mcPicked['ex2-' + i.id]); buildEx2(); const s = document.getElementById('score-2'); if (s) s.textContent = ''; }

// ============================================
// EX3: Ergänze richtig (completare — forme din fișă)
// ============================================
const ex3Items = [
    { id: 'a', before: 'Letzte Woche', after: 'mein Cousin zur U-Bahn, weil er verschlafen hatte.', answer: 'eilte', accept: ['hastete'], ro: 'S-a grăbit la metrou (eilte / hastete).' },
    { id: 'b', before: 'Der Spion', after: 'sich an James Bond heran.', answer: 'schlich', ro: 'S-a apropiat pe furiș (schleichen → schlich).' },
    { id: 'c', before: 'Als es sehr kalt war,', after: 'ich durch den tiefen Schnee.', answer: 'stapfte', ro: 'Am călcat apăsat prin zăpadă (stapfen → stapfte).' },
    { id: 'd', before: 'Vor lauter Freude', after: 'ich hoch in die Luft.', answer: 'sprang', accept: ['huepfte', 'hüpfte'], ro: 'Am sărit de bucurie (sprang / hüpfte).' },
    { id: 'e', before: 'Meine Cousine', after: 'über die Schultasche ihrer Freundin.', answer: 'stolperte', ro: 'S-a împiedicat de ghiozdan (stolpern → stolperte).' },
    { id: 'f', before: 'Am Wochenende', after: 'ich gemütlich durch den Park.', answer: 'spazierte', accept: ['schlenderte', 'bummelte'], ro: 'M-am plimbat agale (spazierte / schlenderte / bummelte).' },
    { id: 'g', before: 'Ein hungriger Bär', after: 'durch den dichten Wald in Slowenien.', answer: 'trottet', accept: ['trottete'], ro: 'Merge alene (trotten → trottet).' },
    { id: 'h', before: 'Die Buben wollen vor dem Läuten aus der Klasse', after: '.', answer: 'flitzen', accept: ['rennen', 'laufen'], ro: 'Vor să zboare afară din clasă (flitzen / rennen).' }
];
function buildEx3() {
    const container = document.getElementById('ex3-container');
    if (!container) return;
    let html = `<div class="exercise-instruction"><strong>✍️ Completează cu verbul potrivit.</strong><br>Cuvinte de ajutor: <em>eilte · hastete · schlich · stapfte · sprang · hüpfte · stolperte · spazierte · schlenderte · bummelte · trottet · flitzen · rennen</em></div>`;
    ex3Items.forEach((item, idx) => {
        html += `<div class="exercise-item"><span class="exercise-number">${idx + 1}</span><div class="input-group"><label>${item.before} <input type="text" id="ex3-${item.id}" placeholder="..." style="width:140px;display:inline-block;"> ${item.after}</label><div style="color:#6b7280;font-size:0.85rem;font-style:italic;margin-top:4px;">🇷🇴 ${item.ro}</div></div><div class="feedback" id="ex3-f${item.id}"></div></div>`;
    });
    container.innerHTML = html;
}
function checkEx3() {
    let correct = 0;
    ex3Items.forEach(item => {
        const input = document.getElementById(`ex3-${item.id}`), fb = document.getElementById(`ex3-f${item.id}`);
        if (!input || !fb) return;
        const ua = normalizeAnswer(input.value);
        const valid = [item.answer, ...(item.accept || [])].map(normalizeAnswer);
        if (ua && valid.includes(ua)) { fb.className = 'feedback correct'; fb.textContent = `✓ Corect: ${item.answer}`; correct++; }
        else { fb.className = 'feedback incorrect'; fb.textContent = `✗ Corect: ${item.answer}`; }
    });
    return { correct, total: ex3Items.length };
}
function resetEx3() { buildEx3(); const s = document.getElementById('score-3'); if (s) s.textContent = ''; }

// ============================================
// EX4: Ersetze „gehen" — alege verbul mai potrivit
// ============================================
const ex4Items = [
    { id: 'a', q: 'Die Katze <strong>geht</strong> heimlich durch den Garten.', options: ['schleicht', 'marschiert', 'watet', 'eilt'], correct: 0, explanation: 'pe ascuns → schleichen (schleicht).' },
    { id: 'b', q: 'Anna <strong>geht</strong> schnell zum Bus, weil sie verschlafen hat.', options: ['eilt', 'schlendert', 'trottet', 'bummelt'], correct: 0, explanation: 'în grabă → eilen (eilt).' },
    { id: 'c', q: 'Die Kinder <strong>gehen</strong> durch den tiefen Schnee.', options: ['stapfen', 'flitzen', 'schleichen', 'überqueren'], correct: 0, explanation: 'prin zăpadă → stapfen.' },
    { id: 'd', q: 'Der Mann <strong>geht</strong> mit seinem Hund auf die Alm.', options: ['wandert', 'hetzt', 'torkelt', 'stürzt'], correct: 0, explanation: 'tură la munte → wandern (wandert).' },
    { id: 'e', q: 'Die Soldaten <strong>gehen</strong> die Straße entlang.', options: ['marschieren', 'bummeln', 'waten', 'stolpern'], correct: 0, explanation: 'în ritm, grup → marschieren.' },
    { id: 'f', q: 'Silvia <strong>geht</strong> langsam an den Auslagen der Geschäfte vorbei.', options: ['schlendert', 'saust', 'hastet', 'trampelt'], correct: 0, explanation: 'relaxat la vitrine → schlendern (schlendert).' },
    { id: 'g', q: 'Felix <strong>geht</strong> über die Straße.', options: ['überquert', 'wandert', 'schleicht', 'torkelt'], correct: 0, explanation: 'peste stradă → überqueren (überquert).' },
    { id: 'h', q: 'Der Betrunkene <strong>geht</strong> den Weg entlang.', options: ['torkelt', 'marschiert', 'spaziert', 'flitzt'], correct: 0, explanation: 'instabil → torkeln (torkelt).' }
];
function buildEx4() { buildMC('ex4', ex4Items, '<strong>🔄 Înlocuiește „gehen" cu un verb mai expresiv.</strong><br>Alege varianta care descrie cel mai bine cum se mișcă.', mcPicked); }
function checkEx4() { return checkMC('ex4', ex4Items); }
function resetEx4() { ex4Items.forEach(i => delete mcPicked['ex4-' + i.id]); buildEx4(); const s = document.getElementById('score-4'); if (s) s.textContent = ''; }

// ============================================
// EX5: Sortează verbele pe nuanțe (4 categorii)
// ============================================
const ex5Items = [
    { v: 'bummeln', c: 'relax' }, { v: 'schlendern', c: 'relax' }, { v: 'spazieren', c: 'relax' },
    { v: 'eilen', c: 'speed' }, { v: 'rennen', c: 'speed' }, { v: 'flitzen', c: 'speed' },
    { v: 'stapfen', c: 'heavy' }, { v: 'trampeln', c: 'heavy' }, { v: 'waten', c: 'heavy' },
    { v: 'schleichen', c: 'sneak' }, { v: 'torkeln', c: 'sneak' }, { v: 'stolpern', c: 'sneak' }
];
const ex5Cats = { relax: '🐌 Relaxat', speed: '🏃 Viteză', heavy: '🥾 Greoi', sneak: '🤫 Furiș / nesigur' };
const ex5State = { placed: {}, selected: null };
function buildEx5() {
    const container = document.getElementById('ex5-container');
    if (!container) return;
    ex5State.placed = {}; ex5State.selected = null;
    ex5Items.forEach(it => ex5State.placed[it.v] = null);
    const pool = shuffleArr(ex5Items.map(it => it.v));
    let poolHTML = ''; pool.forEach(v => { poolHTML += `<div class="sort-tile" data-verb="${v}" onclick="ex5SelectVerb(this)">${v}</div>`; });
    let colsHTML = '';
    Object.keys(ex5Cats).forEach(key => {
        colsHTML += `<div class="sort-col" data-cat="${key}" onclick="ex5DropTo('${key}')"><div class="sort-col-title">${ex5Cats[key]}</div><div class="sort-col-body" id="ex5-col-${key}"></div></div>`;
    });
    container.innerHTML = `
        <div class="exercise-instruction"><strong>🗂️ Sortează verbele după nuanță.</strong><br>Click pe un verb, apoi pe categoria potrivită. Dacă greșești, verbul rămâne în rezervor.</div>
        <div class="sort-pool" id="ex5-pool">${poolHTML}</div>
        <div class="sort-cols">${colsHTML}</div>
        <div class="dm-status" id="ex5-status">Verbe sortate: 0 / ${ex5Items.length}</div>`;
}
function ex5SelectVerb(el) { document.querySelectorAll('#ex5-pool .sort-tile').forEach(t => t.classList.remove('sort-selected')); el.classList.add('sort-selected'); ex5State.selected = el.dataset.verb; }
function ex5DropTo(cat) {
    if (!ex5State.selected) return;
    const verb = ex5State.selected, item = ex5Items.find(it => it.v === verb);
    if (!item) return;
    const col = document.getElementById('ex5-col-' + cat);
    const tileInPool = document.querySelector(`#ex5-pool .sort-tile[data-verb="${verb}"]`);
    if (item.c === cat) {
        if (tileInPool) tileInPool.remove();
        const placed = document.createElement('div'); placed.className = 'sort-tile sort-placed'; placed.textContent = verb;
        col.appendChild(placed); ex5State.placed[verb] = cat; ex5State.selected = null;
    } else {
        if (tileInPool) { tileInPool.classList.add('sort-wrong'); setTimeout(() => tileInPool.classList.remove('sort-wrong', 'sort-selected'), 700); }
        ex5State.selected = null;
    }
    const placedCount = Object.values(ex5State.placed).filter(v => v !== null).length;
    const s = document.getElementById('ex5-status'); if (s) s.textContent = `Verbe sortate: ${placedCount} / ${ex5Items.length}`;
}
function checkEx5() { return { correct: Object.values(ex5State.placed).filter(v => v !== null).length, total: ex5Items.length }; }
function resetEx5() { buildEx5(); const s = document.getElementById('score-5'); if (s) s.textContent = ''; }

// ============================================
// BUILD
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    buildEx1(); buildEx2(); buildEx3(); buildEx4(); buildEx5();
});
