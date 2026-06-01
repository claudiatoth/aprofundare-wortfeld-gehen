// ============================================
// TEST FINAL - Wortfeld GEHEN (Aprofundare)
// Claudia Toth · 15 întrebări mixte
// ============================================

const finalTestData = [
    { type: 'multiple', category: '🎯 Sens verb', question: 'Ce înseamnă „schleichen"?', options: ['a mărșălui', 'a se furișa (în liniște)', 'a traversa', 'a se grăbi'], correct: 'a se furișa (în liniște)', explanation: 'schleichen = a se furișa. Pisica „schleicht durchs Gras".' },
    { type: 'multiple', category: '🎯 Sens verb', question: 'Ce înseamnă „bummeln"?', options: ['a fugi repede', 'a hoinări fără grabă', 'a cădea brusc', 'a tropăi'], correct: 'a hoinări fără grabă', explanation: 'bummeln = a hoinări relaxat. „durch die Altstadt bummeln".' },
    { type: 'multiple', category: '🎯 Sens verb', question: 'Care verb înseamnă „a merge prin apă sau noroi"?', options: ['waten', 'wandern', 'wanken', 'sausen'], correct: 'waten', explanation: 'waten = a merge prin apă/noroi. „durch den Fluss waten".' },
    { type: 'multiple', category: '🎯 Sens verb', question: 'Ce înseamnă „überqueren"?', options: ['a ocoli', 'a traversa', 'a se împiedica', 'a mărșălui'], correct: 'a traversa', explanation: 'überqueren = a traversa. „die Straße überqueren".' },
    { type: 'multiple', category: '🐌 Nuanțe', question: 'Care verb descrie cea mai mare VITEZĂ?', options: ['spazieren', 'trotten', 'flitzen', 'wandern'], correct: 'flitzen', explanation: 'flitzen = a fugi foarte repede (ca o săgeată). spazieren/trotten/wandern sunt lente.' },
    { type: 'multiple', category: '🐌 Nuanțe', question: 'Der Betrunkene ______ auf der Straße.', options: ['marschiert', 'torkelt', 'spaziert', 'flitzt'], correct: 'torkelt', explanation: 'torkeln = a merge clătinându-se (bețivul nu merge drept).' },
    { type: 'multiple', category: '🐌 Nuanțe', question: 'Care verb NU înseamnă „a se grăbi"?', options: ['eilen', 'hasten', 'hetzen', 'schlendern'], correct: 'schlendern', explanation: 'schlendern = a se plimba RELAXAT (opusul grabei). eilen/hasten/hetzen = grabă.' },
    { type: 'luckentext', category: '✍️ Präteritum', question: 'Completează la Präteritum:', sentence: 'Der Spion ______ sich an James Bond heran. (schleichen)', translation: 'Spionul s-a apropiat pe furiș.', accept: ['schlich'], correct: 'schlich', explanation: 'schleichen → schlich (verb tare: ei→i).' },
    { type: 'luckentext', category: '✍️ Präteritum', question: 'Completează la Präteritum:', sentence: 'Ich ______ jeden Morgen im Park. (laufen)', translation: 'Alergam în fiecare dimineață în parc.', accept: ['lief'], correct: 'lief', explanation: 'laufen → lief (verb tare). Imperfect = alergam.' },
    { type: 'luckentext', category: '✍️ Präteritum', question: 'Completează la Präteritum:', sentence: 'Mein Cousin ______ zur U-Bahn. (eilen)', translation: 'Vărul meu se grăbea la metrou.', accept: ['eilte'], correct: 'eilte', explanation: 'eilen → eilte (verb regulat: rădăcină + -te).' },
    { type: 'multiple', category: '🔄 Înlocuiește gehen', question: 'Die Soldaten gehen im Takt durch die Stadt. → mai bine:', options: ['marschieren', 'schlendern', 'stolpern', 'waten'], correct: 'marschieren', explanation: 'în ritm, în grup → marschieren.' },
    { type: 'multiple', category: '🔄 Înlocuiește gehen', question: 'Die Katze geht leise und heimlich. → mai bine:', options: ['rennt', 'schleicht', 'marschiert', 'stürzt'], correct: 'schleicht', explanation: 'în liniște, pe ascuns → schleichen (schleicht).' },
    { type: 'multiple', category: '🔄 Înlocuiește gehen', question: 'Die Kinder gehen durch den tiefen Schnee. → mai bine:', options: ['flitzen', 'stapfen', 'schleichen', 'bummeln'], correct: 'stapfen', explanation: 'greu, prin zăpadă → stapfen.' },
    { type: 'multiple', category: '✍️ Präteritum', question: 'Verbele în -ieren (spazieren, marschieren) la Partizip II:', options: ['iau „ge-" (gespaziert)', 'NU iau „ge-" (spaziert)', 'se termină în -en', 'sunt mereu cu haben'], correct: 'NU iau „ge-" (spaziert)', explanation: 'Verbele în -ieren formează Partizip FĂRĂ ge-: spaziert, marschiert.' },
    { type: 'multiple', category: '💡 Wortschatz', question: '„flott" înseamnă:', options: ['lent, obosit', 'vioi, repede', 'des, etanș', 'gol'], correct: 'vioi, repede', explanation: 'flott = vioi, sprinten, repede.' }
];

