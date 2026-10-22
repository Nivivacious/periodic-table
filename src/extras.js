// Extras: colourways, eyes that follow you, the tear sheet, the living colophon,
// the portal between editions and the brocade in the cover title.

// ---------- Eyes that follow the cursor ----------
let eyeRAF = 0, blinkTimer = 0, lastLook = null;
function lookAt(cx, cy) {
  for (const p of exhibit.querySelectorAll(".pupil")) {
    const r = p.getBoundingClientRect();
    if (!r.width) continue;
    let dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy) || 1;
    const m = p.getCTM(), sx = m && m.a < 0 ? -1 : 1;
    const reach = Math.min(1, d / 160);
    p.setAttribute("transform", `translate(${(dx / d * 1.1 * reach * sx).toFixed(2)} ${(dy / d * 0.8 * reach).toFixed(2)})`);
  }
}
function onLook(ev) {
  lastLook = [ev.clientX, ev.clientY];
  if (!eyeRAF) eyeRAF = requestAnimationFrame(() => { eyeRAF = 0; if (lastLook) lookAt(...lastLook); });
}
function blink() {
  const ps = [...exhibit.querySelectorAll(".pupil")];
  ps.forEach(p => { p.dataset.r = p.dataset.r || p.getAttribute("r"); p.setAttribute("r", (+p.dataset.r * .22).toFixed(2)); });
  setTimeout(() => ps.forEach(p => p.setAttribute("r", p.dataset.r)), 120);
  blinkTimer = setTimeout(blink, 2600 + Math.random() * 3200);
}
function eyesWake() {
  if (reduced) return;
  document.removeEventListener("pointermove", onLook);
  document.addEventListener("pointermove", onLook);
  clearTimeout(blinkTimer); blinkTimer = setTimeout(blink, 1200 + Math.random() * 2000);
  if (lastLook) lookAt(...lastLook);
}
function eyesSleep() { document.removeEventListener("pointermove", onLook); clearTimeout(blinkTimer); }

// ---------- The tear sheet (fashion) / the skip (garbage) ----------
const PIN_KEY = "ptif-pins-" + ED.key;
let pins = store.get(PIN_KEY, []).filter(p => get(p.s));
const isPinned = (e) => pins.some(p => p.s === e.sym);
function savePins() { store.set(PIN_KEY, pins); $("pincount").textContent = pins.length; document.querySelectorAll("[data-pincount]").forEach(n => n.textContent = pins.length); }
function togglePin(e) {
  if (isPinned(e)) { pins = pins.filter(p => p.s !== e.sym); toast(`${e.sym} taken off the ${ED.sheet.tool.toLowerCase()}`); }
  else {
    const n = pins.length;
    pins.push({ s: e.sym, x: 8 + (n * 17) % 70 + Math.random() * 6, y: 6 + ((n * 23) % 50) + Math.random() * 8, r: Math.round((Math.random() - .5) * 16), d: dyeState.get(e.sym) || "" });
    toast(`${e.sym} ${isG ? "thrown in" : "pinned"}`);
  }
  savePins(); renderSheetIfOpen();
}
const board = $("board");
function renderSheetIfOpen() { if (!document.querySelector('[data-view="tearsheet"]').hidden) renderSheet(); }
function renderSheet() {
  savePins();
  $("boardEmpty").hidden = pins.length > 0;
  board.innerHTML = pins.map((p, i) => {
    const e = get(p.s); if (p.d) dyeState.set(e.sym, p.d);
    return `<div class="pin ${e.fam}" data-i="${i}" style="left:${p.x}%;top:${p.y}%;--r:${p.r}deg">${cardHTML(e)}<button type="button" class="unpin" aria-label="Remove ${e.trend}">×</button></div>`;
  }).join("");
}
// Drag the pinned cards around with the pointer; a tap opens the card.
let pinDrag = null;
board.addEventListener("pointerdown", ev => {
  const pin = ev.target.closest(".pin"); if (!pin || ev.target.closest(".unpin")) return;
  const r = board.getBoundingClientRect(), p = pins[+pin.dataset.i];
  pinDrag = { pin, p, r, x0: ev.clientX, y0: ev.clientY, px: p.x, py: p.y, moved: false };
  pin.setPointerCapture(ev.pointerId); pin.classList.add("lift");
  board.append(pin);
});
board.addEventListener("pointermove", ev => {
  if (!pinDrag) return;
  const { pin, p, r } = pinDrag, dx = ev.clientX - pinDrag.x0, dy = ev.clientY - pinDrag.y0;
  if (Math.hypot(dx, dy) > 4) pinDrag.moved = true;
  p.x = Math.max(-5, Math.min(92, pinDrag.px + dx / r.width * 100)); p.y = Math.max(-5, Math.min(92, pinDrag.py + dy / r.height * 100));
  pin.style.left = p.x + "%"; pin.style.top = p.y + "%";
});
board.addEventListener("pointerup", ev => {
  if (!pinDrag) return;
  const { pin, p, moved } = pinDrag; pinDrag = null; pin.classList.remove("lift");
  if (moved) { p.r = Math.round((Math.random() - .5) * 14); pins.splice(pins.indexOf(p), 1); pins.push(p); savePins(); renderSheet(); }
  else open(get(p.s));
});
board.addEventListener("pointercancel", () => { if (pinDrag) { pinDrag.pin.classList.remove("lift"); pinDrag = null; } });
board.addEventListener("click", ev => {
  const b = ev.target.closest(".unpin"); if (!b) return;
  const pin = b.closest(".pin"); pins.splice(+pin.dataset.i, 1); savePins(); renderSheet();
});
$("sheetClear").addEventListener("click", () => { if (!pins.length) return; pins = []; savePins(); renderSheet(); toast(isG ? "Skip emptied" : "Tear sheet cleared"); });
$("sheetSave").addEventListener("click", async () => {
  if (!pins.length) return toast(ED.sheet.empty);
  const W = 1600, H = 1000, c = document.createElement("canvas"); c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  if (document.fonts) await document.fonts.ready;
  ctx.fillStyle = "#F4EFE5"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#151515"; ctx.textAlign = "center"; ctx.font = "600 22px Caudex, serif";
  ctx.fillText(`${ED.name.toUpperCase()}  ·  ${ED.sheet.tool.toUpperCase()}`, W / 2, 56);
  ctx.fillRect(60, 78, W - 120, 1.5);
  const cw = 320;
  for (const p of pins) await drawCard(ctx, get(p.s), 60 + p.x / 100 * (W - 120 - cw), 100 + p.y / 100 * (H - 160 - cw * 1.4), cw, p.r);
  ctx.fillStyle = "#77716A"; ctx.textAlign = "right"; ctx.font = "600 18px Caudex, serif"; ctx.fillText("ISSUE 01 · 2026", W - 60, H - 36);
  offerImage(c, `${ED.sheet.file}.png`, ED.sheet.tool);
});
$("sheetLabel").textContent = ED.sheet.tool;
$("sheetKicker").textContent = ED.sheet.kicker; $("sheetH2").innerHTML = ED.sheet.h2; $("sheetLede").textContent = ED.sheet.lede; $("boardEmpty").textContent = ED.sheet.empty;
document.querySelectorAll("[data-sheet-tool]").forEach(n => n.textContent = ED.sheet.tool);
savePins();

