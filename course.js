/* =========================================================
   حيتان العرب — course.js
   Powers course.html: i18n, media, quizzes, flashcards,
   free preview, route guard, collapsible mobile sidebar.
   ========================================================= */

/* ===================== i18n dictionary (UI chrome) ===================== */
/* Defensive fallback: if visuals.js failed to load for any reason (wrong
   upload, caching, wrong path on the host), these no-op stand-ins mean the
   rest of the site (translation, sidebar, lessons) still works correctly
   instead of crashing — the only visible effect would be missing icons. */
if (typeof icon === 'undefined') {
  window.icon = function(name, size) { return ''; };
}
if (typeof trackIcon === 'undefined') {
  window.trackIcon = function(id, size) { return ''; };
}
if (typeof renderConceptVisual === 'undefined') {
  window.renderConceptVisual = function(){ return ''; };
}

const I18N = {
  ar: {
    ticker_label:"أعلى 10 عملات", ticker_loading:"جاري تحميل الأسعار...", nav_home:"الرئيسية", nav_about:"من نحن", nav_edu:"التعليم ▾", nav_articles:"المقالات",
    nav_contact:"تواصل معنا", nav_join:"انضم الآن", nav_login:"تسجيل الدخول",
    hub_eyebrow:"مسار تعليمي متكامل", hub_title:"المسارات التعليمية",
    hub_subtitle:"اختر مساراً وابدأ التعلم خطوة بخطوة.",
    back_to_hub:"→ كل المسارات", toggle_lessons:"قائمة الدروس",
    prev_lesson:"الدرس السابق", next_lesson:"إنهاء الدرس والانتقال للتالي", next_lesson_done:"تم — الدرس التالي",
    exam_title:"اختبار اجتياز المستوى", exam_submit:"إرسال الإجابات",
    en_note:"محتوى هذا الدرس متاح بالعربية حالياً، والترجمة الإنجليزية قيد الإعداد.",
    greeting:"مرحباً", preview_banner:"معاينة مجانية — هذا الدرس متاح للجميع بدون تسجيل دخول.",
    modal_title:"يرجى تسجيل الدخول أولاً",
    modal_body:"للوصول إلى هذا المحتوى التعليمي، تحتاج لتسجيل الدخول أو إنشاء حساب أولاً.",
    modal_cancel:"إلغاء", modal_confirm:"تسجيل الدخول",
    lock_title:"أكمل الدرس السابق أولاً", lock_body:"يجب إنهاء الدرس السابق قبل الانتقال لهذا الدرس، حتى تحافظ على تسلسل التعلّم الصحيح.",
    exam_locked_body:"يجب إنهاء جميع دروس هذا القسم أولاً قبل فتح الاختبار.",
    lesson_of:"درس", of_word:"من",
  },
  en: {
    ticker_label:"Top 10 Coins", ticker_loading:"Loading prices...", nav_home:"Home", nav_about:"About", nav_edu:"Learn ▾", nav_articles:"Articles",
    nav_contact:"Contact", nav_join:"Join Now", nav_login:"Log In",
    hub_eyebrow:"Full Learning Path", hub_title:"Learning Tracks",
    hub_subtitle:"Pick a track and start learning step by step.",
    back_to_hub:"← All Tracks", toggle_lessons:"Lessons Menu",
    prev_lesson:"Previous Lesson", next_lesson:"Finish & Continue", next_lesson_done:"Done — Next Lesson",
    exam_title:"Level Exam", exam_submit:"Submit Answers",
    en_note:"This lesson's content is currently available in Arabic only — English translation is in progress.",
    greeting:"Welcome", preview_banner:"Free preview — this lesson is open to everyone, no login required.",
    modal_title:"Please log in first",
    modal_body:"To access this learning content, you need to log in or create an account first.",
    modal_cancel:"Cancel", modal_confirm:"Log In",
    lock_title:"Finish the Previous Lesson First", lock_body:"You need to complete the previous lesson before moving to this one, to keep the right learning order.",
    exam_locked_body:"You need to finish all lessons in this section before unlocking the exam.",
    lesson_of:"Lesson", of_word:"of",
  }
};
let currentLang = localStorage.getItem('aw_lang') || 'ar';

function applyLang(){
  const t = I18N[currentLang];
  document.getElementById('htmlRoot').lang = currentLang;
  document.getElementById('htmlRoot').dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', currentLang === 'en');
  document.getElementById('langToggle').innerHTML = icon('globe','1em') + (currentLang === 'ar' ? ' EN' : ' AR');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(t[key]){
      if(key === 'nav_edu'){
        el.childNodes[0].nodeValue = t[key].replace('▾','').trim() + ' ';
      } else {
        el.textContent = t[key];
      }
    }
  });
  document.getElementById('modalTitle').textContent = t.modal_title;
  document.getElementById('modalBody').textContent = t.modal_body;
  document.getElementById('modalCancel').textContent = t.modal_cancel;
  document.getElementById('modalConfirm').textContent = t.modal_confirm;
  buildEduDropdown();
  if(!currentTrackId){
    document.getElementById('pageEyebrow').textContent = t.hub_eyebrow;
    document.getElementById('pageMainTitle').textContent = t.hub_title;
    document.getElementById('pageSubtitle').textContent = t.hub_subtitle;
    renderHub();
  } else if(TRACKS[currentTrackId]){
    const track = TRACKS[currentTrackId];
    const trackTitle = currentLang === 'en' && track.title_en ? track.title_en : track.title;
    document.getElementById('pageEyebrow').textContent = track.type === 'leveled'
      ? (currentLang==='en' ? 'Full Learning Path' : 'مسار تعليمي متكامل')
      : (currentLang==='en' ? 'Learning Track' : 'مسار تعليمي');
    document.getElementById('pageMainTitle').innerHTML = trackIcon(currentTrackId,'1.3em') + ' ' + trackTitle;
    document.getElementById('pageSubtitle').textContent = track.type === 'leveled'
      ? (currentLang==='en' ? '3 levels, each with its own lessons and level exam.' : '3 مستويات، كل مستوى له دروسه واختبار اجتياز خاص به.')
      : (currentLang==='en' ? `${track.lessons.length} lessons — complete them in any order you like.` : `${track.lessons.length} دروس — أكملها بالترتيب حسب رغبتك.`);
    render();
  }
}
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('aw_lang', currentLang);
  applyLang();

});

