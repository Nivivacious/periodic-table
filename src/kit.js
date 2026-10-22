// Illustration kit: flat, cute fashion vignettes on a 100×100 stage.
const P = {
  paper: "#F4ECDC", ink: "#1E2233", red: "#D9412B", yellow: "#F2B330", green: "#2E7D5B",
  blue: "#3B6EA8", pink: "#E58A9B", kaapi: "#7A4528", peach: "#F3C9A4", rani: "#C93A78",
  mint: "#A8D5C2", sage: "#9DB59A", lav: "#B7A5D8", ivory: "#FBF6EA", beige: "#D9C4A3",
  rust: "#B5532A", plum: "#6B3460", teal: "#2B8A8A", indigo: "#2D3E7A", sky: "#A9CBE6",
  gold: "#C9962B", grey: "#A9A6A0", black: "#26232E", denim: "#5A7FB5", haldi: "#F5C531",
  maroon: "#7E1F2E", orange: "#EE7F2D", lime: "#D7E44A", hot: "#FF5BA7", blush: "#F6D3D3",
  cream: "#EFE3C8", night: "#1B2340", olive: "#6F7A3A", white: "#FFFFFF",
  skin: "#C68A62", skin2: "#9E6744", skin3: "#E2AD83", hair: "#2A1E22", hair2: "#5B3A29",
};
const col = (c) => (c && P[c]) || c || P.ink;
const OL = `stroke="${P.ink}" stroke-width="0.6" stroke-linejoin="round"`;

