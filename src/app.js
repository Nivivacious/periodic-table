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
  key: "garbage", issue: "02", name: "The Garbage Elements", noun: "Find", nouns: "finds",
  flag: { label: "Peak Bangalore", short: "PEAK BLR", led: "Peak Bangalore" },
  tipLabel: "Field tip", srcLabel: "Spotted", via: (src) => `Spotted in ${src[0]}, ${src[3]}`, seen: (src) => `SPOTTED IN ${src[0].toUpperCase()} · ${src[3].toUpperCase()}`,
  word: "KASA", flagSearch: "peak bangalore blr", other: "fashion", otherLabel: "See the fashion table", otherTitle: "The Periodic Table of Indian Fashion",
  dyeLabel: "Season", dyeNote: "Same find, another Bangalore month.",
} : {
  key: "fashion", issue: "01", name: "The Fashion Elements", noun: "Trend", nouns: "trends",
  flag: { label: "Gen Z", short: "GEN Z", led: "Gen Z-led" },
  tipLabel: "Try it", srcLabel: "Source", via: (src) => `As reported by <a href="${src[2]}" target="_blank" rel="noopener">${src[0]}</a>, ${src[3]}`, seen: (src) => `AS SEEN IN ${src[0].toUpperCase()} · ${src[3].toUpperCase()}`,
  word: "ELEMENTAL", flagSearch: "gen z genz", other: "garbage", otherLabel: "See the garbage table", otherTitle: "The Periodic Table of Bangalore Garbage",
  dyeLabel: "Colourways", dyeNote: "The season's colours, each one named by the press.",
};
document.querySelectorAll("[data-issue-label]").forEach(node => {
  node.textContent = `Issue ${ED.issue} · ${node.dataset.issueLabel === "season" ? "Autumn/Winter 2026" : "2026"}`;
});
document.documentElement.dataset.ed = ED.key;
document.title = isG ? "The Periodic Table of Bangalore Garbage" : "The Periodic Table of Indian Fashion";
if (chosen) { try { localStorage.setItem("ptif-edition", ED.key); } catch (err) {} }
else {
  // First visit: the cover asks which table they want.
  document.querySelector(".cover-title").classList.add("choosing");
  document.getElementById("choose").hidden = false;
  document.getElementById("chooseFashion").addEventListener("click", () => {
    try { localStorage.setItem("ptif-edition", "fashion"); } catch (err) {}
    document.getElementById("choose").hidden = true; document.querySelector(".cover-title").classList.remove("choosing");
    document.querySelectorAll("[data-ed]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.ed === "fashion")));
    orbs.forEach((o, i) => { if (!o.e.other) return; o.e = els[i]; o.b.className = `orb ${o.e.fam}`; o.b.setAttribute("aria-label", `${o.e.sym}, ${o.e.trend}`); o.b.innerHTML = `<img src="${sceneImg(o.e)}" alt=""><span><b>${o.e.sym}</b>${o.e.trend}</span>`; });
  });
}
if (isG) for (const el of document.querySelectorAll("[data-t]")) { const v = G_COPY[el.dataset.t]; if (v != null) el.innerHTML = v; }
if (isG) for (const el of document.querySelectorAll("[data-t-ph]")) { const v = G_COPY[el.dataset.tPh]; if (v != null) el.placeholder = v; }
document.querySelectorAll("[data-ed]").forEach(b => b.setAttribute("aria-pressed", String(chosen && b.dataset.ed === ED.key)));
document.querySelectorAll("[data-ed-switch]").forEach(b => { b.textContent = ""; b.setAttribute("aria-label", ED.otherLabel); b.insertAdjacentHTML("beforeend", `${b.classList.contains("edflip") ? ED.other.charAt(0).toUpperCase() + ED.other.slice(1) + " edition" : ED.otherLabel} <span class="arr">→</span>`); });
function switchEdition(key, from) {
  if (!ED_KEYS.includes(key) || key === ED.key) return;
  try { localStorage.setItem("ptif-edition", key); } catch (err) {}
  const u = new URL(location.href); u.searchParams.set("ed", key); u.hash = "";
  const wait = portalGrow(from);
  document.documentElement.classList.add("switching");
  setTimeout(() => location.assign(u.toString()), wait);
}
document.addEventListener("click", ev => {
  const b = ev.target.closest("[data-ed], [data-ed-switch]"); if (!b) return;
  switchEdition(b.dataset.ed || ED.other, b);
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

// ---------- Colourways (fashion) and seasons (garbage) ----------
// Each fashion dye is a colour the press named this season; `by` points at the element whose source said so.
const DYES = isG ? [
  { k: "monsoon", name: "Monsoon", when: "July to September", scene: { bg: "grey", gr: "kaapi" }, add: [["puddle", 36, "sky", 20], ["puddle", 72, "sky", 12]] },
  { k: "summer", name: "Summer", when: "March to May", scene: { bg: "peach", gr: "beige" }, add: [["sun", "yellow", 82, 18]] },
  { k: "tabebuia", name: "Tabebuia week", when: "late January", scene: { bg: "sky", gr: "grey" }, add: [["tabebuia", 20], ["petals", 50]] },
  { k: "diwali", name: "Diwali night", when: "October", scene: { bg: "night", gr: "black" }, add: ["stars", "diyas", ["sparkles", "yellow"]] },
  { k: "winter", name: "Winter morning", when: "December, before the fog lifts", scene: { bg: "lav", gr: "grey" }, add: [["moon", 82, 18]] },
] : [
  { k: "cloud", name: "Cloud Dancer", hex: "#EFECE4", by: "Cl" },
  { k: "cherry", name: "Cherry Red", hex: "#A8182C", by: "Cn" },
  { k: "butter", name: "Butter Yellow", hex: "#F2DF8E", by: "Yb" },
  { k: "mocha", name: "Mocha", hex: "#8E6652", by: "Ca" },
  { k: "cobalt", name: "Cobalt", hex: "#2E4EA3", by: "Ce" },
  { k: "teal", name: "Teal Luxe", hex: "#1F6B74", by: "Tl" },
  { k: "burgundy", name: "Burgundy", hex: "#6B1F30", src: typeof S_ELLE_PALETTE !== "undefined" ? S_ELLE_PALETTE : null },
  { k: "pistachio", name: "Pistachio", hex: "#BBD39A", by: "Pm" },
  { k: "lilac", name: "Lilac", hex: "#B59AD4", by: "Lv" },
];
const dyeState = new Map();
const dyeOf = (e) => DYES.find(d => d.k === dyeState.get(e.sym)) || null;
function artOf(e) {
  const d = dyeOf(e);
  if (!d) return e.art;
  const a = JSON.parse(JSON.stringify(e.art));
  if (isG) { Object.assign(a, d.scene); a.set = [...(a.set || []), ...d.add]; return a; }
  for (const f of a.figs || []) { f.c = d.hex; f.l = d.hex; f.y = d.hex; if (f.hc2) f.hc2 = d.hex; }
  return a;
}
const dyeSource = (d) => d.src || (d.by && get(d.by) && get(d.by).src) || null;
function dyesHTML(e) {
  const cur = dyeState.get(e.sym) || "";
  const sw = (d) => `<button type="button" class="dye${cur === d.k ? " on" : ""}" data-dye="${d.k}" aria-pressed="${cur === d.k}" aria-label="${d.name}" title="${d.name}" style="--d:${d.hex || "transparent"}">${d.hex ? "" : `<i class="s-${d.k}"></i>`}</button>`;
  return `<div class="dyes"><button type="button" class="dye orig${cur ? "" : " on"}" data-dye="" aria-pressed="${!cur}" aria-label="As drawn" title="As drawn"></button>${DYES.map(sw).join("")}</div><p class="dye-note">${dyeNote(e)}</p>`;
}
function dyeNote(e) {
  const d = dyeOf(e);
  if (!d) return ED.dyeNote;
  if (isG) return `${d.name}, ${d.when}.`;
  const s = dyeSource(d);
  return `<b>${d.name}.</b> ${s ? `As reported by ${s[2] ? `<a href="${s[2]}" target="_blank" rel="noopener">${s[0]}</a>` : s[0]}, ${s[3]}.` : ""}`;
}
function setDye(e, key) {
  if (key) dyeState.set(e.sym, key); else dyeState.delete(e.sym);
  interactionCleanup();
  exhibit.querySelectorAll(".colour-before").forEach(n => n.remove());
  const svg = exhibit.querySelector(".frame > svg:not(.colour-before)");
  const previousArt = svg && !reduced ? svg.cloneNode(true) : null;
  if (svg) { svg.innerHTML = scene("c" + (uid++) + e.sym, artOf(e)) + hotHTML(e); bindHots(); eyesWake(); playSceneMoment(e, 150); bindSceneInteractions(e); colourReveal(svg, previousArt, key); }
  exhibit.querySelectorAll(".dye").forEach(b => { const on = (b.dataset.dye || "") === (key || ""); b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); });
  const note = exhibit.querySelector(".dye-note"); if (note) note.innerHTML = dyeNote(e);
  flick();
}

// ---------- Images ----------
const imgCache = new Map();
function specImg(id, spec, vb = "6 10 88 88") {
  const key = id + vb;
  if (!imgCache.has(key)) imgCache.set(key, "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${scene("i" + id.replace(/\W/g, ""), spec)}</svg>`));
  return imgCache.get(key);
}
const sceneImg = (e, vb) => { const d = dyeOf(e); return specImg(e.sym + (d ? "-" + d.k : ""), artOf(e), vb); };

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
function hotHTML(e) {
  const hs = hotspots(e);
  return hs.length ? `<g class="hot">${hs.map(h => `<g data-i="${h.i}" tabindex="0" role="button" aria-label="${h.p}"><circle class="pulse" cx="${h.x.toFixed(1)}" cy="${h.y.toFixed(1)}" r="2.2"/><circle class="dot" cx="${h.x.toFixed(1)}" cy="${h.y.toFixed(1)}" r="2.2"/></g>`).join("")}</g>` : "";
}
function cardHTML(e, opts = {}) {
  const hot = opts.hot ? hotHTML(e) : "";
  return `<div class="card ${e.fam}"${opts.attrs || ""}>
    <div class="card-in">
      <div class="idx tl"><b>${e.sym}</b><span>${e.n}</span></div>
      <div class="idx br"><b>${e.sym}</b><span>${e.n}</span></div>
      <div class="banner">${e.el}</div>
      <div class="frame"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" aria-hidden="${opts.hot ? "false" : "true"}">${scene("c" + (uid++) + e.sym, artOf(e))}${hot}</svg></div>
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
  b.addEventListener("click", () => open(e, b));
  tiles.set(e.n, b);
  grid.appendChild(b);
}
const addCell = (cls, style, html) => { const d = document.createElement("div"); d.className = cls; Object.assign(d.style, style); d.innerHTML = html; grid.appendChild(d); };
addCell("placeholder", { gridRow: 6, gridColumn: 3 }, "57 to 71");
addCell("placeholder", { gridRow: 7, gridColumn: 3 }, "89 to 103");
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
const MONL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fmtMonth = (i) => `${MON[i % 12]} ${Math.floor(i / 12)}`;
const months = els.map(e => monthOf(e.src && e.src[3]));
// Both issues cover the same publication window. Preserve each card's source date.
const coverageEnd = 2026 * 12 + 9;
const today = new Date(), currentMonth = today.getFullYear() * 12 + today.getMonth();
const tStart = Math.min(...months.filter(x => x != null)), tEnd = Math.max(tStart, Math.min(coverageEnd, currentMonth));
const tl = $("tl");
tl.max = tEnd - tStart; tl.value = tEnd - tStart;
$("tlStart").textContent = fmtMonth(tStart); $("tlEnd").textContent = fmtMonth(tEnd);
function timeline() {
  const upto = tStart + Number(tl.value);
  let n = 0;
  els.forEach((e, i) => { const on = months[i] == null || months[i] <= upto; tiles.get(e.n).classList.toggle("future", !on); if (on) n++; });
  $("tlRead").innerHTML = `${isG ? "Through" : "By"} ${fmtMonth(upto)}: <b>${n}</b> of 118`;
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
  // Before an edition is chosen, the sphere mixes both tables: fashion on the even slots, garbage on the odd.
  let orbEls = els;
  if (!chosen) {
    const other = (isG ? ELEMENTS : GARBAGE).map(([n, sym, el, trend, desc, pieces, tip, art]) => ({ n, sym, el, trend, art, fam: family(n), other: true }));
    orbEls = els.map((e, i) => (i % 2 ? other[i] : e));
  }
  const N = orbEls.length, GA = Math.PI * (3 - Math.sqrt(5));
  orbEls.forEach((e, i) => {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = GA * i;
    const b = document.createElement("button");
    b.type = "button"; b.className = `orb ${e.fam}`; b.tabIndex = -1;
    b.setAttribute("aria-label", `${e.sym}, ${e.trend}`);
    b.innerHTML = `<img src="${e.other ? specImg("o" + e.sym, e.art) : sceneImg(e)}" alt="" loading="lazy"><span><b>${e.sym}</b>${e.trend}</span>`;
    sphere.appendChild(b);
    orbs.push({ b, e, x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  });
}
let ax = -0.22, ay = 0, vx = 0, vy = 0.0018, orbitRAF = 0, dragging = null;
const AUTO = 0.0018;
const coverSection = orbitEl.closest(".cover");
if (!reduced) coverSection.classList.add("scroll-cover");
const coverExplore = document.createElement("button");
coverExplore.type = "button"; coverExplore.className = "cover-explore btn"; coverExplore.textContent = "Explore the full table";
coverExplore.hidden = true; orbitEl.querySelector(".cover-foot").appendChild(coverExplore);
coverExplore.addEventListener("click", orbitToTable);
function coverProgress() {
  if (reduced || !$("choose").hidden) return 0;
  const travel = Math.max(1, coverSection.offsetHeight - orbitEl.offsetHeight);
  return Math.max(0, Math.min(1, (scrollY - coverSection.offsetTop) / (travel * .75)));
}
function orbitFrame() {
  if (!dragging) { vy += (AUTO - vy) * 0.02; vx *= 0.94; }
  ay += vy; ax = Math.max(-0.9, Math.min(0.9, ax + vx));
  const W = orbitEl.clientWidth, H = orbitEl.clientHeight, R = Math.min(W * 0.46, H * 0.42), P = 1100;
  const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
  const half = orbs[0] ? orbs[0].b.offsetWidth / 2 : 33;
  const raw = coverProgress(), unfold = raw * raw * (3 - 2 * raw);
  const title = orbitEl.querySelector(".cover-title");
  title.style.opacity = String(Math.max(0, 1 - raw * 2.6));
  title.style.visibility = raw > .42 ? "hidden" : "visible";
  coverExplore.hidden = raw < .75;
  orbitEl.querySelector(".drag-hint").textContent = raw > .5 ? "Scroll up to gather · tap any tile" : "Drag to spin · scroll to unfold";
  for (const o of orbs) {
    const x1 = o.x * cy + o.z * sy, z1 = -o.x * sy + o.z * cy;
    const y2 = o.y * cx - z1 * sx, z2 = o.y * sx + z1 * cx;
    const k = P / (P - z2 * R);
    const [row, col] = place(o.e.n), cell = Math.min(W * .94 / 18, H * .82 / 14);
    const gridScale = cell / (half * 2), targetX = (W - cell * 18) / 2 + (col - 1) * cell;
    const targetY = H * .08 + (row - 1) * cell * 1.4;
    const px = W / 2 + x1 * R * k - half, py = H / 2 + y2 * R * k - half * 1.4;
    o.b.style.transform = `translate3d(${(px + (targetX - px) * unfold).toFixed(1)}px, ${(py + (targetY - py) * unfold).toFixed(1)}px, 0) scale(${(k * .92 * (1 - unfold) + gridScale * .92 * unfold).toFixed(3)}) rotateY(${(x1 * 26 * (1 - unfold)).toFixed(1)}deg) rotateX(${(-y2 * 20 * (1 - unfold)).toFixed(1)}deg)`;
    o.b.style.opacity = ((.1 + .9 * Math.max(0, (z2 + 1) / 2) ** 1.5) * (1 - unfold) + unfold).toFixed(3);
    o.b.style.zIndex = String(Math.round(500 + z2 * 400));
    o.b.style.pointerEvents = unfold > .6 || z2 > -.2 ? "auto" : "none";
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
  if (d.moved < 6 && d.target) {
    const e = orbs.find(o => o.b === d.target).e;
    if (!chosen) { if (e.other) switchEdition(ED.other); else document.getElementById("chooseFashion").click(); }
    if (e.other) return;
    open(e, d.target);
  }
};
orbitEl.addEventListener("pointerup", endDrag);
orbitEl.addEventListener("pointercancel", () => { dragging = null; orbitEl.classList.remove("drag"); });
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
const TIMES = ["6 am", "11 pm", "1.30 pm", "7.40 am", "4 pm", "2 am", "9.15 am", "6.30 pm"];
function pileNote(list) {
  const art = (t) => { const w = t.replace(/,.*$/, "").toLowerCase(); return /s$/.test(w) && !/ss$|us$/.test(w) ? w : (/^[aeiou]/.test(w) ? "an " : "a ") + w; };
  const names = list.map(e => art(e.trend));
  const joined = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1] : names[0];
  const where = (list[0].src && list[0].src[0]) || "Somewhere in Bangalore";
  const when = TIMES[list.reduce((a, e) => a + e.n, 0) % TIMES.length];
  return `${where}, ${when}: ${joined}.`;
}
function lookName(list, r) {
  // Name the look after the compound's everyday name when it is short, else its chemical name.
  let label = null;
  if (r && !r.none) { const c = (r.c || "").replace(/^the /i, "").split(",")[0].trim(); label = c && c.split(" ").length <= 2 ? c : r.n; }
  const none = r && r.none && list.length > 1;
  if (isG) return label ? `A ${lower(label)} pile. ${pileNote(list)}` : `${none ? "Side by side, not touching. " : ""}${pileNote(list)}`;
  if (label) return `The ${label.replace(/\b[a-z]/g, m => m.toUpperCase())} Edit`;
  if (list.length === 1) return list[0].trend;
  if (none) return `${lookName(list)}, worn as separates`;
  const word = (t, end) => { const w = t.split(/[\s-]+/).filter(x => !/^(and|the|of|a)$/i.test(x)); return end ? w[w.length - 1] : w[0]; };
  const first = word(list[0].trend), last = word(list[list.length - 1].trend, true), mid = list.length === 3 ? " " + word(list[1].trend) : "";
  return `${first}${mid} ${first.toLowerCase() === last.toLowerCase() ? "Edit" : last}`;
}
function chemHTML(r) {
  if (!r) return "";
  const src = r.w ? ` <a href="${r.w}" target="_blank" rel="noopener">${r.generic ? "Look it up" : "Wikipedia"}</a>` : "";
  const kind = r.none ? "" : r.kind === "alloy" ? "Alloy" : r.trace ? "Predicted" : r.generic ? "By the rules" : "Real compound";
  const name = r.none ? r.n : `${r.n}${r.c && r.c.toLowerCase() !== r.n.toLowerCase() ? ` · <em>${r.c}</em>` : ""}`;
  const spec = r.spectator ? ` <span class="spec">${r.spectator} stays out of it: a spectator.</span>` : "";
  return `<p class="chem-name">${kind ? `<span class="kicker">${kind}</span>` : ""}${name}</p><p class="chem-note">${r.note}${spec}${src}</p>`;
}
function renderMix() {
  shelf.querySelectorAll(".sh").forEach(b => b.classList.toggle("in", mix.some(e => e.sym === b.dataset.sym)));
  $("liquid").style.transform = `translateY(${240 - (mix.length ? 70 + mix.length * 42 : 0)}px)`;
  const cols = mix.length ? mix.map(famColor) : ["#B3245E"];
  ["lg0", "lg1", "lg2"].forEach((id, i) => $(id).setAttribute("stop-color", cols[Math.min(i, cols.length - 1)]));
  const r = mix.length ? react(mix) : null;
  $("formula").innerHTML = !mix.length ? "·" : (r.none || mix.length === 1) ? mix.map(e => `<span class="${e.fam}">${e.sym}</span>`).join("<i>+</i>") : sub(r.f);
  $("chem").innerHTML = chemHTML(r);
  const ln = $("lookname");
  ln.textContent = mix.length ? (isG ? lookName(mix, r) : `“${lookName(mix, r)}”`) : "Pick up to three elements from the shelf.";
  ln.classList.toggle("empty", !mix.length);
  $("recipe").innerHTML = mix.map(e => `<li><b>${e.pieces.split(",")[0].trim()}</b> from ${e.trend}${r && r.spectator === e.sym ? " (on the side)" : ""}</li>`).join("");
  $("slots").innerHTML = mix.map(e => `<button type="button" class="slot ${e.fam}" data-sym="${e.sym}" aria-label="Remove ${e.trend}"><img src="${sceneImg(e)}" alt=""><span>${e.sym}</span></button>`).join("");
  $("slots").querySelectorAll(".slot").forEach(s => s.addEventListener("click", () => { mix = mix.filter(e => e.sym !== s.dataset.sym); renderMix(); }));
}
$("labRandom").addEventListener("click", () => { mix = []; [...els].sort(() => Math.random() - .5).slice(0, 3).forEach((e, i) => setTimeout(() => addToMix(e), i * 300)); });
$("labClear").addEventListener("click", () => { mix = []; renderMix(); });
$("labCopy").addEventListener("click", async () => {
  if (!mix.length) return toast("Add an element first");
  const r = react(mix);
  const text = `${r.none ? mix.map(e => e.sym).join(" + ") : `${r.f} (${r.n})`}: “${lookName(mix, r)}”: ${mix.map(e => e.pieces.split(",")[0].trim()).join(" + ")}`;
  try { await navigator.clipboard.writeText(text); toast("Formula copied"); } catch (err) { toast("Copy isn't available here"); }
});
renderMix();

// ---------- Families ----------
const HALL_NOTES = isG ? {
  alkali: "Soft, reactive, gone by morning. Leaf litter, a ragi ball, cement sacks.",
  alkaline: "Heavier, and they stay. Foam on the lake, a fridge on the footpath.",
  transition: "The middle of the table and the middle of the road. Flowers, debris, a commode.",
  post: "Things that were something else last week. Aloo bonda paper, a flex, a lost flyer.",
  metalloid: "Half useful, half not. Silk offcuts, a gate notice, a tetra pak.",
  nonmetal: "Mostly food, mostly eaten. The banana leaf, the cow's dinner, the hospital glove.",
  halogen: "Sharp. A tilted slab, cable loops, a wristband, tissue snow.",
  noble: "Things that sit on a wall and never react. The tiffin. The helmet. The Old Monk.",
  lanthanide: "Rare, seasonal, back next year. Tabebuia petals, show pots, a Christmas tree.",
  actinide: "Heavy and slow to decay. Thermocol, an AC unit, the metro barricade from 2019.",
} : {
  alkali: "Soft, bright, quick to react. The trends that go viral by lunch.",
  alkaline: "Steadier than the alkalis. Belted pallus, bridal moods, things that last a season.",
  transition: "The big middle of the table: the everyday looks that hold the wardrobe together.",
  post: "Metal that remembers it was something else. Reworked, repurposed, re-draped.",
  metalloid: "Half one thing, half another. Indo-Western, blokette, the in-betweens.",
  nonmetal: "Light, loud, essential. Chatpata, handmade, the pieces you reach for first.",
  halogen: "Sharp and a little dangerous. Statement accessories, the subversive jewellery.",
  noble: "They do not react to anything. Opera glam, Oganesson: the looks that never go out.",
  lanthanide: "Rare earths. Heritage weaves, vintage finds, the almirah raids.",
  actinide: "Heavy, glowing, a little radioactive. Party looks that fade by morning.",
};
$("halls").innerHTML = Object.entries(FAMILIES).map(([k, name], i) => {
  const m = els.filter(e => e.fam === k), show3 = [m[0], m[Math.floor(m.length / 2)], m[m.length - 1]];
  return `<button type="button" class="hall ${k}" data-fam="${k}">
    <div class="row"><div><p class="kicker">Hall ${ROMAN[i]}</p><h3>${name}</h3></div><span class="count">${m.length}</span></div>
    <p class="hall-note">${HALL_NOTES[k]}</p>
    <div class="minis" aria-hidden="true">${show3.map(e => `<div class="el ${e.fam}">${tileHTML(e, "h" + k + e.sym)}</div>`).join("")}</div>
    <ul>${m.slice(0, 4).map(e => `<li><b>${e.sym}</b>${e.trend}</li>`).join("")}</ul>
    <span class="link">See all ${m.length} on the table <span class="arr">→</span></span>
  </button>`;
}).join("");
$("halls").addEventListener("click", ev => { const h = ev.target.closest(".hall"); if (!h) return; setFam(h.dataset.fam); show("table"); });

// Ink reveal: the cursor paints a printed version of the word
function createInkReveal(ink, word) {
const ictx = ink.getContext("2d");
ink.setAttribute("aria-label", `${word}. Move across the word to paint it.`);
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
  const fs = Math.min(inkH * 0.95, inkW / (word.length * 0.6)), cx = inkW / 2, cy = inkH * 0.56;
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
ink.addEventListener("pointermove", ev => { if (reduced) return; const r = ink.getBoundingClientRect(); lastInk = performance.now(); inkAdd(ev.clientX - r.left, ev.clientY - r.top); });
const inkStart = () => { inkSize(); inkDraw(); if (!reduced && !inkRAF) inkRAF = requestAnimationFrame(inkFrame); };
const inkStop = () => { cancelAnimationFrame(inkRAF); inkRAF = 0; };
addEventListener("resize", () => { if (inkRAF) inkSize(); });
if (document.fonts) document.fonts.ready.then(() => { if (inkRAF) inkDraw(); });

return { start: inkStart, stop: inkStop };
}
const inkEffects = {
  families: createInkReveal($("ink"), ED.word),
  sources: createInkReveal($("sourceInk"), isG ? "FIELD NOTES" : "SOURCES")
};
const inkStart = view => { Object.entries(inkEffects).forEach(([key, effect]) => key === view ? effect.start() : effect.stop()); };
const inkStop = () => Object.values(inkEffects).forEach(effect => effect.stop());

// ---------- Sources ----------
$("srclist").innerHTML = els.map(e => `<div class="src ${e.fam}"><span class="s">${e.sym}</span><span><button type="button" class="t" data-sym="${e.sym}">${e.trend}</button>${e.z ? `<span class="z">${ED.flag.label}</span>` : ""}</span>${e.src ? `${e.src[2] ? `<a href="${e.src[2]}" target="_blank" rel="noopener">${e.src[0]}, ${e.src[1]}</a>` : `<span class="note">${e.src[0]}, ${e.src[1]}</span>`}<span class="d">${e.src[3]}</span>` : "<span></span><span></span>"}</div>`).join("");
$("srclist").addEventListener("click", ev => { const b = ev.target.closest(".t"); if (b) open(get(b.dataset.sym)); });

// ---------- The exhibit (card + placard) ----------
const sheet = $("sheet"), exhibit = $("exhibit");
let current = null;
let liftedFrom = null, liftAnimation = null, closingExhibit = false;
function clearLift() {
  if (liftAnimation) { liftAnimation.cancel(); liftAnimation = null; }
  sheet.classList.remove("travelling");
  document.querySelectorAll(".lift-origin, .lift-neighbour").forEach(n => {
    n.classList.remove("lift-origin", "lift-neighbour");
    n.style.removeProperty("--nudge");
  });
}
function liftCard(back = false) {
  if (reduced || !liftedFrom || !liftedFrom.isConnected) return null;
  if (liftAnimation) { liftAnimation.cancel(); liftAnimation = null; }
  const card = exhibit.querySelector(".c3d"), from = liftedFrom.getBoundingClientRect();
  if (!card || !from.width || !from.height || from.bottom < 0 || from.top > innerHeight) return null;
  const to = card.getBoundingClientRect();
  const origin = `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  const frames = [{ transform: origin, opacity: .65 }, { transform: "none", opacity: 1 }];
  sheet.classList.add("travelling");
  liftAnimation = card.animate(back ? frames.reverse() : frames, {
    duration: back ? 330 : 600, easing: "cubic-bezier(.22,1,.36,1)", fill: "both"
  });
  return liftAnimation;
}
async function closeExhibit() {
  if (closingExhibit) return;
  closingExhibit = true;
  try { const animation = liftCard(true); if (animation) await animation.finished; } catch (_) {}
  sheet.close(); clearLift(); closingExhibit = false;
}
// A short, material-aware performance for the existing SVG artwork.
let sceneAnimations = [], exhibitAnimations = [];
let motionPaused = store.get("ptif-motion-paused", false);
function syncScenePlayback() {
  sceneAnimations.forEach(a => motionPaused || document.hidden ? a.pause() : a.play());
  const button = exhibit.querySelector("[data-motion]");
  if (button) {
    button.setAttribute("aria-pressed", String(motionPaused));
    button.setAttribute("aria-label", motionPaused ? "Resume illustration motion" : "Pause illustration motion");
    button.textContent = motionPaused ? "Play" : "Pause";
  }
}
function replayScene() { motionPaused = false; store.set("ptif-motion-paused", false); playSceneMoment(current); }
document.addEventListener("visibilitychange", () => { if (sheet.open) syncScenePlayback(); });
function stopSceneMotion() {
  sceneAnimations.forEach(a => a.cancel()); sceneAnimations = [];
}
function motionKind(name) {
  if (/cow-mouth/.test(name)) return "chew";
  if (/(?:crow|crows|pigeon)/.test(name)) return "hop";
  if (/(?:smoke|clouds|steam)/.test(name)) return "drift";
  if (/(?:puddle|foam|water)/.test(name)) return "ripple";
  if (/(?:bottle|rum|can20|coconut|cylinder)/.test(name)) return "rock";
  if (/(?:jhumka|hoops|necklace|layered|pearls|chain|beads|bangles|tikka|matha|nath)/.test(name)) return "jewel";
  if (/(?:pallu|scarf|bow|veil|dupatta|cape|bunting|flex|papers|poster|bag|leaves|garland|flowers|tabebuia|tree)/.test(name)) return "breeze";
  if (/(?:dog|sitter|sweeper|istri)/.test(name)) return "greet";
  if (/(?:vinyl|wheel|tyre)/.test(name)) return "turn";
  return "settle";
}
function sceneFrames(kind, n) {
  const a = 1 + (n % 5) * .12;
  const still = { transform: "none" };
  const motions = {
    chew: [still, { transform: "translate(1.5px,1px) rotate(5deg)" }, still],
    hop: [still, { transform: `translateY(${-5 * a}px) rotate(-7deg)`, offset: .35 }, still],
    drift: [still, { transform: `translate(${3 * a}px,${-5 * a}px)`, opacity: .65 }, still],
    ripple: [still, { transform: `scaleX(${1 + a * .15})`, opacity: .8 }, still],
    rock: [still, { transform: `rotate(${10 * a}deg)` }, { transform: "rotate(-6deg)" }, still],
    jewel: [still, { transform: `rotate(${12 * a}deg)` }, { transform: "rotate(-8deg)" }, still],
    breeze: [still, { transform: `skewX(${6 * a}deg) rotate(3deg)` }, { transform: "skewX(-4deg) rotate(-2deg)" }, still],
    greet: [still, { transform: "rotate(-3deg) translateY(-2px)" }, still],
    turn: [still, { transform: `rotate(${25 * a}deg)` }, still],
    settle: [still, { transform: "translateY(-2.5px) rotate(2deg)" }, still]
  };
  return motions[kind];
}
function playSceneMoment(e, delay = 0) {
  stopSceneMotion();
  if (reduced || !e) return;
  const svg = exhibit.querySelector(".frame svg"); if (!svg) return;
  const candidates = [...svg.querySelectorAll(".detail, .ob, [class^='set-'], .cow-mouth")];
  // Select details by their material, with a stable variation for every element.
  const picked = candidates.filter(node => motionKind(node.getAttribute("class")) !== "settle");
  const priority = node => node.classList.contains("cow-mouth") ? 0 : node.classList.contains("detail") ? 1 : node.classList.contains("ob") ? 2 : 3;
  const actors = picked.sort((a, b) => priority(a) - priority(b)).slice(0, 4);
  if (!actors.length) {
    const subject = svg.querySelector(".fg, .ob"); if (subject) actors.push(subject);
  }
  actors.forEach((node, i) => {
    const kind = motionKind(node.getAttribute("class") || "");
    node.style.transformBox = "fill-box";
    node.style.transformOrigin = /jewel|breeze/.test(kind) ? "top center" : kind === "rock" || node.classList.contains("fg") ? "bottom center" : "center";
    sceneAnimations.push(node.animate(sceneFrames(kind, e.n), {
      duration: kind === "chew" ? 650 : 2000 + (e.n % 4) * 180,
      delay: delay + i * 140, iterations: Infinity,
      easing: "cubic-bezier(.45,0,.25,1)"
    }));
  });
  const rain = svg.querySelector(".season-rain");
  if(rain) sceneAnimations.push(rain.animate([{transform:"translate(2px,-10px)"},{transform:"translate(-2px,10px)"}],{duration:750,iterations:Infinity,easing:"linear"}));
  syncScenePlayback();
}
function revealExhibit(direction = 0) {
  exhibitAnimations.forEach(a => a.cancel()); exhibitAnimations = [];
  if (reduced) return;
  const card = exhibit.querySelector(".flipper");
  if (direction && card) exhibitAnimations.push(card.animate([
    { opacity: 0, transform: `translateX(${direction * 20}px) rotate(${direction * 2}deg)` },
    { opacity: 1, transform: "none" }
  ], { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" }));
  exhibit.querySelectorAll(".placard > *, .moment-control").forEach((node, i) => {
    exhibitAnimations.push(node.animate([
      { opacity: 0, transform: `translateY(${direction ? 8 : 12}px)` },
      { opacity: 1, transform: "none" }
    ], { duration: 550, delay: Math.min(i * 45, 240), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }));
  });
  exhibit.querySelectorAll(".depth-back, .depth-person, .depth-front").forEach((node, i) => {
    exhibitAnimations.push(node.animate([{ opacity: .35 }, { opacity: 1 }], {
      duration: 650, delay: 120 + Math.min(i, 5) * 65, fill: "backwards", easing: "ease-out"
    }));
  });
}
// Direct interaction with the existing art. Every mode has a keyboard control.
let interactionCleanup = () => {};
function colourReveal(svg, old, key) {
  if (!svg || reduced) return;
  if (old) {
    old.classList.add("colour-before"); old.setAttribute("aria-hidden", "true");
    svg.parentElement.insertBefore(old, svg);
    const wipe = svg.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 850, easing: "cubic-bezier(.22,1,.36,1)" });
    wipe.finished.catch(() => {}).finally(() => old.remove());
  }
  if (isG && key === "monsoon") {
    const rain = document.createElementNS("http://www.w3.org/2000/svg", "g");
    rain.classList.add("season-rain"); rain.setAttribute("aria-hidden", "true");
    rain.innerHTML = Array.from({length:22}, (_, i) => `<path d="M${(i * 23) % 100},${(i * 37) % 90} l-2,7" stroke="#ddeaf1" stroke-width=".65" opacity=".75"/>`).join("");
    svg.appendChild(rain);
    sceneAnimations.push(rain.animate([{transform:"translate(2px,-10px)"},{transform:"translate(-2px,10px)"}],{duration:750,iterations:Infinity,easing:"linear"}));
    syncScenePlayback();
  }
}
function bindSceneInteractions(e) {
  const frame = exhibit.querySelector(".frame"), svg = frame && frame.querySelector("svg");
  if (!svg) return;
  const abort = new AbortController(), signal = abort.signal, temporary = new Set();
  let draggingArt = null, lensOn = false, layersOn = false;
  const listen = (node, type, fn) => node.addEventListener(type, fn, { signal });
  const controls = exhibit.querySelector(".art-tools");
  const hint = exhibit.querySelector(".art-hint");
  const lens = document.createElement("div"); lens.className = "inspection-lens"; lens.hidden = true; lens.setAttribute("aria-hidden", "true");
  const lensSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  lensSvg.innerHTML = scene("lens" + (uid++), artOf(e)); lens.appendChild(lensSvg); frame.appendChild(lens);
  const tags = document.createElement("div"); tags.className = "layer-tags"; tags.setAttribute("aria-hidden","true");
  for(const [cls,label] of [["depth-back","Backdrop"],["depth-person","Subject"],["depth-front","Objects"]]) if(svg.querySelector("."+cls)) { const tag=document.createElement("span");tag.className=cls;tag.textContent=label;tags.appendChild(tag); }
  frame.appendChild(tags);
  const point = (ev, target = svg) => {
    const matrix = target.getScreenCTM(); if (!matrix) return {x:50,y:50};
    return new DOMPoint(ev.clientX,ev.clientY).matrixTransform(matrix.inverse());
  };
  const showLens = ev => {
    const p = ev ? point(ev) : {x:50,y:50};
    const r = frame.getBoundingClientRect();
    lens.style.left = `${ev ? Math.max(0,Math.min(r.width,ev.clientX-r.left)) : r.width/2}px`;
    lens.style.top = `${ev ? Math.max(0,Math.min(r.height,ev.clientY-r.top)) : r.height/2}px`;
    lensSvg.setAttribute("viewBox",`${p.x-17} ${p.y-17} 34 34`);
    lens.hidden = !lensOn;
  };
  const setLayers = on => {
    if(on && lensOn) setLens(false);
    layersOn = on; exhibit.classList.toggle("layers-open",on);
    controls.querySelector("[data-layers]").setAttribute("aria-pressed",String(on));
    sceneAnimations.forEach(a => on ? a.pause() : (motionPaused || document.hidden ? a.pause() : a.play()));
    hint.textContent = on ? "Backdrop · subject · foreground" : "Drag an object · hold Inspect to zoom · hold Layers to separate";
  };
  const setLens = on => {
    lensOn = on; if(on && layersOn) setLayers(false);
    exhibit.classList.toggle("lens-open",on);
    controls.querySelector("[data-lens]").setAttribute("aria-pressed",String(on));
    showLens();
  };
  const addTransient = animation => { temporary.add(animation); animation.finished.catch(()=>{}).finally(()=>temporary.delete(animation)); };
  const actors = [...new Set([...sceneAnimations.map(a=>a.effect.target), ...svg.querySelectorAll(".fg, .ob")])].filter(n=>n && svg.contains(n)).slice(0,7);
  actors.forEach((node,i) => {
    node.dataset.move = "true";
    if(!node.querySelector("[data-move]")){node.setAttribute("tabindex","0");node.setAttribute("role","button");}
    const name = (node.getAttribute("class")||"object").replace(/\b(?:detail|ob|fg|cow-mouth)\b/g,"").replace(/-/g," ").trim()||"illustrated subject";
    node.setAttribute("aria-label",`Move ${name}. Drag, press Enter, or use arrow keys.`);
    const react = () => {
      if(reduced || draggingArt || lensOn || layersOn || motionPaused) return;
      addTransient(node.animate(sceneFrames(motionKind(node.getAttribute("class")||""),e.n+2),{duration:650,easing:"ease-out"}));
    };
    listen(node,"pointerenter",react); listen(node,"focus",react);
    listen(node,"keydown",ev=>{
      if(ev.key==="Enter" || ev.key===" "){ev.preventDefault();ev.stopPropagation();react();return;}
      const d={ArrowLeft:[-7,0],ArrowRight:[7,0],ArrowUp:[0,-7],ArrowDown:[0,7]}[ev.key];
      if(!d || lensOn || layersOn) return;
      ev.preventDefault();ev.stopPropagation();
      if(!reduced) addTransient(node.animate([{transform:`translate(${d[0]}px,${d[1]}px)`},{transform:"none"}],{duration:850,easing:"cubic-bezier(.2,1.5,.4,1)"}));
    });
  });
  listen(svg,"pointerdown",ev=>{
    if(lensOn){showLens(ev);return;}
    if(layersOn || ev.target.closest(".hot")) return;
    const node=ev.target.closest("[data-move]"); if(!node) return;
    ev.preventDefault();ev.stopPropagation();
    for(const a of sceneAnimations) if(a.effect.target===node || node.contains(a.effect.target)) a.cancel();
    const parent=node.parentElement, p=point(ev,parent);
    draggingArt={node,parent,x:p.x,y:p.y,pointer:ev.pointerId};
    svg.setPointerCapture(ev.pointerId);exhibit.classList.add("object-drag");
  });
  listen(svg,"pointermove",ev=>{
    if(lensOn){showLens(ev);return;}
    if(!draggingArt) return;
    const p=point(ev,draggingArt.parent), dx=Math.max(-12,Math.min(12,p.x-draggingArt.x)),dy=Math.max(-10,Math.min(10,p.y-draggingArt.y));
    draggingArt.node.style.transform=`translate(${dx}px,${dy}px) rotate(${dx*.3}deg)`;
  });
  const release = () => {
    if(!draggingArt)return;
    const {node,pointer}=draggingArt, from=node.style.transform;
    draggingArt=null;node.style.transform="";exhibit.classList.remove("object-drag");
    if(svg.hasPointerCapture(pointer))svg.releasePointerCapture(pointer);
    if(!reduced){const spring=node.animate(from ? [{transform:from},{transform:"none"}] : sceneFrames(motionKind(node.getAttribute("class")||""),e.n+3),{duration:900,easing:"cubic-bezier(.16,1.55,.32,1)"});addTransient(spring);spring.finished.then(()=>{if(sheet.open && current===e)playSceneMoment(e);}).catch(()=>{});}
  };
  listen(svg,"pointerup",release);listen(svg,"pointercancel",release);
  listen(frame,"pointermove",ev=>{if(lensOn)showLens(ev);});
  listen(frame,"pointerleave",()=>{if(lensOn)lens.hidden=true;});
  listen(frame,"pointerenter",ev=>{if(lensOn)showLens(ev);});
  for(const [selector,set] of [["[data-lens]",setLens],["[data-layers]",setLayers]]){
    const button=controls.querySelector(selector);
    listen(button,"pointerdown",ev=>{ev.preventDefault();button.setPointerCapture(ev.pointerId);set(true);});
    listen(button,"pointermove",ev=>{if(selector==="[data-lens]" && lensOn)showLens(ev);});
    listen(button,"pointerup",()=>set(false));listen(button,"pointercancel",()=>set(false));
    listen(button,"click",ev=>{if(ev.detail===0)set(button.getAttribute("aria-pressed")!=="true");});
  }
  // Holding the art itself provides a touch-friendly loupe without dragging an object.
  let holdTimer=0;
  listen(frame,"pointerdown",ev=>{if(draggingArt||layersOn||ev.target.closest(".hot"))return;const x=ev.clientX,y=ev.clientY;holdTimer=setTimeout(()=>{setLens(true);showLens({clientX:x,clientY:y});},420);});
  const clearHold=()=>{clearTimeout(holdTimer);holdTimer=0;};
  listen(frame,"pointermove",()=>{if(!lensOn)clearHold();});
  listen(frame,"pointerup",()=>{clearHold();if(lensOn)setLens(false);});listen(frame,"pointercancel",()=>{clearHold();setLens(false);});
  interactionCleanup=()=>{clearHold();abort.abort();temporary.forEach(a=>a.cancel());lens.remove();tags.remove();exhibit.classList.remove("layers-open","lens-open","object-drag");};
}

function render(e, direction = 0) {
  interactionCleanup();
  current = e;
  const s = e.src;
  exhibit.innerHTML = `
    <button type="button" class="close" data-close>Close <span>×</span></button>
    <div class="wall"><div class="c3d"><div class="flipper">${cardHTML(e, { hot: true })}</div></div><div class="motion-controls"${reduced ? " hidden" : ""}><button type="button" class="moment-control" data-replay aria-label="Replay the illustration animation"><span aria-hidden="true">↻</span> Replay</button><button type="button" class="moment-control" data-motion aria-pressed="${motionPaused}" aria-label="${motionPaused ? "Resume illustration motion" : "Pause illustration motion"}">${motionPaused ? "Play" : "Pause"}</button></div><div class="art-tools"><button type="button" class="moment-control" data-lens aria-pressed="false">Inspect</button><button type="button" class="moment-control" data-layers aria-pressed="false">Layers</button></div><p class="art-hint">Drag an object · hold Inspect to zoom · hold Layers to separate</p></div>
    <div class="placard ${e.fam}">
      <p class="no">No. ${e.n} · ${e.el} · <b>${FAMILIES[e.fam]}</b></p>
      <h2>${e.trend}</h2>
      <p class="desc">${e.desc}</p>
      <dl class="facts">
        <dt>On view</dt><dd><ul class="pieces">${e.pieces.split(",").map((p, i) => `<li data-i="${i}">${p.trim()}</li>`).join("")}</ul></dd>
        <dt>${ED.tipLabel}</dt><dd>${e.tip}</dd>
        <dt>${ED.dyeLabel}</dt><dd>${dyesHTML(e)}</dd>
        ${s ? `<dt>${ED.srcLabel}</dt><dd>${s[2] ? `<a href="${s[2]}" target="_blank" rel="noopener">${s[0]}</a>` : s[0]}, ${s[3]}${e.z ? " · " + ED.flag.led : ""}</dd>` : ""}
      </dl>
      <div class="ex-actions"><button type="button" class="btn ghost" data-share>Share image</button><button type="button" class="link" data-copy>Copy</button></div>
      <div class="ex-nav"><button type="button" class="link" data-go="-1"><span class="arr">←</span> Previous</button><button type="button" class="link" data-go="1">Next <span class="arr">→</span></button><button type="button" class="link" data-go="r">Shuffle</button><span class="count">${String(e.n).padStart(3, "0")} / 118</span></div>
    </div>`;
  exhibit.style.setProperty("--tint", famColor(e));
  flick();
  const flipper = exhibit.querySelector(".flipper"), c3d = exhibit.querySelector(".c3d"), glare = exhibit.querySelector(".glare");
  const pose = (ev) => {
    if (reduced || exhibit.matches(".object-drag, .lens-open, .layers-open") || closingExhibit || (ev.pointerType === "touch" && !ev.buttons)) return;
    const r = c3d.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
    const y = Math.max(0, Math.min(1, (ev.clientY - r.top) / r.height));
    flipper.style.transform = `rotateY(${(x - .5) * 16}deg) rotateX(${(.5 - y) * 12}deg)`;
    c3d.style.setProperty("--depth-x", `${(x - .5) * 4}px`);
    c3d.style.setProperty("--depth-y", `${(y - .5) * 4}px`);
    c3d.style.setProperty("--light-x", `${x * 100}%`); c3d.style.setProperty("--light-y", `${y * 100}%`);
    glare.style.setProperty("--gx", `${x * 100}%`); glare.style.setProperty("--gy", `${y * 100}%`);
  };
  const resetPose = () => {
    flipper.style.transform = "";
    c3d.style.setProperty("--depth-x", "0px"); c3d.style.setProperty("--depth-y", "0px");
  };
  c3d.addEventListener("pointermove", pose);
  c3d.addEventListener("pointerdown", pose);
  ["pointerleave", "pointerup", "pointercancel"].forEach(type => c3d.addEventListener(type, resetPose));
  bindHots();
  eyesWake();
  revealExhibit(direction);
  playSceneMoment(e, direction ? 150 : 250);
  bindSceneInteractions(e);
}
// Hotspots and the list of pieces light each other up
function bindHots() {
  const lis = [...exhibit.querySelectorAll(".pieces li")], hots = [...exhibit.querySelectorAll(".hot g")];
  const light = (i) => { lis.forEach(l => l.classList.toggle("on", l.dataset.i === String(i))); hots.forEach(h => h.classList.toggle("on", h.dataset.i === String(i))); };
  hots.forEach(h => { ["pointerenter", "focus", "click"].forEach(t => h.addEventListener(t, () => light(h.dataset.i))); });
  lis.forEach(l => l.addEventListener("pointerenter", () => light(l.dataset.i)));
}
exhibit.addEventListener("click", ev => {
  const t = ev.target.closest("button"); if (!t) return;
  if (t.hasAttribute("data-close")) return closeExhibit();
  if (t.hasAttribute("data-replay")) return replayScene();
  if (t.hasAttribute("data-motion")) { motionPaused = !motionPaused; store.set("ptif-motion-paused", motionPaused); return syncScenePlayback(); }
  if (t.hasAttribute("data-copy")) return copyTrend(current);
  if (t.hasAttribute("data-share")) return shareImage(current);
  if (t.dataset.dye != null) return setDye(current, t.dataset.dye);
  if (t.dataset.go) return go(t.dataset.go);
});
function open(e, source = null) {
  if (!e || closingExhibit) return;
  clearLift();
  liftedFrom = source || tiles.get(e.n);
  render(e);
  if (!sheet.open) sheet.showModal();
  if (!reduced && liftedFrom) {
    liftedFrom.classList.add("lift-origin");
    if (liftedFrom.classList.contains("el")) {
      const row = Number(liftedFrom.dataset.row), col = Number(liftedFrom.dataset.col);
      tiles.forEach(tile => {
        const dx = Number(tile.dataset.col) - col, dy = Number(tile.dataset.row) - row;
        if (Math.abs(dx) + Math.abs(dy) === 1) {
          tile.style.setProperty("--nudge", `translate(${dx * 5}px, ${dy * 5}px)`);
          tile.classList.add("lift-neighbour");
        }
      });
    }
    const animation = liftCard();
    if (animation) animation.finished.then(() => { animation.cancel(); if (liftAnimation === animation) { liftAnimation = null; sheet.classList.remove("travelling"); } }).catch(() => {});
  }
}
function go(dir) {
  if (closingExhibit) return;
  const focused = document.activeElement && document.activeElement.dataset.go;
  clearLift(); liftedFrom = null;
  let next;
  if (dir === "r") { do { next = els[Math.floor(Math.random() * els.length)]; } while (next === current); }
  else next = els[(current.n - 1 + Number(dir) + els.length) % els.length];
  render(next, dir === "r" ? 1 : Number(dir));
  const control = focused && exhibit.querySelector(`[data-go="${focused}"]`);
  if (control) control.focus({ preventScroll: true });
}

sheet.addEventListener("click", ev => { if (ev.target === sheet) closeExhibit(); });
sheet.addEventListener("cancel", ev => { ev.preventDefault(); closeExhibit(); });
sheet.addEventListener("close", () => { interactionCleanup(); stopSceneMotion(); exhibitAnimations.forEach(a => a.cancel()); exhibitAnimations = []; clearLift(); eyesSleep(); if (liftedFrom && liftedFrom.isConnected) liftedFrom.focus({ preventScroll: true }); liftedFrom = null; });
document.addEventListener("keydown", ev => {
  if (!sheet.open || ev.target.matches("input, textarea, select") || ev.altKey || ev.ctrlKey || ev.metaKey) return;
  if (ev.key === "ArrowRight") { ev.preventDefault(); go(1); }
  if (ev.key === "ArrowLeft") { ev.preventDefault(); go(-1); }
  if (ev.key.toLowerCase() === "r") replayScene();
});

// ---------- Share as an image (1080 × 1920, for stories) ----------
const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
function wrap(ctx, text, x, y, maxW, lh) {
  const words = text.split(" "); let line = "";
  for (const w of words) { const t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { ctx.fillText(line, x, y); y += lh; line = w; } else line = t; }
  ctx.fillText(line, x, y); return y;
}
// Draw one card on a canvas: top-left (x, y), width w, optional rotation about its centre.
async function drawCard(ctx, e, x, y, w, rot = 0) {
  const h = w * 1.4, col = famColor(e);
  const art = await loadImg(sceneImg(e, "0 0 100 100"));
  ctx.save();
  if (rot) { ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot * Math.PI / 180); ctx.translate(-(x + w / 2), -(y + h / 2)); }
  ctx.shadowColor = "rgba(21,21,21,.18)"; ctx.shadowBlur = w * .06; ctx.shadowOffsetY = w * .02;
  ctx.fillStyle = "#FBF7EE"; ctx.fillRect(x, y, w, h);
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "#151515"; ctx.lineWidth = Math.max(1, w * .004); ctx.strokeRect(x + w * .033, y + w * .033, w - w * .066, h - w * .066);
  const ax = x + w * .14, ay = y + w * .19, aw = w * .72, ah = h - w * .42;
  ctx.save(); ctx.beginPath(); ctx.rect(ax, ay, aw, ah); ctx.clip();
  const sc = Math.max(aw / art.width, ah / art.height);
  ctx.drawImage(art, ax + (aw - art.width * sc) / 2, ay + ah - art.height * sc, art.width * sc, art.height * sc);
  ctx.restore(); ctx.lineWidth = Math.max(1, w * .0026); ctx.strokeRect(ax, ay, aw, ah);
  ctx.fillStyle = col; ctx.textAlign = "left"; ctx.font = `600 ${w * .118}px Caudex, serif`; ctx.fillText(e.sym, x + w * .064, y + w * .164);
  ctx.fillStyle = "#151515"; ctx.font = `600 ${w * .031}px Caudex, serif`; ctx.fillText(String(e.n), x + w * .069, y + w * .205);
  ctx.textAlign = "center"; ctx.font = `600 ${w * .033}px Caudex, serif`; ctx.fillText(e.el.toUpperCase(), x + w / 2 + w * .05, y + w * .133);
  ctx.font = `italic ${w * .056}px Caudex, serif`; ctx.fillText(e.trend, x + w / 2, y + h - w * .115);
  ctx.restore();
}
function offerImage(c, name, label) {
  c.toBlob(async blob => {
    if (!blob) return toast("Couldn't make the image");
    const url = URL.createObjectURL(blob), file = new File([blob], name, { type: "image/png" });
    const canShare = navigator.canShare && navigator.canShare({ files: [file] });
    $("shareIn").innerHTML = `<p class="kicker">${label}</p><img src="${url}" alt="${label}"><p>If the download doesn't start, press and hold (or right-click) the image to save it.</p>
      <div class="ex-actions"><a class="btn" href="${url}" download="${file.name}">Download</a>${canShare ? `<button type="button" class="btn ghost" id="nativeShare">Share</button>` : ""}<button type="button" class="link" id="closeShare">Close</button></div>`;
    $("closeShare").addEventListener("click", () => $("sharebox").close());
    if (canShare) $("nativeShare").addEventListener("click", () => navigator.share({ files: [file], title: label }).catch(() => {}));
    $("sharebox").showModal();
  }, "image/png");
}
async function shareImage(e) {
  const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  if (document.fonts) await document.fonts.ready;
  ctx.fillStyle = "#F4EFE5"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#151515"; ctx.textAlign = "center";
  ctx.font = '600 26px Caudex, serif'; ctx.fillText(`${ED.name.toUpperCase()}  ·  ISSUE ${ED.issue}`, W / 2, 120);
  ctx.fillRect(90, 150, W - 180, 2);
  const cx = 150, cy = 220, cw = W - 300, ch = cw * 1.4;
  await drawCard(ctx, e, cx, cy, cw);
  // Placard
  ctx.textAlign = "left"; ctx.fillStyle = "#151515";
  ctx.font = '400 84px Caudex, serif';
  let y = wrap(ctx, e.trend, 90, cy + ch + 140, W - 180, 92);
  ctx.font = 'italic 42px Caudex, serif'; ctx.fillStyle = "#3A3833";
  y = wrap(ctx, e.desc, 90, y + 70, W - 180, 52);
  ctx.font = '600 24px Caudex, serif'; ctx.fillStyle = "#77716A";
  const d = dyeOf(e);
  if (d) { ctx.fillText(`${ED.dyeLabel.toUpperCase()} · ${d.name.toUpperCase()}`, 90, Math.min(H - 110, y + 80)); y += 40; }
  if (e.src) ctx.fillText(ED.seen(e.src), 90, Math.min(H - 70, y + 80));
  offerImage(c, `${e.sym}-${e.trend.replace(/\W+/g, "-")}.png`, `Share image · ${e.sym}`);
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
const VIEWS = ["cover", "table", "lab", "families", "sources"];
function show(v, opts = {}) {
  if (!VIEWS.includes(v)) v = "cover";
  document.querySelectorAll(".view").forEach(s => s.hidden = s.dataset.view !== v);
  document.querySelectorAll(".sections [data-view]").forEach(t => t.dataset.view === v ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current"));
  if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: "instant" });
  if (menuSheet.open) menuSheet.close();
  v === "cover" ? orbitStart() : orbitStop();
  (v === "families" || v === "sources") ? requestAnimationFrame(() => inkStart(v)) : inkStop();
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
    const p = Math.max(0, Math.min(1, (t - t0) / dur)), eased = 1 - Math.pow(1 - p, 3);
    num.textContent = String(Math.round(eased * 118)).padStart(3, "0");
    p < 1 ? requestAnimationFrame(step) : setTimeout(finish, 250);
  })(t0);
  el.addEventListener("click", finish);
}

// ---------- Start ----------
const h = location.hash.slice(1);
const fromHash = h && !VIEWS.includes(h) && get(h);
show(fromHash ? "table" : (VIEWS.includes(h) ? h : "cover"), { keepScroll: true });
if (fromHash) requestAnimationFrame(() => open(fromHash));
else if (!h || h === "cover") curtain();
