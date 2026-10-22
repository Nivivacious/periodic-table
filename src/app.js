// ---------- Data ----------
const FAMILIES = {
  alkali: "Alkali metals", alkaline: "Alkaline earth", transition: "Transition metals", post: "Post-transition",
  metalloid: "Metalloids", nonmetal: "Nonmetals", halogen: "Halogens", noble: "Noble gases",
  lanthanide: "Lanthanides", actinide: "Actinides",
};
const SETS = {
  alkali: [3, 11, 19, 37, 55, 87], alkaline: [4, 12, 20, 38, 56, 88],
  nonmetal: [1, 6, 7, 8, 15, 16, 34], halogen: [9, 17, 35, 53, 85, 117],
  noble: [2, 10, 18, 36, 54, 86, 118], metalloid: [5, 14, 32, 33, 51, 52],
  post: [13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116],
};
function family(n) {
  for (const [k, v] of Object.entries(SETS)) if (v.includes(n)) return k;
  if (n >= 57 && n <= 71) return "lanthanide";
  if (n >= 89 && n <= 103) return "actinide";
  return "transition";
}
// Grid position on the 18-column table; the f-block sits in rows 9 and 10.
function place(n) {
  if (n === 1) return [1, 1];
  if (n === 2) return [1, 18];
  for (const [a, b, row] of [[3, 10, 2], [11, 18, 3], [19, 36, 4], [37, 54, 5]]) if (n >= a && n <= b) {
    const i = n - a;
    return b - a === 7 ? [row, i < 2 ? i + 1 : i + 11] : [row, i + 1];
  }
  for (const [start, row, frow] of [[55, 6, 9], [87, 7, 10]]) {
    if (n === start || n === start + 1) return [row, n - start + 1];
    if (n >= start + 2 && n <= start + 16) return [frow, n - start + 1];
    if (n >= start + 17 && n <= start + 31) return [row, n - start - 13];
  }
}
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

// ---------- Edition: fashion or garbage ----------
// The URL wins (?ed=garbage), then the last choice saved in this browser.
const ED_KEYS = ["fashion", "garbage"];
const edFromUrl = new URLSearchParams(location.search).get("ed");
let edKey = ED_KEYS.includes(edFromUrl) ? edFromUrl : null;
if (!edKey) { try { edKey = localStorage.getItem("ptif-edition"); } catch (err) {} }
const chosen = ED_KEYS.includes(edKey);
if (!chosen) edKey = "fashion";
const isG = edKey === "garbage";
const ED = isG ? {
  key: "garbage", name: "The Garbage Elements", noun: "Find", nouns: "finds",
  flag: { label: "Peak Bangalore", short: "PEAK BLR", led: "Peak Bangalore" },
  tipLabel: "Field tip", srcLabel: "Spotted", via: (src) => `Spotted in ${src[0]}, ${src[3]}`, seen: (src) => `SPOTTED IN ${src[0].toUpperCase()} · ${src[3].toUpperCase()}`,
  word: "KASA", flagSearch: "peak bangalore blr", other: "fashion", otherLabel: "See the fashion table",
} : {
  key: "fashion", name: "The Fashion Elements", noun: "Trend", nouns: "trends",
  flag: { label: "Gen Z", short: "GEN Z", led: "Gen Z-led" },
  tipLabel: "Try it", srcLabel: "Source", via: (src) => `As reported by <a href="${src[2]}" target="_blank" rel="noopener">${src[0]}</a>, ${src[3]}`, seen: (src) => `AS SEEN IN ${src[0].toUpperCase()} · ${src[3].toUpperCase()}`,
  word: "ELEMENTAL", flagSearch: "gen z genz", other: "garbage", otherLabel: "See the garbage table",
};
document.documentElement.dataset.ed = ED.key;
if (chosen) { try { localStorage.setItem("ptif-edition", ED.key); } catch (err) {} }
else {
  // First visit: the cover asks which table they want.
  document.querySelector(".cover-title").classList.add("choosing");
  document.getElementById("choose").hidden = false;
  document.getElementById("chooseFashion").addEventListener("click", () => {
    try { localStorage.setItem("ptif-edition", "fashion"); } catch (err) {}
    document.getElementById("choose").hidden = true; document.querySelector(".cover-title").classList.remove("choosing");
    document.querySelectorAll("[data-ed]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.ed === "fashion")));
  });
}
if (isG) for (const el of document.querySelectorAll("[data-t]")) { const v = G_COPY[el.dataset.t]; if (v != null) el.innerHTML = v; }
if (isG) for (const el of document.querySelectorAll("[data-t-ph]")) { const v = G_COPY[el.dataset.tPh]; if (v != null) el.placeholder = v; }
document.querySelectorAll("[data-ed]").forEach(b => b.setAttribute("aria-pressed", String(chosen && b.dataset.ed === ED.key)));
document.querySelectorAll("[data-ed-switch]").forEach(b => { b.textContent = ""; b.insertAdjacentHTML("beforeend", `${ED.otherLabel} <span class="arr">→</span>`); });
function switchEdition(key) {
  if (!ED_KEYS.includes(key) || key === ED.key) return;
  try { localStorage.setItem("ptif-edition", key); } catch (err) {}
  const u = new URL(location.href); u.searchParams.set("ed", key); u.hash = "";
  document.documentElement.classList.add("switching");
  setTimeout(() => location.assign(u.toString()), 260);
}
document.addEventListener("click", ev => {
  const b = ev.target.closest("[data-ed], [data-ed-switch]"); if (!b) return;
  switchEdition(b.dataset.ed || ED.other);
});

const ELEMENTS_IN = isG ? GARBAGE : ELEMENTS;
const els = ELEMENTS_IN.map(([n, sym, el, trend, desc, pieces, tip, art, meta = {}]) => ({ n, sym, el, trend, desc, pieces, tip, art, fam: family(n), z: !!meta.z, src: meta.src || null }));
const bySym = new Map(els.map(e => [e.sym.toLowerCase(), e]));
const get = (s) => bySym.get(String(s).toLowerCase());
const $ = (id) => document.getElementById(id);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (err) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (err) {} },
};