function patterns(id) {
  const pp = (n, w, h, body, rot) => `<pattern id="${id}-${n}" width="${w}" height="${h}" patternUnits="userSpaceOnUse"${rot ? ` patternTransform="rotate(${rot})"` : ""}>${body}</pattern>`;
  return `<defs>
    ${pp("dots", 4, 4, `<circle cx="2" cy="2" r="0.75" fill="#fff" fill-opacity=".85"/>`)}
    ${pp("polka", 6, 6, `<circle cx="3" cy="3" r="1.3" fill="#fff" fill-opacity=".9"/>`)}
    ${pp("stripes", 4, 4, `<rect width="1.6" height="4" fill="#fff" fill-opacity=".45"/>`, 0)}
    ${pp("diag", 4, 4, `<rect width="1.4" height="4" fill="#fff" fill-opacity=".4"/>`, 35)}
    ${pp("checks", 6, 6, `<rect width="3" height="6" fill="#fff" fill-opacity=".25"/><rect width="6" height="3" fill="#fff" fill-opacity=".25"/>`)}
    ${pp("floral", 7, 7, `<g fill="#fff" fill-opacity=".8"><circle cx="3.5" cy="2.4" r=".8"/><circle cx="3.5" cy="4.6" r=".8"/><circle cx="2.4" cy="3.5" r=".8"/><circle cx="4.6" cy="3.5" r=".8"/></g><circle cx="3.5" cy="3.5" r=".55" fill="${P.yellow}"/>`)}
    ${pp("chevron", 6, 5, `<path d="M0,3.5 L1.5,1.5 L3,3.5 L4.5,1.5 L6,3.5" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width=".7"/>`)}
    ${pp("zari", 5, 5, `<path d="M2.5,1 L3.6,2.5 L2.5,4 L1.4,2.5Z" fill="${P.yellow}"/>`)}
    ${pp("sparkle", 6, 6, `<path d="M3,1.2 L3.4,2.6 L4.8,3 L3.4,3.4 L3,4.8 L2.6,3.4 L1.2,3 L2.6,2.6Z" fill="#fff" fill-opacity=".9"/>`)}
    ${pp("mirror", 6, 6, `<circle cx="3" cy="3" r="1.2" fill="#fff" stroke="${P.ink}" stroke-width=".3"/>`)}
    ${pp("splash", 12, 12, `<circle cx="3" cy="3" r="2.2" fill="${P.hot}"/><circle cx="9" cy="6" r="1.8" fill="${P.yellow}"/><circle cx="4" cy="10" r="1.6" fill="${P.green}"/><circle cx="10" cy="11" r="1" fill="${P.blue}"/>`)}
    ${pp("tie", 10, 10, `<circle cx="5" cy="5" r="4" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.1"/><circle cx="5" cy="5" r="1.6" fill="#fff" fill-opacity=".55"/>`)}
    ${pp("patch", 8, 8, `<rect width="4" height="4" fill="${P.yellow}" fill-opacity=".7"/><rect x="4" y="4" width="4" height="4" fill="${P.pink}" fill-opacity=".7"/>`)}
    ${pp("paisley", 7, 7, `<path d="M3,5.5 C1,5.5 1,2.5 3,2 C4.5,1.6 5,3 4,3.6" fill="none" stroke="${P.yellow}" stroke-width=".6"/>`)}
    ${pp("grid", 5, 5, `<path d="M0,0 H5 M0,0 V5" stroke="#fff" stroke-opacity=".45" stroke-width=".5"/>`)}
    ${pp("pop", 8, 8, `<circle cx="2" cy="2" r="1.4" fill="${P.yellow}"/><path d="M5,5 L7,7 M7,5 L5,7" stroke="${P.ink}" stroke-width=".6"/>`)}
    ${pp("leopard", 7, 7, `<path d="M2,2 q1,-1 2,0 q-1,1.5 -2,0Z M5,5 q1,-1 1.6,.2 q-1,1.2 -1.6,-.2Z" fill="${P.kaapi}"/>`)}
  </defs>`;
}

// Fill a path with a colour, then optionally overlay a pattern.
function shape(id, d, c, pat, extra = "") {
  return `<path d="${d}" fill="${col(c)}" ${OL} ${extra}/>` + (pat ? `<path d="${d}" fill="url(#${id}-${pat})" stroke="none" ${extra}/>` : "");
}

// A standing figure, feet at (x, 94). Head about 21 units from the ground at s=1 is ~76 tall.
function fig(id, o) {
  const x = o.x ?? 50, s = o.s ?? 1, flip = o.flip ? -1 : 1;
  const sk = col(o.sk || "skin"), hc = col(o.hc || "hair");
  const top = o.top || "kurta", low = o.low || "none", lay = o.lay || [], acc = o.a || [];
  const c = o.c || "red", l = o.l || c, y = o.y || l, b = o.b || "gold";
  const ac = col(o.ac || "gold");
  const g = [];
  const S = (d, cc, pat, ex) => g.push(shape(id, d, cc, pat, ex));
  const line = (d, cc, w, ex = "") => g.push(`<path d="${d}" fill="none" stroke="${col(cc)}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`);
  const dot = (cx, cy, r, cc, ex = "") => g.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col(cc)}" ${ex}/>`);

  // Back hair and back layers
  const h = o.h || "bun";
  if (h === "open") S("M-10.5,-62 Q-13,-44 -9,-40 H9 Q13,-44 10.5,-62Z", hc);
  if (h === "bob") S("M-11,-62 Q-12.5,-51 -8.5,-51 H8.5 Q12.5,-51 11,-62Z", hc);
  if (h === "braid") { for (const yy of [-52, -46.5, -41, -35.5]) dot(9.5, yy, 2.4, hc, OL); }
  if (h === "pony") S("M7,-66 Q16,-62 13,-46 Q11,-52 8,-58Z", hc);
  if (h === "bun") dot(0, -71.5, 5, hc, OL);
  if (h === "lowbun") dot(0, -52.5, 4.2, hc, OL);
  if (lay.includes("veil")) S("M-12,-62 Q-12,-79 0,-79 Q12,-79 12,-62 L16,-22 L11,-23 L8.5,-58 Q0,-69 -8.5,-58 L-11,-23 L-16,-22Z", y, o.py, `fill-opacity=".6"`);
  if (lay.includes("pallu")) S("M-8.5,-48 L-15,-16 L-9.5,-18Z", y, o.py);
  if (lay.includes("dupatta")) { S("M-8.5,-48 L-14,-12 L-10,-12 L-6,-46Z", y, o.py); S("M8.5,-48 L14,-12 L10,-12 L6,-46Z", y, o.py); }
  if (lay.includes("cape")) S("M-8.5,-49 L-18,-8 H18 L8.5,-49Z", y, o.py, `fill-opacity=".75"`);

  // Lower body
  const legs = (cc, from = -14) => { line(`M-3,${from} L-3.4,-1`, cc, 3.4); line(`M3,${from} L3.4,-1`, cc, 3.4); };
  if (["dress", "anarkali", "babytee-skirt", "skirt", "tiered", "mini"].includes(low) || ["dress", "anarkali"].includes(top) && low === "none") legs(sk);
  if (low === "saree") {
    S("M-8.5,-35 H8.5 L10,0 H-10Z", l, o.pl);
    S("M-9.8,-3.2 H9.8 L10,0 H-10Z", b);
    line("M-1,-30 L-1.6,-3.5 M1.8,-30 L1.8,-3.5 M4.6,-30 L5.2,-3.5", "ink", 0.4, `opacity=".45"`);
  }
  if (low === "lehenga") {
    S("M-8.5,-35 H8.5 L22,0 H-22Z", l, o.pl);
    S("M-20.6,-3.8 H20.6 L22,0 H-22Z", b);
    line("M-3,-32 L-8,-4 M3,-32 L8,-4", "ink", 0.4, `opacity=".35"`);
  }
  if (low === "fishtail") { S("M-8.5,-35 H8.5 L6.5,-11 L18,0 H-18 L-6.5,-11Z", l, o.pl); S("M-16,-2.5 H16 L18,0 H-18Z", b); }
  if (low === "tiered") { S("M-8,-30 H8 L10,-20 H-10Z", l, o.pl); S("M-10,-20 H10 L13,-10 H-13Z", l, o.pl); S("M-13,-10 H13 L16,-1 H-16Z", l, o.pl); }
  if (low === "skirt") S("M-8,-30 H8 L12,-12 H-12Z", l, o.pl);
  if (low === "mini") S("M-8,-30 H8 L10,-20 H-10Z", l, o.pl);
  if (low === "churidar") { S("M-6,-16 H-0.8 L-1.4,0 H-5Z", l, o.pl); S("M6,-16 H0.8 L1.4,0 H5Z", l, o.pl); }
  if (low === "palazzo") S("M-9.5,-22 H9.5 L13,0 H1.2 L0,-13 L-1.2,0 H-13Z", l, o.pl);
  if (low === "jeans") S("M-8.2,-29 H8.2 L8.4,0 H1.6 L0,-19 L-1.6,0 H-8.4Z", l, o.pl);
  if (low === "baggy") { S("M-10,-29 H10 L12.5,0 H1.6 L0,-18 L-1.6,0 H-12.5Z", l, o.pl); line("M-9,-20 h4 v5 h-4z M9,-20 h-4 v5 h4z", "ink", 0.4, `opacity=".5"`); }
  if (low === "shorts") { S("M-8.2,-29 H8.2 L9,-20 H1 L0,-24 L-1,-20 H-9Z", l, o.pl); legs(sk, -20); }
  if (low === "leggings") { line("M-3,-29 L-3.4,-1", l, 4.4); line("M3,-29 L3.4,-1", l, 4.4); }
  if (low === "dhoti") { S("M-9,-24 H9 L10.5,-6 L7,0 H2 L0,-11 L-2,0 H-7 L-10.5,-6Z", l, o.pl); line("M-6,-20 Q-2,-12 -6,-6 M6,-20 Q2,-12 6,-6", "ink", 0.4, `opacity=".45"`); }
  if (low === "sharara") S("M-8,-22 H8 L7,-12 L17,0 H1.4 L0,-9 L-1.4,0 H-17 L-7,-12Z", l, o.pl);

  // Shoes
  const shc = { sneaker: "white", jutti: "gold", kolhapuri: "kaapi", heel: "ink", boot: "black", none: null }[o.shoe || "jutti"];
  if (shc) { g.push(`<ellipse cx="-4" cy="-0.6" rx="${o.shoe === "sneaker" || o.shoe === "boot" ? 4 : 3.2}" ry="1.9" fill="${col(shc)}" ${OL}/>`); g.push(`<ellipse cx="4" cy="-0.6" rx="${o.shoe === "sneaker" || o.shoe === "boot" ? 4 : 3.2}" ry="1.9" fill="${col(shc)}" ${OL}/>`); }

  // Top
  const midriff = (to) => g.push(`<rect x="-8.2" y="-39.5" width="16.4" height="${to}" fill="${sk}" ${OL}/>`);
  if (top === "blouse") { midriff(5); S("M-8,-49 Q0,-51 8,-49 L8.6,-38.5 H-8.6Z", c, o.pt); }
  if (top === "corset") { midriff(5); S("M-8,-48 Q0,-46 8,-48 L8.6,-36 L0,-34 L-8.6,-36Z", c, o.pt); line("M-2,-46 L2,-44 M2,-46 L-2,-44 M-2,-42 L2,-40 M2,-42 L-2,-40", "ivory", 0.5); }
  if (top === "babytee") { midriff(6); S("M-8,-49 Q0,-51 8,-49 L8.6,-37 H-8.6Z", c, o.pt); }
  if (top === "crop") { S("M-8,-49 Q0,-51 8,-49 L8.6,-36 H-8.6Z", c, o.pt); }
  if (top === "kurta") { S("M-8,-49 Q0,-51 8,-49 L11.5,-13 H-11.5Z", c, o.pt); line("M0,-49 L0,-42", "ink", 0.45, `opacity=".6"`); }
  if (top === "shortkurta") { S("M-8,-49 Q0,-51 8,-49 L10.5,-22 H-10.5Z", c, o.pt); line("M0,-49 L0,-42", "ink", 0.45, `opacity=".6"`); }
  if (top === "angrakha") { S("M-8,-49 Q0,-51 8,-49 L12,-12 H-12Z", c, o.pt); line("M-7,-49 Q3,-42 6,-34", "ink", 0.5); dot(6, -34, 0.9, b); }
  if (top === "tee") { S("M-11.5,-49 Q0,-51.5 11.5,-49 L12.5,-26 H-12.5Z", c, o.pt); }
  if (top === "fittee") { S("M-8.5,-49 Q0,-51 8.5,-49 L9,-29 H-9Z", c, o.pt); }
  if (top === "shirt") { S("M-8.5,-49 Q0,-51 8.5,-49 L9.5,-27 H-9.5Z", c, o.pt); S("M-3.5,-49.5 L0,-45 L3.5,-49.5 L1.5,-50.5 L0,-48.5 L-1.5,-50.5Z", "ivory"); line("M0,-45 V-28", "ink", 0.4, `opacity=".5"`); }
  if (top === "sherwani") { S("M-8.5,-49 Q0,-51 8.5,-49 L11,-9 H-11Z", c, o.pt); line("M0,-49 V-10", "ink", 0.45); for (const yy of [-45, -40, -35, -30]) dot(0.9, yy, 0.65, b); S("M-3,-50.5 H3 V-48.5 H-3Z", b); }
  if (top === "dress") { S("M-7.5,-49 Q0,-51 7.5,-49 L8,-38 L15,-11 H-15 L-8,-38Z", c, o.pt); }
  if (top === "slip") { S("M-6.5,-48 Q0,-46 6.5,-48 L8,-38 L13,-6 H-13 L-8,-38Z", c, o.pt); }
  if (top === "anarkali") { S("M-7.5,-49 Q0,-51 7.5,-49 L8,-39 L21,-4 H-21 L-8,-39Z", c, o.pt); S("M-19.6,-7.2 H19.6 L21,-4 H-21Z", b); }
  if (top === "gown") { S("M-7.5,-49 Q0,-51 7.5,-49 L8,-39 L17,0 H-17 L-8,-39Z", c, o.pt); }
  if (top === "jersey") { S("M-10,-49 Q0,-51 10,-49 L11,-27 H-11Z", c, o.pt); g.push(`<text x="0" y="-33" font-family="Caudex, serif" font-weight="700" font-size="8" text-anchor="middle" fill="${P.ivory}">${o.num || 7}</text>`); line("M-3,-50 L0,-46 L3,-50", "ivory", 0.8); }
  if (top === "hoodie") { S("M-11,-49 Q0,-51.5 11,-49 L12,-26 H-12Z", c, o.pt); S("M-7,-50 Q0,-44 7,-50 Q0,-47 -7,-50Z", "ink", null, `fill-opacity=".2"`); line("M-2,-46 V-41 M2,-46 V-41", "ivory", 0.5); }

  // Arms with sleeves
  const sl = o.sl || ({ blouse: "short", corset: "none", babytee: "short", crop: "none", tee: "tee", fittee: "short", jersey: "tee", slip: "none", dress: "short" }[top] || "long");
  for (const d of [-1, 1]) {
    line(`M${d * 8.6},-47 L${d * 11.6},-30.5`, sk, 3.1);
    if (sl === "short") line(`M${d * 8.6},-47.4 L${d * 9.9},-41`, c, 4.6);
    if (sl === "puff") g.push(`<ellipse cx="${d * 9.6}" cy="-45" rx="3.6" ry="3.2" fill="${col(c)}" ${OL}/>`);
    if (sl === "tee") line(`M${d * 10.5},-48 L${d * 14.5},-38.5`, c, 6.2);
    if (sl === "long") line(`M${d * 8.6},-47.4 L${d * 11.4},-32`, c, 4.2);
    g.push(`<circle cx="${d * 11.7}" cy="-30" r="1.75" fill="${sk}"/>`);
  }
  if (sl === "tee" && top === "tee") { g.push(shape(id, "M-11.5,-49 Q0,-51.5 11.5,-49 L12.5,-26 H-12.5Z", c, o.pt)); }

  // Front layers
  if (lay.includes("pallu")) { S("M-8.6,-49 L-3.4,-49.6 L9.4,-33.5 L9.4,-28.5Z", y, o.py); line("M-8.6,-49 L9.4,-28.5", b, 1.1); }
  if (lay.includes("dupatta")) line("M-7,-46 Q0,-37 7,-46", y, 2.6);
  if (lay.includes("drape")) { S("M-8.6,-49 L-3,-49.6 L11,-24 L6,-22Z", y, o.py); }
  if (lay.includes("vest")) S("M-8.6,-49 L-3,-49.5 L0,-39 L3,-49.5 L8.6,-49 L9.6,-25 H-9.6Z", y, o.py);
  if (lay.includes("blazer")) { S("M-9.6,-49.5 L-2.6,-49.5 L0,-36 L2.6,-49.5 L9.6,-49.5 L10.6,-23 H1.2 L0,-36 L-1.2,-23 H-10.6Z", y, o.py); for (const d of [-1, 1]) line(`M${d * 9.2},-48 L${d * 11.6},-32.5`, y, 4.6); }
  if (lay.includes("jacket")) { S("M-10,-49.5 L-2.4,-49.5 L-1.2,-27 H-11Z", y, o.py); S("M10,-49.5 L2.4,-49.5 L1.2,-27 H11Z", y, o.py); for (const d of [-1, 1]) line(`M${d * 9.4},-48 L${d * 11.8},-32.5`, y, 4.8); }
  if (lay.includes("shawl")) S("M-10.5,-49 Q0,-43 10.5,-49 L11.5,-39 Q0,-33 -11.5,-39Z", y, o.py);
  if (lay.includes("cape")) S("M-8.5,-49 L-17,-10 H-9 L-6,-44 Q0,-42 6,-44 L9,-10 H17 L8.5,-49Z", y, o.py, `fill-opacity=".8"`);
  if (lay.includes("belt")) line("M-8.4,-38 H8.4", b, 1.6);

  // Neck and head
  g.push(`<rect x="-2" y="-52.5" width="4" height="4" fill="${sk}"/>`);
  g.push(`<circle cx="0" cy="-61" r="9.6" fill="${sk}" ${OL}/>`);
  if (lay.includes("veil")) S("M-10.5,-60 Q-11,-75 0,-75 Q11,-75 10.5,-60 Q6,-68 0,-68 Q-6,-68 -10.5,-60Z", y, o.py, `fill-opacity=".55"`);
  // Front hair
  if (h === "short" || h === "buzz") S("M-10,-61.5 C-10.5,-74 10.5,-74 10,-61.5 C7,-66 -7,-66 -10,-61.5Z", hc);
  else if (h !== "none") S("M-10.2,-60 C-10.8,-74.5 10.8,-74.5 10.2,-60 C7,-67 -2,-68 -10.2,-60Z", hc);
  // Face
  g.push(`<circle class="pupil" cx="-3.3" cy="-60" r="0.95" fill="${P.ink}"/><circle class="pupil" cx="3.3" cy="-60" r="0.95" fill="${P.ink}"/>`);
  g.push(`<circle cx="-5.7" cy="-56.8" r="1.6" fill="${P.pink}" opacity=".6"/><circle cx="5.7" cy="-56.8" r="1.6" fill="${P.pink}" opacity=".6"/>`);
  g.push(`<path d="M-1.7,-56.3 Q0,-54.8 1.7,-56.3" fill="none" stroke="${P.ink}" stroke-width="0.7" stroke-linecap="round"/>`);
  if (o.beard) S("M-8,-58 Q0,-48 8,-58 Q0,-53 -8,-58Z", hc);
  if (o.stache) line("M-2.6,-57.4 Q0,-58.6 2.6,-57.4", hc, 1.1);

  // Accessories
  for (const a of acc) {
    if (a === "jhumka") for (const d of [-1, 1]) { dot(d * 9.8, -57, 1.1, ac, OL); g.push(`<path d="M${d * 9.8 - 1.6},-53.5 Q${d * 9.8},-57 ${d * 9.8 + 1.6},-53.5Z" fill="${ac}" ${OL}/>`); }
    if (a === "bigjhumka") for (const d of [-1, 1]) { dot(d * 10.2, -57, 1.3, ac, OL); g.push(`<path d="M${d * 10.2 - 3.6},-48.5 Q${d * 10.2},-57 ${d * 10.2 + 3.6},-48.5Z" fill="${ac}" ${OL}/>`); for (const k of [-2.4, 0, 2.4]) dot(d * 10.2 + k, -47.2, 0.8, "white", OL); }
    if (a === "hoops") for (const d of [-1, 1]) g.push(`<circle cx="${d * 10}" cy="-54" r="2.6" fill="none" stroke="${ac}" stroke-width="0.9"/>`);
    if (a === "studs") for (const d of [-1, 1]) dot(d * 9.8, -57.5, 1, "white", OL);
    if (a === "bindi") dot(0, -64.8, 0.95, "red");
    if (a === "bigbindi") dot(0, -64.6, 1.6, "red");
    if (a === "nath") g.push(`<circle cx="2.4" cy="-56.8" r="2" fill="none" stroke="${ac}" stroke-width="0.7"/>`);
    if (a === "bignath") { g.push(`<circle cx="3" cy="-55.6" r="3.8" fill="none" stroke="${ac}" stroke-width="0.9"/>`); line("M6.6,-56 Q9,-61 9.6,-64", ac, 0.5); dot(3, -51.9, 0.8, "red"); }
    if (a === "tikka") { line("M0,-71 L0,-66.5", ac, 0.6); dot(0, -66, 1.4, ac, OL); }
    if (a === "matha") { line("M-9.4,-63.5 Q0,-71 9.4,-63.5", ac, 0.9); line("M0,-71 L0,-66.5", ac, 0.6); dot(0, -66, 1.4, ac, OL); }
    if (a === "gajra") { const cy = h === "lowbun" ? -52.5 : -71.5; for (let i = 0; i < 9; i++) { const t = (i / 9) * 2 * Math.PI; dot((Math.cos(t) * 5.6).toFixed(2), (cy + Math.sin(t) * 5.6).toFixed(2), 1.05, "white", `stroke="${P.ink}" stroke-width=".25"`); } }
    if (a === "glasses") { g.push(`<circle cx="-3.6" cy="-60" r="2.7" fill="${P.ink}" fill-opacity=".88"/><circle cx="3.6" cy="-60" r="2.7" fill="${P.ink}" fill-opacity=".88"/>`); line("M-1,-60.5 L1,-60.5", "ink", 0.6); }
    if (a === "cateye") { g.push(`<path d="M-7.4,-62.6 L-0.8,-61.6 L-1.4,-58.6 L-5.6,-58.2Z M7.4,-62.6 L0.8,-61.6 L1.4,-58.6 L5.6,-58.2Z" fill="${col(o.ac || "ink")}" ${OL}/>`); }
    if (a === "specs") { g.push(`<circle cx="-3.6" cy="-60" r="2.5" fill="none" stroke="${P.ink}" stroke-width=".7"/><circle cx="3.6" cy="-60" r="2.5" fill="none" stroke="${P.ink}" stroke-width=".7"/>`); }
    if (a === "cap") { S("M-10.4,-64.5 Q0,-78 10.4,-64.5Z", o.ac || "red"); S("M-1,-65.5 L-17,-64.4 L-10,-62.6Z", o.ac || "red"); }
    if (a === "beanie") { S("M-10.6,-63 Q0,-80 10.6,-63Z", o.ac || "red"); dot(0, -72, 1.8, o.ac || "red", OL); }
    if (a === "hat") { g.push(`<ellipse cx="0" cy="-67" rx="17" ry="3.2" fill="${col(o.ac || "beige")}" ${OL}/>`); S("M-8,-67.5 Q-8,-77 0,-77 Q8,-77 8,-67.5Z", o.ac || "beige"); line("M-8,-69.4 H8", "ink", 1.2); }
    if (a === "beret") g.push(`<ellipse cx="-1.5" cy="-69.5" rx="10.5" ry="3.8" fill="${col(o.ac || "red")}" ${OL}/>`);
    if (a === "safa") { S("M8,-67 L17,-40 L12,-41Z", o.ac || "orange", o.pa); S("M-10.8,-63 Q-12,-79 0,-78 Q12,-79 10.8,-63 Q0,-67 -10.8,-63Z", o.ac || "orange", o.pa); line("M-10,-68 Q0,-74 10,-68", "ink", 0.4, `opacity=".4"`); dot(0, -72.5, 1.2, "white", OL); }
    if (a === "headphones") { line("M-10.4,-62 Q-11,-76 0,-76 Q11,-76 10.4,-62", "ink", 1.4); g.push(`<rect x="-12.6" y="-63.5" width="3.6" height="6" rx="1.4" fill="${col(o.ac || "red")}" ${OL}/><rect x="9" y="-63.5" width="3.6" height="6" rx="1.4" fill="${col(o.ac || "red")}" ${OL}/>`); }
    if (a === "necklace") { line("M-5,-49 Q0,-43.5 5,-49", ac, 0.9); dot(0, -44.4, 1.3, ac, OL); }
    if (a === "choker") { line("M-4.6,-50.4 Q0,-47.2 4.6,-50.4", ac, 2.4); for (const k of [-3, 0, 3]) dot(k, k === 0 ? -48.4 : -49, 0.75, k === 0 ? "red" : "green"); }
    if (a === "layered") { line("M-5.5,-49 Q0,-44 5.5,-49", ac, 0.8); line("M-6.5,-48.5 Q0,-40 6.5,-48.5", ac, 0.8); line("M-7.4,-48 Q0,-36 7.4,-48", ac, 0.8); dot(0, -36.2, 1.4, "red", OL); }
    if (a === "pearls") { for (let i = -4; i <= 4; i++) dot(i * 1.25, -46.6 + Math.abs(i) * -0.45, 0.75, "white", `stroke="${P.ink}" stroke-width=".25"`); }
    if (a === "beads") { line("M-5.5,-49 Q0,-43 5.5,-49", "red", 1.4, `stroke-dasharray=".1 1.6"`); line("M-6.5,-48.5 Q0,-39.5 6.5,-48.5", "yellow", 1.4, `stroke-dasharray=".1 1.6"`); line("M-7.5,-48 Q0,-36 7.5,-48", "teal", 1.4, `stroke-dasharray=".1 1.6"`); }
    if (a === "chain") line("M-5,-49 Q0,-40 5,-49", "gold", 0.9, `stroke-dasharray="1 .6"`);
    if (a === "bangles") for (const d of [-1, 1]) for (const k of [0, 1.2, 2.4]) line(`M${d * 10.2},${-33.4 + k} L${d * 13},${-34 + k}`, k === 1.2 ? "red" : ac, 0.9);
    if (a === "bow") { g.push(`<path d="M0,-70 L-5,-73.5 L-5,-66.5Z M0,-70 L5,-73.5 L5,-66.5Z" fill="${col(o.ac || "pink")}" ${OL}/>`); dot(0, -70, 1.2, o.ac || "pink", OL); }
    if (a === "butterfly") { for (const [bx, by] of [[-7, -68], [6, -70]]) g.push(`<path d="M${bx},${by} q-3,-3 -3,0 q0,3 3,0 q3,-3 3,0 q0,3 -3,0Z" fill="${col(o.ac || "lav")}" ${OL}/>`); }
    if (a === "scrunchie") g.push(`<ellipse cx="9" cy="-63" rx="2.4" ry="1.7" fill="${col(o.ac || "pink")}" ${OL} transform="rotate(30 9 -63)"/>`);
    if (a === "claw") g.push(`<rect x="-3" y="-75" width="6" height="3" rx="1" fill="${col(o.ac || "yellow")}" ${OL}/>`);
    if (a === "flowers") { for (const [fx, fy, fc] of [[-3, -47, "pink"], [0, -45.5, "yellow"], [3, -47, "pink"], [-12, -33, "yellow"], [12, -33, "yellow"]]) dot(fx, fy, 1.3, fc, OL); }
    if (a === "flowerhair") for (const [fx, fy, fc] of [[-8, -68, "pink"], [-5.5, -71, "yellow"], [-2.5, -72.5, "pink"]]) dot(fx, fy, 1.5, fc, OL);
    if (a === "kohl") line("M-5,-59 L-1.6,-59 M1.6,-59 L5,-59", "ink", 1.2);
    if (a === "lipstick") g.push(`<path d="M-1.8,-56.4 Q0,-54.4 1.8,-56.4Z" fill="${P.red}"/>`);
    if (a === "watch") line("M10.4,-32.5 L13,-33", "gold", 1.4);
    if (a === "bag") { line("M-8,-48 L10,-28", "kaapi", 0.8); S("M8,-30 H16 L17,-22 H7Z", o.ac2 || "kaapi"); }
    if (a === "scarf") { S("M-6,-50.5 Q0,-46 6,-50.5 L5,-47 Q0,-44 -5,-47Z", o.ac2 || "red"); S("M3,-47 L6,-36 L3,-36 L1.5,-46Z", o.ac2 || "red"); }
    if (a === "tie") S("M-1.2,-48 H1.2 L1.8,-36 L0,-34 L-1.8,-36Z", o.ac2 || "red");
    if (a === "pocketsq") S("M4,-45 L7,-45 L6,-43 L4.5,-43Z", "white");
  }

  // Held items, in the right hand at (11.7,-30)
  const hold = o.hold;
  if (hold === "potli") { line("M11.7,-30 L12.5,-27", "ink", 0.5); S("M9.5,-27 Q12.5,-28 15.5,-27 Q17,-20 12.5,-19.5 Q8,-20 9.5,-27Z", o.hc2 || "rani", null); line("M10,-26.5 Q12.5,-25 15,-26.5", "gold", 0.8); }
  if (hold === "clutch") S("M10,-31.5 H18 V-27 H10Z", o.hc2 || "gold");
  if (hold === "phone") S("M10.6,-36 H14 V-29.5 H10.6Z", "ink");
  if (hold === "coffee") { S("M10,-34 H15 L14.4,-27.5 H10.6Z", "white"); S("M10,-34 H15 V-32.4 H10Z", o.hc2 || "kaapi"); }
  if (hold === "tote") { line("M8,-48 L11,-30", "beige", 0.9); S("M8,-31 H18 L17,-17 H9Z", o.hc2 || "beige"); }
  if (hold === "shopbags") { for (const [bx, bc] of [[9, "red"], [14, "yellow"]]) { S(`M${bx},-31 H${bx + 6} V-21 H${bx}Z`, bc); line(`M${bx + 1.5},-31 Q${bx + 3},-35 ${bx + 4.5},-31`, "ink", 0.5); } }
  if (hold === "dandiya") { line("M8,-26 L16,-38", "orange", 1.4); line("M10,-38 L16,-26", "rani", 1.4); }
  if (hold === "bottle") S("M10.4,-37 H13.6 V-27 H10.4Z", o.hc2 || "teal");
  if (hold === "flowers") { line("M11.7,-30 L13,-37", "green", 0.8); dot(13, -38, 2, "pink", OL); dot(11, -36.4, 1.6, "yellow", OL); dot(15, -36, 1.6, "red", OL); }
  if (hold === "book") S("M9.6,-35 H16 V-28 H9.6Z", o.hc2 || "maroon");
  if (hold === "mic") { line("M11.7,-30 L13,-37", "ink", 1.2); dot(13.3, -38.3, 1.9, "grey", OL); }
  if (hold === "racket") { line("M11.7,-30 L15,-38", "kaapi", 0.9); g.push(`<ellipse cx="17" cy="-42.5" rx="3.4" ry="4.4" fill="none" stroke="${P.ink}" stroke-width=".8" transform="rotate(25 17 -42.5)"/>`); }
  if (hold === "glowstick") line("M10,-33 L16,-42", "lime", 1.6);
  if (hold === "lightsaber") line("M11.7,-30 L18,-47", "hot", 1.6);
  if (hold === "umbrella") { line("M11.7,-30 L11.7,-48", "ink", 0.6); S("M2,-48 Q11.7,-58 21.4,-48Z", o.hc2 || "blue"); }

  return `<g class="fg"><g transform="translate(${x} 94) scale(${s * flip} ${s})">${g.join("")}</g></g>`;
}

