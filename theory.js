// ============================================
// TEORIE - Wortfeld GEHEN (Aprofundare)
// Claudia Toth · Nivel A2/B1 · câmpul lexical al lui „a merge"
// Sursă: materialul propriu Claudia Toth (© 2025)
// ============================================

const theoryHTML = `
    <!-- 0: Intro -->
    <div class="sub-section">
        <div class="sub-section-header" onclick="toggleSubSection(0)">
            <span>📚 1. De ce „gehen" nu e de ajuns</span>
            <span class="sub-arrow">▼</span>
        </div>
        <div class="sub-section-content" id="sub-section-0">
            <div class="lesson-audio">
                <div class="audio-player">
                    <button class="audio-btn" onclick="toggleAudio(event, 'audio-0')" id="btn-audio-0">▶</button>
                    <audio id="audio-0" preload="none"><source src="audio/01-intro.mp3" type="audio/mpeg"></audio>
                </div>
                <span class="lesson-audio-label">🔊 Ascultă secțiunea</span>
            </div>

            <div class="andreea-note">
                <img class="andreea-note-avatar" src="images/andreea.png" alt="Andreea">
                <div class="andreea-note-content">
                    <div class="speaker">Andreea</div>
                    <div class="text">Verbul <strong>gehen</strong> („a merge") e corect mereu — dar e <em>plictisitor</em>. Germana are zeci de verbe care spun EXACT cum mergi: agale, în fugă, pe furiș, prin zăpadă... Astea sunt un <strong>Wortfeld</strong> (câmp lexical). Cine le folosește sună imediat mai natural și mai bogat.</div>
                </div>
            </div>

            <div class="theory-box">
                <h4>🌳 Ce este un Wortfeld?</h4>
                <p>Un <strong>Wortfeld</strong> („câmp lexical") este o familie de cuvinte legate de aceeași idee. <em>Wortfeld GEHEN</em> = toate verbele de deplasare pe jos care pot înlocui genericul <strong>gehen</strong>, fiecare cu o nuanță proprie (viteză, stil, dispoziție).</p>
                <p style="margin-top:8px;">În loc de „Das Kind geht leise" spui „Das Kind geht <strong>auf Zehenspitzen</strong>" (pe vârfuri). În loc de „Der Hund geht schnell" spui „Der Hund <strong>flitzt</strong>" (zboară). Mai precis, mai viu.</p>
            </div>

            <div class="theory-box" style="background:#F5F0E8;border-color:#D4A574;">
                <h4>✍️ Notă despre diacritice (ä, ö, ü, ß)</h4>
                <p>Sistemul de verificare e blând: poți scrie Umlaut-urile corect (<em>überqueren</em>) sau cu varianta de înlocuire (<em>ueberqueren</em>). Ambele sunt acceptate. La fel, diacriticele românești nu te încurcă.</p>
            </div>
        </div>
    </div>

    <!-- 1: Mers relaxat -->
    <div class="sub-section">
        <div class="sub-section-header" onclick="toggleSubSection(1)">
            <span>🐌 2. Mers relaxat — plimbarea fără grabă</span>
            <span class="sub-arrow">▼</span>
        </div>
        <div class="sub-section-content" id="sub-section-1">
            <div class="lesson-audio">
                <div class="audio-player">
                    <button class="audio-btn" onclick="toggleAudio(event, 'audio-1')" id="btn-audio-1">▶</button>
                    <audio id="audio-1" preload="none"><source src="audio/02-relaxat.mp3" type="audio/mpeg"></audio>
                </div>
                <span class="lesson-audio-label">🔊 Ascultă secțiunea</span>
            </div>
            <table class="grammar-table">
                <thead><tr><th>Verb</th><th>Traducere RO</th><th>Exemplu (DE)</th><th>Traducere RO</th></tr></thead>
                <tbody>
                    <tr><td class="verb">bummeln</td><td>a hoinări / a se plimba fără grabă</td><td><em>Wir bummeln durch die Altstadt.</em></td><td>Hoinărim prin centrul vechi.</td></tr>
                    <tr><td class="verb">schlendern</td><td>a se plimba relaxat</td><td><em>Wir schlendern am Fluss entlang.</em></td><td>Ne plimbăm relaxat pe lângă râu.</td></tr>
                    <tr><td class="verb">spazieren</td><td>a se plimba</td><td><em>Sie spazieren im Park.</em></td><td>Ei se plimbă în parc.</td></tr>
                    <tr><td class="verb">wandern</td><td>a merge în drumeție</td><td><em>Wir wandern in den Alpen.</em></td><td>Facem drumeții în Alpi.</td></tr>
                </tbody>
            </table>
            <div class="andreea-note">
                <img class="andreea-note-avatar" src="images/andreea.png" alt="Andreea">
                <div class="andreea-note-content">
                    <div class="speaker">Andreea</div>
                    <div class="text">Nu confunda <strong>spazieren</strong> (plimbare scurtă, în parc) cu <strong>wandern</strong> (drumeție lungă, în natură/munți). Iar <strong>bummeln</strong> și <strong>schlendern</strong> au în plus ideea de „fără nicio grabă, ca să te bucuri".</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 2: Grabă / viteză -->
    <div class="sub-section">
        <div class="sub-section-header" onclick="toggleSubSection(2)">
            <span>🏃 3. Grabă și viteză — când te grăbești</span>
            <span class="sub-arrow">▼</span>
        </div>
        <div class="sub-section-content" id="sub-section-2">
            <div class="lesson-audio">
                <div class="audio-player">
                    <button class="audio-btn" onclick="toggleAudio(event, 'audio-2')" id="btn-audio-2">▶</button>
                    <audio id="audio-2" preload="none"><source src="audio/03-viteza.mp3" type="audio/mpeg"></audio>
                </div>
                <span class="lesson-audio-label">🔊 Ascultă secțiunea</span>
            </div>
            <table class="grammar-table">
                <thead><tr><th>Verb</th><th>Traducere RO</th><th>Exemplu (DE)</th><th>Traducere RO</th></tr></thead>
                <tbody>
                    <tr><td class="verb">eilen</td><td>a se grăbi</td><td><em>Er eilte zur Arbeit.</em></td><td>S-a grăbit la muncă.</td></tr>
                    <tr><td class="verb">hasten</td><td>a se grăbi (cu efort)</td><td><em>Ich musste zur Schule hasten.</em></td><td>A trebuit să mă grăbesc la școală.</td></tr>
                    <tr><td class="verb">hetzen</td><td>a alerga agitat (de colo-colo)</td><td><em>Sie hetzt von einem Termin zum anderen.</em></td><td>Aleargă de la o întâlnire la alta.</td></tr>
                    <tr><td class="verb">rennen</td><td>a fugi</td><td><em>Die Kinder rennen auf dem Spielplatz.</em></td><td>Copiii fug pe terenul de joacă.</td></tr>
                    <tr><td class="verb">laufen</td><td>a alerga / a merge</td><td><em>Ich laufe jeden Morgen im Park.</em></td><td>Alerg în fiecare dimineață în parc.</td></tr>
                    <tr><td class="verb">flitzen</td><td>a zbura / a fugi foarte repede</td><td><em>Der Hund flitzt durch den Park.</em></td><td>Câinele zboară prin parc.</td></tr>
                    <tr><td class="verb">sausen</td><td>a trece vijelios (cu zgomot)</td><td><em>Ein Auto sauste an uns vorbei.</em></td><td>O mașină a trecut vijelios pe lângă noi.</td></tr>
                </tbody>
            </table>
            <div class="theory-box" style="background:#F5F0E8;border-color:#D4A574;">
                <h4>⚠️ Intensitatea grabei</h4>
                <p><strong>eilen</strong> (te grăbești) → <strong>hasten</strong> (cu efort, gâfâind) → <strong>hetzen</strong> (agitat, stresat). <strong>flitzen</strong> și <strong>sausen</strong> sunt cele mai rapide (gen săgeată).</p>
            </div>
        </div>
    </div>

    <!-- 3: Mers greoi -->
    <div class="sub-section">
        <div class="sub-section-header" onclick="toggleSubSection(3)">
            <span>🥾 4. Mers greoi — prin zăpadă, noroi, apă</span>
            <span class="sub-arrow">▼</span>
        </div>
        <div class="sub-section-content" id="sub-section-3">
            <div class="lesson-audio">
                <div class="audio-player">
                    <button class="audio-btn" onclick="toggleAudio(event, 'audio-3')" id="btn-audio-3">▶</button>
                    <audio id="audio-3" preload="none"><source src="audio/04-greoi.mp3" type="audio/mpeg"></audio>
                </div>
                <span class="lesson-audio-label">🔊 Ascultă secțiunea</span>
            </div>
            <table class="grammar-table">
                <thead><tr><th>Verb</th><th>Traducere RO</th><th>Exemplu (DE)</th><th>Traducere RO</th></tr></thead>
                <tbody>
                    <tr><td class="verb">stapfen</td><td>a călca apăsat (prin zăpadă/noroi)</td><td><em>Er stapft durch den Schnee.</em></td><td>El calcă apăsat prin zăpadă.</td></tr>
                    <tr><td class="verb">trampeln</td><td>a călca greu / a tropăi</td><td><em>Die Kinder trampeln durch das Haus.</em></td><td>Copiii tropăie prin casă.</td></tr>
                    <tr><td class="verb">waten</td><td>a merge prin apă sau noroi</td><td><em>Sie waten durch den Fluss.</em></td><td>Ei merg prin râu (prin apă).</td></tr>
                    <tr><td class="verb">trotten</td><td>a merge alene / fără chef</td><td><em>Der Esel trottet langsam den Weg entlang.</em></td><td>Măgarul merge alene pe drum.</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 4: Furiș / nesigur -->
    <div class="sub-section">
        <div class="sub-section-header" onclick="toggleSubSection(4)">
            <span>🤫 5. Pe furiș și nesigur — încet, clătinat, împiedicat</span>
            <span class="sub-arrow">▼</span>
        </div>
        <div class="sub-section-content" id="sub-section-4">
            <div class="lesson-audio">
                <div class="audio-player">
                    <button class="audio-btn" onclick="toggleAudio(event, 'audio-4')" id="btn-audio-4">▶</button>
                    <audio id="audio-4" preload="none"><source src="audio/05-furis.mp3" type="audio/mpeg"></audio>
                </div>
                <span class="lesson-audio-label">🔊 Ascultă secțiunea</span>
            </div>
            <table class="grammar-table">
                <thead><tr><th>Verb</th><th>Traducere RO</th><th>Exemplu (DE)</th><th>Traducere RO</th></tr></thead>
                <tbody>
                    <tr><td class="verb">schleichen</td><td>a se furișa (în liniște)</td><td><em>Die Katze schleicht durchs Gras.</em></td><td>Pisica se furișează prin iarbă.</td></tr>
                    <tr><td class="verb">auf Zehenspitzen gehen</td><td>a merge pe vârfuri</td><td><em>Das Kind geht leise auf Zehenspitzen.</em></td><td>Copilul merge încet pe vârfuri.</td></tr>
                    <tr><td class="verb">torkeln</td><td>a merge clătinându-se</td><td><em>Der Betrunkene torkelt auf der Straße.</em></td><td>Bețivul se clatină pe stradă.</td></tr>
                    <tr><td class="verb">wanken</td><td>a se clătina (a fi instabil)</td><td><em>Er wankt vor Müdigkeit.</em></td><td>Se clatină de oboseală.</td></tr>
                    <tr><td class="verb">stolpern</td><td>a se împiedica</td><td><em>Sie stolpert über einen Stein.</em></td><td>Ea se împiedică de o piatră.</td></tr>
                    <tr><td class="verb">stürzen</td><td>a cădea brusc</td><td><em>Er stürzte die Treppe hinunter.</em></td><td>A căzut pe scări.</td></tr>
                </tbody>
            </table>
            <div class="andreea-note">
                <img class="andreea-note-avatar" src="images/annette.png" alt="Annette">
                <div class="andreea-note-content">
                    <div class="speaker">Annette</div>
                    <div class="text">Lanțul unui accident mic: întâi <strong>stolpern</strong> (te împiedici), apoi <strong>wanken</strong> (te clatini), și — dacă n-ai noroc — <strong>stürzen</strong> (cazi). Trei verbe, o singură secundă! 🙂</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 5: Direcție specială -->
    <div class="sub-section">
        <div class="sub-section-header" onclick="toggleSubSection(5)">
            <span>➡️ 6. Direcție specială — a traversa, a ocoli, a mărșălui</span>
            <span class="sub-arrow">▼</span>
        </div>
        <div class="sub-section-content" id="sub-section-5">
            <div class="lesson-audio">
                <div class="audio-player">
                    <button class="audio-btn" onclick="toggleAudio(event, 'audio-5')" id="btn-audio-5">▶</button>
                    <audio id="audio-5" preload="none"><source src="audio/06-directie.mp3" type="audio/mpeg"></audio>
                </div>
                <span class="lesson-audio-label">🔊 Ascultă secțiunea</span>
            </div>
            <table class="grammar-table">
                <thead><tr><th>Verb</th><th>Traducere RO</th><th>Exemplu (DE)</th><th>Traducere RO</th></tr></thead>
                <tbody>
                    <tr><td class="verb">marschieren</td><td>a mărșălui (în ritm, în grup)</td><td><em>Die Soldaten marschieren durch die Stadt.</em></td><td>Soldații mărșăluiesc prin oraș.</td></tr>
                    <tr><td class="verb">überqueren</td><td>a traversa (a trece peste)</td><td><em>Wir überqueren die Straße.</em></td><td>Noi traversăm strada.</td></tr>
                    <tr><td class="verb">umfahren</td><td>a ocoli (cu vehiculul)</td><td><em>Wir umfahren das Baustellengebiet.</em></td><td>Ocolim zona de construcții.</td></tr>
                </tbody>
            </table>
            <div class="theory-box" style="background:#F5F0E8;border-color:#D4A574;">
                <h4>⚠️ überqueren și umfahren sunt NEseparabile aici</h4>
                <p>Cu accent pe rădăcină, prefixul NU se separă: <em>Wir <strong>überqueren</strong> die Straße</em> (nu „queren über"). Atenție la <strong>umfahren</strong>: cu accent pe „um-" înseamnă „a dărâma/a lovi cu mașina", iar cu accent pe „fahren" înseamnă „a ocoli" — aici sensul e <em>a ocoli</em>.</p>
            </div>
        </div>
    </div>

    <!-- 6: Wortschatz -->
    <div class="sub-section">
        <div class="sub-section-header" onclick="toggleSubSection(6)">
            <span>📖 7. Wortschatz — cuvinte ajutătoare</span>
            <span class="sub-arrow">▼</span>
        </div>
        <div class="sub-section-content" id="sub-section-6">
            <div class="lesson-audio">
                <div class="audio-player">
                    <button class="audio-btn" onclick="toggleAudio(event, 'audio-6')" id="btn-audio-6">▶</button>
                    <audio id="audio-6" preload="none"><source src="audio/07-wortschatz.mp3" type="audio/mpeg"></audio>
                </div>
                <span class="lesson-audio-label">🔊 Ascultă secțiunea</span>
            </div>
            <table class="grammar-table">
                <thead><tr><th>Cuvânt (DE)</th><th>Traducere RO</th></tr></thead>
                <tbody>
                    <tr><td class="verb">dicht</td><td>des, etanș (ex: ein dichter Wald = o pădure deasă)</td></tr>
                    <tr><td class="verb">sich anschleichen</td><td>a se apropia pe furiș (târâș)</td></tr>
                    <tr><td class="verb">die Buben · die Buben</td><td>băieții (în germana de sud = die Jungen)</td></tr>
                    <tr><td class="verb">das Läuten</td><td>sunatul (clopoțelului)</td></tr>
                    <tr><td class="verb">flott</td><td>vioi, repede, sprinten</td></tr>
                    <tr><td class="verb">die Alm · die Almen</td><td>pășunea alpină</td></tr>
                </tbody>
            </table>
            <div class="andreea-note">
                <img class="andreea-note-avatar" src="images/annette.png" alt="Annette">
                <div class="andreea-note-content">
                    <div class="speaker">Annette</div>
                    <div class="text">Acum ascultă dialogul meu cu Andreea — vei auzi multe dintre aceste verbe folosite natural într-o conversație. Apoi treci la exerciții: scopul e să nu mai spui niciodată doar „gehen", ci verbul potrivit. 💚</div>
                </div>
            </div>
        </div>
    </div>
`;

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('theory-container');
    if (container) container.innerHTML = theoryHTML;
});