// ---------- Images ----------
const imgCache = new Map();
function specImg(id, spec, vb = "6 10 88 88") {
  const key = id + vb;
  if (!imgCache.has(key)) imgCache.set(key, "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${scene("i" + id.replace(/\W/g, ""), spec)}</svg>`));
  return imgCache.get(key);
}
const sceneImg = (e, vb) => specImg(e.sym, e.art, vb);

// ---------- Hotspots: where each key piece sits on the figure ----------
const PIECE_WORDS = {
  feet: "sneaker trainer shoe heel boot flats flat sandal kolhapuri chappal jutti mojari loafer crocs samba hoka ugg merrell pumps sock slides",
  hand: "bangle bracelet watch bag tote clutch charm ring potli glove book keyring cuff pouch hobo racket",
  head: "bindi kajal kohl liner earring jhumka chandbali nath nose hair clip glasses sunglasses shades hat cap beanie tikka lip veil bandana haircut toque scrunchie bow ribbon braid mask bangs gem grill",
  neck: "necklace choker chain pearl pearls brooch haar mala scarf neckerchief collar lariat pendant tie",
  lower: "saree sari lehenga skirt jeans pants trousers cargos cargo shorts jorts dhoti veshti lungi sarong salwar sharara palazzo leggings capri capris midi mini tights petticoat",
  top: "blouse top shirt tee t-shirt kurta kurti corset jacket blazer vest dress gown knit coat sweater jersey hoodie bodice cape kaftan anarkali cardigan bralette bustier bandhgala sherwani suit trench turtleneck polo slip choli halter tunic peplum fleece tuxedo co-ord sets set",
};
const LOC = { head: [0, -63], neck: [0, -47.5], top: [0, -39], hand: [11.7, -30], lower: [0, -14], feet: [-4, -1] };
function locate(piece) {
  const seg = piece.toLowerCase().split(/\swith\s|\sover\s|\sas\s/)[0];
  let best = null, pos = -1;
  for (const [loc, words] of Object.entries(PIECE_WORDS)) for (const w of words.split(" ")) {
    const re = new RegExp(`\\b${w}s?\\b`, "g");
    let m; while ((m = re.exec(seg))) if (m.index >= pos) { pos = m.index; best = loc; }
  }
  return best;
}
function hotspots(e) {
  const f = e.art.figs && e.art.figs[0];
  if (!f) {
    const anchors = (e.art.obj || []).map(o => { const a = Array.isArray(o) ? o : [o]; return [typeof a[1] === "number" ? a[1] : 50, 72]; });
    if (!anchors.length) return [];
    return e.pieces.split(",").map(p => p.trim()).map((p, i) => { const [ax] = anchors[i % anchors.length]; return { p, i, loc: "obj", x: ax + (i >= anchors.length ? 6 : 0), y: 72 - Math.floor(i / anchors.length) * 8 }; });
  }
  const x0 = f.x ?? 50, s = f.s ?? 1, flip = f.flip ? -1 : 1;
  const list = e.pieces.split(",").map(p => p.trim()).map((p, i) => ({ p, i, loc: locate(p) })).filter(o => o.loc);
  const byLoc = {};
  list.forEach(o => (byLoc[o.loc] = byLoc[o.loc] || []).push(o));
  const out = [];
  for (const [loc, arr] of Object.entries(byLoc)) arr.forEach((o, k) => {
    const [rx, ry] = LOC[loc];
    out.push({ ...o, x: x0 + (rx * flip + (k - (arr.length - 1) / 2) * 8) * s, y: 94 + ry * s });
  });
  return out;
}

// ---------- Shared markup ----------
const tileHTML = (e, id) => `${e.z ? `<span class="zdot" title="${ED.flag.label}"></span>` : ""}<span class="top"><span class="num">${e.n}</span><span class="sym">${e.sym}</span></span><svg class="art" viewBox="6 10 88 88" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${scene(id, e.art)}</svg><span class="nm">${e.trend}</span>`;
let uid = 0;
function cardHTML(e, opts = {}) {
  const hs = opts.hot ? hotspots(e) : [];
  const hot = hs.length ? `<g class="hot">${hs.map(h => `<g data-i="${h.i}" tabindex="0" role="button" aria-label="${h.p}"><circle class="pulse" cx="${h.x.toFixed(1)}" cy="${h.y.toFixed(1)}" r="2.2"/><circle class="dot" cx="${h.x.toFixed(1)}" cy="${h.y.toFixed(1)}" r="2.2"/></g>`).join("")}</g>` : "";
  return `<div class="card ${e.fam}"${opts.attrs || ""}>
    <div class="card-in">
      <div class="idx tl"><b>${e.sym}</b><span>${e.n}</span></div>
      <div class="idx br"><b>${e.sym}</b><span>${e.n}</span></div>
      <div class="banner">${e.el}</div>
      <div class="frame"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" aria-hidden="${opts.hot ? "false" : "true"}">${scene("c" + (uid++) + e.sym, e.art)}${hot}</svg></div>
      <p class="cap">${e.trend}</p>
    </div>
    <div class="glare"></div>
  </div>`;
}

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg; t.classList.add("on");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("on"), 2400);
}

// ---------- Sound: a soft tanpura drone and a paper flick, off by default ----------
const sound = { on: false, ctx: null, master: null, timer: 0 };
function soundStart() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { toast("Sound isn't available in this browser"); return false; }
  if (!sound.ctx) {
    const ctx = sound.ctx = new AC();
    const master = sound.master = ctx.createGain(); master.gain.value = 0;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1400; lp.Q.value = .4;
    master.connect(lp); lp.connect(ctx.destination);
    // Tanpura strings: Pa, Sa, Sa, low Sa, plucked in turn
    sound.strings = [196, 261.63, 261.63, 130.81].map(f => {
      const g = ctx.createGain(); g.gain.value = .0001; g.connect(master);
      [0, 2.5, -3].forEach(d => { const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; o.detune.value = d; const og = ctx.createGain(); og.gain.value = .33; o.connect(og); og.connect(g); o.start(); });
      return g;
    });
    sound.i = 0;
  }
  sound.ctx.resume();
  sound.master.gain.cancelScheduledValues(sound.ctx.currentTime);
  sound.master.gain.linearRampToValueAtTime(.05, sound.ctx.currentTime + 1.2);
  const pluck = () => {
    const g = sound.strings[sound.i++ % 4], t = sound.ctx.currentTime;
    g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t);
    g.gain.linearRampToValueAtTime(.9, t + .03); g.gain.exponentialRampToValueAtTime(.12, t + 2.6);
  };
  pluck(); sound.timer = setInterval(pluck, 1150);
  return true;
}
function soundStop() {
  clearInterval(sound.timer);
  if (sound.ctx) sound.master.gain.linearRampToValueAtTime(0, sound.ctx.currentTime + .6);
}
function flick() {
  if (!sound.on || !sound.ctx) return;
  const ctx = sound.ctx, len = Math.floor(ctx.sampleRate * .14), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  const src = ctx.createBufferSource(); src.buffer = buf;
  const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = .8;
  const g = ctx.createGain(); g.gain.value = .5;
  src.connect(bp); bp.connect(g); g.connect(ctx.destination); src.start();
}
$("soundBtn").addEventListener("click", () => {
  sound.on = !sound.on;
  if (sound.on && !soundStart()) sound.on = false;
  if (!sound.on) soundStop();
  $("soundBtn").setAttribute("aria-pressed", String(sound.on));
  $("soundLbl").textContent = sound.on ? "Sound on" : "Sound off";
  $("soundWave").setAttribute("opacity", sound.on ? "1" : ".25");
});

// ---------- Saved ----------
async function copyTrend(e) {
  const text = `${e.sym} · ${e.trend}: ${e.desc}${e.src ? ` (${e.src[0]}, ${e.src[3]})` : ""}`;
  try { await navigator.clipboard.writeText(text); toast("Copied"); } catch (err) { toast("Copy isn't available here"); }
}