/* Helpers to pick translated field with graceful fallback */
function tField(obj, base){
  if(currentLang === 'en' && obj[base + '_en']) return obj[base + '_en'];
  return obj[base];
}
function hasEnglish(obj){ return !!(obj.title_en && obj.content_en); }

/* ===================== Nav: hamburger + dropdown ===================== */
document.getElementById('navHamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('mobile-open');
});

function buildEduDropdown(){
  const list = document.getElementById('eduDropdownList');
  let html = '';
  Object.keys(TRACKS).forEach(id => {
    const t = TRACKS[id];
    const title = currentLang === 'en' && t.title_en ? t.title_en : t.title;
    const tag = t.type === 'leveled'
      ? (currentLang === 'en' ? '3 levels' : '3 مستويات')
      : (t.lessons.length + (currentLang === 'en' ? ' lessons' : ' دروس'));
    html += `<a href="course.html?track=${id}">${trackIcon(id,'1.1em')} ${title} <span class="tag">${tag}</span></a>`;
  });
  list.innerHTML = html;
}

const eduDropdown = document.getElementById('eduDropdown');
const eduTrigger = document.getElementById('eduTrigger');
eduTrigger.addEventListener('click', (e) => { e.stopPropagation(); eduDropdown.classList.toggle('open'); });
document.addEventListener('click', (e) => { if(!eduDropdown.contains(e.target)){ eduDropdown.classList.remove('open'); } });

/* ===================== Ticker ===================== */
const FALLBACK_COINS = [
  {symbol:'BTC', price:'—', chg:null},{symbol:'ETH', price:'—', chg:null},
  {symbol:'USDT', price:'—', chg:null},{symbol:'BNB', price:'—', chg:null},
  {symbol:'SOL', price:'—', chg:null},{symbol:'XRP', price:'—', chg:null},
  {symbol:'USDC', price:'—', chg:null},{symbol:'ADA', price:'—', chg:null},
  {symbol:'DOGE', price:'—', chg:null},{symbol:'TRX', price:'—', chg:null},
];
function fetchWithTimeout(url, ms=8000){
  const controller = new AbortController();
  const id = setTimeout(()=>controller.abort(), ms);
  return fetch(url, {signal:controller.signal}).finally(()=>clearTimeout(id));
}
function renderTicker(coins){
  const track = document.getElementById('tickerTrack');
  const items = coins.map(c => {
    if(c.chg === null){
      return `<div class="tick-item"><span class="tick-sym">${c.symbol}</span><span class="tick-price">${c.price}</span></div>`;
    }
    const chgClass = c.chg >= 0 ? 'up' : 'down';
    const arrow = c.chg >= 0 ? '▲' : '▼';
    return `<div class="tick-item"><span class="tick-sym">${c.symbol}</span><span class="tick-price">$${c.price}</span><span class="tick-chg ${chgClass}">${arrow} ${Math.abs(c.chg).toFixed(2)}%</span></div>`;
  }).join('');
  track.innerHTML = items + items;
}
async function tryCoinGecko(){
  const res = await fetchWithTimeout('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&price_change_percentage=24h');
  if(!res.ok) throw new Error('coingecko http ' + res.status);
  const data = await res.json();
  if(!Array.isArray(data) || data.length === 0) throw new Error('coingecko empty response');
  return data.map(c => ({
    symbol: c.symbol.toUpperCase(),
    price: c.current_price >= 1 ? c.current_price.toLocaleString('en-US',{maximumFractionDigits:2}) : c.current_price.toPrecision(4),
    chg: c.price_change_percentage_24h ?? 0
  }));
}
async function tryCoinCap(){
  const res = await fetchWithTimeout('https://api.coincap.io/v2/assets?limit=10');
  if(!res.ok) throw new Error('coincap http ' + res.status);
  const json = await res.json();
  const data = json.data;
  if(!Array.isArray(data) || data.length === 0) throw new Error('coincap empty response');
  return data.map(c => {
    const price = parseFloat(c.priceUsd);
    const chg = parseFloat(c.changePercent24Hr);
    return {
      symbol: c.symbol.toUpperCase(),
      price: price >= 1 ? price.toLocaleString('en-US',{maximumFractionDigits:2}) : price.toPrecision(4),
      chg: isNaN(chg) ? 0 : chg
    };
  });
}
let tickerRetries = 0;
async function loadTicker(){
  const track = document.getElementById('tickerTrack');
  try{ const coins = await tryCoinGecko(); renderTicker(coins); tickerRetries = 0; return; }
  catch(e1){
    try{ const coins = await tryCoinCap(); renderTicker(coins); tickerRetries = 0; return; }
    catch(e2){
      tickerRetries++;
      if(tickerRetries === 1){ track.innerHTML = `<div class="tick-item mono">${currentLang==='en' ? 'Retrying price load...' : 'جاري إعادة محاولة تحميل الأسعار...'}</div>`; }
      else{ renderTicker(FALLBACK_COINS); }
      setTimeout(loadTicker, 12000);
    }
  }
}
loadTicker();
setInterval(loadTicker, 60000);