// Backdrop pieces, absolute coordinates on the 100×100 stage.
const SET = {
  window: (c = "sky") => `<rect x="60" y="14" width="28" height="34" rx="2" fill="${col(c)}" ${OL}/><path d="M74,14 V48 M60,31 H88" stroke="${P.ink}" stroke-width=".6"/>`,
  window2: (c = "sky") => `<rect x="12" y="14" width="26" height="32" rx="2" fill="${col(c)}" ${OL}/><path d="M25,14 V46 M12,30 H38" stroke="${P.ink}" stroke-width=".6"/>`,
  arch: (c = "cream") => `<path d="M28,86 V40 Q28,20 50,10 Q72,20 72,40 V86Z" fill="${col(c)}" ${OL}/>`,
  arches: (c = "cream") => [10, 38, 66].map((x) => `<path d="M${x},70 V40 Q${x},26 ${x + 12},20 Q${x + 24},26 ${x + 24},40 V70Z" fill="${col(c)}" ${OL}/>`).join(""),
  sun: (c = "yellow", x = 80, y = 20) => `<circle cx="${x}" cy="${y}" r="9" fill="${col(c)}" ${OL}/>`,
  moon: (x = 80, y = 18) => `<path d="M${x},${y - 8} a8,8 0 1 0 6,13 a6.5,6.5 0 1 1 -6,-13Z" fill="${P.paper}" ${OL}/>`,
  stars: (c = "paper") => [[14, 14], [30, 26], [72, 12], [86, 34], [20, 42], [62, 30]].map(([x, y]) => `<path d="M${x},${y - 2.4} L${x + 0.7},${y - 0.7} L${x + 2.4},${y} L${x + 0.7},${y + 0.7} L${x},${y + 2.4} L${x - 0.7},${y + 0.7} L${x - 2.4},${y} L${x - 0.7},${y - 0.7}Z" fill="${col(c)}"/>`).join(""),
  waves: (c = "blue") => `<rect x="0" y="62" width="100" height="22" fill="${col(c)}"/><path d="M0,68 q6,-3 12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 M0,76 q6,-3 12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0" fill="none" stroke="${P.paper}" stroke-width=".8" opacity=".7"/>`,
  palm: (x = 84) => `<path d="M${x},84 Q${x + 2},60 ${x - 2},44" fill="none" stroke="${P.kaapi}" stroke-width="2.4"/><path d="M${x - 2},44 q-12,-2 -16,6 M${x - 2},44 q-8,-10 -18,-6 M${x - 2},44 q8,-10 16,-4 M${x - 2},44 q12,0 14,8" fill="none" stroke="${P.green}" stroke-width="2.6" stroke-linecap="round"/>`,
  hills: (c = "sage") => `<path d="M0,84 L0,62 Q18,46 34,60 Q52,40 72,58 Q86,48 100,56 V84Z" fill="${col(c)}" ${OL}/>`,
  skyline: (c = "indigo") => `<path d="M0,84 V58 H10 V48 H20 V62 H28 V40 H38 V56 H46 V50 H58 V64 H64 V44 H76 V58 H84 V50 H100 V84Z" fill="${col(c)}" opacity=".85"/>` + [[31, 46], [33, 52], [67, 50], [70, 56], [14, 54]].map(([x, y]) => `<rect x="${x}" y="${y}" width="2" height="2.4" fill="${P.yellow}"/>`).join(""),
  bunting: () => { let s = `<path d="M0,10 Q50,22 100,10" fill="none" stroke="${P.ink}" stroke-width=".5"/>`; const cs = ["red", "yellow", "green", "rani", "blue", "orange", "pink"]; for (let i = 0; i < 9; i++) { const x = 6 + i * 11, y = 10 + Math.sin((x / 100) * Math.PI) * 6; s += `<path d="M${x - 4},${y} L${x + 4},${y} L${x},${y + 7}Z" fill="${col(cs[i % cs.length])}" ${OL}/>`; } return s; },
  marigold: () => { let s = ""; for (let i = 0; i < 7; i++) { const x = 8 + i * 14; for (let j = 0; j < 6; j++) s += `<circle cx="${x}" cy="${4 + j * 4.2}" r="2.1" fill="${j % 3 === 2 ? P.red : P.orange}"/>`; } return s; },
  spotlight: (c = "yellow") => `<path d="M38,0 H62 L84,86 H16Z" fill="${col(c)}" opacity=".22"/>`,
  curtain: (c = "maroon") => `<path d="M0,0 H22 Q14,40 18,86 H0Z M100,0 H78 Q86,40 82,86 H100Z" fill="${col(c)}" ${OL}/><path d="M6,0 Q4,40 6,86 M12,0 Q10,40 12,86 M94,0 Q96,40 94,86 M88,0 Q90,40 88,86" stroke="${P.ink}" stroke-width=".4" opacity=".35" fill="none"/>`,
  plants: () => `<path d="M10,84 V70 H22 V84Z" fill="${P.rust}" ${OL}/><path d="M16,70 q-10,-14 -4,-24 q4,8 4,24 q0,-16 8,-22 q2,12 -8,22" fill="${P.green}" ${OL}/><path d="M80,84 V72 H92 V84Z" fill="${P.rust}" ${OL}/><path d="M86,72 q-8,-10 -2,-18 q4,6 2,18 q2,-12 8,-14 q0,10 -8,14" fill="${P.sage}" ${OL}/>`,
  mirror: (c = "sky") => `<ellipse cx="80" cy="44" rx="11" ry="20" fill="${P.gold}" ${OL}/><ellipse cx="80" cy="44" rx="8.4" ry="17" fill="${col(c)}" ${OL}/><path d="M75,36 L80,30 M74,44 L82,34" stroke="#fff" stroke-width="1" opacity=".7"/>`,
  floodlights: () => `<path d="M10,84 V24 M90,84 V24" stroke="${P.grey}" stroke-width="1.6"/><rect x="4" y="16" width="12" height="8" fill="${P.paper}" ${OL}/><rect x="84" y="16" width="12" height="8" fill="${P.paper}" ${OL}/><path d="M16,24 L40,60 L28,64Z M84,24 L60,60 L72,64Z" fill="${P.yellow}" opacity=".25"/>`,
  palace: (c = "peach") => `<path d="M0,84 V44 H14 V34 Q20,24 26,34 V44 H40 V36 Q50,20 60,36 V44 H74 V34 Q80,24 86,34 V44 H100 V84Z" fill="${col(c)}" ${OL}/>` + [20, 50, 80].map((x) => `<path d="M${x - 5},84 V64 Q${x},56 ${x + 5},64 V84Z" fill="${P.ink}" opacity=".25"/>`).join(""),
  line: () => { let s = `<path d="M0,14 Q50,22 100,14" fill="none" stroke="${P.ink}" stroke-width=".6"/>`; [["indigo", 10], ["red", 30], ["yellow", 52], ["green", 74]].forEach(([c, x]) => { s += `<path d="M${x},${15 + Math.sin((x / 100) * Math.PI) * 4} h12 v20 l-6,-3 l-6,3Z" fill="${col(c)}" ${OL}/>`; }); return s; },
  clouds: () => [[18, 18, "hot"], [50, 12, "yellow"], [80, 22, "green"], [34, 30, "blue"], [70, 36, "rani"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="7" fill="${col(c)}" opacity=".55"/>`).join(""),
  rail: () => `<path d="M8,16 H92" stroke="${P.ink}" stroke-width="1.2"/>`,
  runway: () => `<path d="M38,84 L44,58 H56 L62,84Z" fill="${P.paper}" opacity=".35"/>`,
  disco: () => `<path d="M50,0 V8" stroke="${P.ink}" stroke-width=".6"/><circle cx="50" cy="14" r="7" fill="${P.grey}" ${OL}/><path d="M43,14 H57 M50,7 V21 M45,9 L55,19 M55,9 L45,19" stroke="#fff" stroke-width=".5" opacity=".7"/>` + [[20, 30], [80, 28], [30, 50], [72, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="${P.paper}"/>`).join(""),
  diyas: () => [14, 30, 70, 86].map((x) => `<path d="M${x - 5},84 Q${x},90 ${x + 5},84Z" fill="${P.rust}" ${OL}/><path d="M${x},83.5 c-1.6,-2 -.6,-4 0,-5.5 c.6,1.5 1.6,3.5 0,5.5Z" fill="${P.yellow}" ${OL}/>`).join(""),
  books: () => `<rect x="6" y="20" width="26" height="60" fill="${P.kaapi}" ${OL}/>` + [[8, "maroon"], [12, "green"], [16, "indigo"], [20, "yellow"], [24, "red"], [28, "teal"]].map(([x, c]) => `<rect x="${x}" y="24" width="3.4" height="16" fill="${col(c)}" ${OL}/><rect x="${x}" y="48" width="3.4" height="16" fill="${col(c)}" ${OL}/>`).join(""),
  net: () => `<path d="M0,64 H100" stroke="${P.paper}" stroke-width="1"/><path d="M0,58 H100 V64 H0Z" fill="none" stroke="${P.paper}" stroke-width=".4" stroke-dasharray="1 1"/>`,
  confetti: () => [[12, 20, "red"], [26, 10, "yellow"], [40, 22, "blue"], [62, 12, "rani"], [78, 24, "green"], [88, 10, "orange"], [20, 38, "pink"], [84, 40, "yellow"]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="2.6" height="1.4" fill="${col(c)}" transform="rotate(${x} ${x} ${y})"/>`).join(""),
  sparkles: (c = "yellow") => [[16, 20, 3], [84, 18, 2.4], [80, 46, 2], [20, 50, 2]].map(([x, y, r]) => `<path d="M${x},${y - r * 2} L${x + r * .5},${y - r * .5} L${x + r * 2},${y} L${x + r * .5},${y + r * .5} L${x},${y + r * 2} L${x - r * .5},${y + r * .5} L${x - r * 2},${y} L${x - r * .5},${y - r * .5}Z" fill="${col(c)}"/>`).join(""),
  hearts: (c = "pink") => [[16, 22], [84, 30], [78, 14], [22, 46]].map(([x, y]) => `<path d="M${x},${y + 2} c-4,-3 -3,-6.5 0,-4.5 c3,-2 4,1.5 0,4.5Z" fill="${col(c)}" ${OL}/>`).join(""),
  signs: () => `<rect x="6" y="18" width="24" height="10" rx="1" fill="${P.red}" ${OL}/><text x="18" y="25.4" font-family="Caudex,serif" font-size="5.6" font-weight="700" text-anchor="middle" fill="${P.paper}">SALE</text>`,
  tags: () => `<path d="M74,22 h14 l4,5 l-4,5 h-14Z" fill="${P.paper}" ${OL}/><text x="82" y="29" font-family="Caudex,serif" font-size="5.4" font-weight="700" text-anchor="middle" fill="${P.ink}">₹199</text>`,
  rings: () => [[82, 22, "yellow"], [74, 30, "blue"], [88, 34, "red"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="${col(c)}" stroke-width="1.6"/>`).join(""),
};

// Objects, absolute.
const OBJ = {
  sandal: (x = 50, y = 60) => [[-13, -8], [13, 8]].map(([dx, rot]) => `<g transform="translate(${x + dx} ${y}) rotate(${rot})">
    <path d="M0,-26 C10,-26 11,-12 10,0 C9,14 8,24 0,26 C-8,24 -9,14 -10,0 C-11,-12 -10,-26 0,-26Z" fill="${P.kaapi}" ${OL}/>
    <path d="M0,-22 C7,-22 8,-11 7,0 C6,12 5,20 0,22 C-5,20 -6,12 -7,0 C-8,-11 -7,-22 0,-22Z" fill="${P.rust}" opacity=".55"/>
    <path d="M-10,-4 Q0,-12 10,-4 L9,2 Q0,-5 -9,2Z" fill="${P.gold}" ${OL}/>
    <path d="M-8,-1 l3,-3 l3,3 l3,-3 l3,3 l3,-3" fill="none" stroke="${P.ink}" stroke-width=".5"/>
    <path d="M0,-4 L0,-17" stroke="${P.kaapi}" stroke-width="2.4"/><circle cx="0" cy="-18" r="2.6" fill="none" stroke="${P.gold}" stroke-width="1.6"/>
    <circle cx="0" cy="14" r=".8" fill="${P.ink}" opacity=".5"/><circle cx="-3" cy="10" r=".8" fill="${P.ink}" opacity=".5"/><circle cx="3" cy="10" r=".8" fill="${P.ink}" opacity=".5"/></g>`).join(""),
  charmbag: (x = 76) => `<path d="M${x - 10},62 q10,-16 20,0" fill="none" stroke="${P.ink}" stroke-width="1.2"/><path d="M${x - 14},62 h28 l-3,22 h-22Z" fill="${P.rani}" ${OL}/>
    <path d="M${x - 8},62 v8 M${x - 2},62 v12 M${x + 5},62 v7" stroke="${P.ink}" stroke-width=".6"/>
    <circle cx="${x - 8}" cy="72" r="3" fill="${P.yellow}" ${OL}/><path d="M${x - 5},74 l3,5 l-6,0Z" fill="${P.mint}" ${OL}/>
    <path d="M${x - 2},78 c-3,-3 -2,-6 0,-4 c2,-2 3,1 0,4Z" fill="${P.red}" ${OL}/><rect x="${x + 2}" y="69" width="6" height="7" rx="2.5" fill="${P.lav}" ${OL}/><circle cx="${x + 4}" cy="71.5" r=".6" fill="${P.ink}"/><circle cx="${x + 6}" cy="71.5" r=".6" fill="${P.ink}"/>`,
  rack: (x = 82) => `<path d="M${x - 14},20 H${x + 14} M${x - 12},20 V84 M${x + 12},20 V84" stroke="${P.ink}" stroke-width="1"/>` + [[-8, "red"], [-1, "yellow"], [6, "teal"]].map(([d, c]) => `<path d="M${x + d},20 l-1,3 h2Z" fill="${P.ink}"/><path d="M${x + d - 4},24 h8 l1,18 h-10Z" fill="${col(c)}" ${OL}/>`).join(""),
  trunk: (x = 16) => `<rect x="${x - 12}" y="70" width="24" height="14" fill="${P.kaapi}" ${OL}/><path d="M${x - 12},70 q12,-8 24,0Z" fill="${P.rust}" ${OL}/><rect x="${x - 2}" y="72" width="4" height="4" fill="${P.gold}" ${OL}/><path d="M${x + 6},70 q4,8 -2,14 h4 q4,-8 -2,-14Z" fill="${P.red}" ${OL}/>`,
  suitcase: (x = 78) => `<rect x="${x - 7}" y="62" width="14" height="20" rx="2" fill="${P.rust}" ${OL}/><path d="M${x - 3},62 v-5 h6 v5" fill="none" stroke="${P.ink}" stroke-width=".8"/><circle cx="${x - 4}" cy="84" r="1.4" fill="${P.ink}"/><circle cx="${x + 4}" cy="84" r="1.4" fill="${P.ink}"/><circle cx="${x}" cy="70" r="2.4" fill="${P.yellow}" ${OL}/>`,
  sneaker: (x = 50, y = 70, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22,6 V-5 Q-22,-12 -15,-12 H-8 Q-5,-6 0,-4 L12,-2 Q22,0 22,6Z" fill="${P.white}" ${OL}/><path d="M8,-2.6 Q16,-2 20,2 L22,6 H10Z" fill="${P.sky}" ${OL}/><path d="M-21,-10 Q-15,-14 -9,-11" fill="none" stroke="${P.ink}" stroke-width=".7"/><path d="M-23,6 H23 V9 Q23,12 20,12 H-20 Q-23,12 -23,9Z" fill="${P.red}" ${OL}/><path d="M-7,-8 l4,2 M-5,-10 l4,2 M-3,-6 l4,2" stroke="${P.ink}" stroke-width=".8" stroke-linecap="round"/><path d="M-16,0 Q-4,-6 8,2" stroke="${P.blue}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`,
  hanger: (x = 50, c = "red") => `<path d="M${x - 2},16 a2,2 0 1 1 2,2 v2 l-12,8 h24 l-12,-8" fill="none" stroke="${P.ink}" stroke-width=".8"/>`,
  boombox: (x = 80) => `<rect x="${x - 12}" y="70" width="24" height="14" rx="2" fill="${P.grey}" ${OL}/><circle cx="${x - 6}" cy="77" r="4" fill="${P.ink}"/><circle cx="${x + 6}" cy="77" r="4" fill="${P.ink}"/><path d="M${x - 8},70 v-4 h16 v4" fill="none" stroke="${P.ink}" stroke-width=".8"/>`,
  mat: () => `<path d="M60,84 h30 v-3 h-30Z" fill="${P.lav}" ${OL}/><ellipse cx="88" cy="80" rx="2" ry="3" fill="${P.lav}" ${OL}/>`,
  loop: () => `<path d="M80,22 a9,9 0 1 1 -9,9" fill="none" stroke="${P.green}" stroke-width="2"/><path d="M68,28 l3,4 l3,-4Z" fill="${P.green}"/>`,
  cocoon: () => `<ellipse cx="82" cy="78" rx="6" ry="3.6" fill="${P.ivory}" ${OL}/><path d="M74,64 q8,-8 16,0 q-8,6 -16,0Z" fill="${P.green}" ${OL}/>`,
  camera: (x = 82, y = 26) => `<rect x="${x - 8}" y="${y - 5}" width="16" height="11" rx="2" fill="${P.ink}"/><circle cx="${x}" cy="${y + 0.5}" r="3.6" fill="${P.sky}" stroke="${P.paper}" stroke-width=".8"/><rect x="${x + 3}" y="${y - 7}" width="4" height="2" fill="${P.ink}"/>`,
  phone: (x = 82, y = 30) => `<rect x="${x - 7}" y="${y - 12}" width="14" height="24" rx="2.4" fill="${P.ink}"/><rect x="${x - 5.6}" y="${y - 9.6}" width="11.2" height="18" fill="${P.pink}"/><path d="M${x - 2},${y - 4} l5,3 l-5,3Z" fill="${P.paper}"/>`,
  hand: (x = 50, y = 50) => `<g transform="translate(${x} ${y})"><path d="M-10,34 V6 L-15,-6 q-1,-4 2,-5 t5,3 l2,6 V-18 q0,-3 3,-3 t3,3 v14 V-22 q0,-3 3,-3 t3,3 v18 V-18 q0,-3 3,-3 t3,3 v24 l4,-6 q2,-3 4,-1 t0,5 l-8,15 v12Z" fill="${P.skin}" ${OL}/><g stroke="${P.kaapi}" stroke-width=".8" fill="none"><circle cx="1" cy="10" r="4"/><circle cx="1" cy="10" r="1.6"/><path d="M-3,10 q4,-6 8,0 M1,14 v4 M-2,-20 h4 M4,-22 v3 M10,-18 h3"/><path d="M-8,26 q9,4 18,0" stroke-dasharray="1 1.4"/></g></g>`,
  eye: (x = 50, y = 50, sc = 1) => `<g transform="translate(${x} ${y}) scale(${sc})"><path d="M-30,0 Q0,-24 30,0 Q0,24 -30,0Z" fill="${P.white}" ${OL}/><circle r="10" fill="${P.kaapi}" ${OL}/><circle r="4.4" fill="${P.ink}"/><circle cx="3" cy="-3" r="1.6" fill="#fff"/><path d="M-32,1 Q0,-26 32,1" fill="none" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/><path d="M-28,4 Q0,24 28,4" fill="none" stroke="${P.ink}" stroke-width="5" stroke-opacity=".4" stroke-linecap="round"/><path d="M30,0 l8,-6" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/><path d="M-18,-12 l-3,-6 M-8,-16 l-1,-7 M4,-17 l1,-7 M16,-14 l3,-6" stroke="${P.ink}" stroke-width="1.2" stroke-linecap="round"/></g>`,
  vinyl: (x = 82, y = 26) => `<circle cx="${x}" cy="${y}" r="10" fill="${P.ink}"/><circle cx="${x}" cy="${y}" r="3.4" fill="${P.red}"/><circle cx="${x}" cy="${y}" r="6.6" fill="none" stroke="#fff" stroke-width=".3" opacity=".4"/>`,
  tv: (x = 82, y = 28) => `<rect x="${x - 12}" y="${y - 9}" width="24" height="18" rx="3" fill="${P.kaapi}" ${OL}/><rect x="${x - 9}" y="${y - 6}" width="15" height="12" rx="2" fill="${P.sky}" ${OL}/><path d="M${x - 5},${y - 9} l-4,-6 M${x + 3},${y - 9} l4,-6" stroke="${P.ink}" stroke-width=".7"/>`,
};

function scene(id, o) {
  const parts = [patterns(id), `<rect width="100" height="100" fill="${col(o.bg || "sky")}"/>`];
  for (const s of o.set || []) { const [name, ...args] = Array.isArray(s) ? s : [s]; parts.push(`<g class="set-${name}">${(SET[name] || OBJ[name])(...args)}</g>`); }
  parts.push(`<rect y="84" width="100" height="16" fill="${col(o.gr || "beige")}"/><path d="M0,84 H100" stroke="${P.ink}" stroke-width=".6"/>`);
  for (const s of o.back || []) { const [name, ...args] = Array.isArray(s) ? s : [s]; parts.push(OBJ[name](...args)); }
  for (const f of o.figs || []) parts.push(fig(id, f));
  const z = o.zoom || 1;
  if (z !== 1) parts.push(`<g transform="translate(50 84) scale(${z}) translate(-50 -84)">`);
  for (const s of o.obj || []) { const [name, ...args] = Array.isArray(s) ? s : [s]; parts.push(`<g class="ob">${OBJ[name](...args)}</g>`); }
  if (z !== 1) parts.push("</g>");
  return parts.join("");
}