// ---------- Table ----------
const grid = $("tableGrid");
const tiles = new Map();
for (const e of els) {
  const [row, col] = place(e.n);
  const b = document.createElement("button");
  b.type = "button"; b.className = `el ${e.fam}`;
  b.style.gridRow = row; b.style.gridColumn = col;
  b.dataset.row = row; b.dataset.col = col;
  b.setAttribute("aria-label", `${e.n}, ${e.sym}, ${e.trend}`);
  b.innerHTML = tileHTML(e, "t" + e.sym);
  b.addEventListener("click", () => open(e));
  tiles.set(e.n, b);
  grid.appendChild(b);
}
const addCell = (cls, style, html) => { const d = document.createElement("div"); d.className = cls; Object.assign(d.style, style); d.innerHTML = html; grid.appendChild(d); };
addCell("placeholder", { gridRow: 6, gridColumn: 3 }, "57–71");
addCell("placeholder", { gridRow: 7, gridColumn: 3 }, "89–103");
addCell("gapline", { gridRow: 8 }, "");
addCell("series", { gridRow: 9 }, "Lanthanides");
addCell("series", { gridRow: 10 }, "Actinides");

const counts = {};
for (const e of els) counts[e.fam] = (counts[e.fam] || 0) + 1;
const sample = get("Fe");
const key = document.createElement("section");
key.className = "key"; key.setAttribute("aria-label", "Key");
key.innerHTML = `
  <div class="how" aria-hidden="true">
    <div class="el ${sample.fam}">${tileHTML(sample, "k" + sample.sym)}</div>
    <p>Number &amp; symbol<span>26, Fe, as on any periodic table</span></p>
    <p>The drawing<span>the ${ED.noun.toLowerCase()}, illustrated</span></p>
    <p>${ED.noun}<span>${sample.sym} stands for ${sample.trend}</span></p>
  </div>
  <ul class="keylist">${Object.entries(FAMILIES).map(([k, name]) => `<li class="${k}">${name}<span>${counts[k]}</span></li>`).join("")}</ul>`;
const narrow = matchMedia("(max-width: 980px)");
const placeKey = () => (narrow.matches ? $("mobileKey") : grid).appendChild(key);
narrow.addEventListener("change", placeKey);
placeKey();

let activeFam = null, zOnly = false;
$("filters").innerHTML = `<button type="button" class="filt" data-fam="" aria-pressed="true">All</button><button type="button" class="filt z" data-z aria-pressed="false"><i></i>${ED.flag.label}</button>` +
  Object.entries(FAMILIES).map(([k, name]) => `<button type="button" class="filt ${k}" data-fam="${k}" aria-pressed="false"><i></i>${name}</button>`).join("");
$("filters").addEventListener("click", ev => {
  const b = ev.target.closest(".filt"); if (!b) return;
  if (b.hasAttribute("data-z")) { zOnly = !zOnly; b.setAttribute("aria-pressed", String(zOnly)); }
  else setFam(b.dataset.fam || null);
  filter();
});
function setFam(f) {
  activeFam = f;
  $("filters").querySelectorAll(".filt:not([data-z])").forEach(b => b.setAttribute("aria-pressed", String((b.dataset.fam || null) === f)));
  filter();
}
const q = $("q");
function filter() {
  const term = q.value.trim().toLowerCase();
  for (const e of els) {
    const hay = `${e.sym} ${e.el} ${e.trend} ${e.desc} ${e.pieces} ${e.src ? e.src[0] : ""}`.toLowerCase();
    const ok = (!activeFam || e.fam === activeFam) && (!zOnly || e.z) && (!term || e.sym.toLowerCase() === term || hay.includes(term));
    tiles.get(e.n).classList.toggle("dim", !ok);
  }
}
q.addEventListener("input", filter);

// Hover: light up the period and group, show a placard
const peek = $("peek");
for (const [n, t] of tiles) {
  const e = els[n - 1];
  t.addEventListener("pointerenter", () => {
    grid.classList.add("hovering");
    for (const o of tiles.values()) o.classList.toggle("rc", o.dataset.row === t.dataset.row || o.dataset.col === t.dataset.col);
    if (!fine) return;
    peek.innerHTML = `<img src="${sceneImg(e)}" alt=""><p class="kicker">No. ${e.n} · ${e.el}${e.z ? " · " + ED.flag.label : ""}</p><b>${e.trend}</b><p>${e.desc}</p>`;
    peek.classList.add("on");
  });
  t.addEventListener("pointermove", ev => {
    if (!fine) return;
    const w = peek.offsetWidth, h = peek.offsetHeight;
    const x = ev.clientX + 28 + w > innerWidth ? ev.clientX - w - 28 : ev.clientX + 28;
    const y = Math.min(innerHeight - h - 12, Math.max(12, ev.clientY - h / 2));
    peek.style.transform = `translate(${x}px, ${y}px)`;
  });
  t.addEventListener("pointerleave", () => { grid.classList.remove("hovering"); peek.classList.remove("on"); for (const o of tiles.values()) o.classList.remove("rc"); });
  t.addEventListener("keydown", ev => {
    const dirs = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] };
    if (!dirs[ev.key] || sheet.open) return;
    ev.preventDefault(); ev.stopPropagation();
    const [dr, dc] = dirs[ev.key], r0 = +t.dataset.row, c0 = +t.dataset.col;
    let best = null, bd = 1e9;
    for (const o of tiles.values()) {
      const r = +o.dataset.row, c = +o.dataset.col, along = dr ? (r - r0) * dr : (c - c0) * dc;
      if (along <= 0) continue;
      const d = along * 10 + (dr ? Math.abs(c - c0) : Math.abs(r - r0)) * 3;
      if (d < bd) { bd = d; best = o; }
    }
    if (best) best.focus();
  });
}

// ---------- Timeline: watch the year fill the table ----------
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthOf = (d) => { const m = /([A-Za-z]{3})\w*\s+(\d{4})/.exec(d || ""); return m ? (+m[2]) * 12 + MON.indexOf(m[1]) : null; };
const fmtMonth = (i) => `${MON[i % 12]} ${Math.floor(i / 12)}`;
const months = els.map(e => monthOf(e.src && e.src[3]));
const tStart = Math.min(...months.filter(x => x != null)), tEnd = Math.max(...months.filter(x => x != null));
const tl = $("tl");
tl.max = tEnd - tStart; tl.value = tEnd - tStart;
$("tlStart").textContent = fmtMonth(tStart); $("tlEnd").textContent = fmtMonth(tEnd);
function timeline() {
  const upto = tStart + Number(tl.value);
  let n = 0;
  els.forEach((e, i) => { const on = months[i] == null || months[i] <= upto; tiles.get(e.n).classList.toggle("future", !on); if (on) n++; });
  $("tlRead").innerHTML = `By ${fmtMonth(upto)}: <b>${n}</b> of 118`;
}
tl.addEventListener("input", () => { stopPlay(); timeline(); });
let playTimer = 0;
function stopPlay() { clearInterval(playTimer); playTimer = 0; $("tlIcon").setAttribute("d", "M2 1l7 4-7 4z"); }
$("tlPlay").addEventListener("click", () => {
  if (playTimer) return stopPlay();
  if (+tl.value >= +tl.max) tl.value = 0;
  $("tlIcon").setAttribute("d", "M2 1h2v8H2zM6 1h2v8H6z");
  timeline();
  playTimer = setInterval(() => { if (+tl.value >= +tl.max) return stopPlay(); tl.value = +tl.value + 1; timeline(); }, 420);
});
timeline();