let currentQuestionIndex = 0;
let userAnswers = {};
let testStarted = false;
let testCompleted = false;

function buildFinalTest() {
    const container = document.getElementById('final-test-container');
    if (!container) return;
    container.innerHTML = `
        <div id="test-intro" class="test-intro">
            <h3>🎯 Testează-ți cunoștințele!</h3>
            <p>Test final cu <strong>${finalTestData.length} întrebări</strong> despre Wortfeld GEHEN: sensuri, nuanțe, Präteritum și înlocuirea lui „gehen".</p>
            <ul class="test-info-list">
                <li>📋 Format: o întrebare pe pagină, cu navigare Înapoi / Următor</li>
                <li>✅ Feedback instant la fiecare întrebare</li>
                <li>🎓 Prag de promovare: 70%</li>
                <li>⏱️ Timp estimat: 8-12 minute</li>
            </ul>
            <button class="btn btn-check btn-large" onclick="startFinalTest()">▶ Începe testul</button>
        </div>
        <div id="test-wizard" class="test-wizard" style="display:none;">
            <div class="test-progress">
                <div class="test-progress-info">
                    <span id="progress-text">Întrebarea 1 / ${finalTestData.length}</span>
                    <span id="progress-category"></span>
                </div>
                <div class="test-progress-bar"><div class="test-progress-fill" id="progress-fill"></div></div>
            </div>
            <div id="question-container"></div>
            <div class="feedback" id="test-feedback"></div>
            <div class="test-controls">
                <button class="btn btn-secondary" onclick="prevQuestion()" id="test-prev-btn">← Înapoi</button>
                <button class="btn btn-check" onclick="checkCurrentQuestion()" id="test-check-btn">✓ Verifică</button>
                <button class="btn btn-check" onclick="nextQuestion()" id="test-next-btn">Următor →</button>
            </div>
        </div>
        <div id="test-results" class="test-results" style="display:none;"></div>
    `;
}

function startFinalTest() {
    testStarted = true; testCompleted = false; currentQuestionIndex = 0; userAnswers = {};
    document.getElementById('test-intro').style.display = 'none';
    document.getElementById('test-wizard').style.display = 'block';
    document.getElementById('test-results').style.display = 'none';
    showQuestion(0);
}

function showQuestion(index) {
    const q = finalTestData[index];
    const container = document.getElementById('question-container');
    const feedback = document.getElementById('test-feedback');
    const checkBtn = document.getElementById('test-check-btn');
    const nextBtn = document.getElementById('test-next-btn');
    const prevBtn = document.getElementById('test-prev-btn');
    document.getElementById('progress-text').textContent = `Întrebarea ${index + 1} / ${finalTestData.length}`;
    document.getElementById('progress-category').textContent = q.category;
    document.getElementById('progress-fill').style.width = `${((index + 1) / finalTestData.length) * 100}%`;
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = index === finalTestData.length - 1 ? '🏁 Finalizează' : 'Următor →';
    feedback.className = 'feedback'; feedback.textContent = '';
    let questionHTML = '';
    if (q.type === 'matching' || q.type === 'multiple') {
        let optionsHTML = '';
        q.options.forEach((opt, i) => { optionsHTML += `<div class="mc-option"><input type="radio" name="test-answer" value="${opt}" id="test-opt-${i}"><label for="test-opt-${i}">${opt}</label></div>`; });
        questionHTML = `<div class="test-question"><div class="test-question-label">${q.question}</div><div class="mc-options test-mc">${optionsHTML}</div></div>`;
    } else if (q.type === 'luckentext') {
        questionHTML = `<div class="test-question"><div class="test-question-label">${q.question}</div><div class="test-question-content">${q.sentence}</div><small class="test-translation">💬 ${q.translation}</small><input type="text" id="test-answer" class="test-input" placeholder="Scrie răspunsul..."></div>`;
    } else if (q.type === 'translate') {
        questionHTML = `<div class="test-question"><div class="test-question-label">${q.question}</div><div class="test-question-content test-ro-text">🇷🇴 ${q.ro}</div><input type="text" id="test-answer" class="test-input" placeholder="Traducere în germană..."></div>`;
    }
    container.innerHTML = questionHTML;
    if (userAnswers[index] !== undefined) {
        if (q.type === 'multiple' || q.type === 'matching') {
            const radio = document.querySelector(`input[name="test-answer"][value="${userAnswers[index].answer}"]`);
            if (radio) radio.checked = true;
        } else {
            const input = document.getElementById('test-answer');
            if (input) input.value = userAnswers[index].answer;
        }
        if (userAnswers[index].checked) { displayFeedback(index); checkBtn.disabled = true; setAnswerDisabled(q.type, true); }
        else { checkBtn.disabled = false; setAnswerDisabled(q.type, false); }
    } else { checkBtn.disabled = false; setAnswerDisabled(q.type, false); }
}