/* ===================== Login state & nav UI ===================== */
let userIsLoggedIn = false;
let currentUsername = null;

async function checkLoginStatus(){
  if(IS_BACKEND_CONFIGURED){
    const { data: { session } } = await supabaseClient.auth.getSession();
    if(session && session.user.email_confirmed_at){
      userIsLoggedIn = true;
      currentUsername = session.user.user_metadata?.username || session.user.email.split('@')[0];
    }
  } else {
    const demoSession = localStorage.getItem('aw_demo_session');
    if(demoSession){
      const s = JSON.parse(demoSession);
      userIsLoggedIn = true;
      currentUsername = s.username || s.email.split('@')[0];
    }
  }
  updateAuthNavUI();
}
function updateAuthNavUI(){
  document.getElementById('joinBtn').style.display = userIsLoggedIn ? 'none' : '';
  document.getElementById('authNavBtn').style.display = userIsLoggedIn ? 'none' : '';
  const badge = document.getElementById('userBadge');
  badge.style.display = userIsLoggedIn ? 'flex' : 'none';
  if(userIsLoggedIn) document.getElementById('userBadgeName').textContent = currentUsername;
}
function closeLoginModal(){ document.getElementById('loginModalOverlay').style.display = 'none'; }
function showInfoModal(title, body, confirmHref, confirmLabel){
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  const confirmBtn = document.getElementById('modalConfirm');
  if(confirmHref){
    confirmBtn.style.display = '';
    confirmBtn.href = confirmHref;
    confirmBtn.textContent = confirmLabel || confirmBtn.textContent;
  } else {
    confirmBtn.style.display = 'none';
  }
  document.getElementById('loginModalOverlay').style.display = 'flex';
}
function showLoginModal(){
  const t = I18N[currentLang];
  document.getElementById('modalConfirm').textContent = t.modal_confirm;
  showInfoModal(t.modal_title, t.modal_body, 'auth.html');
}
function showLockedLessonModal(){
  const t = I18N[currentLang];
  showInfoModal(t.lock_title, t.lock_body, null);
}

/* ===================== Lightbox ===================== */
function openLightbox(url, caption){
  document.getElementById('lightboxImg').src = url;
  document.getElementById('lightboxCaption').textContent = caption || '';
  document.getElementById('lightboxOverlay').style.display = 'flex';
}
function closeLightbox(){ document.getElementById('lightboxOverlay').style.display = 'none'; }
document.getElementById('lightboxOverlay').addEventListener('click', (e) => {
  if(e.target.id === 'lightboxOverlay') closeLightbox();
});

/* ===================== Progress / storage helpers ===================== */
const STORAGE_PREFIX = "aw_course_";
function isLessonDone(trackId, lessonId){ return localStorage.getItem(STORAGE_PREFIX + trackId + "_" + lessonId) === "1"; }
function markLessonDone(trackId, lessonId){ localStorage.setItem(STORAGE_PREFIX + trackId + "_" + lessonId, "1"); }
function isExamPassed(trackId){ return localStorage.getItem(STORAGE_PREFIX + trackId + "_exam_passed") === "1"; }
function markExamPassed(trackId){ localStorage.setItem(STORAGE_PREFIX + trackId + "_exam_passed", "1"); }
function isLevelUnlocked(track, levelIndex){
  if(levelIndex === 0) return true;
  return isExamPassed(track.levels[levelIndex - 1].id);
}
function isFirstLesson(track, levelIndex, lessonIndex){
  if(track.type === 'leveled') return levelIndex === 0 && lessonIndex === 0;
  return lessonIndex === 0;
}
/* Sequential lock: lesson N is only reachable once lesson N-1 is marked done.
   (First lesson of an unlocked level/track is always reachable.) */
function isLessonUnlocked(scopeId, lessons, lessonIndex){
  if(lessonIndex === 0) return true;
  return isLessonDone(scopeId, lessons[lessonIndex - 1].id);
}
function allLessonsDone(scopeId, lessons){
  return lessons.every(l => isLessonDone(scopeId, l.id));
}