// ---------- Cover: a draggable sphere of all 118 ----------
const orbitEl = $("orbit"), sphere = $("sphere");
const orbs = [];
{
  const N = els.length, GA = Math.PI * (3 - Math.sqrt(5));
  els.forEach((e, i) => {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = GA * i;
    const b = document.createElement("button");
    b.type = "button"; b.className = `orb ${e.fam}`; b.tabIndex = -1;
    b.setAttribute("aria-label", `${e.sym}, ${e.trend}`);
    b.innerHTML = `<img src="${sceneImg(e)}" alt="" loading="lazy"><span><b>${e.sym}</b>${e.trend}</span>`;
    sphere.appendChild(b);
    orbs.push({ b, e, x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  });
}
let ax = -0.22, ay = 0, vx = 0, vy = 0.0018, orbitRAF = 0, dragging = null;
const AUTO = 0.0018;
function orbitFrame() {
  if (!dragging) { vy += (AUTO - vy) * 0.02; vx *= 0.94; }
  ay += vy; ax = Math.max(-0.9, Math.min(0.9, ax + vx));
  const W = orbitEl.clientWidth, H = orbitEl.clientHeight, R = Math.min(W * 0.46, H * 0.42), P = 1100;
  const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
  const half = orbs[0] ? orbs[0].b.offsetWidth / 2 : 33;
  for (const o of orbs) {
    const x1 = o.x * cy + o.z * sy, z1 = -o.x * sy + o.z * cy;
    const y2 = o.y * cx - z1 * sx, z2 = o.y * sx + z1 * cx;
    const k = P / (P - z2 * R);
    o.b.style.transform = `translate3d(${(W / 2 + x1 * R * k - half).toFixed(1)}px, ${(H / 2 + y2 * R * k - half * 1.4).toFixed(1)}px, 0) scale(${(k * 0.92).toFixed(3)}) rotateY(${(x1 * 26).toFixed(1)}deg) rotateX(${(-y2 * 20).toFixed(1)}deg)`;
    o.b.style.opacity = (0.1 + 0.9 * Math.max(0, (z2 + 1) / 2) ** 1.5).toFixed(3);
    o.b.style.zIndex = String(Math.round(500 + z2 * 400));
    o.b.style.pointerEvents = z2 > -0.2 ? "auto" : "none";
  }
  orbitRAF = requestAnimationFrame(orbitFrame);
}
orbitEl.addEventListener("pointerdown", ev => {
  if (ev.target.closest("button:not(.orb)")) return;
  dragging = { x: ev.clientX, y: ev.clientY, moved: 0, target: ev.target.closest(".orb") };
  orbitEl.setPointerCapture(ev.pointerId);
  orbitEl.classList.add("drag");
});
orbitEl.addEventListener("pointermove", ev => {
  if (!dragging) return;
  const dx = ev.clientX - dragging.x, dy = ev.clientY - dragging.y;
  dragging.moved += Math.abs(dx) + Math.abs(dy);
  vy = dx * 0.0038; vx = -dy * 0.0038;
  dragging.x = ev.clientX; dragging.y = ev.clientY;
});
const endDrag = () => {
  if (!dragging) return;
  const d = dragging; dragging = null; orbitEl.classList.remove("drag");
  if (d.moved < 6 && d.target) open(orbs.find(o => o.b === d.target).e);
};
orbitEl.addEventListener("pointerup", endDrag);
orbitEl.addEventListener("pointercancel", endDrag);
const orbitStart = () => { if (!orbitRAF) orbitRAF = requestAnimationFrame(orbitFrame); };
const orbitStop = () => { cancelAnimationFrame(orbitRAF); orbitRAF = 0; };

// See the full table: every tile flies from the sphere to its place in the grid
function orbitToTable() {
  if (reduced || !orbitRAF) return show("table");
  orbitStop();
  const starts = orbs.map(o => ({ o, r: o.b.getBoundingClientRect(), op: parseFloat(o.b.style.opacity) || 1 }));
  const layer = document.createElement("div");
  layer.style.cssText = "position:fixed;inset:0;z-index:75;pointer-events:none";
  const clones = starts.map(({ o, r, op }) => {
    const c = document.createElement("div");
    c.className = `orb ${o.e.fam}`;
    c.innerHTML = o.b.innerHTML;
    Object.assign(c.style, { position: "fixed", left: r.left + "px", top: r.top + "px", width: r.width + "px", opacity: Math.max(op, .3), transform: "none", transformOrigin: "0 0" });
    layer.appendChild(c);
    return c;
  });
  document.body.appendChild(layer);
  grid.classList.add("landing");
  show("table");
  requestAnimationFrame(() => {
    let left = clones.length;
    starts.forEach(({ o, r }, i) => {
      const t = tiles.get(o.e.n).getBoundingClientRect();
      const dx = t.left - r.left, dy = t.top - r.top, sx = t.width / r.width;
      clones[i].animate([
        { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: clones[i].style.opacity },
        { transform: `translate(${dx * .5}px, ${dy * .5 - 80 - Math.random() * 90}px) scale(${(1 + sx) / 2 * 1.1}) rotate(${(Math.random() - .5) * 30}deg)`, opacity: 1, offset: .55 },
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}) rotate(0deg)`, opacity: 1 },
      ], { duration: 1300, delay: (o.e.n % 18) * 20 + Math.floor((o.e.n - 1) / 18) * 30, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" }).onfinish = () => {
        if (--left) return;
        grid.classList.remove("landing");
        layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" }).onfinish = () => layer.remove();
      };
    });
  });
}
$("toTable").addEventListener("click", orbitToTable);


// ---------- The Lab ----------
let mix = [];
const shelf = $("shelf");
shelf.innerHTML = els.map(e => `<button type="button" class="sh ${e.fam}" draggable="true" data-sym="${e.sym}" aria-label="Add ${e.trend}"><b>${e.sym}</b><img src="${sceneImg(e)}" alt=""><span>${e.trend}</span></button>`).join("");
shelf.addEventListener("click", ev => { const b = ev.target.closest(".sh"); if (b) addToMix(get(b.dataset.sym)); });
shelf.addEventListener("dragstart", ev => { const b = ev.target.closest(".sh"); if (b) { ev.dataTransfer.setData("text/plain", b.dataset.sym); ev.dataTransfer.effectAllowed = "copy"; } });
const flaskWrap = $("flaskWrap");
flaskWrap.addEventListener("dragover", ev => { ev.preventDefault(); flaskWrap.classList.add("over"); });
flaskWrap.addEventListener("dragleave", () => flaskWrap.classList.remove("over"));
flaskWrap.addEventListener("drop", ev => { ev.preventDefault(); flaskWrap.classList.remove("over"); const e = get(ev.dataTransfer.getData("text/plain") || ""); if (e) addToMix(e); });
$("shelfQ").addEventListener("input", ev => {
  const t = ev.target.value.trim().toLowerCase();
  shelf.querySelectorAll(".sh").forEach(b => { const e = get(b.dataset.sym); b.classList.toggle("hide", !!t && !`${e.sym} ${e.trend} ${e.el}`.toLowerCase().includes(t)); });
});
function addToMix(e) {
  if (mix.includes(e)) { toast(`${e.sym} is already in the flask`); return; }
  if (mix.length >= 3) mix.shift();
  mix.push(e);
  flaskWrap.classList.remove("shake"); void flaskWrap.offsetWidth; flaskWrap.classList.add("shake");
  flick();
  renderMix();
}
const famColor = (e) => getComputedStyle(document.documentElement).getPropertyValue(`--${e.fam}`).trim();
function lookName(list) {
  if (list.length === 1) return list[0].trend;
  const word = (t, end) => { const w = t.split(/[\s-]+/).filter(x => !/^(and|the|of|a)$/i.test(x)); return end ? w[w.length - 1] : w[0]; };
  const first = word(list[0].trend), last = word(list[list.length - 1].trend, true), mid = list.length === 3 ? " " + word(list[1].trend) : "";
  return `${first}${mid} ${first.toLowerCase() === last.toLowerCase() ? "Edit" : last}`;
}
function renderMix() {
  shelf.querySelectorAll(".sh").forEach(b => b.classList.toggle("in", mix.some(e => e.sym === b.dataset.sym)));
  $("liquid").style.transform = `translateY(${240 - (mix.length ? 70 + mix.length * 42 : 0)}px)`;
  const cols = mix.length ? mix.map(famColor) : ["#B3245E"];
  ["lg0", "lg1", "lg2"].forEach((id, i) => $(id).setAttribute("stop-color", cols[Math.min(i, cols.length - 1)]));
  $("formula").innerHTML = mix.length ? mix.map(e => `<span class="${e.fam}">${e.sym}</span>`).join("<i>·</i>") : "—";
  const ln = $("lookname");
  ln.textContent = mix.length ? `“${lookName(mix)}”` : "Pick up to three elements from the shelf.";
  ln.classList.toggle("empty", !mix.length);
  $("recipe").innerHTML = mix.map(e => `<li><b>${e.pieces.split(",")[0].trim()}</b> from ${e.trend}</li>`).join("");
  $("slots").innerHTML = mix.map(e => `<button type="button" class="slot ${e.fam}" data-sym="${e.sym}" aria-label="Remove ${e.trend}"><img src="${sceneImg(e)}" alt=""><span>${e.sym}</span></button>`).join("");
  $("slots").querySelectorAll(".slot").forEach(s => s.addEventListener("click", () => { mix = mix.filter(e => e.sym !== s.dataset.sym); renderMix(); }));
}
$("labRandom").addEventListener("click", () => { mix = []; [...els].sort(() => Math.random() - .5).slice(0, 3).forEach((e, i) => setTimeout(() => addToMix(e), i * 300)); });
$("labClear").addEventListener("click", () => { mix = []; renderMix(); });
$("labCopy").addEventListener("click", async () => {
  if (!mix.length) return toast("Add an element first");
  const text = `${mix.map(e => e.sym).join("·")} — “${lookName(mix)}”: ${mix.map(e => e.pieces.split(",")[0].trim()).join(" + ")}`;
  try { await navigator.clipboard.writeText(text); toast("Formula copied"); } catch (err) { toast("Copy isn't available here"); }
});
renderMix();

// ---------- Gen Z slang × fashion ----------
const F_SLANG = [
  ["Ate", "verb", "Internet", "Did it perfectly. If it was really good, they 'left no crumbs'.", "Ho", "Pre-draped saree, corset blouse, concert night. She ate."],
  ["Main character energy", "noun", "Internet", "Dressing like the whole story is about you.", "C", "Mirror-work bralette with cargos and a bold bindi? Main character energy."],
  ["Delulu", "adjective", "Internet", "Lovingly delusional. Dreaming big on purpose.", "Fe", "Tulle skirt to a Monday meeting. Delulu is the solulu."],
  ["It's giving…", "phrase", "Internet", "It's evoking something. Finish the sentence with the vibe.", "Dy", "Low-rise jeans and a mirror-work choli? It's giving 2003 Bollywood."],
  ["No cap", "phrase", "Internet", "No lie. Completely serious.", "Bi", "No cap, a bindi goes with everything you own."],
  ["Era", "noun", "Internet", "A phase you're fully committed to.", "Na", "I'm in my Nani's-saree era."],
  ["Jugaad", "noun", "Desi", "A clever, make-it-work hack.", "Tm", "A screenshot and a trip to the local darzi. Peak jugaad."],
  ["Aura points", "noun", "Internet", "An invisible score for how cool you seem.", "As", "Swapped the smartwatch for a tiny vintage dial. Plus a thousand aura."],
  ["Rizz", "noun", "Internet", "Charm. The ability to pull people in.", "Rb", "Rekha-level kajal is pure rizz."],
  ["Understood the assignment", "phrase", "Internet", "Got the brief exactly right.", "Ge", "Ikat scarf, cargos, oxidised jhumkas. Understood the assignment."],
  ["Girl math", "noun", "Internet", "Logic that makes a purchase feel free.", "Tc", "A ₹300 thrifted blazer? That's basically money in the bank."],
  ["Mogging", "verb", "Internet", "Outshining everyone standing next to you.", "Xe", "Those jhumkas are mogging the entire room."],
  ["Pookie", "noun", "Internet", "Someone or something sweet and lovable.", "Ba", "Ribbon in the braid, ballet flats on. Pookie behaviour."],
  ["Slay", "verb", "Internet", "To do something brilliantly, usually with style.", "Cs", "Corset saree at the college fest. Slay."],
  ["Drip", "noun", "Internet", "A seriously good outfit or set of accessories.", "Sb", "Glass, kundan and oxidised bangles on one wrist. That's drip."],
  ["Paisa vasool", "phrase", "Desi", "Worth every rupee you paid.", "Th", "Beaten-up Sambas from the thrift market. Full paisa vasool."],
  ["Fit check", "noun", "Internet", "Showing off today's outfit, usually on camera.", "Ar", "Fit check: 90s jacket, nani's earrings, thrifted corset."],
  ["Bindaas", "adjective", "Desi", "Carefree and fearless.", "Pu", "Blazer over a tulle skirt, totally bindaas."],
  ["Lowkey", "adverb", "Internet", "Quietly. Without making a big deal of it.", "Li", "Lowkey carrying a real paperback everywhere."],
  ["-core", "suffix", "Internet", "Turns anything into an aesthetic.", "B", "Football jersey plus hair bow: blokette, the newest core."],
];
const SLANG = isG ? G_SLANG : F_SLANG;
const slangEl = $("slang");
slangEl.innerHTML = SLANG.map(([w, pos, origin, mean, sym, line], i) => {
  const e = get(sym);
  return `<div class="sl ${e.fam}" data-o="${origin}" role="button" tabindex="0" aria-pressed="false" aria-label="${w}: flip for the fashion translation">
    <div class="sl-in">
      <div class="sl-front"><span class="sl-ghost" aria-hidden="true">${e.sym}</span><p class="sl-tag">${origin} slang · No. ${String(i + 1).padStart(2, "0")}</p><div><p class="sl-word">${w}</p><p class="sl-pos">${pos}</p></div><p class="sl-tap">Flip to translate</p></div>
      <div class="sl-back"><img src="${sceneImg(e)}" alt=""><p class="sl-means">${mean}</p><p class="sl-line">“${line}”</p><button type="button" class="sl-open" data-sym="${e.sym}"><b>${e.sym}</b>${e.trend} →</button></div>
    </div>
  </div>`;
}).join("");
slangEl.querySelectorAll(".sl").forEach(c => {
  const flip = () => { c.classList.toggle("flipped"); c.setAttribute("aria-pressed", String(c.classList.contains("flipped"))); flick(); };
  c.addEventListener("click", ev => { const o = ev.target.closest(".sl-open"); if (o) { ev.stopPropagation(); return open(get(o.dataset.sym)); } flip(); });
  c.addEventListener("keydown", ev => { if ((ev.key === "Enter" || ev.key === " ") && ev.target === c) { ev.preventDefault(); flip(); } });
});
$("slangFilter").addEventListener("click", ev => {
  const b = ev.target.closest(".filt"); if (!b) return;
  $("slangFilter").querySelectorAll(".filt").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  slangEl.querySelectorAll(".sl").forEach(c => c.hidden = !!b.dataset.o && c.dataset.o !== b.dataset.o);
});
let allFlipped = false;
$("flipAll").addEventListener("click", ev => {
  allFlipped = !allFlipped;
  ev.currentTarget.textContent = allFlipped ? "Flip back" : "Flip all";
  [...slangEl.querySelectorAll(".sl:not([hidden])")].forEach((c, i) => setTimeout(() => { c.classList.toggle("flipped", allFlipped); c.setAttribute("aria-pressed", String(allFlipped)); }, i * 60));
});
{
  const zEls = els.filter(e => e.z), cols = [[], [], []];
  zEls.forEach((e, i) => cols[i % 3].push(e));
  cols.forEach((list, i) => { const html = list.map(e => `<button type="button" class="ccard ${e.fam}" data-sym="${e.sym}" tabindex="-1"><img src="${sceneImg(e)}" alt=""><span>${e.trend}</span></button>`).join(""); $("col" + i).innerHTML = html + html; });
  document.querySelectorAll(".ccard").forEach(c => c.addEventListener("click", () => open(get(c.dataset.sym))));
}

// ---------- Families ----------
$("halls").innerHTML = Object.entries(FAMILIES).map(([k, name], i) => {
  const m = els.filter(e => e.fam === k), show3 = [m[0], m[Math.floor(m.length / 2)], m[m.length - 1]];
  return `<button type="button" class="hall ${k}" data-fam="${k}">
    <div class="row"><div><p class="kicker">Hall ${ROMAN[i]}</p><h3>${name}</h3></div><span class="count">${m.length}</span></div>
    <div class="minis" aria-hidden="true">${show3.map(e => `<div class="el ${e.fam}">${tileHTML(e, "h" + k + e.sym)}</div>`).join("")}</div>
    <ul>${m.slice(0, 4).map(e => `<li><b>${e.sym}</b>${e.trend}</li>`).join("")}</ul>
    <span class="link">See all ${m.length} on the table <span class="arr">→</span></span>
  </button>`;
}).join("");
$("halls").addEventListener("click", ev => { const h = ev.target.closest(".hall"); if (!h) return; setFam(h.dataset.fam); show("table"); });

// Ink reveal: the cursor paints a printed version of the word
const ink = $("ink"), ictx = ink.getContext("2d");
let inkW = 0, inkH = 0, blobs = [], inkRAF = 0, lastInk = 0, inkPat = null, autoT = 0;
function inkSize() {
  const r = ink.getBoundingClientRect(), d = devicePixelRatio || 1;
  if (!r.width) return;
  ink.width = Math.round(r.width * d); ink.height = Math.round(r.height * d);
  inkW = r.width; inkH = r.height; ictx.setTransform(d, 0, 0, d, 0, 0);
  const c = document.createElement("canvas"); c.width = c.height = 12;
  const x = c.getContext("2d"); x.fillStyle = "rgba(251,247,238,.95)"; x.beginPath(); x.arc(6, 6, 1.5, 0, 7); x.fill();
  inkPat = ictx.createPattern(c, "repeat");
}
function inkDraw() {
  ictx.clearRect(0, 0, inkW, inkH);
  const word = ED.word, fs = Math.min(inkH * 0.95, inkW / (word.length * 0.6)), cx = inkW / 2, cy = inkH * 0.56;
  ictx.font = `400 ${fs}px Caudex, Georgia, serif`; ictx.textAlign = "center"; ictx.textBaseline = "middle";
  ictx.fillStyle = "#151515"; ictx.fillText(word, cx, cy);
  if (!blobs.length) return;
  ictx.save(); ictx.beginPath();
  for (const b of blobs) { ictx.moveTo(b.x + b.r, b.y); ictx.arc(b.x, b.y, b.r, 0, Math.PI * 2); }
  ictx.clip();
  ictx.fillStyle = "#ECE5D7"; ictx.fillRect(0, 0, inkW, inkH);
  const g = ictx.createLinearGradient(0, 0, inkW, 0);
  g.addColorStop(0, "#B3245E"); g.addColorStop(.5, "#D9862A"); g.addColorStop(1, "#3B6EA8");
  ictx.fillStyle = g; ictx.fillText(word, cx, cy);
  ictx.globalAlpha = .6; ictx.fillStyle = inkPat; ictx.fillText(word, cx, cy);
  ictx.restore();
}
function inkAdd(x, y, big = 1) {
  blobs.push({ x, y, r: (22 + Math.random() * 28) * big, life: 1 });
  if (Math.random() < .5) blobs.push({ x: x + (Math.random() - .5) * 60, y: y + (Math.random() - .5) * 50, r: 6 + Math.random() * 10, life: .8 });
}
function inkFrame(t) {
  if (t - lastInk > 1600 && !reduced) { autoT += 0.02; inkAdd(inkW * (0.5 + 0.42 * Math.sin(autoT)), inkH * (0.55 + 0.25 * Math.sin(autoT * 2.3)), 0.8); }
  for (const b of blobs) { b.life -= 0.007; b.r *= b.life > .25 ? 1.004 : 0.95; }
  blobs = blobs.filter(b => b.life > 0 && b.r > 0.5);
  inkDraw();
  inkRAF = requestAnimationFrame(inkFrame);
}
ink.addEventListener("pointermove", ev => { const r = ink.getBoundingClientRect(); lastInk = performance.now(); inkAdd(ev.clientX - r.left, ev.clientY - r.top); });
const inkStart = () => { inkSize(); inkDraw(); if (!inkRAF) inkRAF = requestAnimationFrame(inkFrame); };
const inkStop = () => { cancelAnimationFrame(inkRAF); inkRAF = 0; };
addEventListener("resize", () => { if (inkRAF) inkSize(); });
if (document.fonts) document.fonts.ready.then(() => { if (inkRAF) inkDraw(); });

// ---------- Sources ----------
$("srclist").innerHTML = els.map(e => `<div class="src ${e.fam}"><span class="s">${e.sym}</span><span><button type="button" class="t" data-sym="${e.sym}">${e.trend}</button>${e.z ? `<span class="z">${ED.flag.label}</span>` : ""}</span>${e.src ? `${e.src[2] ? `<a href="${e.src[2]}" target="_blank" rel="noopener">${e.src[0]} — ${e.src[1]}</a>` : `<span class="note">${e.src[0]} — ${e.src[1]}</span>`}<span class="d">${e.src[3]}</span>` : "<span></span><span></span>"}</div>`).join("");
$("srclist").addEventListener("click", ev => { const b = ev.target.closest(".t"); if (b) open(get(b.dataset.sym)); });

// ---------- The exhibit (card + placard) ----------
const sheet = $("sheet"), exhibit = $("exhibit");
let current = null;
function render(e) {
  current = e;
  const s = e.src;
  exhibit.innerHTML = `
    <button type="button" class="close" data-close>Close <span>×</span></button>
    <div class="wall"><div class="c3d"><div class="flipper flip">${cardHTML(e, { hot: true })}</div></div></div>
    <div class="placard ${e.fam}">
      <p class="no">No. ${e.n} · ${e.el} · <b>${FAMILIES[e.fam]}</b></p>
      <h2>${e.trend}</h2>
      <p class="desc">${e.desc}</p>
      <dl class="facts">
        <dt>On view</dt><dd><ul class="pieces">${e.pieces.split(",").map((p, i) => `<li data-i="${i}">${p.trim()}</li>`).join("")}</ul></dd>
        <dt>${ED.tipLabel}</dt><dd>${e.tip}</dd>
        ${s ? `<dt>${ED.srcLabel}</dt><dd>${s[2] ? `<a href="${s[2]}" target="_blank" rel="noopener">${s[0]}</a>` : s[0]}, ${s[3]}${e.z ? " · " + ED.flag.led : ""}</dd>` : ""}
      </dl>
      <div class="ex-actions"><button type="button" class="btn ghost" data-share>Share image</button><button type="button" class="link" data-copy>Copy</button></div>
      <div class="ex-nav"><button type="button" class="link" data-go="-1"><span class="arr">←</span> Previous</button><button type="button" class="link" data-go="1">Next <span class="arr">→</span></button><button type="button" class="link" data-go="r">Shuffle</button><span class="count">${String(e.n).padStart(3, "0")} / 118</span></div>
    </div>`;
  flick();
  const flipper = exhibit.querySelector(".flipper"), c3d = exhibit.querySelector(".c3d"), glare = exhibit.querySelector(".glare");
  flipper.addEventListener("animationend", () => flipper.classList.remove("flip"), { once: true });
  c3d.addEventListener("pointermove", ev => {
    if (flipper.classList.contains("flip") || !fine) return;
    const r = c3d.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
    flipper.style.transform = `rotateY(${(x - .5) * 12}deg) rotateX(${(.5 - y) * 10}deg)`;
    glare.style.setProperty("--gx", `${x * 100}%`); glare.style.setProperty("--gy", `${y * 100}%`);
  });
  c3d.addEventListener("pointerleave", () => flipper.style.transform = "");
  // Hotspots and the list of pieces light each other up
  const lis = [...exhibit.querySelectorAll(".pieces li")], hots = [...exhibit.querySelectorAll(".hot g")];
  const light = (i) => { lis.forEach(l => l.classList.toggle("on", l.dataset.i === String(i))); hots.forEach(h => h.classList.toggle("on", h.dataset.i === String(i))); };
  hots.forEach(h => { ["pointerenter", "focus", "click"].forEach(t => h.addEventListener(t, () => light(h.dataset.i))); });
  lis.forEach(l => l.addEventListener("pointerenter", () => light(l.dataset.i)));
}
exhibit.addEventListener("click", ev => {
  const t = ev.target.closest("button"); if (!t) return;
  if (t.hasAttribute("data-close")) return sheet.close();
  if (t.hasAttribute("data-copy")) return copyTrend(current);
  if (t.hasAttribute("data-share")) return shareImage(current);
  if (t.dataset.go) return go(t.dataset.go);
});
function open(e) { if (!e) return; render(e); if (!sheet.open) sheet.showModal(); }
function go(dir) {
  if (dir === "r") { let r; do { r = els[Math.floor(Math.random() * els.length)]; } while (r === current); return render(r); }
  render(els[(current.n - 1 + Number(dir) + els.length) % els.length]);
}
sheet.addEventListener("click", ev => { if (ev.target === sheet) sheet.close(); });
document.addEventListener("keydown", ev => {
  if (!sheet.open) return;
  if (ev.key === "ArrowRight") go(1);
  if (ev.key === "ArrowLeft") go(-1);
});

// ---------- Share as an image (1080 × 1920, for stories) ----------
const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
function wrap(ctx, text, x, y, maxW, lh) {
  const words = text.split(" "); let line = "";
  for (const w of words) { const t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { ctx.fillText(line, x, y); y += lh; line = w; } else line = t; }
  ctx.fillText(line, x, y); return y;
}
async function shareImage(e) {
  const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
  const ctx = c.getContext("2d"), col = famColor(e);
  if (document.fonts) await document.fonts.ready;
  ctx.fillStyle = "#F4EFE5"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#151515"; ctx.textAlign = "center";
  ctx.font = '600 26px Caudex, serif'; ctx.fillText(`${ED.name.toUpperCase()}  ·  ISSUE 01`, W / 2, 120);
  ctx.fillRect(90, 150, W - 180, 2);
  // Card
  const cx = 150, cy = 220, cw = W - 300, ch = cw * 1.4;
  ctx.fillStyle = "#FBF7EE"; ctx.fillRect(cx, cy, cw, ch);
  ctx.strokeStyle = "#151515"; ctx.lineWidth = 3; ctx.strokeRect(cx + 26, cy + 26, cw - 52, ch - 52);
  const art = await loadImg(sceneImg(e, "0 0 100 100"));
  const ax = cx + 110, ay = cy + 150, aw = cw - 220, ah = ch - 330;
  ctx.save(); ctx.beginPath(); ctx.rect(ax, ay, aw, ah); ctx.clip();
  const sc = Math.max(aw / art.width, ah / art.height);
  ctx.drawImage(art, ax + (aw - art.width * sc) / 2, ay + ah - art.height * sc, art.width * sc, art.height * sc);
  ctx.restore(); ctx.lineWidth = 2; ctx.strokeRect(ax, ay, aw, ah);
  ctx.fillStyle = col; ctx.textAlign = "left"; ctx.font = '600 92px Caudex, serif'; ctx.fillText(e.sym, cx + 50, cy + 128);
  ctx.fillStyle = "#151515"; ctx.font = '600 24px Caudex, serif'; ctx.fillText(String(e.n), cx + 54, cy + 160);
  ctx.textAlign = "center"; ctx.font = '600 26px Caudex, serif'; ctx.fillText(e.el.toUpperCase(), W / 2 + 40, cy + 104);
  ctx.font = 'italic 44px Caudex, serif'; ctx.fillText(e.trend, W / 2, cy + ch - 90);
  // Placard
  ctx.textAlign = "left"; ctx.fillStyle = "#151515";
  ctx.font = '400 84px Caudex, serif';
  let y = wrap(ctx, e.trend, 90, cy + ch + 140, W - 180, 92);
  ctx.font = 'italic 42px Caudex, serif'; ctx.fillStyle = "#3A3833";
  y = wrap(ctx, e.desc, 90, y + 70, W - 180, 52);
  ctx.font = '600 24px Caudex, serif'; ctx.fillStyle = "#77716A";
  if (e.src) ctx.fillText(ED.seen(e.src), 90, Math.min(H - 70, y + 80));
  c.toBlob(async blob => {
    if (!blob) return toast("Couldn't make the image");
    const url = URL.createObjectURL(blob), file = new File([blob], `${e.sym}-${e.trend.replace(/\W+/g, "-")}.png`, { type: "image/png" });
    const canShare = navigator.canShare && navigator.canShare({ files: [file] });
    $("shareIn").innerHTML = `<p class="kicker">Share image · ${e.sym}</p><img src="${url}" alt="${e.trend} card image"><p>If the download doesn't start, press and hold (or right-click) the image to save it.</p>
      <div class="ex-actions"><a class="btn" href="${url}" download="${file.name}">Download</a>${canShare ? `<button type="button" class="btn ghost" id="nativeShare">Share</button>` : ""}<button type="button" class="link" id="closeShare">Close</button></div>`;
    $("closeShare").addEventListener("click", () => $("sharebox").close());
    if (canShare) $("nativeShare").addEventListener("click", () => navigator.share({ files: [file], title: e.trend }).catch(() => {}));
    $("sharebox").showModal();
  }, "image/png");
}

// ---------- Search palette ----------
const palette = $("palette"), palq = $("palq"), pallist = $("pallist");
let palSel = 0, palRes = [];
function palRender() {
  const t = palq.value.trim().toLowerCase();
  palRes = !t ? [...els].sort(() => Math.random() - .5).slice(0, 8)
    : els.map(e => {
      const hay = `${e.sym} ${e.el} ${e.trend} ${e.desc} ${e.pieces} ${e.src ? e.src[0] : ""} ${e.z ? ED.flagSearch : ""}`.toLowerCase();
      const sc = e.sym.toLowerCase() === t ? 100 : e.trend.toLowerCase().startsWith(t) ? 60 : e.trend.toLowerCase().includes(t) ? 40 : e.el.toLowerCase().startsWith(t) ? 30 : hay.includes(t) ? 10 : 0;
      return [sc, e];
    }).filter(x => x[0]).sort((a, b) => b[0] - a[0]).slice(0, 10).map(x => x[1]);
  palSel = 0;
  pallist.innerHTML = palRes.length ? palRes.map((e, i) => `<li role="option" class="${e.fam}" data-i="${i}" aria-selected="${i === 0}"><span class="ps">${e.sym}</span><span><span class="pt">${e.trend}</span><span class="pm">No. ${e.n} · ${e.el}${e.src ? " · " + e.src[0] : ""}</span></span>${e.z ? `<span class="pz">${ED.flag.short}</span>` : "<span></span>"}</li>`).join("")
    : `<li class="none">No trend matches “${palq.value}”.</li>`;
}
function palMove(d) {
  if (!palRes.length) return;
  palSel = (palSel + d + palRes.length) % palRes.length;
  pallist.querySelectorAll("li[data-i]").forEach(li => li.setAttribute("aria-selected", String(+li.dataset.i === palSel)));
  pallist.querySelector(`li[data-i="${palSel}"]`).scrollIntoView({ block: "nearest" });
}
function palOpen() { palq.value = ""; palRender(); palette.showModal(); palq.focus(); }
function palPick(i) { const e = palRes[i]; if (!e) return; palette.close(); open(e); }
$("openSearch").addEventListener("click", palOpen);
palq.addEventListener("input", palRender);
palq.addEventListener("keydown", ev => {
  if (ev.key === "ArrowDown") { ev.preventDefault(); palMove(1); }
  if (ev.key === "ArrowUp") { ev.preventDefault(); palMove(-1); }
  if (ev.key === "Enter") { ev.preventDefault(); palPick(palSel); }
});
pallist.addEventListener("click", ev => { const li = ev.target.closest("li[data-i]"); if (li) palPick(+li.dataset.i); });
palette.addEventListener("click", ev => { if (ev.target === palette) palette.close(); });
document.addEventListener("keydown", ev => {
  if ((ev.key === "k" && (ev.metaKey || ev.ctrlKey)) || (ev.key === "/" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && !sheet.open)) { ev.preventDefault(); palette.open ? palette.close() : palOpen(); }
});

// ---------- Menu (phones) ----------
const menuSheet = $("menuSheet");
$("openMenu").addEventListener("click", () => menuSheet.showModal());
$("closeMenu").addEventListener("click", () => menuSheet.close());

// ---------- Views ----------
const VIEWS = ["cover", "table", "lab", "genz", "families", "sources"];
function show(v, opts = {}) {
  if (!VIEWS.includes(v)) v = "cover";
  document.querySelectorAll(".view").forEach(s => s.hidden = s.dataset.view !== v);
  document.querySelectorAll(".sections [data-view]").forEach(t => t.dataset.view === v ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current"));
  if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: "instant" });
  if (menuSheet.open) menuSheet.close();
  v === "cover" ? orbitStart() : orbitStop();
  v === "families" ? requestAnimationFrame(inkStart) : inkStop();
  if (v !== "table") stopPlay();
  try { history.replaceState(null, "", v === "cover" ? location.pathname + location.search : location.search + "#" + v); } catch (err) {}
}
document.addEventListener("click", ev => {
  const t = ev.target.closest("[data-view]");
  if (!t || t.classList.contains("view")) return;
  ev.preventDefault();
  show(t.dataset.view);
});

// Scroll progress under the masthead
const prog = $("progress");
addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  prog.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
}, { passive: true });

// ---------- Opening curtain (once per visit) ----------
function curtain() {
  let seen = false;
  try { seen = sessionStorage.getItem("ptif-curtain-" + ED.key) === "1"; sessionStorage.setItem("ptif-curtain-" + ED.key, "1"); } catch (err) {}
  if (seen || reduced) return;
  const el = $("curtain"), num = $("curtainCount");
  el.hidden = false;
  const t0 = performance.now(), dur = 1500;
  let done = false;
  const finish = () => { if (done) return; done = true; num.textContent = "118"; el.classList.add("out"); setTimeout(() => { el.hidden = true; el.classList.remove("out"); }, 1000); };
  (function step(t) {
    if (done) return;
    const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
    num.textContent = String(Math.round(eased * 118)).padStart(3, "0");
    p < 1 ? requestAnimationFrame(step) : setTimeout(finish, 250);
  })(t0);
  el.addEventListener("click", finish);
}

// ---------- Start ----------
const h = location.hash.slice(1);
const fromHash = h && !VIEWS.includes(h) && get(h);
show(fromHash ? "table" : (VIEWS.includes(h) ? h : "cover"), { keepScroll: true });
if (fromHash) open(fromHash);
else if (!h || h === "cover") curtain();