function setAnswerDisabled(type, disabled) {
    if (type === 'multiple' || type === 'matching') { document.querySelectorAll('input[name="test-answer"]').forEach(r => r.disabled = disabled); }
    else { const el = document.getElementById('test-answer'); if (el) el.disabled = disabled; }
}

function checkCurrentQuestion() {
    const q = finalTestData[currentQuestionIndex];
    let userAnswer = '';
    if (q.type === 'multiple' || q.type === 'matching') { const sel = document.querySelector('input[name="test-answer"]:checked'); userAnswer = sel ? sel.value : ''; }
    else { const input = document.getElementById('test-answer'); userAnswer = input ? input.value.trim() : ''; }
    if (!userAnswer) { const fb = document.getElementById('test-feedback'); fb.className = 'feedback incorrect'; fb.textContent = 'Te rog să răspunzi înainte de verificare!'; return; }
    function normalizeTestAnswer(s) {
        return s.toLowerCase().replace(/ß/g, 'ss').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
            .replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
            .replace(/…/g, '...').replace(/\s*\.\.\.\s*/g, ' ').replace(/\s*\/\s*/g, ' ').replace(/\s*,\s*/g, ' ')
            .replace(/\s+/g, ' ').replace(/[.!?;:]/g, '').trim();
    }
    let isCorrect = false;
    if (q.type === 'multiple' || q.type === 'matching') { isCorrect = userAnswer.toLowerCase() === q.correct.toLowerCase(); }
    else { const u = normalizeTestAnswer(userAnswer); isCorrect = q.accept.some(a => normalizeTestAnswer(a) === u); }
    userAnswers[currentQuestionIndex] = { answer: userAnswer, correct: isCorrect, checked: true };
    displayFeedback(currentQuestionIndex);
    document.getElementById('test-check-btn').disabled = true;
    setAnswerDisabled(q.type, true);
}

function displayFeedback(index) {
    const q = finalTestData[index], ans = userAnswers[index], feedback = document.getElementById('test-feedback');
    if (ans.correct) { feedback.className = 'feedback correct'; feedback.innerHTML = `<strong>${q.correct}</strong> &mdash; ${q.explanation}`; }
    else { feedback.className = 'feedback incorrect'; feedback.innerHTML = `Răspuns corect: <strong>${q.correct}</strong> &mdash; ${q.explanation}`; }
}

