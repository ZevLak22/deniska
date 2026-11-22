/* Deniska – španělština pro ségru */
(function () {
  'use strict';

  const D = window.Deniska;
  const TOPICS = window.COURSE_TOPICS || [];
  const LESSONS = [];
  TOPICS.forEach((t, ti) => {
    t.index = ti;
    t.lessons.forEach((l, li) => {
      l.id = t.id + '-' + (li + 1);
      l.topic = t;
      l.num = li + 1;
      l.gi = LESSONS.length;
      LESSONS.push(l);
    });
  });
  const TOTAL = LESSONS.length;
  const MAX_HEARTS = 3;

  /* ================= STATE ================= */
  const KEY = 'deniska-v1';
  function defaultState() {
    return {
      v: 1, done: {}, fed: {}, pending: null, eaten: 0, golden: [], wear: [],
      weak: {}, streak: { count: 0, last: null },
      settings: { sound: true, mic: true, slow: false },
      micOffUntil: 0, stats: { lessons: 0, correct: 0, answers: 0 },
    };
  }
  let state;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      state = Object.assign(defaultState(), raw ? JSON.parse(raw) : {});
      state.settings = Object.assign(defaultState().settings, state.settings || {});
    } catch (e) { state = defaultState(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  load();
  if (navigator.storage && navigator.storage.persist) { navigator.storage.persist().catch(() => {}); }

  /* ================= UTILS ================= */
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function todayStr(d) { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  const PUNCT = /[¿¡?!.,;:"«»“”„…()\-–—]/g;
  function norm(s) { return String(s).toLowerCase().replace(/[’']/g, "'").replace(PUNCT, ' ').replace(/\s+/g, ' ').trim(); }
  function noAcc(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  const ARTICLES = /^(el|la|los|las|un|una|unos|unas)\s+/;
  function tokens(s) { return String(s).replace(PUNCT, ' ').split(/\s+/).filter(Boolean); }
  function lev(a, b) {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  function similarity(a, b) { a = noAcc(norm(a)); b = noAcc(norm(b)); const L = Math.max(a.length, b.length) || 1; return 1 - lev(a, b) / L; }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>'); }
  function P(pair) { const es = pair[0].split('|'), cz = pair[1].split('|'); return { es: es[0], esAlt: es, cz: cz[0], czAlt: cz }; }
  const isSentence = it => tokens(it.es).length > 3;

  /* ================= SOUND ================= */
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices() || []; } catch (e) {} }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function esVoice() {
    if (!voices.length) loadVoices();
    const es = voices.filter(v => /^es[-_]ES/i.test(v.lang));
    const better = v => /premium|enhanced|vylepšen|natural|neural/i.test(v.name + ' ' + v.voiceURI);
    const fem = v => /m[oó]nica|marisol|paulina|elvira|helena|lucia/i.test(v.name);
    return es.find(v => better(v) && fem(v)) || es.find(better) || es.find(fem) || es.find(v => v.localService) || es[0] || voices.find(v => /^es/i.test(v.lang));
  }
  function say(text, slow) {
    if (!state.settings.sound || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).split('|')[0]);
      u.lang = 'es-ES';
      const v = esVoice(); if (v) u.voice = v;
      u.rate = slow ? 0.55 : (state.settings.slow ? 0.75 : 0.9);
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  let actx = null;
  function tone(freqs, dur, type, vol) {
    if (!state.settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      let t = actx.currentTime;
      freqs.forEach(f => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
        t += dur * 0.75;
      });
    } catch (e) {}
  }
  const sfx = {
    ok: () => tone([660, 880], 0.14, 'sine'),
    bad: () => tone([220, 180], 0.2, 'triangle', 0.15),
    win: () => tone([523, 659, 784, 1046], 0.16, 'sine'),
    tap: () => tone([520], 0.05, 'sine', 0.06),
    oink: () => tone([300, 240, 280], 0.09, 'square', 0.05),
    chomp: () => tone([200, 160], 0.06, 'square', 0.06),
    fart: () => tone([120, 95, 80, 70], 0.12, 'sawtooth', 0.12),
  };

  /* ================= PROGRESS LOGIC ================= */
  const isDone = l => !!state.done[l.id];
  function isUnlocked(l) {
    if (l.gi === 0) return true;
    const p = LESSONS[l.gi - 1];
    return !!(state.done[p.id] && state.fed[p.id]);
  }
  function status(l) { return isDone(l) ? 'done' : (isUnlocked(l) ? 'current' : 'locked'); }
  const currentLesson = () => LESSONS.find(l => !isDone(l));
  const doneCount = () => LESSONS.filter(isDone).length;
  const stageIdx = () => D.stageIndex(state.eaten);
  function streakNow() {
    const s = state.streak; if (!s.last) return 0;
    const y = new Date(); y.setDate(y.getDate() - 1);
    return (s.last === todayStr() || s.last === todayStr(y)) ? s.count : 0;
  }
  function bumpStreak() {
    const t = todayStr(); const s = state.streak;
    if (s.last === t) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    s.count = s.last === todayStr(y) ? s.count + 1 : 1;
    s.last = t;
  }
  function wordsOf(l) { return (l.words || []).map(P); }
  function sentsOf(l) { return (l.sentences || []).map(P); }
  function learnedItems(beforeGi) {
    const out = [];
    LESSONS.forEach(l => { if (!l.exam && l.gi < beforeGi && isDone(l)) { out.push(...wordsOf(l)); } });
    return out;
  }
  function allLearned() {
    const w = [], s = [];
    LESSONS.forEach(l => { if (!l.exam && isDone(l)) { w.push(...wordsOf(l)); s.push(...sentsOf(l)); } });
    return { w, s };
  }
  function markWeak(it, delta) {
    if (!it || !it.es) return;
    const k = it.es;
    const cur = state.weak[k];
    if (delta > 0) state.weak[k] = { cz: it.cz, n: Math.min((cur ? cur.n : 0) + delta, 5) };
    else if (cur) { cur.n += delta; if (cur.n <= 0) delete state.weak[k]; }
  }
  function micSupported() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }
  let micBroken = false;
  function micOk() { return state.settings.mic && micSupported() && !micBroken && Date.now() > state.micOffUntil; }

  /* ================= EXERCISE BUILDERS ================= */
  function uniqBy(arr, f) { const seen = new Set(); return arr.filter(x => { const k = f(x); if (seen.has(k)) return false; seen.add(k); return true; }); }
  function mkChoice(item, dir, pool) {
    const key = dir === 'es2cz' ? 'cz' : 'es';
    const bad = new Set((dir === 'es2cz' ? item.czAlt : item.esAlt).map(norm));
    const sentence = isSentence(item);
    let cands = uniqBy(shuffle(pool.filter(p => !bad.has(norm(p[key])) && p.es !== item.es && isSentence(p) === sentence)), p => norm(p[key]));
    if (cands.length < 3) cands = uniqBy(shuffle(pool.filter(p => !bad.has(norm(p[key])) && p.es !== item.es)), p => norm(p[key]));
    const opts = shuffle([item[key]].concat(cands.slice(0, 3).map(c => c[key])));
    return { t: 'choice', dir, item, opts, ans: opts.indexOf(item[key]) };
  }
  function mkPairs(items) {
    items = uniqBy(uniqBy(items, i => norm(i.es)), i => norm(i.cz)).slice(0, 5);
    if (items.length < 3) return null;
    return { t: 'pairs', items, left: shuffle(items.map((_, i) => i)), right: shuffle(items.map((_, i) => i)) };
  }
  function mkTiles(item, mode, pool) {
    const toEs = mode !== 'tiles-es2cz';
    const target = toEs ? item.es : item.cz;
    const tk = tokens(target);
    const low = new Set(tk.map(t => t.toLowerCase()));
    const extra = [];
    shuffle(pool).forEach(p => tokens(toEs ? p.es : p.cz).forEach(t => { if (!low.has(t.toLowerCase()) && !extra.some(e => e.toLowerCase() === t.toLowerCase())) extra.push(t); }));
    const nExtra = Math.min(tk.length <= 3 ? 2 : 3, extra.length);
    const bank = shuffle(tk.concat(shuffle(extra).slice(0, nExtra)));
    return { t: 'tiles', mode, item, target, bank };
  }
  const mkType = item => ({ t: 'type', item });
  const mkListenType = item => ({ t: 'listentype', item });
  const mkSpeak = item => ({ t: 'speak', item });

  function cloneEx(ex) {
    if (ex.t === 'choice') { const opts = shuffle(ex.opts); return Object.assign({}, ex, { opts, ans: opts.indexOf(ex.opts[ex.ans]), review: false }); }
    if (ex.t === 'tiles') return Object.assign({}, ex, { bank: shuffle(ex.bank) });
    return Object.assign({}, ex);
  }

  function buildLesson(lesson) {
    const W = wordsOf(lesson), S = sentsOf(lesson);
    const prev = shuffle(learnedItems(lesson.gi));
    const pool = W.concat(prev.slice(0, 40));
    const q = [];
    if (lesson.tip) q.push({ t: 'tip', text: lesson.tip });
    for (let i = 0; i < W.length; i += 2) {
      const g = W.slice(i, i + 2);
      g.forEach(w => q.push({ t: 'intro', item: w }));
      g.forEach((w, k) => q.push(mkChoice(w, k === 0 ? 'es2cz' : 'cz2es', pool)));
      if (i === 2) { const p = mkPairs(W.slice(0, 4)); if (p) q.push(p); }
    }
    if (prev.length >= 4) { const r = mkChoice(prev[0], 'cz2es', prev.concat(W)); r.review = true; q.push(r); }
    const tw = shuffle(W);
    if (tw[0]) q.push(mkType(tw[0]));
    if (tw[1]) q.push(mkListenType(tw[1]));
    const modes = ['tiles-cz2es', 'tiles-es2cz', 'listen-tiles', 'tiles-cz2es', 'tiles-es2cz', 'listen-tiles', 'tiles-cz2es'];
    const tilePool = S.concat(W).concat(prev.slice(0, 20));
    S.forEach((s, i) => {
      q.push(mkTiles(s, modes[i % modes.length], tilePool));
      if (i === 1 && prev.length >= 6) { const r = mkTiles(prev[1], 'tiles-cz2es', tilePool); r.review = true; if (tokens(prev[1].es).length > 1) q.push(r); else { const r2 = mkType(prev[1]); r2.review = true; q.push(r2); } }
      if (i === 2 && micOk()) q.push(mkSpeak(S.slice().sort((a, b) => a.es.length - b.es.length)[0]));
    });
    if (S.length < 3 && micOk() && W[0]) q.push(mkSpeak(W[0]));
    if (W.length >= 5) { const p = mkPairs(shuffle(W)); if (p) q.push(p); }
    return q.filter(Boolean);
  }

  function buildExam(lesson) {
    const ls = lesson.topic.lessons.filter(l => !l.exam);
    const W = shuffle([].concat(...ls.map(wordsOf)));
    const S = shuffle([].concat(...ls.map(sentsOf)));
    const pool = W;
    const q = [];
    W.slice(0, 4).forEach((w, i) => q.push(mkChoice(w, i % 2 ? 'cz2es' : 'es2cz', pool)));
    W.slice(4, 6).forEach(w => q.push(mkType(w)));
    if (W[6]) q.push(mkListenType(W[6]));
    q.push(mkPairs(W.slice(7, 12)));
    q.push(mkPairs(W.slice(12, 17)));
    const modes = ['tiles-cz2es', 'tiles-es2cz', 'listen-tiles', 'tiles-cz2es', 'tiles-es2cz', 'listen-tiles'];
    S.slice(0, 6).forEach((s, i) => q.push(mkTiles(s, modes[i], S.concat(W))));
    if (micOk() && S[6]) q.push(mkSpeak(S.slice(6, 10).sort((a, b) => a.es.length - b.es.length)[0]));
    return shuffle(q.filter(Boolean));
  }

  function buildPractice(onlyWeak) {
    const { w, s } = allLearned();
    if (!w.length) return [];
    const weakKeys = Object.keys(state.weak).sort((a, b) => state.weak[b].n - state.weak[a].n);
    const all = w.concat(s);
    const weakItems = weakKeys.map(k => all.find(i => i.es === k) || { es: k, esAlt: [k], cz: state.weak[k].cz, czAlt: [state.weak[k].cz] });
    let items = weakItems.slice(0, 10);
    if (!onlyWeak || items.length < 6) items = uniqBy(items.concat(shuffle(w).slice(0, 8), shuffle(s).slice(0, 4)), i => i.es).slice(0, 12);
    const q = [];
    shuffle(items).forEach(it => {
      if (isSentence(it)) q.push(mkTiles(it, pick(['tiles-cz2es', 'tiles-es2cz', 'listen-tiles']), s.concat(w)));
      else q.push(pick([() => mkChoice(it, 'cz2es', w), () => mkChoice(it, 'es2cz', w), () => mkType(it), () => mkListenType(it)])());
    });
    const pw = items.filter(i => !isSentence(i));
    if (pw.length >= 4) q.splice(3, 0, mkPairs(shuffle(pw)));
    if (micOk() && s.length) q.push(mkSpeak(pick(s)));
    return q.filter(Boolean);
  }

  /* ================= ANSWER CHECK ================= */
  function checkEs(input, alts) {
    const a = norm(input);
    for (const alt of alts) {
      const b = norm(alt);
      if (a === b) return { ok: true };
    }
    for (const alt of alts) {
      const b = norm(alt);
      if (noAcc(a) === noAcc(b)) return { ok: true, note: 'Pozor na diakritiku: ' + alt };
      if (ARTICLES.test(b) && !ARTICLES.test(a) && noAcc(a) === noAcc(b.replace(ARTICLES, ''))) return { ok: true, note: 'Nezapomeň na člen: ' + alt };
      if (b.length > 6 && lev(noAcc(a), noAcc(b)) === 1) return { ok: true, note: 'Malý překlep. Správně je: ' + alt };
    }
    return { ok: false };
  }

  /* ================= RENDER ROOT ================= */
  const app = document.getElementById('app');
  const modalRoot = document.getElementById('modal-root');
  let view = { name: 'home', tab: 'path' };
  let R = null; // lesson runner

  function go(v) { view = v; render(); }
  function render() {
    closeModal();
    if (view.name === 'home') renderHome();
    else if (view.name === 'lesson') renderLesson();
    else if (view.name === 'result') renderResult();
    else if (view.name === 'feed') renderFeed();
    else if (view.name === 'fail') renderFail();
  }

  /* ================= HOME ================= */
  function renderHome() {
    const tab = view.tab || 'path';
    const st = streakNow();
    app.innerHTML = `
    <div class="home">
      <div class="topbar">
        <div class="brand">🐷 Deniska</div>
        <span class="chip fire">🔥 ${st}</span>
        <span class="chip">🍩 ${state.eaten}</span>
        <button class="icon-btn" data-act="settings" aria-label="Nastavení">⚙️</button>
      </div>
      <div class="content" id="content">${tab === 'path' ? pathHTML() : tab === 'deniska' ? deniskaHTML() : practiceHTML()}</div>
      <nav class="tabbar">
        <button class="tab ${tab === 'path' ? 'active' : ''}" data-act="tab" data-tab="path"><span class="ti">📚</span>Lekce</button>
        <button class="tab ${tab === 'deniska' ? 'active' : ''}" data-act="tab" data-tab="deniska"><span class="ti">🐷</span>Deniska${state.pending ? '<i class="dot"></i>' : ''}</button>
        <button class="tab ${tab === 'practice' ? 'active' : ''}" data-act="tab" data-tab="practice"><span class="ti">🔁</span>Opakování</button>
      </nav>
    </div>`;
    if (tab === 'path') {
      const cur = $('.node-wrap.current') || $('.node-wrap.waiting');
      const c = $('#content');
      if (cur && c) {
        const target = view.scrollTo ? $('#' + view.scrollTo) : cur;
        requestAnimationFrame(() => { (target || cur).scrollIntoView({ block: view.scrollTo ? 'start' : 'center' }); view.scrollTo = null; });
      }
    }
  }

  const ZIG = [0, 52, 84, 52, 0, -52, -84, -52];
  function pathHTML() {
    let h = '';
    const cur = currentLesson();
    if (state.pending) {
      h += `<button class="banner" data-act="feed" style="width:calc(100% - 32px);text-align:left">
        <span class="bi">🍩</span><span class="bt">Deniska čeká na koblihu!<small>Nakrm ji a odemkni si další lekci</small></span><span style="font-size:22px">›</span></button>`;
    }
    h += '<div class="topic-nav">' + TOPICS.map(t => {
      const first = t.lessons[0]; const locked = status(first) === 'locked' && !isDone(first);
      const isCur = cur && cur.topic === t;
      return `<button class="${locked ? 'locked' : ''} ${isCur ? 'cur' : ''}" data-act="jump" data-id="t-${t.id}">${t.emoji} ${esc(t.title)}</button>`;
    }).join('') + '</div>';

    TOPICS.forEach(t => {
      const n = t.lessons.length, d = t.lessons.filter(isDone).length;
      const locked = !isDone(t.lessons[0]) && !isUnlocked(t.lessons[0]);
      h += `<section class="topic ${locked ? 'locked' : ''}" id="t-${t.id}">
        <div class="topic-head" style="background:${t.color}">
          <div class="te">${t.emoji}</div>
          <div class="tt"><b>${esc(t.title)}</b><span>${esc(t.subtitle || '')}</span>
            <div class="tbar"><i style="width:${Math.round(d / n * 100)}%"></i></div></div>
          <div class="tp">${d}/${n}</div>
        </div><div class="path">`;
      t.lessons.forEach((l, i) => {
        const s = status(l);
        const waiting = s === 'locked' && state.pending && LESSONS[l.gi - 1] && LESSONS[l.gi - 1].id === state.pending.id;
        const icon = l.exam ? '🏆' : s === 'done' ? '✓' : s === 'locked' ? '🔒' : l.num;
        h += `<div class="node-wrap ${s} ${waiting ? 'waiting' : ''}" style="transform:translateX(${ZIG[i % ZIG.length]}px)">
          ${s === 'current' ? `<div class="start-bubble">${isDone(l) ? '' : l.gi === 0 && !doneCount() ? 'ZAČNI TADY' : 'START'}</div>` : ''}
          ${waiting ? '<div class="start-bubble">🍩 Nakrm Denisku</div>' : ''}
          <button class="node ${s} ${l.exam ? 'exam' : ''}" data-act="node" data-gi="${l.gi}">${icon}</button>
          <div class="node-label">${esc(l.title)}</div></div>`;
      });
      h += '</div></section>';
    });
    if (doneCount() === TOTAL) h += `<div class="finish-card">👑 Celý kurz je hotový! Deniska je na tebe hrozně pyšná. 💕</div>`;
    else h += `<div class="finish-card">Na konci cesty čeká 👑 Deniska královna</div>`;
    return h;
  }

  function lessonSheet(l) {
    const s = status(l);
    if (s === 'locked') {
      const prev = LESSONS[l.gi - 1];
      const needFeed = prev && state.done[prev.id] && !state.fed[prev.id];
      openModal(`<div class="sheet">
        <h2>🔒 ${esc(l.title)}</h2>
        <div class="sub">${esc(l.topic.title)} · lekce ${l.num}</div>
        <p>${needFeed ? 'Nejdřív nakrm Denisku koblihou z minulé lekce. Pak se tahle lekce odemkne. 🍩' : 'Tahle lekce je zatím zamčená. Splň nejdřív ty předchozí, pěkně jednu po druhé. 💪'}</p>
        ${needFeed ? '<button class="btn" data-act="feed">Nakrmit Denisku 🐷</button>' : '<button class="btn ghost" data-act="close">Rozumím</button>'}
      </div>`);
      return;
    }
    const W = l.exam ? [] : wordsOf(l);
    openModal(`<div class="sheet">
      <h2>${l.exam ? '🏆 ' : ''}${esc(l.title)}</h2>
      <div class="sub">${esc(l.topic.emoji + ' ' + l.topic.title)} · ${l.exam ? 'zkouška tématu – za zlatou koblihu' : 'lekce ' + l.num}${s === 'done' ? ' · splněno ✓' : ''}</div>
      ${W.length ? '<div class="word-preview">' + W.map(w => `<span>${esc(w.es)}</span>`).join('') + '</div>' : `<p>Velké opakování celého tématu. Můžeš udělat nanejvýš 3 chyby. Zvládneš to! 💪</p>`}
      <button class="btn ${l.exam ? 'gold' : ''}" data-act="start" data-gi="${l.gi}">${s === 'done' ? 'Zopakovat lekci' : l.exam ? 'Začít zkoušku' : 'Začít lekci'}</button>
      ${s === 'done' ? '<div class="sub" style="text-align:center;margin:10px 0 0">Koblihu za tuhle lekci už Deniska snědla 😋</div>' : ''}
    </div>`);
  }

  /* ================= DENISKA TAB ================= */
  const PIG_LINES = [
    'Oink! Já jsem Deniska. 🐽', 'Mám ráda koblihy a španělštinu! 🍩', '¡Hola, amiga! 💕', 'Každá lekce = jedna kobliha. Jen tak dál!',
    'Učit se kousek každý den je lepší než hodně naráz. 🌸', 'Až budu velká, budu královna! 👑', 'Jsi moje nejoblíbenější studentka. 🩷',
  ];
  function pigLine() {
    const { w } = allLearned();
    if (w.length && Math.random() < 0.5) { const x = pick(w); return `Víš, co znamená „${x.es}“? Přece „${x.cz}“! 🤓`; }
    return pick(PIG_LINES);
  }
  function deniskaHTML() {
    const si = stageIdx(); const S = D.STAGES;
    const next = S[si + 1];
    const pct = next ? Math.round((state.eaten - S[si].at) / (next.at - S[si].at) * 100) : 100;
    let h = `<div class="den-page">
      ${state.pending ? `<button class="banner" data-act="feed" style="width:100%;margin:0 0 6px;text-align:left"><span class="bi">🍩</span><span class="bt">Mám hlad! Dáš mi koblihu?<small>Klepni a nakrm mě</small></span></button>` : `<div class="speech" id="pigSpeech">${esc(pigLine())}</div>`}
      <div class="stage idle" id="pigStage" data-act="pet">${D.svg({ stage: si, wear: state.wear })}</div>
      <div class="den-name">Deniska</div>
      <div class="den-stage">${S[si].name}</div>
      <div class="grow-bar">
        <div class="gl"><b>🍩 Snědla ${state.eaten} ${plural(state.eaten, 'koblihu', 'koblihy', 'koblih')}</b><span>${next ? 'do další velikosti ' + (next.at - state.eaten) : 'maximum! 👑'}</span></div>
        <div class="gbar"><i style="width:${pct}%"></i></div>
      </div>
      <div class="section-title">👗 Šatník (za zlaté koblihy)</div>
      <div class="wardrobe">${D.ACCESSORIES.map((a, i) => {
        const has = state.golden.length > i;
        const on = state.wear.includes(a.id);
        return `<button class="ward ${has ? '' : 'locked'} ${on ? 'on' : ''}" data-act="wear" data-id="${a.id}" ${has ? '' : 'disabled'} title="${esc(a.name)}">${has ? a.e : '🔒'}</button>`;
      }).join('')}</div>
      <div class="ward-note">Za každou splněnou zkoušku tématu 🏆 dostaneš zlatou koblihu a Deniska nový doplněk. Klepnutím ho nasadíš nebo sundáš.</div>
      <div class="section-title">🌱 Jak Deniska roste</div>
      <div class="stage-list">${S.map((s, i) => `<div class="stage-item ${i <= si ? 'reached' : ''}"><span>${i <= si ? '🩷' : '🤍'}</span><span class="sn">${s.name}</span><span class="sc">${s.at} 🍩</span></div>`).join('')}</div>
    </div>`;
    return h;
  }
  function plural(n, one, few, many) { return n === 1 ? one : (n >= 2 && n <= 4) ? few : many; }

  /* ================= PRACTICE TAB ================= */
  function practiceHTML() {
    const { w, s } = allLearned();
    const weak = Object.keys(state.weak).sort((a, b) => state.weak[b].n - state.weak[a].n);
    if (!w.length) return `<div class="prac-page"><div class="card"><h3>🔁 Opakování</h3><p>Tady si budeš procvičovat slovíčka, která už umíš, a hlavně ta, ve kterých chybuješ. Nejdřív ale splň první lekci! 🌱</p><button class="btn" data-act="tab" data-tab="path">Jdu na první lekci</button></div></div>`;
    return `<div class="prac-page">
      <div class="card"><h3>💪 Slabá slovíčka</h3>
        <p>${weak.length ? `Máš ${weak.length} ${plural(weak.length, 'slovíčko', 'slovíčka', 'slovíček')}, ve kterých ses spletla. Procvič je, ať se ti nepletou.` : 'Zatím žádné chyby. Paráda! ✨ Můžeš si dát náhodné opakování.'}</p>
        <button class="btn" data-act="practice" data-weak="1" ${weak.length ? '' : 'disabled'}>Procvičit slabá slovíčka</button></div>
      <div class="card"><h3>🎲 Náhodné opakování</h3>
        <p>12 cvičení ze všeho, co už umíš. Za opakování nejsou koblihy, ale počítá se do 🔥 série.</p>
        <button class="btn ghost" data-act="practice">Spustit opakování</button></div>
      ${weak.length ? `<div class="card"><h3>📌 Na tohle si dej pozor</h3><div class="word-list">${weak.slice(0, 30).map(k => `<div class="wl-item"><button class="speak-btn" data-act="say" data-t="${esc(k)}">🔊</button><span class="es">${esc(k)}</span><span class="cz">${esc(state.weak[k].cz)}</span></div>`).join('')}</div></div>` : ''}
      <div class="card"><h3>📖 Můj slovníček</h3><p>Všechno, co ses už naučila: ${w.length} slovíček a ${s.length} vět.</p>
        <button class="btn ghost small" data-act="dict">${view.dict ? 'Skrýt slovníček' : 'Zobrazit slovníček'}</button>
        ${view.dict ? `<div class="word-list" style="margin-top:10px">${uniqBy(w, x => x.es).map(x => `<div class="wl-item"><button class="speak-btn" data-act="say" data-t="${esc(x.es)}">🔊</button><span class="es">${esc(x.es)}</span><span class="cz">${esc(x.cz)}</span></div>`).join('')}</div>` : ''}
      </div>
    </div>`;
  }

  /* ================= LESSON RUNNER ================= */
  function startLesson(l) {
    sfx.tap();
    const mode = l.exam ? (isDone(l) ? 'replay' : 'exam') : (isDone(l) ? 'replay' : 'lesson');
    const q = l.exam ? buildExam(l) : buildLesson(l);
    R = { mode, lesson: l, exam: !!l.exam, queue: q, pos: 0, need: q.length, progress: 0, hearts: MAX_HEARTS, mistakes: 0, correct: 0, answers: 0, wrongItems: [], t0: Date.now() };
    go({ name: 'lesson' });
  }
  function startPractice(onlyWeak) {
    const q = buildPractice(onlyWeak);
    if (!q.length) return toast('Nejdřív splň aspoň jednu lekci 🌱');
    R = { mode: 'practice', lesson: null, queue: q, pos: 0, need: q.length, progress: 0, hearts: Infinity, mistakes: 0, correct: 0, answers: 0, wrongItems: [], t0: Date.now() };
    go({ name: 'lesson' });
  }

  function heartsHTML() {
    if (R.mode === 'practice') return '<span style="font-size:22px">🔁</span>';
    return '💗'.repeat(Math.max(R.hearts, 0)) + '🤍'.repeat(MAX_HEARTS - Math.max(R.hearts, 0));
  }

  function renderLesson() {
    const ex = R.queue[R.pos];
    R.cur = { ex, ready: false, sel: null, answered: false };
    const pct = Math.round(R.progress / R.need * 100);
    app.innerHTML = `<div class="lesson" id="lesson">
      <div class="lesson-top">
        <button class="close-x" data-act="quit" aria-label="Zavřít">✕</button>
        <div class="progress"><i style="width:${pct}%"></i></div>
        <div class="hearts" id="hearts">${heartsHTML()}</div>
      </div>
      <div class="ex" id="ex">${exHTML(ex)}</div>
      <div class="ex-foot" id="foot">${footHTML(ex)}</div>
    </div>`;
    bindEx(ex);
  }

  function miniPig() { return `<div class="mini-pig">${D.svg({ stage: Math.max(stageIdx(), 1), wear: state.wear, fixedScale: 1 })}</div>`; }
  function speakBtn(text, slow) { return `<button class="speak-btn ${slow ? 'slow' : ''}" data-act="say" data-t="${esc(text)}" ${slow ? 'data-slow="1"' : ''} aria-label="Přehrát">${slow ? '🐢' : '🔊'}</button>`; }
  function label(ex) {
    if (ex.review) return '<div class="ex-label review">🔁 Opakování</div>';
    return '';
  }

  function exHTML(ex) {
    const it = ex.item;
    switch (ex.t) {
      case 'tip':
        return `<div class="tip-card"><div class="tip-head">${D.svg({ stage: Math.max(stageIdx(), 1), wear: state.wear, fixedScale: 1 })}<span>Tip od Denisky</span></div><div class="tip-body">${md(ex.text)}</div></div>`;
      case 'intro':
        return `<div class="intro-card"><div class="ex-label">✨ Nové slovíčko</div>
          <div class="big">${esc(it.es)}</div><div class="tr">${esc(it.czAlt.join(', '))}</div>
          <div class="speak-row">${speakBtn(it.es)}${speakBtn(it.es, true)}</div></div>`;
      case 'choice': {
        const es2cz = ex.dir === 'es2cz';
        const sent = isSentence(it);
        return `${label(ex)}<div class="ex-title">${es2cz ? (sent ? 'Co znamená tahle věta?' : 'Co znamená tohle slovo?') : 'Jak se to řekne španělsky?'}</div>
          <div class="prompt">${miniPig()}<div class="bubble">${es2cz ? speakBtn(it.es) : ''}<span>${esc(es2cz ? it.es : it.cz)}</span></div></div>
          <div class="options">${ex.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
      }
      case 'pairs':
        return `<div class="ex-title">Spoj dvojice</div><div class="pairs">
          <div class="col">${ex.left.map(i => `<button class="pair" data-side="l" data-i="${i}">${esc(ex.items[i].es)}</button>`).join('')}</div>
          <div class="col">${ex.right.map(i => `<button class="pair" data-side="r" data-i="${i}">${esc(ex.items[i].cz)}</button>`).join('')}</div></div>`;
      case 'tiles': {
        const head = ex.mode === 'listen-tiles' ? 'Co slyšíš? Poskládej to.' : ex.mode === 'tiles-cz2es' ? 'Přelož do španělštiny' : 'Přelož do češtiny';
        const prompt = ex.mode === 'listen-tiles'
          ? `<div class="listen-big">${speakBtn(it.es)}${speakBtn(it.es, true)}</div>`
          : `<div class="prompt">${miniPig()}<div class="bubble">${ex.mode === 'tiles-es2cz' ? speakBtn(it.es) : ''}<span>${esc(ex.mode === 'tiles-es2cz' ? it.es : it.cz)}</span></div></div>`;
        return `${label(ex)}<div class="ex-title">${head}</div>${prompt}
          <div class="answer-line" id="ansLine"></div>
          <div class="bank">${ex.bank.map((w, i) => `<button class="tile" data-i="${i}">${esc(w)}</button>`).join('')}</div>`;
      }
      case 'type':
        return `${label(ex)}<div class="ex-title">Napiš španělsky</div>
          <div class="prompt">${miniPig()}<div class="bubble"><span>${esc(it.cz)}</span></div></div>
          ${typeBox()}`;
      case 'listentype':
        return `<div class="ex-title">Napiš, co slyšíš</div>
          <div class="listen-big">${speakBtn(it.es)}${speakBtn(it.es, true)}</div>
          ${typeBox()}`;
      case 'speak':
        return `<div class="ex-title">Řekni nahlas 🎤</div>
          <div class="speak-card"><div class="sent">${speakBtn(it.es)}<span>${esc(it.es)}</span></div><div class="tr">${esc(it.cz)}</div>
          <button class="mic-btn" id="micBtn" aria-label="Mikrofon">🎤</button>
          <div class="heard" id="heard">Klepni na mikrofon a řekni to španělsky</div></div>`;
    }
    return '';
  }
  function typeBox() {
    return `<input class="type-input" id="typeIn" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Napiš odpověď…" enterkeyhint="done">
      <div class="accents">${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(c => `<button data-ch="${c}">${c}</button>`).join('')}</div>`;
  }
  function footHTML(ex) {
    if (ex.t === 'tip') return `<button class="btn" data-act="next">Jasně! 👍</button>`;
    if (ex.t === 'intro') return `<button class="btn" data-act="next">Pokračovat</button>`;
    if (ex.t === 'pairs') return `<button class="btn" id="checkBtn" data-act="next" disabled>Pokračovat</button>`;
    if (ex.t === 'speak') return `<button class="btn" id="checkBtn" data-act="next" disabled>Pokračovat</button><div style="text-align:center"><button class="link-btn" data-act="skipmic">Teď nemůžu mluvit</button></div>`;
    return `<button class="btn" id="checkBtn" data-act="check" disabled>Zkontrolovat</button>`;
  }
  function setReady(v) { R.cur.ready = v; const b = $('#checkBtn'); if (b) b.disabled = !v; }

  function bindEx(ex) {
    const it = ex.item;
    if (ex.t === 'intro') say(it.es);
    if (ex.t === 'choice') {
      if (ex.dir === 'es2cz') say(it.es);
      $$('.opt').forEach(b => b.addEventListener('click', () => {
        if (R.cur.answered) return;
        $$('.opt').forEach(x => x.classList.remove('sel')); b.classList.add('sel');
        R.cur.sel = +b.dataset.i; setReady(true);
        if (ex.dir === 'cz2es') say(ex.opts[R.cur.sel]); else sfx.tap();
      }));
    }
    if (ex.t === 'tiles') {
      if (ex.mode !== 'tiles-cz2es') say(it.es);
      R.cur.sel = [];
      const line = $('#ansLine');
      const draw = () => {
        line.innerHTML = R.cur.sel.map((bi, k) => `<button class="tile" data-k="${k}">${esc(ex.bank[bi])}</button>`).join('');
        $$('.bank .tile').forEach(b => b.classList.toggle('used', R.cur.sel.includes(+b.dataset.i)));
        $$('.tile', line).forEach(b => b.addEventListener('click', () => { if (R.cur.answered) return; R.cur.sel.splice(+b.dataset.k, 1); sfx.tap(); draw(); }));
        setReady(R.cur.sel.length > 0);
      };
      $$('.bank .tile').forEach(b => b.addEventListener('click', () => {
        if (R.cur.answered) return;
        R.cur.sel.push(+b.dataset.i);
        if (ex.mode !== 'tiles-es2cz') say(ex.bank[+b.dataset.i]); else sfx.tap();
        draw();
      }));
      draw();
    }
    if (ex.t === 'type' || ex.t === 'listentype') {
      if (ex.t === 'listentype') say(it.es);
      const inp = $('#typeIn');
      inp.addEventListener('input', () => setReady(inp.value.trim().length > 0));
      inp.addEventListener('keydown', e => { if (e.key === 'Enter' && R.cur.ready && !R.cur.answered) { e.preventDefault(); doCheck(); } });
      $$('.accents button').forEach(b => {
        b.addEventListener('pointerdown', e => e.preventDefault());
        b.addEventListener('click', () => {
          const s = inp.selectionStart ?? inp.value.length, e2 = inp.selectionEnd ?? inp.value.length;
          inp.value = inp.value.slice(0, s) + b.dataset.ch + inp.value.slice(e2);
          inp.focus(); inp.setSelectionRange(s + 1, s + 1); setReady(true);
        });
      });
      if (ex.t === 'type') setTimeout(() => { try { inp.focus(); } catch (e) {} }, 250);
    }
    if (ex.t === 'pairs') bindPairs(ex);
    if (ex.t === 'speak') bindSpeak(ex);
  }

  function bindPairs(ex) {
    let selL = null, selR = null, matched = 0, penalized = false;
    const tryMatch = () => {
      if (selL == null || selR == null) return;
      const bl = $(`.pair[data-side="l"][data-i="${selL}"]`), br = $(`.pair[data-side="r"][data-i="${selR}"]`);
      if (selL === selR) {
        bl.classList.remove('sel'); br.classList.remove('sel');
        bl.classList.add('matched'); br.classList.add('matched'); matched++; sfx.ok();
        if (matched === ex.items.length) { setReady(true); R.cur.pairsOk = !penalized; }
      } else {
        sfx.bad();
        [bl, br].forEach(b => { b.classList.remove('sel'); b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 450); });
        markWeak(ex.items[selL], 1);
        if (!penalized && R.mode !== 'practice') {
          penalized = true; loseHeart();
          if (R.failed) { setTimeout(() => go({ name: 'fail' }), 600); }
        }
      }
      selL = selR = null;
    };
    $$('.pair').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i;
      if (b.dataset.side === 'l') { $$('.pair[data-side="l"]').forEach(x => x.classList.remove('sel')); selL = i; say(ex.items[i].es); }
      else { $$('.pair[data-side="r"]').forEach(x => x.classList.remove('sel')); selR = i; sfx.tap(); }
      b.classList.add('sel'); tryMatch();
    }));
  }

  let recog = null, recogDone = null;
  function killRecog() {
    const r = recog; recog = null;
    if (r) { r.onresult = r.onerror = r.onend = r.onstart = r.onaudiostart = null; try { r.abort(); } catch (e) {} }
  }
  function micFailed(msg) {
    // mikrofon v tomhle prostředí nefunguje → vypnout mluvení, ať se appka nikdy nezasekne
    killRecog(); micBroken = true; state.settings.mic = false; save();
    const b = $('#micBtn'); if (b) b.classList.remove('rec');
    skipMic(msg || 'Mikrofon tady nefunguje, tak mluvení vypínám. Dá se zase zapnout v ⚙️ Nastavení.');
  }
  function bindSpeak(ex) {
    const it = ex.item;
    let attempts = 0;
    const heard = $('#heard'), btn = $('#micBtn');
    // tlačítko dole je aktivní vždycky – z cvičení se dá kdykoliv odejít
    setReady(true); $('#checkBtn').textContent = 'Přeskočit'; R.cur.speakSkip = true;
    say(it.es);
    btn.addEventListener('click', () => {
      if (R.cur.answered) return;
      if (recog) { if (recogDone) recogDone(); return; }
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) return micFailed();
      try { speechSynthesis.cancel(); } catch (e) {}
      let best = '', bestSim = 0, started = false, finished = false;
      const r = new SR(); recog = r;
      r.lang = 'es-ES'; r.interimResults = true; r.maxAlternatives = 3; r.continuous = false;
      btn.classList.add('rec'); heard.innerHTML = 'Poslouchám… 👂 <br><small>(klepni znovu, až domluvíš)</small>';
      const finish = () => {
        if (finished) return; finished = true;
        clearTimeout(startGuard); clearTimeout(hardStop); recogDone = null;
        killRecog(); btn.classList.remove('rec');
        if (R.cur.answered || R.cur.ex !== ex) return;
        attempts++;
        if (bestSim >= 0.62) {
          R.cur.answered = true; R.cur.speakSkip = false; R.correct++; R.answers++; R.progress++;
          sfx.ok(); showFeedback(true, null, bestSim > 0.9 ? 'Perfektní výslovnost! 🌟' : 'Dobře! Rozumím ti. 👍');
          return;
        }
        if (best) { sfx.bad(); heard.innerHTML = `Slyším: <b>${esc(best)}</b><br>Ještě jednou, pomaleji 🙂`; }
        else heard.innerHTML = 'Nic jsem neslyšela. Zkus to znovu 🙂';
        if (attempts >= 2) $('#checkBtn').textContent = 'Nevadí, pokračovat';
      };
      recogDone = finish;
      r.onstart = r.onaudiostart = () => { started = true; };
      r.onresult = e => {
        started = true;
        for (let i = 0; i < e.results.length; i++) for (let j = 0; j < e.results[i].length; j++) {
          const t = e.results[i][j].transcript; const sim = similarity(t, it.es);
          if (sim >= bestSim) { bestSim = sim; best = t; }
        }
        heard.innerHTML = 'Slyším: <b>' + esc(best) + '</b>';
        if (bestSim >= 0.9) finish();
      };
      r.onerror = e => {
        if (['not-allowed', 'service-not-allowed', 'audio-capture'].includes(e.error)) return micFailed('Mikrofon nemá povolení, tak mluvení vypínám. Zapnout se dá v ⚙️ Nastavení.');
        finish();
      };
      r.onend = finish;
      // pojistky proti zaseknutí (iPhone appka na ploše někdy mikrofon vůbec nespustí)
      const startGuard = setTimeout(() => { if (!started && !finished) { finished = true; micFailed(); } }, 4000);
      const hardStop = setTimeout(finish, 9000);
      try { r.start(); } catch (e) { clearTimeout(startGuard); clearTimeout(hardStop); finished = true; micFailed(); }
    });
  }
  function skipMic(msg) {
    if (R.cur.answered) return;
    R.cur.answered = true; R.progress++;
    showFeedback(true, null, msg || 'Mikrofon vypnu na hodinu. Mluvení zase přijde později. 😉', true);
  }

  function loseHeart() {
    R.mistakes++;
    if (R.hearts <= 0) R.failed = true; else R.hearts--;
    const h = $('#hearts'); if (h) { h.innerHTML = heartsHTML(); h.classList.remove('shake'); void h.offsetWidth; h.classList.add('shake'); }
  }

  function doCheck() {
    const ex = R.cur.ex; if (R.cur.answered || !R.cur.ready) return;
    const it = ex.item;
    let ok = false, answer = '', note = '';
    if (ex.t === 'choice') { ok = R.cur.sel === ex.ans; answer = ex.opts[ex.ans]; }
    else if (ex.t === 'tiles') {
      const given = R.cur.sel.map(i => ex.bank[i]).join(' ');
      const alts = ex.mode === 'tiles-es2cz' ? it.czAlt : it.esAlt;
      ok = alts.some(a => norm(a) === norm(given));
      answer = ex.mode === 'tiles-es2cz' ? it.cz : it.es;
    } else if (ex.t === 'type' || ex.t === 'listentype') {
      const r = checkEs($('#typeIn').value, it.esAlt);
      ok = r.ok; note = r.note || ''; answer = it.es;
      $('#typeIn').blur();
    }
    R.cur.answered = true; R.answers++;
    if (ok) {
      R.correct++; R.progress++; sfx.ok();
      if (it) markWeak(it, -1);
    } else {
      sfx.bad();
      if (it) { markWeak(it, 2); if (!R.wrongItems.some(w => w.es === it.es)) R.wrongItems.push(it); }
      if (R.mode !== 'practice') loseHeart();
      if (!R.failed) R.queue.push(cloneEx(ex));
    }
    showFeedback(ok, ok ? (note ? answer : null) : answer, note);
  }

  const PRAISE = ['¡Muy bien!', '¡Perfecto!', '¡Genial!', '¡Excelente!', '¡Bravo!', '¡Fantástico!', 'Správně!'];
  function showFeedback(ok, answer, note, neutral) {
    const ex = R.cur.ex;
    const esAns = answer && (ex.t !== 'tiles' || ex.mode !== 'tiles-es2cz') && !(ex.t === 'choice' && ex.dir === 'es2cz');
    const fb = document.createElement('div');
    fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
    fb.innerHTML = `<div class="fh">${neutral ? '🙂 Nevadí' : ok ? '✨ ' + pick(PRAISE) : '😕 Tohle ne'}</div>
      ${answer ? `<div class="fa">${ok ? '' : 'Správně: '}<b>${esc(answer)}</b>${esAns ? speakBtn(answer) : ''}</div>` : ''}
      ${!ok && ex.item && answer !== ex.item.es && ex.item.es ? `<div class="fn">🇪🇸 ${esc(ex.item.es)} = ${esc(ex.item.cz)}</div>` : ''}
      ${note ? `<div class="fn">${esc(note)}</div>` : ''}
      <button class="btn ${ok ? 'ok' : 'bad'}" data-act="next">${R.failed ? 'Pokračovat' : 'Pokračovat'}</button>`;
    $('#lesson').appendChild(fb);
    const foot = $('#foot'); if (foot) foot.style.visibility = 'hidden';
    if (!ok && esAns) say(answer);
  }

  function next() {
    killRecog();
    const ex = R.cur && R.cur.ex;
    if (ex && (ex.t === 'tip' || ex.t === 'intro' || ex.t === 'pairs')) { R.progress++; if (ex.t === 'pairs') { R.answers++; if (R.cur.pairsOk) R.correct++; } }
    if (ex && ex.t === 'speak' && R.cur.speakSkip && !R.cur.answered) { R.progress++; }
    if (R.failed) { save(); return go({ name: 'fail' }); }
    R.pos++;
    if (R.pos >= R.queue.length) return finishLesson();
    renderLesson();
  }

  function finishLesson() {
    const l = R.lesson;
    R.secs = Math.round((Date.now() - R.t0) / 1000);
    R.firstTime = false;
    if ((R.mode === 'lesson' || R.mode === 'exam') && !state.done[l.id]) {
      state.done[l.id] = true; state.pending = { id: l.id, gold: !!l.exam }; R.firstTime = true;
    }
    bumpStreak();
    state.stats.lessons++; state.stats.correct += R.correct; state.stats.answers += R.answers;
    save();
    go({ name: 'result' });
  }

  /* ================= RESULT / FEED / FAIL ================= */
  function renderResult() {
    const acc = R.answers ? Math.round(R.correct / R.answers * 100) : 100;
    const mins = Math.floor(R.secs / 60), secs = R.secs % 60;
    const gold = R.firstTime && R.exam;
    let body;
    if (R.mode === 'practice') {
      body = `<div style="font-size:84px">💪</div><h1>Procvičeno!</h1><p class="lead">Deniska má radost, že opakuješ. Opakování je matka moudrosti! 🐷</p>`;
    } else if (R.firstTime) {
      body = `<div class="reward-donut ${gold ? 'gold' : ''}">🍩</div>
        <h1>${gold ? '¡Increíble!' : pick(['¡Muy bien!', '¡Genial!', '¡Perfecto!'])}</h1>
        <p class="lead">${gold ? `Zkouška tématu ${esc(R.lesson.topic.title)} je splněná! Získáváš <b>zlatou koblihu</b> pro Denisku ✨` : `Lekce „${esc(R.lesson.title)}“ je splněná!<br>Získáváš koblihu pro Denisku 🍩`}</p>`;
    } else {
      body = `<div style="font-size:84px">🌟</div><h1>Zopakováno!</h1><p class="lead">Koblihu za tuhle lekci už Deniska má, ale opakování se vždycky vyplatí. 😉</p>`;
    }
    app.innerHTML = `<div class="screen"><div class="grow">${body}
      <div class="stats"><div class="stat"><b>${acc}%</b><span>Přesnost</span></div><div class="stat"><b>${mins}:${String(secs).padStart(2, '0')}</b><span>Čas</span></div><div class="stat"><b>🔥 ${streakNow()}</b><span>Série</span></div></div></div>
      <div class="actions">${R.firstTime ? `<button class="btn ${gold ? 'gold' : ''}" data-act="feed">Jdu za Deniskou 🐷</button>` : `<button class="btn" data-act="home">Pokračovat</button>`}</div></div>`;
    sfx.win(); confetti(R.firstTime ? 36 : 18, gold);
  }

  function renderFeed() {
    if (!state.pending) return go({ name: 'home', tab: 'path' });
    const gold = state.pending.gold;
    const si = stageIdx();
    app.innerHTML = `<div class="screen"><div class="grow">
      <div class="speech" id="feedSpeech">Nakrm mě a odemkni si další lekci! 🍩</div>
      <div class="stage idle" id="feedStage" style="cursor:pointer">${D.svg({ stage: si, wear: state.wear })}
        <div class="fly" id="flyDonut" style="top:96%;${gold ? 'filter:drop-shadow(0 0 12px rgba(255,200,61,.95)) sepia(.6) saturate(2.2) hue-rotate(-12deg)' : ''}">🍩</div></div>
      <div class="tap-hint" id="tapHint">👆 Klepni na Denisku</div></div>
      <div class="actions" id="feedActions" style="visibility:hidden"><button class="btn" data-act="afterfeed">Na další lekci ➜</button></div></div>`;
    let fed = false;
    $('#feedStage').addEventListener('click', () => {
      if (fed) return; fed = true;
      $('#tapHint').style.visibility = 'hidden';
      const stage = $('#feedStage'), pig = $('.pig', stage), fly = $('#flyDonut');
      const before = stageIdx();
      pig.setAttribute('data-mood', 'eat'); sfx.oink();
      // pusa je v souřadnicích SVG ~ (100,120) při scale; spočítáme z měřítka
      const sc = D.STAGES[before].scale; const mouthY = 190 - (190 - 121) * sc;
      fly.style.top = (mouthY / 200 * 100) + '%'; fly.style.fontSize = '34px';
      setTimeout(() => {
        fly.style.opacity = '0'; pig.setAttribute('data-mood', 'chew');
        let c = 0; const iv = setInterval(() => { sfx.chomp(); if (++c > 4) clearInterval(iv); }, 220);
      }, 720);
      setTimeout(() => {
        pig.setAttribute('data-mood', 'happy');
        hearts(stage, gold ? ['💛', '✨', '💖', '⭐'] : ['💖', '💕', '🩷', '✨']);
        // uložit
        const p = state.pending; state.fed[p.id] = true; state.eaten++; state.pending = null;
        let newAcc = null;
        if (p.gold && !state.golden.includes(p.id)) {
          state.golden.push(p.id);
          newAcc = D.ACCESSORIES[state.golden.length - 1];
          if (newAcc) { state.wear = state.wear.filter(id => D.ACCESSORIES.find(a => a.id === id).slot !== newAcc.slot); state.wear.push(newAcc.id); }
        }
        save();
        const after = stageIdx();
        const sp = $('#feedSpeech');
        const nl = currentLesson();
        if (after > before || newAcc) {
          stage.innerHTML = D.svg({ stage: after, wear: state.wear, mood: 'happy' });
          stage.classList.remove('idle'); stage.classList.add('bounce');
          sfx.win(); confetti(40, true);
          setTimeout(() => { stage.classList.remove('bounce'); stage.classList.add('idle'); }, 700);
        } else {
          stage.classList.remove('idle'); stage.classList.add('bounce');
          setTimeout(() => { stage.classList.remove('bounce'); stage.classList.add('idle'); }, 700);
        }
        let msg = 'Mňam! Děkuju! 💕';
        if (after > before) msg = `Jupí, vyrostla jsem! Teď jsem ${D.STAGES[after].name}! 🎉`;
        if (newAcc) msg += ` A mám nový doplněk: ${newAcc.e} ${newAcc.name}!`;
        msg += nl ? ' Další lekce je odemčená.' : ' Kurz je hotový! 👑';
        sp.textContent = msg; sp.style.animation = 'none'; void sp.offsetWidth; sp.style.animation = '';
        $('#feedActions').style.visibility = 'visible';
        if (!nl) $('#feedActions').innerHTML = '<button class="btn gold" data-act="home">Hotovo! 👑</button>';
      }, 1900);
    });
  }

  function renderFail() {
    const si = stageIdx();
    const replay = R.mode === 'replay' || R.mode === 'practice';
    app.innerHTML = `<div class="screen"><div class="grow">
      <div class="speech" id="failSpeech">Hmm… tahle lekce ještě nesedí 🤔</div>
      <div class="stage" id="failStage">${D.svg({ stage: si, wear: state.wear })}
        <div class="fly" id="flyDonut" style="top:96%">🍩</div></div>
      <h1 style="color:var(--bad-dark)">Ups, moc chybiček</h1>
      <p class="lead">${replay ? 'Nevadí, zkus to znovu.' : 'Deniska koblihu vyprdla 💨 Zkus lekci znovu a koblihu získáš zpátky!'}</p>
      ${R.wrongItems.length ? `<div class="card" style="width:100%;text-align:left;margin-bottom:6px"><h3 style="font-size:16px">📌 Na tohle si dej pozor</h3><div class="word-list">${R.wrongItems.slice(0, 6).map(x => `<div class="wl-item"><button class="speak-btn" data-act="say" data-t="${esc(x.es)}">🔊</button><span class="es">${esc(x.es)}</span><span class="cz">${esc(x.cz)}</span></div>`).join('')}</div></div>` : ''}
      </div>
      <div class="actions">${R.lesson ? `<button class="btn" data-act="retry">Zkusit znovu 💪</button>` : ''}<button class="btn ghost" data-act="home">Zpět na lekce</button></div></div>`;
    save();
    if (replay) { $('#flyDonut').remove(); $('.pig').setAttribute('data-mood', 'sad'); $('#failSpeech').textContent = 'To nic, příště to dáš! 💪'; return; }
    const stage = $('#failStage'), pig = $('.pig', stage), fly = $('#flyDonut');
    const sc = D.STAGES[si].scale; const mouthY = 190 - (190 - 121) * sc;
    setTimeout(() => { pig.setAttribute('data-mood', 'eat'); fly.style.top = (mouthY / 200 * 100) + '%'; fly.style.fontSize = '34px'; }, 400);
    setTimeout(() => { fly.style.opacity = '0'; pig.setAttribute('data-mood', 'chew'); sfx.chomp(); }, 1120);
    setTimeout(() => {
      pig.setAttribute('data-mood', 'sad'); sfx.fart();
      stage.classList.add('wiggle');
      const tailX = 50 + (152 - 100) / 200 * 100 * sc, tailY = (190 - (190 - 140) * sc) / 200 * 100;
      const puff = document.createElement('div'); puff.className = 'puff'; puff.textContent = '💨';
      puff.style.left = tailX + '%'; puff.style.top = (tailY - 8) + '%'; stage.appendChild(puff);
      const d = document.createElement('div'); d.className = 'donut-out'; d.textContent = '🍩';
      d.style.left = (tailX - 4) + '%'; d.style.top = (tailY - 6) + '%'; stage.appendChild(d);
      $('#failSpeech').textContent = 'Jejda… koblížek mi utekl 💨🍩 Zkus to znovu, já ti věřím!';
    }, 1700);
  }

  function hearts(stage, set) {
    for (let i = 0; i < 7; i++) {
      const e = document.createElement('div'); e.className = 'float-up'; e.textContent = pick(set);
      e.style.left = (35 + Math.random() * 30) + '%'; e.style.top = (35 + Math.random() * 20) + '%';
      e.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px'); e.style.animationDelay = (i * 0.08) + 's';
      stage.appendChild(e); setTimeout(() => e.remove(), 2000);
    }
  }
  function confetti(n, gold) {
    const set = gold ? ['🍩', '⭐', '✨', '💛', '🎉'] : ['🍩', '💖', '🌸', '✨', '🎉'];
    for (let i = 0; i < n; i++) {
      const c = document.createElement('div'); c.className = 'confetti'; c.textContent = pick(set);
      c.style.left = Math.random() * 100 + 'vw'; c.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
      c.style.animationDelay = (Math.random() * 0.6) + 's'; c.style.fontSize = (16 + Math.random() * 16) + 'px';
      document.body.appendChild(c); setTimeout(() => c.remove(), 4200);
    }
  }
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2400);
  }

  /* ================= MODALS ================= */
  function openModal(html, center) {
    modalRoot.innerHTML = `<div class="overlay ${center ? 'center' : ''}" id="overlay">${html}</div>`;
    $('#overlay').addEventListener('click', e => { if (e.target.id === 'overlay') closeModal(); });
  }
  function closeModal() { modalRoot.innerHTML = ''; }

  function settingsModal() {
    const s = state.settings;
    const sw = (k, on) => `<button class="switch ${on ? 'on' : ''}" data-act="toggle" data-k="${k}"></button>`;
    openModal(`<div class="sheet" style="max-height:88vh;overflow:auto">
      <h2>⚙️ Nastavení</h2>
      <div class="set-item"><span class="sl">🔊 Zvuky a výslovnost<small>Deniska čte španělštinu nahlas</small></span>${sw('sound', s.sound)}</div>
      <div class="set-item"><span class="sl">🐢 Pomalejší výslovnost<small>Když to jde moc rychle</small></span>${sw('slow', s.slow)}</div>
      <div class="set-item"><span class="sl">🎤 Cvičení s mikrofonem<small>${micSupported() ? 'Mluvení nahlas' : 'Tenhle prohlížeč mikrofon nepodporuje'}</small></span>${sw('mic', s.mic)}</div>
      <div class="set-item"><span class="sl">🗣️ Vyzkoušet hlas</span><button class="btn small ghost" style="width:auto" data-act="say" data-t="¡Hola! Me llamo Deniska. ¿Cómo estás?">Přehrát</button></div>
      <div class="section-title" style="margin-top:16px">💾 Záloha postupu</div>
      <p class="sub" style="margin:0 0 8px">Zkopíruj si tenhle kód (třeba do poznámek). Kdyby se něco stalo, vložíš ho zpátky a postup se obnoví.</p>
      <textarea class="backup" id="bk" readonly>${esc(btoa(unescape(encodeURIComponent(JSON.stringify(state)))))}</textarea>
      <div class="row"><button class="btn small ghost" data-act="copybk">Zkopírovat</button><button class="btn small ghost" data-act="importbk">Obnovit ze zálohy</button></div>
      <div class="section-title" style="margin-top:16px">📊 Statistiky</div>
      <p class="sub" style="margin:0">Splněno ${doneCount()} z ${TOTAL} lekcí · ${state.stats.lessons} sezení · přesnost ${state.stats.answers ? Math.round(state.stats.correct / state.stats.answers * 100) : 0} %</p>
      <div style="text-align:center;margin-top:12px"><button class="link-btn" data-act="reset" style="color:var(--bad)">Smazat všechen postup</button></div>
      <div class="credit">Vyrobeno s láskou pro ségru 🩷<br>od bráchy Davida</div>
    </div>`);
  }

  /* ================= ACTIONS ================= */
  const actions = {
    tab: d => { view = { name: 'home', tab: d.tab }; render(); $('#content') && ($('#content').scrollTop = 0); },
    node: d => lessonSheet(LESSONS[+d.gi]),
    start: d => { closeModal(); startLesson(LESSONS[+d.gi]); },
    close: () => closeModal(),
    jump: d => { const el = document.getElementById(d.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
    feed: () => { closeModal(); go({ name: 'feed' }); },
    afterfeed: () => { const nl = currentLesson(); go({ name: 'home', tab: 'path' }); if (nl) setTimeout(() => lessonSheet(nl), 450); },
    home: () => { R = null; go({ name: 'home', tab: 'path' }); },
    retry: () => { const l = R.lesson; startLesson(l); },
    say: (d, el) => say(d.t, !!d.slow),
    next: () => { if ($('#checkBtn') && $('#checkBtn').disabled && !$('.feedback')) return; next(); },
    check: () => doCheck(),
    skipmic: () => { killRecog(); state.micOffUntil = Date.now() + 60 * 60 * 1000; save(); skipMic(); },
    quit: () => {
      if (R && R.mode === 'practice') { R = null; return go({ name: 'home', tab: 'practice' }); }
      openModal(`<div class="sheet" style="text-align:center">${D.svg({ stage: stageIdx(), wear: state.wear, mood: 'sad', cls: '' }).replace('<svg', '<svg style="width:120px"')}
        <h2>Opravdu chceš skončit?</h2><div class="sub">Postup v téhle lekci se ztratí a Deniska zůstane bez koblihy. 🥺</div>
        <button class="btn" data-act="close">Pokračovat v lekci</button>
        <button class="link-btn" data-act="home" style="color:var(--bad);width:100%">Skončit</button></div>`);
    },
    practice: d => startPractice(!!d.weak),
    dict: () => { view.dict = !view.dict; const c = $('#content'); const st = c.scrollTop; renderHome(); $('#content').scrollTop = st; },
    pet: () => {
      if (state.pending) return go({ name: 'feed' });
      const st = $('#pigStage'); sfx.oink();
      st.classList.remove('idle', 'wiggle'); void st.offsetWidth; st.classList.add('wiggle');
      setTimeout(() => { st.classList.remove('wiggle'); st.classList.add('idle'); }, 520);
      hearts(st, ['💖', '🩷', '✨']);
      const sp = $('#pigSpeech'); if (sp) { sp.textContent = pigLine(); sp.style.animation = 'none'; void sp.offsetWidth; sp.style.animation = ''; }
    },
    wear: d => {
      const a = D.ACCESSORIES.find(x => x.id === d.id); if (!a) return;
      if (state.wear.includes(a.id)) state.wear = state.wear.filter(x => x !== a.id);
      else { state.wear = state.wear.filter(id => D.ACCESSORIES.find(x => x.id === id).slot !== a.slot); state.wear.push(a.id); }
      save(); sfx.tap(); const c = $('#content'); const st = c.scrollTop; renderHome(); $('#content').scrollTop = st;
    },
    settings: () => settingsModal(),
    toggle: (d, el) => {
      state.settings[d.k] = !state.settings[d.k];
      if (d.k === 'mic' && state.settings.mic) { state.micOffUntil = 0; micBroken = false; }
      save(); el.classList.toggle('on', state.settings[d.k]);
    },
    copybk: () => {
      const t = $('#bk'); const v = t.value;
      (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(() => toast('Záloha zkopírovaná 📋')).catch(() => { t.removeAttribute('readonly'); t.select(); document.execCommand('copy'); t.setAttribute('readonly', ''); toast('Záloha zkopírovaná 📋'); });
    },
    importbk: () => {
      openModal(`<div class="sheet"><h2>Obnovit ze zálohy</h2><div class="sub">Vlož kód zálohy. Současný postup se přepíše.</div>
        <textarea class="backup" id="bkIn" placeholder="Sem vlož kód…"></textarea>
        <div class="row"><button class="btn ghost" data-act="close">Zrušit</button><button class="btn" data-act="doimport">Obnovit</button></div></div>`);
    },
    doimport: () => {
      try {
        const s = JSON.parse(decodeURIComponent(escape(atob($('#bkIn').value.trim()))));
        if (!s || typeof s !== 'object' || !s.done) throw 0;
        state = Object.assign(defaultState(), s); save(); closeModal(); toast('Postup obnoven ✅'); go({ name: 'home', tab: 'path' });
      } catch (e) { toast('Tenhle kód nefunguje 😕'); }
    },
    reset: () => {
      openModal(`<div class="sheet" style="text-align:center"><h2>Smazat všechno?</h2><div class="sub">Zmizí všechny splněné lekce, koblihy i Denisčin růst. Tohle nejde vrátit.</div>
        <button class="btn ghost" data-act="close">Nechat být</button>
        <button class="link-btn" data-act="doreset" style="color:var(--bad);width:100%">Ano, smazat všechno</button></div>`, true);
    },
    doreset: () => { state = defaultState(); save(); closeModal(); go({ name: 'home', tab: 'path' }); },
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const fn = actions[el.dataset.act];
    if (fn) fn(el.dataset, el);
  });

  // pojistka: když appka spadne do pozadí uprostřed nahrávání
  document.addEventListener('visibilitychange', () => { if (document.hidden && recog) { try { recog.abort(); } catch (e) {} } });

  render();
  window.__deniska = { get R() { return R; }, state: () => state, LESSONS, go, startLesson, buildLesson, buildExam };
})();