// ---------- The living colophon: a frieze under the credits ----------
const fz = $("friezeSvg"), FZW = 1200;
let walkers = [], fzRAF = 0, fzT = 0, fzNext = 0, fzHover = false;
const WALK_G = [
  { name: "tipper", v: 58, draw: () => OBJ.tipper(0) },
  { name: "cow", v: 16, draw: () => OBJ.cow(0, "white") },
  { name: "cow", v: 14, draw: () => OBJ.cow(0, "black") },
  { name: "dog", v: 34, draw: () => OBJ.dog(0, "beige") },
  { name: "crow", v: 92, draw: () => OBJ.crow(0, 36, .8), fly: true },
  { name: "pigeon", v: 70, draw: () => OBJ.pigeon(0, 52, .8), fly: true },
  { name: "sweeper", v: 20, draw: () => `<g transform="translate(0 -10)">${OBJ.sweeper(0)}</g>` },
];
function fzBase() {
  const back = isG ? `<g opacity=".55" transform="translate(0 0)">${[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map(x => `<g transform="translate(${x} 0)">${SET.skyline("grey")}</g>`).join("")}</g><g transform="translate(140 0)">${OBJ.bescom(0)}</g><g transform="translate(980 0)">${OBJ.bescom(0)}</g>` : "";
  const ground = `<path d="M0,84 H${FZW}" stroke="${P.ink}" stroke-width=".8"/>`;
  const props = isG ? `<g transform="translate(300 0)">${OBJ.bins(0)}</g><g transform="translate(640 0)">${OBJ.pothole(0)}</g><g transform="translate(860 0)">${OBJ.bags(0)}</g>` : `<path d="M0,84 H${FZW}" stroke="${P.rani}" stroke-width=".6" stroke-dasharray="6 18" opacity=".6"/>`;
  return `<g class="fz-base">${back}${ground}${props}</g><g class="fz-walkers" id="fzWalkers"></g>`;
}
function fzSpawn(x) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", "walker");
  let w;
  if (isG) {
    const k = WALK_G[Math.floor(Math.random() * WALK_G.length)];
    const owner = els.find(e => (e.art.obj || []).some(o => (Array.isArray(o) ? o[0] : o) === k.name)) || els[Math.floor(Math.random() * els.length)];
    w = { g, x, v: k.v, e: owner, fly: k.fly, bob: Math.random() * 6.28 };
    g.innerHTML = `<g class="ob">${k.draw()}</g>`;
  } else {
    const e = els.filter(e => e.art.figs && e.art.figs.length)[Math.floor(Math.random() * 90)];
    const f = { ...e.art.figs[0], x: 0, s: (e.art.figs[0].s || 1) * .95 };
    w = { g, x, v: 22 + Math.random() * 12, e, bob: Math.random() * 6.28 };
    g.innerHTML = `<g transform="translate(0 -10)">${fig("fz" + e.sym + Math.floor(Math.random() * 1e4), f)}</g>`;
  }
  g.setAttribute("aria-label", w.e.trend); g.setAttribute("role", "button"); g.setAttribute("tabindex", "0");
  g.addEventListener("click", () => open(w.e));
  g.addEventListener("keydown", ev => { if (ev.key === "Enter") open(w.e); });
  $("fzWalkers").append(g);
  walkers.push(w);
}
function fzFrame(t) {
  const dt = Math.min(.05, (t - fzT) / 1000 || 0); fzT = t;
  if (!fzHover) {
    for (const w of walkers) { w.x += w.v * dt; w.bob += dt * (w.fly ? 9 : 6); }
    walkers = walkers.filter(w => { if (w.x > FZW + 80) { w.g.remove(); return false; } return true; });
    if (t > fzNext && walkers.length < 6) { fzSpawn(-70); fzNext = t + 2200 + Math.random() * 3200; }
  }
  for (const w of walkers) w.g.setAttribute("transform", `translate(${w.x.toFixed(1)} ${(w.fly ? Math.sin(w.bob) * 4 : Math.abs(Math.sin(w.bob)) * -1.4).toFixed(2)})`);
  fzRAF = requestAnimationFrame(fzFrame);
}
function fzStart() { if (fzRAF || reduced) return; fzT = performance.now(); fzRAF = requestAnimationFrame(fzFrame); }
function fzStop() { cancelAnimationFrame(fzRAF); fzRAF = 0; }
fz.innerHTML = fzBase();
if (reduced) { [120, 380, 620, 900, 1080].forEach(x => fzSpawn(x)); walkers.forEach(w => w.g.setAttribute("transform", `translate(${w.x} 0)`)); }
else { [200, 700].forEach(x => fzSpawn(x)); fzNext = performance.now() + 1500; }
fz.addEventListener("pointerenter", () => fzHover = true);
fz.addEventListener("pointerleave", () => fzHover = false);
new IntersectionObserver(en => en[0].isIntersecting ? fzStart() : fzStop(), { threshold: .1 }).observe(fz);