/* ===================== Comments (demo, localStorage) ===================== */
function getComments(key){ return JSON.parse(localStorage.getItem('aw_comments_' + key) || '[]'); }
function addComment(key, text){
  const comments = getComments(key);
  comments.push({text, ts: new Date().toLocaleString('ar-EG')});
  localStorage.setItem('aw_comments_' + key, JSON.stringify(comments));
}
function commentsListHtml(key){
  const comments = getComments(key);
  return comments.length
    ? comments.map(c => `<div class="comment-item"><div class="c-meta">${c.ts}</div><div class="c-body">${c.text.replace(/</g,'&lt;')}</div></div>`).join('')
    : '<div class="empty-comments">لا توجد تعليقات بعد — كن أول من يبدأ النقاش.</div>';
}
function renderComments(key){
  return `
    <div class="comments-section">
      <h4>${icon('chat','0.9em')} النقاش حول هذا الدرس</h4>
      <p class="comments-note">تعليقات تجريبية محفوظة على جهازك فقط — تحتاج ربط قاعدة بيانات ليراها بقية الطلاب.</p>
      <div class="comment-form">
        <input type="text" id="commentInput" placeholder="اكتب تعليقك أو سؤالك...">
        <button class="btn-primary" id="commentSubmit" style="padding:11px 20px;">إرسال</button>
      </div>
      <div id="commentsList">${commentsListHtml(key)}</div>
    </div>
  `;
}
function wireCommentForm(key){
  document.getElementById('commentSubmit').onclick = () => {
    const input = document.getElementById('commentInput');
    if(input.value.trim() === '') return;
    addComment(key, input.value.trim());
    input.value = '';
    document.getElementById('commentsList').innerHTML = commentsListHtml(key);
  };
}

/* ===================== Media: topic-accurate concept illustration ===================== */
function renderMediaBlock(lesson){
  return renderConceptVisual(lesson, lesson.id);
}

/* ===================== Flashcards ===================== */
function renderFlashcards(lesson){
  if(!lesson.flashcards || !lesson.flashcards.length) return '';
  const cards = lesson.flashcards.map((fc, idx) => {
    const q = currentLang === 'en' && fc.q_en ? fc.q_en : fc.q;
    const a = currentLang === 'en' && fc.a_en ? fc.a_en : fc.a;
    return `
      <div class="flashcard" id="fc-${idx}">
        <div class="flashcard-q" onclick="document.getElementById('fc-${idx}').classList.toggle('open')">
          <span>${q}</span><span class="fc-caret">▾</span>
        </div>
        <div class="flashcard-a">${a}</div>
      </div>
    `;
  }).join('');
  return `<div class="flashcards">${cards}</div>`;
}

