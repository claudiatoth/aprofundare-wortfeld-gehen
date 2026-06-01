// ============================================
// DIALOGS.JS — Wortfeld GEHEN: dialog animat
// Andreea ↔ Annette · motor sincronizat pe audio.currentTime + timer fallback
// Fără TTS (vocea Claudiei se înregistrează într-un singur MP3 cu pauze)
// Bazat pe motorul Pflege (Claudia Toth · Annettes Deutschkurs)
// ============================================

// ============================================
// DIALOG: Andreeas Wochenende
// 12 replici · ~80 secunde estimate (se ajustează la durata reală a MP3-ului)
// ============================================
const dialog1Data = {
    id: 'dialog1',
    title: 'Andreeas Wochenende',
    context: 'Annette o întreabă pe Andreea cum a fost weekendul. Andreea povestește — și folosește o mulțime de verbe din Wortfeld GEHEN în loc de simplul „gehen".',
    audioFile: 'audio/dialog-01.mp3',
    totalDuration: 80,
    replici: [
        { id: 1,  speaker: 'annette', start: 0,  duration: 6, de: 'Hallo Andreea! Wie war dein Wochenende?', ro: 'Salut, Andreea! Cum a fost weekendul tău?' },
        { id: 2,  speaker: 'andreea', start: 6,  duration: 7, de: 'Sehr schön! Am Samstag bummelte ich durch die Altstadt.', ro: 'Foarte frumos! Sâmbătă am hoinărit prin centrul vechi.' },
        { id: 3,  speaker: 'andreea', start: 13, duration: 7, de: 'Danach schlenderte ich gemütlich am Fluss entlang.', ro: 'Apoi m-am plimbat agale pe lângă râu.' },
        { id: 4,  speaker: 'annette', start: 20, duration: 6, de: 'Das klingt entspannt! Und am Sonntag?', ro: 'Sună relaxant! Și duminică?' },
        { id: 5,  speaker: 'andreea', start: 26, duration: 8, de: 'Am Sonntag eilte ich zum Bahnhof, ich war spät dran.', ro: 'Duminică m-am grăbit la gară, eram în întârziere.' },
        { id: 6,  speaker: 'andreea', start: 34, duration: 8, de: 'Ich rannte fast, aber ich stolperte über meinen Koffer!', ro: 'Aproape am fugit, dar m-am împiedicat de valiză!' },
        { id: 7,  speaker: 'annette', start: 42, duration: 5, de: 'Oh nein! Bist du gestürzt?', ro: 'Vai, nu! Ai căzut?' },
        { id: 8,  speaker: 'andreea', start: 47, duration: 9, de: 'Zum Glück nicht. Im Park flitzte dann ein Hund an mir vorbei.', ro: 'Din fericire, nu. În parc, un câine a trecut apoi în viteză pe lângă mine.' },
        { id: 9,  speaker: 'annette', start: 56, duration: 5, de: 'Und was hast du sonst noch gemacht?', ro: 'Și ce-ai mai făcut?' },
        { id: 10, speaker: 'andreea', start: 61, duration: 8, de: 'Meine Freunde und ich wanderten in den Bergen.', ro: 'Prietenii mei și cu mine am făcut drumeție în munți.' },
        { id: 11, speaker: 'andreea', start: 69, duration: 6, de: 'Wir wateten sogar durch einen kleinen Bach!', ro: 'Chiar am trecut prin apă printr-un pârâu mic!' },
        { id: 12, speaker: 'annette', start: 75, duration: 6, de: 'Was für ein aktives Wochenende! Du warst überall unterwegs.', ro: 'Ce weekend activ! Ai fost peste tot.' }
    ]
};

const dialogsById = { dialog1: dialog1Data };

function speakerLabel(speaker) {
    return speaker === 'andreea' ? '🧑‍🎓 Andreea' : '👩‍🏫 Annette';
}
function speakerImg(speaker) {
    return speaker === 'andreea' ? 'images/andreea.png' : 'images/annette.png';
}