// ---------- The portal: a window into the other edition ----------
const portal = $("portal");
let portalBuilt = false, portalHide = 0;
function portalBuild() {
  if (portalBuilt) return; portalBuilt = true;
  const other = isG ? ELEMENTS : GARBAGE;
  const picks = [...other].sort(() => Math.random() - .5).slice(0, 14).map(([n, sym, el, trend, d, p, t, art]) => `<img src="${specImg("p" + sym, art)}" alt="">`).join("");
  $("portalStrip").innerHTML = picks + picks;
  $("portalT").textContent = ED.otherTitle;
}
function portalAt(btn) {
  const r = btn.getBoundingClientRect();
  const w = 300, h = 180;
  let left = r.left, top = r.bottom + 10;
  if (left + w > innerWidth - 12) left = innerWidth - 12 - w;
  if (top + h > innerHeight - 12) top = r.top - h - 10;
  portal.style.left = Math.max(12, left) + "px"; portal.style.top = Math.max(12, top) + "px";
}
document.querySelectorAll(".mast-left .edflip").forEach(btn => {
  btn.addEventListener("pointerenter", ev => { if (ev.pointerType !== "mouse") return; portalBuild(); portalAt(btn); clearTimeout(portalHide); portal.classList.add("on"); });
  btn.addEventListener("pointerleave", () => { portalHide = setTimeout(() => portal.classList.remove("on"), 160); });
});
function portalGrow(from) {
  if (reduced) return 200;
  portalBuild();
  if (!portal.classList.contains("on")) { portalAt(from || document.querySelector(".mast-left .edflip")); portal.classList.add("on"); }
  clearTimeout(portalHide);
  requestAnimationFrame(() => portal.classList.add("grow"));
  return 820;
}

// ---------- Brocade through the cover title ----------
const coverEm = document.querySelector(".cover-title h1 em");
if (coverEm && fine) {
  coverEm.addEventListener("pointermove", ev => {
    const r = coverEm.getBoundingClientRect();
    coverEm.style.setProperty("--mx", (ev.clientX - r.left) + "px"); coverEm.style.setProperty("--my", (ev.clientY - r.top) + "px");
    coverEm.classList.add("lit");
  });
  coverEm.addEventListener("pointerleave", () => coverEm.classList.remove("lit"));
}

// Deep link straight to the sheet
if (location.hash === "#tearsheet") show("tearsheet", { keepScroll: true });