/* ===================== Per-lesson quiz ===================== */
function renderFlatExam(){
  const track = TRACKS[currentTrackId];
  const t = I18N[currentLang];
  const trackTitle = currentLang === 'en' && track.title_en ? track.title_en : track.title;
  // Build the final exam from each lesson's own quiz question (already authored),
  // so the questions the student sees at the end map 1:1 to what they just learned.
  const questions = track.lessons.filter(l => l.quiz).map(l => l.quiz);
  const passMark = 60;
  const main = document.getElementById('mainPane');
  let html = `
    <div class="lesson-eyebrow">${trackTitle}</div>
    <h2 class="lesson-title">${icon('pencil','0.85em')} ${currentLang==='en' ? 'Final Quiz' : 'الاختبار النهائي'}</h2>
    <p class="lesson-content" style="margin-bottom:20px;">${currentLang==='en' ? `Answer the following questions covering everything in this track. You need at least ${passMark}% to pass.` : `أجب عن الأسئلة التالية التي تغطي كل دروس هذا المسار، وتحتاج ${passMark}% على الأقل للنجاح.`}</p>
    <form id="examForm">
  `;
  questions.forEach((q, qi) => {
    const qText = currentLang === 'en' && q.q_en ? q.q_en : q.q;
    const opts = currentLang === 'en' && q.options_en ? q.options_en : q.options;
    html += `<div class="exam-q"><h4>${qi+1}. ${qText}</h4>`;
    opts.forEach((opt, oi) => {
      html += `<label class="exam-opt" data-q="${qi}" data-o="${oi}"><input type="radio" name="q${qi}" value="${oi}"> ${opt}</label>`;
    });
    html += `</div>`;
  });
  html += `</form><button class="btn-primary" id="submitExamBtn">${t.exam_submit}</button><div id="examResult"></div>`;
  main.innerHTML = html;
  buildSidebar();

  main.querySelectorAll('.exam-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const qi = opt.dataset.q;
      main.querySelectorAll(`.exam-opt[data-q="${qi}"]`).forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  document.getElementById('submitExamBtn').onclick = (e) => {
    e.preventDefault();
    let correct = 0;
    questions.forEach((q, qi) => {
      const selected = main.querySelector(`.exam-opt[data-q="${qi}"].selected`);
      const selectedIdx = selected ? parseInt(selected.dataset.o) : -1;
      main.querySelectorAll(`.exam-opt[data-q="${qi}"]`).forEach(o => {
        const oi = parseInt(o.dataset.o);
        if(oi === q.correct) o.classList.add('correct');
        else if(oi === selectedIdx) o.classList.add('wrong');
      });
      if(selectedIdx === q.correct) correct++;
    });
    const scorePct = Math.round((correct / questions.length) * 100);
    const passed = scorePct >= passMark;
    if(passed) markExamPassed(currentTrackId);
    const resultDiv = document.getElementById('examResult');
    resultDiv.innerHTML = `
      <div class="exam-result ${passed ? 'pass' : 'fail'}">
        <h3>${icon(passed?'award':'info','1.1em')} ${passed ? (currentLang==='en'?'Congratulations, you passed!':'مبروك، لقد اجتزت الاختبار!') : (currentLang==='en'?'Not quite there yet':'لم تحقق النسبة المطلوبة بعد')}</h3>
        <div class="score">${correct} / ${questions.length} (${scorePct}%)</div>
        <p style="color:var(--text-dim);">${passed
          ? (currentLang==='en' ? 'You completed the whole track!' : 'لقد أكملت المسار بالكامل!')
          : (currentLang==='en' ? 'Review the lessons and try again.' : 'أعد مراجعة الدروس وحاول مرة أخرى.')}</p>
        ${!passed ? `<button class="btn-ghost" style="margin-top:14px;" onclick="goToFlatLesson(0)">${currentLang==='en'?'Review Lessons':'مراجعة الدروس'}</button>` : ''}
      </div>
    `;
    document.getElementById('submitExamBtn').style.display = 'none';
    buildSidebar();
  };
}

/* ===================== Hub ===================== */
function trackProgressPct(id, track){
  if(track.type === 'leveled'){
    const total = track.levels.reduce((s,l) => s + l.lessons.length + 1, 0);
    let done = 0;
    track.levels.forEach(l => {
      done += l.lessons.filter(les => isLessonDone(l.id, les.id)).length;
      if(isExamPassed(l.id)) done++;
    });
    return Math.round((done/total)*100);
  } else {
    const total = track.lessons.length + 1;
    const done = track.lessons.filter(l => isLessonDone(id, l.id)).length + (isExamPassed(id) ? 1 : 0);
    return Math.round((done/total)*100);
  }
}
function renderHub(){
  const grid = document.getElementById('hubGrid');
  let html = '';
  Object.keys(TRACKS).forEach(id => {
    const t = TRACKS[id];
    const title = currentLang === 'en' && t.title_en ? t.title_en : t.title;
    const count = t.type === 'leveled'
      ? t.levels.reduce((s,l)=>s+l.lessons.length,0) + (currentLang==='en' ? ' lessons · 3 levels' : ' درس · 3 مستويات')
      : t.lessons.length + (currentLang==='en' ? ' lessons' : ' دروس');
    const pct = trackProgressPct(id, t);
    const completed = pct === 100;
    html += `<a class="hub-card" href="course.html?track=${id}">
      <div class="icon">${trackIcon(id,"1.8em")}</div>
      <h3>${title}</h3>
      <div class="meta">${count}</div>
      <div class="progress-bar-outer"><div class="progress-bar-inner" style="width:${pct}%"></div></div>
      ${completed ? `<div class="badge-row"><span class="badge-pill">${icon('award','1em')} ${currentLang==='en' ? 'Completed' : 'مكتمل'}</span></div>` : ''}
    </a>`;
  });
  grid.innerHTML = html;
}

/* ===================== Track engine ===================== */
const urlParams = new URLSearchParams(window.location.search);
const currentTrackId = urlParams.get('track');
let currentLevelIndex = 0;
let currentLessonIndex = 0;
let currentView = "lesson";

function buildSidebar(){
  const sidebar = document.getElementById('sidebar');
  const track = TRACKS[currentTrackId];
  const t = I18N[currentLang];
  let html = `<div class="back-to-hub" onclick="window.location.href='course.html'">${t.back_to_hub}</div>`;
  const trackTitle = currentLang === 'en' && track.title_en ? track.title_en : track.title;
  html += `<div class="course-title">${trackIcon(currentTrackId,"1.2em")} ${trackTitle}</div>`;

  if(track.type === 'leveled'){
    track.levels.forEach((level, li) => {
      const unlocked = isLevelUnlocked(track, li);
      const openClass = li === currentLevelIndex ? "open" : "";
      const lockedClass = unlocked ? "" : "locked";
      const levelName = currentLang === 'en' && level.name_en ? level.name_en : level.name;
      html += `<div class="level-block ${openClass} ${lockedClass}" data-level="${li}">
        <div class="level-head" onclick="toggleLevel(${li})">
          <span>${unlocked ? '' : icon('lock','0.85em') + ' '}${levelName}</span>
          <span class="badge">${level.badge}</span>
        </div>
        <div class="level-lessons">`;
      level.lessons.forEach((lesson, lidx) => {
        const done = isLessonDone(level.id, lesson.id);
        const seqLocked = !isLessonUnlocked(level.id, level.lessons, lidx);
        const active = (li === currentLevelIndex && lidx === currentLessonIndex && currentView === "lesson") ? "active" : "";
        const title = currentLang === 'en' && lesson.title_en ? lesson.title_en : lesson.title;
        const preview = isFirstLesson(track, li, lidx) ? `<span class="preview-tag">${currentLang==='en'?'FREE':'مجاني'}</span>` : '';
        html += `<div class="lesson-link ${done ? 'done' : ''} ${active} ${seqLocked ? 'seq-locked' : ''}" onclick="goToLesson(${li}, ${lidx})">
          <span class="check">${done ? icon('check','0.75em') : (seqLocked ? icon('lock','0.7em') : '')}</span> ${title} ${preview}
        </div>`;
      });
      const examDone = isExamPassed(level.id);
      const examActive = (li === currentLevelIndex && currentView === "exam") ? "active" : "";
      const examSeqLocked = !allLessonsDone(level.id, level.lessons);
      html += `<div class="lesson-link exam-link ${examDone ? 'done' : ''} ${examActive} ${examSeqLocked ? 'seq-locked' : ''}" onclick="${unlocked ? `goToExam(${li})` : ''}">
          <span class="check">${examDone ? icon('check','0.75em') : (examSeqLocked ? icon('lock','0.7em') : '')}</span> ${icon('pencil','0.85em')} ${currentLang==='en'?'Level Exam':'اختبار اجتياز المستوى'}
        </div>`;
      html += `</div></div>`;
    });
  } else {
    html += `<div class="level-lessons open" style="display:block;">`;
    track.lessons.forEach((lesson, lidx) => {
      const done = isLessonDone(currentTrackId, lesson.id);
      const seqLocked = !isLessonUnlocked(currentTrackId, track.lessons, lidx);
      const active = (lidx === currentLessonIndex && currentView === 'lesson') ? "active" : "";
      const title = currentLang === 'en' && lesson.title_en ? lesson.title_en : lesson.title;
      const preview = lidx === 0 ? `<span class="preview-tag">${currentLang==='en'?'FREE':'مجاني'}</span>` : '';
      html += `<div class="lesson-link ${done ? 'done' : ''} ${active} ${seqLocked ? 'seq-locked' : ''}" onclick="goToFlatLesson(${lidx})">
        <span class="check">${done ? icon('check','0.75em') : (seqLocked ? icon('lock','0.7em') : '')}</span> ${title} ${preview}
      </div>`;
    });
    const examDone = isExamPassed(currentTrackId);
    const examActive = (currentView === "exam") ? "active" : "";
    const examSeqLocked = !allLessonsDone(currentTrackId, track.lessons);
    html += `<div class="lesson-link exam-link ${examDone ? 'done' : ''} ${examActive} ${examSeqLocked ? 'seq-locked' : ''}" onclick="goToFlatExam()">
        <span class="check">${examDone ? icon('check','0.75em') : (examSeqLocked ? icon('lock','0.7em') : '')}</span> ${icon('pencil','0.85em')} ${currentLang==='en'?'Final Quiz':'الاختبار النهائي'}
      </div>`;
    html += `</div>`;
  }
  sidebar.innerHTML = html;
}

function toggleLevel(li){
  document.querySelectorAll('.level-block').forEach((b, idx) => {
    if(idx === li) b.classList.toggle('open'); else b.classList.remove('open');
  });
}

function requiresLogin(track, levelIndex, lessonIndex){
  if(userIsLoggedIn) return false;
  return !isFirstLesson(track, levelIndex, lessonIndex);
}

function goToLesson(li, lidx){
  const track = TRACKS[currentTrackId];
  if(requiresLogin(track, li, lidx)){ showLoginModal(); return; }
  const level = track.levels[li];
  if(!isLessonUnlocked(level.id, level.lessons, lidx)){ showLockedLessonModal(); return; }
  currentLevelIndex = li; currentLessonIndex = lidx; currentView = "lesson"; render();
}
function goToExam(li){
  if(!userIsLoggedIn){ showLoginModal(); return; }
  const track = TRACKS[currentTrackId];
  const level = track.levels[li];
  if(!allLessonsDone(level.id, level.lessons)){ showLockedLessonModal(); return; }
  currentLevelIndex = li; currentView = "exam"; render();
}
function goToFlatLesson(lidx){
  const track = TRACKS[currentTrackId];
  if(requiresLogin(track, 0, lidx)){ showLoginModal(); return; }
  if(!isLessonUnlocked(currentTrackId, track.lessons, lidx)){ showLockedLessonModal(); return; }
  currentLessonIndex = lidx; currentView = "lesson"; render();
}
function goToFlatExam(){
  if(!userIsLoggedIn){ showLoginModal(); return; }
  const track = TRACKS[currentTrackId];
  if(!allLessonsDone(currentTrackId, track.lessons)){ showLockedLessonModal(); return; }
  currentView = "exam"; render();
}

function lessonBodyHtml(lesson){
  const content = tField(lesson, 'content');
  if(currentLang === 'en' && !hasEnglish(lesson)){
    return `<div class="en-content-note">ℹ️ ${I18N.en.en_note}</div><p class="lesson-content" dir="rtl" style="text-align:right;font-family:'IBM Plex Sans Arabic',sans-serif;">${lesson.content}</p>`;
  }
  return `<p class="lesson-content">${content}</p>`;
}

function previewBannerHtml(track, levelIndex, lessonIndex){
  if(userIsLoggedIn) return '';
  if(!isFirstLesson(track, levelIndex, lessonIndex)) return '';
  return `<div class="preview-banner">${icon('unlock','0.9em')} ${I18N[currentLang].preview_banner}</div>`;
}

function renderLeveledLesson(){
  const track = TRACKS[currentTrackId];
  const level = track.levels[currentLevelIndex];
  const lesson = level.lessons[currentLessonIndex];
  const totalItems = level.lessons.length + 1;
  const doneCount = level.lessons.filter(l => isLessonDone(level.id, l.id)).length + (isExamPassed(level.id) ? 1 : 0);
  const pct = Math.round((doneCount / totalItems) * 100);
  const t = I18N[currentLang];
  const title = tField(lesson, 'title');
  const levelName = currentLang === 'en' && level.name_en ? level.name_en : level.name;
  const keyPrefix = level.id + '_' + lesson.id;

  const main = document.getElementById('mainPane');
  main.innerHTML = `
    <div class="progress-bar-outer"><div class="progress-bar-inner" style="width:${pct}%"></div></div>
    ${previewBannerHtml(track, currentLevelIndex, currentLessonIndex)}
    <div class="lesson-eyebrow">${levelName} · ${t.lesson_of} ${currentLessonIndex + 1} ${t.of_word} ${level.lessons.length}</div>
    <h2 class="lesson-title">${title}</h2>
    ${renderMediaBlock(lesson)}
    ${lessonBodyHtml(lesson)}
    ${renderFlashcards(lesson)}
    <div class="lesson-nav">
      <button class="btn-ghost" id="prevBtn" ${currentLessonIndex === 0 ? 'disabled style="opacity:.4;cursor:not-allowed;"' : ''}>← ${t.prev_lesson}</button>
      <button class="btn-primary" id="nextBtn">${isLessonDone(level.id, lesson.id) ? t.next_lesson_done : t.next_lesson} →</button>
    </div>
    ${renderComments(keyPrefix)}
  `;
  markLessonDone(level.id, lesson.id);
  buildSidebar();
  wireCommentForm(keyPrefix);

  document.getElementById('prevBtn').onclick = () => { if(currentLessonIndex > 0){ currentLessonIndex--; render(); } };
  document.getElementById('nextBtn').onclick = () => {
    if(currentLessonIndex < level.lessons.length - 1){ currentLessonIndex++; render(); }
    else { goToExam(currentLevelIndex); }
  };
}

function renderFlatLesson(){
  const track = TRACKS[currentTrackId];
  const lesson = track.lessons[currentLessonIndex];
  const doneCount = track.lessons.filter(l => isLessonDone(currentTrackId, l.id)).length;
  const pct = Math.round((doneCount / track.lessons.length) * 100);
  const t = I18N[currentLang];
  const title = tField(lesson, 'title');
  const trackTitle = currentLang === 'en' && track.title_en ? track.title_en : track.title;
  const keyPrefix = currentTrackId + '_' + lesson.id;

  const main = document.getElementById('mainPane');
  main.innerHTML = `
    <div class="progress-bar-outer"><div class="progress-bar-inner" style="width:${pct}%"></div></div>
    ${previewBannerHtml(track, 0, currentLessonIndex)}
    <div class="lesson-eyebrow">${trackTitle} · ${t.lesson_of} ${currentLessonIndex + 1} ${t.of_word} ${track.lessons.length}</div>
    <h2 class="lesson-title">${title}</h2>
    ${renderMediaBlock(lesson)}
    ${lessonBodyHtml(lesson)}
    ${renderFlashcards(lesson)}
    <div class="lesson-nav">
      <button class="btn-ghost" id="prevBtn" ${currentLessonIndex === 0 ? 'disabled style="opacity:.4;cursor:not-allowed;"' : ''}>← ${t.prev_lesson}</button>
      <button class="btn-primary" id="nextBtn">${isLessonDone(currentTrackId, lesson.id) ? t.next_lesson_done : t.next_lesson} →</button>
    </div>
    ${renderComments(keyPrefix)}
  `;
  markLessonDone(currentTrackId, lesson.id);
  buildSidebar();
  wireCommentForm(keyPrefix);

  document.getElementById('prevBtn').onclick = () => { if(currentLessonIndex > 0){ currentLessonIndex--; render(); } };
  document.getElementById('nextBtn').onclick = () => {
    if(currentLessonIndex < track.lessons.length - 1){ currentLessonIndex++; render(); }
    else { goToFlatExam(); }
  };
}

function renderExam(){
  const track = TRACKS[currentTrackId];
  const level = track.levels[currentLevelIndex];
  const t = I18N[currentLang];
  const main = document.getElementById('mainPane');
  let html = `
    <div class="lesson-eyebrow">${currentLang==='en' && level.name_en ? level.name_en : level.name}</div>
    <h2 class="lesson-title">${icon('pencil','0.85em')} ${t.exam_title}</h2>
    <p class="lesson-content" style="margin-bottom:20px;">${currentLang==='en' ? `Answer the following questions. You need at least ${level.exam.pass}% to pass and unlock the next level.` : `أجب عن الأسئلة التالية، وتحتاج ${level.exam.pass}% على الأقل للنجاح وفتح المستوى التالي.`}</p>
    <form id="examForm">
  `;
  level.exam.questions.forEach((q, qi) => {
    const qText = currentLang === 'en' && q.q_en ? q.q_en : q.q;
    const opts = currentLang === 'en' && q.options_en ? q.options_en : q.options;
    html += `<div class="exam-q"><h4>${qi+1}. ${qText}</h4>`;
    opts.forEach((opt, oi) => {
      html += `<label class="exam-opt" data-q="${qi}" data-o="${oi}"><input type="radio" name="q${qi}" value="${oi}"> ${opt}</label>`;
    });
    html += `</div>`;
  });
  html += `</form><button class="btn-primary" id="submitExamBtn">${t.exam_submit}</button><div id="examResult"></div>`;
  main.innerHTML = html;
  buildSidebar();

  main.querySelectorAll('.exam-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const qi = opt.dataset.q;
      main.querySelectorAll(`.exam-opt[data-q="${qi}"]`).forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  document.getElementById('submitExamBtn').onclick = (e) => {
    e.preventDefault();
    let correct = 0;
    level.exam.questions.forEach((q, qi) => {
      const selected = main.querySelector(`.exam-opt[data-q="${qi}"].selected`);
      const selectedIdx = selected ? parseInt(selected.dataset.o) : -1;
      main.querySelectorAll(`.exam-opt[data-q="${qi}"]`).forEach(o => {
        const oi = parseInt(o.dataset.o);
        if(oi === q.correct) o.classList.add('correct');
        else if(oi === selectedIdx) o.classList.add('wrong');
      });
      if(selectedIdx === q.correct) correct++;
    });
    const scorePct = Math.round((correct / level.exam.questions.length) * 100);
    const passed = scorePct >= level.exam.pass;
    if(passed) markExamPassed(level.id);
    const resultDiv = document.getElementById('examResult');
    const nextLevel = track.levels[currentLevelIndex + 1];
    const nextLevelName = nextLevel ? (currentLang==='en' && nextLevel.name_en ? nextLevel.name_en : nextLevel.name) : null;
    resultDiv.innerHTML = `
      <div class="exam-result ${passed ? 'pass' : 'fail'}">
        <h3>${icon(passed?'award':'info','1.1em')} ${passed ? (currentLang==='en'?'Congratulations, you passed!':'مبروك، لقد اجتزت المستوى!') : (currentLang==='en'?'Not quite there yet':'لم تحقق النسبة المطلوبة بعد')}</h3>
        <div class="score">${correct} / ${level.exam.questions.length} (${scorePct}%)</div>
        <p style="color:var(--text-dim);">${passed
          ? (nextLevel ? (currentLang==='en'?`${nextLevelName} is now unlocked.`:`تم فتح ${nextLevelName} الآن.`) : (currentLang==='en'?'You completed the whole track!':'لقد أكملت المسار بالكامل!'))
          : (currentLang==='en'?'Review the lessons and try again.':`أعد مراجعة دروس ${levelName2(level)} وحاول مرة أخرى.`)}</p>
        ${passed && nextLevel ? `<button class="btn-primary" style="margin-top:14px;" onclick="goToLesson(${currentLevelIndex+1}, 0)">${currentLang==='en'?'Start':'ابدأ'} ${nextLevelName}</button>` : ''}
        ${!passed ? `<button class="btn-ghost" style="margin-top:14px;" onclick="goToLesson(${currentLevelIndex}, 0)">${currentLang==='en'?'Review Lessons':'مراجعة الدروس'}</button>` : ''}
      </div>
    `;
    document.getElementById('submitExamBtn').style.display = 'none';
    buildSidebar();
  };
}
function levelName2(level){ return currentLang === 'en' && level.name_en ? level.name_en : level.name; }

function renderLockedState(track){
  const t = I18N[currentLang];
  const main = document.getElementById('mainPane');
  main.innerHTML = `
    <div class="locked-card">
      <div class="icon">${icon('lock','2.2em')}</div>
      <h3>${currentLang==='en' ? 'Log in to keep learning' : 'سجّل الدخول لمتابعة التعلّم'}</h3>
      <p>${currentLang==='en'
        ? 'You can freely browse lesson titles and the first lesson of this track. Reading further lessons or taking the exam requires logging in.'
        : 'يمكنك تصفح أسماء الدروس، وقراءة الدرس الأول من هذا المسار مجاناً. أما بقية الدروس والاختبار فتتطلب تسجيل دخول أولاً.'}</p>
      <div style="display:flex;gap:10px;justify-content:center;">
        <a href="auth.html" class="btn-primary">${currentLang==='en' ? 'Log In / Sign Up' : 'تسجيل الدخول / إنشاء حساب'}</a>
        <button class="btn-ghost" onclick="goToLesson(0,0)">${currentLang==='en' ? 'Try Free Lesson' : 'جرّب الدرس المجاني'}</button>
      </div>
    </div>
  `;
  buildSidebar();
}

function render(){
  const track = TRACKS[currentTrackId];
  if(requiresLogin(track, currentLevelIndex, currentLessonIndex) && currentView !== 'exam'){
    renderLockedState(track);
    return;
  }
  if(currentView === 'exam' && !userIsLoggedIn){
    renderLockedState(track);
    return;
  }
  if(track.type === 'leveled'){
    if(currentView === "exam") renderExam(); else renderLeveledLesson();
  } else {
    if(currentView === "exam") renderFlatExam(); else renderFlatLesson();
  }
}

/* ===================== Mobile sidebar toggle ===================== */
document.getElementById('sidebarToggleMobile').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('mobile-visible');
});

/* ===================== Boot ===================== */
Promise.resolve(checkLoginStatus()).then(() => {
  if(currentTrackId && TRACKS[currentTrackId]){
    document.getElementById('hubWrap').style.display = 'none';
    document.getElementById('trackWrap').style.display = 'grid';
  } else {
    document.getElementById('hubWrap').style.display = 'block';
    document.getElementById('trackWrap').style.display = 'none';
  }
  applyLang();
});