// ============================================
// BUILD ANIMATED DIALOG HTML
// ============================================
function buildAnimatedDialog(data) {
    const repliciHTML = data.replici.map(r => `
        <div class="reply-item" data-reply-id="${r.id}" data-speaker="${r.speaker}">
            <div class="reply-header">
                <span class="reply-num">${r.id}.</span>
                <span class="reply-speaker speaker-${r.speaker}">${speakerLabel(r.speaker)}</span>
                <button class="btn-replay-reply" onclick="replayReply('${data.id}', ${r.id})">🔁</button>
            </div>
            <div class="reply-de">${r.de}</div>
            <div class="reply-ro">${r.ro}</div>
        </div>
    `).join('');

    return `
        <div class="animated-dialog" id="dialog-${data.id}" data-dialog-id="${data.id}">
            <div class="dialog-context"><strong>📍 Situația:</strong> ${data.context}</div>

            <div class="stage-container">
                <div class="stage">
                    <div class="character-wrapper character-andreea" data-speaker="andreea">
                        <div class="character-avatar"><img src="images/andreea.png" alt="Andreea"></div>
                        <div class="character-label">Andreea</div>
                        <div class="speech-bubble speech-andreea" id="bubble-${data.id}-andreea">
                            <div class="bubble-de"></div>
                            <div class="bubble-ro"></div>
                        </div>
                    </div>

                    <div class="character-wrapper character-annette" data-speaker="annette">
                        <div class="character-avatar"><img src="images/annette.png" alt="Annette"></div>
                        <div class="character-label">Annette</div>
                        <div class="speech-bubble speech-annette" id="bubble-${data.id}-annette">
                            <div class="bubble-de"></div>
                            <div class="bubble-ro"></div>
                        </div>
                    </div>
                </div>

                <div class="dialog-controls">
                    <button class="btn-dialog btn-play" id="btn-play-${data.id}" onclick="playDialog('${data.id}')">▶️ Pornește</button>
                    <button class="btn-dialog btn-pause" id="btn-pause-${data.id}" onclick="pauseDialog('${data.id}')" disabled>⏸ Pauză</button>
                    <button class="btn-dialog btn-reset" id="btn-reset-${data.id}" onclick="resetDialog('${data.id}')">🔄 Reset</button>
                </div>

                <div class="dialog-progress">
                    <div class="progress-bar" id="progress-${data.id}"><div class="progress-fill" id="progress-fill-${data.id}"></div></div>
                    <div class="progress-text" id="progress-text-${data.id}">Replica 0 / ${data.replici.length}</div>
                </div>

                <audio id="audio-${data.id}" preload="none"><source src="${data.audioFile}" type="audio/mpeg"></audio>
            </div>

            <details class="transcript-details">
                <summary>📜 Vezi transcriptul complet (bilingv)</summary>
                <div class="transcript-list">${repliciHTML}</div>
            </details>
        </div>
    `;
}

// ============================================
// STATE
// ============================================
const dialogState = {};
function initDialogState(dialogId) {
    if (!dialogState[dialogId]) {
        dialogState[dialogId] = {
            isPlaying: false, currentReply: 0, lastDisplayedIdx: -1,
            timeouts: [], timeUpdateHandler: null, endedHandler: null,
            data: dialogsById[dialogId]
        };
    }
    return dialogState[dialogId];
}

// ============================================
// PLAY — sincronizare pe audio.currentTime; timer fallback dacă MP3 lipsește
// ============================================
function playDialog(dialogId) {
    const state = initDialogState(dialogId);
    if (state.isPlaying) return;
    state.isPlaying = true;
    const data = state.data;
    const audio = document.getElementById(`audio-${dialogId}`);

    document.getElementById(`btn-play-${dialogId}`).disabled = true;
    document.getElementById(`btn-pause-${dialogId}`).disabled = false;

    if (audio && !state.timeUpdateHandler) {
        state.timeUpdateHandler = () => {
            if (!state.isPlaying) return;
            const t = audio.currentTime;
            let currentIdx = -1;
            for (let i = 0; i < data.replici.length; i++) {
                if (t >= data.replici[i].start) currentIdx = i; else break;
            }
            if (currentIdx >= 0 && currentIdx !== state.lastDisplayedIdx) {
                state.lastDisplayedIdx = currentIdx;
                state.currentReply = currentIdx + 1;
                showReply(dialogId, data.replici[currentIdx]);
                updateProgress(dialogId);
            }
        };
        audio.addEventListener('timeupdate', state.timeUpdateHandler);
        state.endedHandler = () => endDialog(dialogId);
        audio.addEventListener('ended', state.endedHandler);
    }

    if (audio) {
        if (state.currentReply >= data.replici.length) {
            audio.currentTime = 0; state.currentReply = 0; state.lastDisplayedIdx = -1;
        }
        audio.play().catch(() => startTimerFallback(dialogId));
    } else {
        startTimerFallback(dialogId);
    }
}

// Fallback pe timer (animație fără audio înregistrat)
function startTimerFallback(dialogId) {
    const state = initDialogState(dialogId);
    const data = state.data;
    const startFromReply = state.currentReply;
    const offsetMs = startFromReply > 0 ? data.replici[startFromReply - 1].start * 1000 : 0;
    for (let i = startFromReply; i < data.replici.length; i++) {
        const reply = data.replici[i];
        const delayMs = (reply.start * 1000) - offsetMs;
        const timeout = setTimeout(() => {
            if (!state.isPlaying) return;
            state.lastDisplayedIdx = i;
            showReply(dialogId, reply);
            state.currentReply = i + 1;
            updateProgress(dialogId);
            if (i === data.replici.length - 1) {
                setTimeout(() => endDialog(dialogId), reply.duration * 1000);
            }
        }, delayMs);
        state.timeouts.push(timeout);
    }
}

