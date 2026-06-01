// ============================================
// FLASHCARDS - Wortfeld GEHEN (Aprofundare)
// Claudia Toth · 32 carduri (24 verbe + 2 extra + 6 Wortschatz) cu TTS
// ============================================

const flashcardsData = [
    { de: "bummeln", ro: "a hoinari (fara graba)" },
    { de: "schlendern", ro: "a se plimba relaxat" },
    { de: "spazieren", ro: "a se plimba" },
    { de: "wandern", ro: "a merge in drumetie" },
    { de: "eilen", ro: "a se grabi" },
    { de: "hasten", ro: "a se grabi (cu efort, gafaind)" },
    { de: "hetzen", ro: "a alerga agitat (de colo-colo)" },
    { de: "rennen", ro: "a fugi" },
    { de: "laufen", ro: "a alerga / a merge" },
    { de: "flitzen", ro: "a fugi foarte repede (a zbura)" },
    { de: "sausen", ro: "a trece vijelios (cu zgomot)" },
    { de: "stapfen", ro: "a calca apasat (prin zapada/noroi)" },
    { de: "trampeln", ro: "a calca greu / a tropai" },
    { de: "waten", ro: "a merge prin apa sau noroi" },
    { de: "trotten", ro: "a merge alene / fara chef" },
    { de: "schleichen", ro: "a se furisa (in liniste)" },
    { de: "auf Zehenspitzen gehen", ro: "a merge pe varfuri" },
    { de: "torkeln", ro: "a merge clatinandu-se" },
    { de: "wanken", ro: "a se clatina (instabil)" },
    { de: "stolpern", ro: "a se impiedica" },
    { de: "stürzen", ro: "a cadea brusc" },
    { de: "marschieren", ro: "a marsalui (in ritm)" },
    { de: "überqueren", ro: "a traversa" },
    { de: "umfahren", ro: "a ocoli (cu vehiculul)" },
    { de: "springen", ro: "a sari (Präteritum: sprang)" },
    { de: "hüpfen", ro: "a topai / a saltarea" },
    { de: "dicht", ro: "des, etans (ex: ein dichter Wald)" },
    { de: "flott", ro: "vioi, repede, sprinten" },
    { de: "die Alm · die Almen", ro: "pasunea alpina" },
    { de: "das Läuten", ro: "sunatul (clopotelului)" },
    { de: "sich anschleichen", ro: "a se apropia pe furis (taras)" },
    { de: "die Buben", ro: "baietii (germana de sud = die Jungen)" }
];

let currentCardIndex = 0;

function buildFlashcards() {
    const container = document.getElementById('flashcards-container');
    if (!container) return;
    container.innerHTML = `
        <div class="exercise-instruction">
            <strong>📇 ${flashcardsData.length} carduri din Wortfeld GEHEN — verbe de deplasare + cuvinte ajutătoare.</strong><br>
            Click pe card pentru traducere. Click pe 🔊 pentru pronunție germană automată.
        </div>
        <div class="flashcard-counter" id="flashcard-counter">Card 1 / ${flashcardsData.length}</div>
        <div class="flashcard" id="flashcard" onclick="flipCard()">
            <button class="flashcard-audio-btn" onclick="playFlashcardAudio(event)" title="Ascultă pronunția">🔊</button>
            <div class="flashcard-content">
                <div class="de" id="flashcard-de">${flashcardsData[0].de}</div>
                <div class="ro" id="flashcard-ro">${flashcardsData[0].ro}</div>
            </div>
            <div class="flashcard-hint">👆 Click pentru traducere</div>
        </div>
        <div class="flashcard-controls">
            <button class="flashcard-btn" onclick="prevCard()" id="prev-btn">← Anterior</button>
            <button class="flashcard-btn" onclick="nextCard()" id="next-btn">Următor →</button>
        </div>
    `;
    updateFlashcard();
}

function updateFlashcard() {
    const card = document.getElementById('flashcard');
    const de = document.getElementById('flashcard-de');
    const ro = document.getElementById('flashcard-ro');
    const counter = document.getElementById('flashcard-counter');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (!card || !de || !ro || !counter) return;
    const c = flashcardsData[currentCardIndex];
    de.textContent = c.de; ro.textContent = c.ro;
    card.classList.remove('flipped');
    counter.textContent = `Card ${currentCardIndex + 1} / ${flashcardsData.length}`;
    if (prevBtn) prevBtn.disabled = currentCardIndex === 0;
    if (nextBtn) nextBtn.disabled = currentCardIndex === flashcardsData.length - 1;
}
function flipCard() { const card = document.getElementById('flashcard'); if (card) card.classList.toggle('flipped'); }
function nextCard() { if (currentCardIndex < flashcardsData.length - 1) { currentCardIndex++; updateFlashcard(); } }
function prevCard() { if (currentCardIndex > 0) { currentCardIndex--; updateFlashcard(); } }
function playFlashcardAudio(event) {
    event.stopPropagation();
    const card = flashcardsData[currentCardIndex];
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(card.de);
        u.lang = 'de-DE'; u.rate = 0.85;
        window.speechSynthesis.speak(u);
    } else { alert('Browser-ul tău nu suportă Text-to-Speech. Folosește Chrome, Edge sau Safari.'); }
}
document.addEventListener('DOMContentLoaded', function() { buildFlashcards(); });