function nextQuestion() { if (currentQuestionIndex === finalTestData.length - 1) { finishTest(); } else { currentQuestionIndex++; showQuestion(currentQuestionIndex); scrollToTest(); } }
function prevQuestion() { if (currentQuestionIndex > 0) { currentQuestionIndex--; showQuestion(currentQuestionIndex); scrollToTest(); } }
function scrollToTest() { const w = document.getElementById('test-wizard'); if (w) w.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

function finishTest() {
    testCompleted = true;
    let correct = 0;
    finalTestData.forEach((q, i) => { if (userAnswers[i] && userAnswers[i].correct) correct++; });
    const total = finalTestData.length, percentage = Math.round((correct / total) * 100), passed = percentage >= 70;
    let emoji, message, messageRo, badge;
    if (percentage === 100) { emoji = '🏆'; badge = 'PERFEKT!'; message = 'Ausgezeichnet!'; messageRo = 'Performanță excelentă!'; }
    else if (percentage >= 90) { emoji = '⭐'; badge = 'AUSGEZEICHNET'; message = 'Sehr gut!'; messageRo = 'Foarte bine!'; }
    else if (percentage >= 80) { emoji = '🎓'; badge = 'SEHR GUT'; message = 'Sehr gute Leistung!'; messageRo = 'Performanță foarte bună!'; }
    else if (percentage >= 70) { emoji = '✅'; badge = 'BESTANDEN'; message = 'Bestanden!'; messageRo = 'Promovat! Mai exersează puțin.'; }
    else if (percentage >= 50) { emoji = '📚'; badge = 'NICHT BESTANDEN'; message = 'Wiederhole die Theorie!'; messageRo = 'Repetă teoria!'; }
    else { emoji = '💪'; badge = 'WEITER ÜBEN'; message = 'Mehr Übung nötig!'; messageRo = 'Mai exersează!'; }
    const categoryStats = {};
    finalTestData.forEach((q, i) => { const c = q.category; if (!categoryStats[c]) categoryStats[c] = { correct: 0, total: 0 }; categoryStats[c].total++; if (userAnswers[i] && userAnswers[i].correct) categoryStats[c].correct++; });
    let statsHTML = '<div class="test-stats"><h4>📊 Detalii pe categorii:</h4><ul>';
    for (const c in categoryStats) { const s = categoryStats[c]; statsHTML += `<li>${c}: <strong>${s.correct}/${s.total}</strong> (${Math.round((s.correct / s.total) * 100)}%)</li>`; }
    statsHTML += '</ul></div>';
    let mistakesHTML = ''; const mistakes = [];
    finalTestData.forEach((q, i) => { if (userAnswers[i] && !userAnswers[i].correct) mistakes.push({ q, i, userAns: userAnswers[i].answer }); });
    if (mistakes.length > 0) {
        mistakesHTML = '<div class="test-mistakes"><h4>📝 Întrebările greșite:</h4>';
        mistakes.forEach(m => { mistakesHTML += `<div class="mistake-item"><strong>Întrebarea ${m.i + 1}</strong> - ${m.q.category}<br><span style="color:#991b1b;">Răspunsul tău: <em>${m.userAns}</em></span><br><span style="color:#065f46;">Corect: <strong>${m.q.correct}</strong></span><br><small style="color:#6b7280;">${m.q.explanation}</small></div>`; });
        mistakesHTML += '</div>';
    }
    const wizard = document.getElementById('test-wizard'), results = document.getElementById('test-results');
    wizard.style.display = 'none'; results.style.display = 'block';
    results.innerHTML = `
        <div class="test-back-top"><button class="btn btn-back" onclick="goBackToTheory()">← Întoarcere la teorie</button></div>
        <div class="test-result-card ${passed ? 'passed' : 'failed'}">
            <div class="test-result-emoji">${emoji}</div>
            <div class="test-result-badge">${badge}</div>
            <div class="test-result-score">${correct} / ${total}</div>
            <div class="test-result-percentage">${percentage}%</div>
            <div class="test-result-message"><p><strong>${message}</strong></p><p style="margin-top:8px;">${messageRo}</p></div>
            ${passed ? '<div class="pass-mark">✓ Prag promovare: 70% atins!</div>' : '<div class="fail-mark">✗ Prag promovare: 70% (lipsesc ' + (Math.ceil(total * 0.7) - correct) + ' răspunsuri corecte)</div>'}
        </div>
        ${statsHTML}${mistakesHTML}
        <div class="test-final-actions">
            <button class="btn btn-check" onclick="restartTest()">🔄 Reia testul</button>
            <button class="btn btn-back" onclick="goBackToTheory()">← Întoarcere la teorie</button>
        </div>
    `;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function restartTest() {
    if (confirm('Sigur vrei să reiei testul?')) {
        currentQuestionIndex = 0; userAnswers = {}; testCompleted = false;
        document.getElementById('test-results').style.display = 'none';
        document.getElementById('test-wizard').style.display = 'block';
        showQuestion(0); scrollToTest();
    }
}

function goBackToTheory() {
    const t = document.getElementById('main-section-0'), arrow = document.querySelectorAll('.arrow')[0];
    if (t && !t.classList.contains('active')) { t.classList.add('active'); if (arrow) arrow.classList.add('rotated'); }
    const sec = document.getElementById('teorie'); if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', function() { buildFinalTest(); });