function showReply(dialogId, reply) {
    const activeChar = document.querySelector(`#dialog-${dialogId} .character-${reply.speaker}`);
    const sameSpeakerContinues = activeChar && activeChar.classList.contains('speaking');

    document.querySelectorAll(`#dialog-${dialogId} .character-wrapper`).forEach(c => {
        if (c !== activeChar) c.classList.remove('speaking');
    });
    if (activeChar) activeChar.classList.add('speaking');

    document.querySelectorAll(`#dialog-${dialogId} .speech-bubble`).forEach(b => {
        if (!b.id.endsWith('-' + reply.speaker)) b.classList.remove('visible');
    });

    const bubble = document.getElementById(`bubble-${dialogId}-${reply.speaker}`);
    if (!bubble) return;

    if (sameSpeakerContinues) {
        bubble.classList.add('text-fading');
        setTimeout(() => {
            bubble.querySelector('.bubble-de').textContent = reply.de;
            bubble.querySelector('.bubble-ro').textContent = reply.ro;
            bubble.classList.remove('text-fading');
        }, 180);
    } else {
        bubble.querySelector('.bubble-de').textContent = reply.de;
        bubble.querySelector('.bubble-ro').textContent = reply.ro;
        bubble.classList.add('visible');
    }

    document.querySelectorAll(`#dialog-${dialogId} .reply-item`).forEach(r => r.classList.remove('active'));
    const replyItem = document.querySelector(`#dialog-${dialogId} .reply-item[data-reply-id="${reply.id}"]`);
    if (replyItem) replyItem.classList.add('active');
}

function pauseDialog(dialogId) {
    const state = dialogState[dialogId];
    if (!state || !state.isPlaying) return;
    state.isPlaying = false;
    state.timeouts.forEach(t => clearTimeout(t));
    state.timeouts = [];
    const audio = document.getElementById(`audio-${dialogId}`);
    if (audio) audio.pause();
    document.getElementById(`btn-play-${dialogId}`).disabled = false;
    document.getElementById(`btn-pause-${dialogId}`).disabled = true;
}

function resetDialog(dialogId) {
    pauseDialog(dialogId);
    const state = initDialogState(dialogId);
    state.currentReply = 0; state.lastDisplayedIdx = -1; state.timeouts = [];
    document.querySelectorAll(`#dialog-${dialogId} .character-wrapper`).forEach(c => c.classList.remove('speaking'));
    document.querySelectorAll(`#dialog-${dialogId} .speech-bubble`).forEach(b => b.classList.remove('visible'));
    document.querySelectorAll(`#dialog-${dialogId} .reply-item`).forEach(r => r.classList.remove('active'));
    const audio = document.getElementById(`audio-${dialogId}`);
    if (audio) { audio.pause(); audio.currentTime = 0; }
    updateProgress(dialogId);
    document.getElementById(`btn-play-${dialogId}`).disabled = false;
    document.getElementById(`btn-pause-${dialogId}`).disabled = true;
}

function endDialog(dialogId) {
    const state = dialogState[dialogId];
    if (!state) return;
    state.isPlaying = false;
    state.currentReply = state.data.replici.length;
    state.timeouts = [];
    document.getElementById(`btn-play-${dialogId}`).disabled = false;
    document.getElementById(`btn-pause-${dialogId}`).disabled = true;
}

function updateProgress(dialogId) {
    const state = dialogState[dialogId];
    if (!state) return;
    const total = state.data.replici.length;
    const pct = total > 0 ? (state.currentReply / total) * 100 : 0;
    const fill = document.getElementById(`progress-fill-${dialogId}`);
    const text = document.getElementById(`progress-text-${dialogId}`);
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = `Replica ${state.currentReply} / ${total}`;
}

function replayReply(dialogId, replyId) {
    const data = dialogsById[dialogId];
    const replyIdx = data.replici.findIndex(r => r.id === replyId);
    if (replyIdx < 0) return;
    const reply = data.replici[replyIdx];
    const state = initDialogState(dialogId);
    state.lastDisplayedIdx = -1;
    showReply(dialogId, reply);
    state.currentReply = replyIdx + 1;
    updateProgress(dialogId);
    const audio = document.getElementById(`audio-${dialogId}`);
    if (audio) {
        audio.currentTime = reply.start;
        if (audio.paused) {
            state.isPlaying = true;
            audio.play().catch(() => { /* silent */ });
            document.getElementById(`btn-play-${dialogId}`).disabled = true;
            document.getElementById(`btn-pause-${dialogId}`).disabled = false;
        }
    }
}

// ============================================
// INJECT
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const c = document.getElementById('dialog1-container');
    if (c) c.innerHTML = buildAnimatedDialog(dialog1Data);
});
