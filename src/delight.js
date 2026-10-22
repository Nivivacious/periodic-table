// Discovery interactions shared by both editions.
let activeTrail = null;
const TRAILS = isG ? [
  {title:"Bangalore After Midnight",syms:["He","O","Nd","Ce","I"]},
  {title:"The Morning After",syms:["Cr","Fe","Ga","Pm","Mn"]}
] : [
  {title:"A Wedding, Five Ways",syms:["H","He","Kr","Ga","Fe"]},
  {title:"An Unexpected Pairing",syms:["S","Sn","Co","Fe","Br"]}
];
function enhanceExhibit(e) {
  const tools = exhibit.querySelector(".art-tools");
  tools.insertAdjacentHTML("beforeend", '<button type="button" class="moment-control" data-turn aria-pressed="false">Turn card</button><button type="button" class="moment-control" data-compare>Compare</button>');
  const card = exhibit.querySelector(".flipper > .card");
  const turn = document.createElement("div"); turn.className="card-turn";
  card.before(turn); turn.append(card);
  const back=document.createElement("div"); back.className="card-reverse"; back.inert=true; back.setAttribute("aria-hidden","true");
  back.innerHTML=`<p class="kicker">Issue ${ED.issue} · ${e.sym}</p><img src="${sceneImg(e,"0 0 100 100")}" alt="Illustration of ${e.trend}"><p>${e.trend}</p><small>An illustration study</small>`;
  turn.append(back);
  tools.querySelector("[data-turn]").onclick=ev=>{
    const on=!turn.classList.contains("turned"); turn.classList.toggle("turned",on);
    card.inert=on; card.setAttribute("aria-hidden",String(on)); back.inert=!on; back.setAttribute("aria-hidden",String(!on));
    back.querySelector("img").src=sceneImg(e,"0 0 100 100");
    ev.currentTarget.setAttribute("aria-pressed",String(on));ev.currentTarget.textContent=on?"Return to card":"Turn card";
  };
  tools.querySelector("[data-compare]").onclick=()=>openComparison(e);
  const step=activeTrail && activeTrail.syms.indexOf(e.sym);
  if(activeTrail && step>=0){
    const strip=document.createElement("section");strip.className="trail-progress";strip.setAttribute("aria-label","Guided story");
    strip.innerHTML=`<p class="kicker">${activeTrail.title} · ${step+1} of ${activeTrail.syms.length}</p><div class="trail-dots">${activeTrail.syms.map((sym,i)=>`<button type="button" data-step="${i}" aria-label="${i+1}. ${get(sym).trend}" ${i===step?'aria-current="step"':''}>${sym}</button>`).join("")}</div><div><button type="button" class="link" data-trail-next>${step===activeTrail.syms.length-1?"Finish story":"Next chapter →"}</button><button type="button" class="link" data-trail-exit>Leave story</button></div>`;
    exhibit.querySelector(".placard").prepend(strip);
    strip.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>goToRelated(get(activeTrail.syms[Number(b.dataset.step)])));
    strip.querySelector("[data-trail-exit]").onclick=()=>{activeTrail=null;strip.remove();};
    strip.querySelector("[data-trail-next]").onclick=()=>{if(step===activeTrail.syms.length-1){activeTrail=null;closeExhibit();toast("Story complete. Keep exploring.");}else goToRelated(get(activeTrail.syms[step+1]));};
  }
}
const trailBar=document.createElement("div");trailBar.className="story-trails";
trailBar.innerHTML=`<span class="kicker">Take a five-card detour</span>${TRAILS.map((t,i)=>`<button type="button" class="link" data-trail="${i}">${t.title} <span aria-hidden="true">↗</span></button>`).join("")}`;
$("h-table").closest(".page-head").after(trailBar);
trailBar.querySelectorAll("button").forEach(b=>b.onclick=()=>{activeTrail=TRAILS[Number(b.dataset.trail)];open(get(activeTrail.syms[0]));});

// Lines follow actual tile centres, including the horizontally scrolling mobile table.
const connectionLayer=document.createElementNS("http://www.w3.org/2000/svg","svg");
connectionLayer.classList.add("table-connections");connectionLayer.setAttribute("aria-hidden","true");grid.append(connectionLayer);
let connectionTimer;
function showConnections(e){
  clearTimeout(connectionTimer);grid.querySelectorAll(".connected-tile").forEach(t=>t.classList.remove("connected-tile"));
  const origin=tiles.get(e.n); if(!origin || origin.classList.contains("dim"))return;
  const bounds=grid.getBoundingClientRect(),a=origin.getBoundingClientRect();
  connectionLayer.setAttribute("viewBox",`0 0 ${bounds.width} ${bounds.height}`);
  const x=a.left-bounds.left+a.width/2,y=a.top-bounds.top+a.height/2;
  connectionLayer.innerHTML=relatedElements(e).filter(other=>!tiles.get(other.n).classList.contains("dim")).map(other=>{
    const tile=tiles.get(other.n),r=tile.getBoundingClientRect(),tx=r.left-bounds.left+r.width/2,ty=r.top-bounds.top+r.height/2;
    tile.classList.add("connected-tile");
    return `<path d="M${x},${y} Q${(x+tx)/2},${Math.max(0,Math.min(y,ty)-35)} ${tx},${ty}"/><circle cx="${tx}" cy="${ty}" r="4"/>`;
  }).join("");
  connectionLayer.style.color=famColor(e);
  connectionTimer=setTimeout(clearConnections,2400);
}
function clearConnections(){connectionLayer.innerHTML="";grid.querySelectorAll(".connected-tile").forEach(t=>t.classList.remove("connected-tile"));}
tiles.forEach((tile,n)=>{tile.addEventListener("pointerenter",()=>showConnections(els[n-1]));tile.addEventListener("focus",()=>showConnections(els[n-1]));tile.addEventListener("click",clearConnections);});
grid.addEventListener("pointerleave",clearConnections);grid.addEventListener("focusout",ev=>{if(!grid.contains(ev.relatedTarget))clearConnections();});
addEventListener("resize",clearConnections);

const comparison=document.createElement("dialog");comparison.className="comparison";comparison.setAttribute("aria-labelledby","compareTitle");document.body.append(comparison);
function openComparison(first){
  const partner=relatedElements(first)[0];
  comparison.innerHTML=`<button type="button" class="link compare-close">Close ×</button><p class="kicker">A closer look</p><h2 id="compareTitle">${isG?"Two finds, one city.":"Side by side."}</h2><div class="compare-controls"><label>Compare with <select id="compareWith">${els.filter(e=>e!==first).map(e=>`<option value="${e.sym}" ${e===partner?'selected':''}>${e.sym} · ${e.trend}</option>`).join("")}</select></label><label>${isG?"Season":"Colourway"}<select id="compareDye"><option value="">As drawn</option>${DYES.map(d=>`<option value="${d.k}">${d.name}</option>`).join("")}</select></label><button type="button" class="link" id="compareReplay">Replay together ↻</button></div><div class="compare-pair"></div><p class="compare-note">${isG?"The same season, two street stories.":"The same colour, two different silhouettes."}</p>`;
  const draw=()=>{
    const second=get($("compareWith").value),d=DYES.find(d=>d.k===$("compareDye").value);
    comparison.querySelector(".compare-pair").innerHTML=[first,second].map(e=>{
      const art=JSON.parse(JSON.stringify(e.art));
      if(d){if(isG){Object.assign(art,d.scene);art.set=[...(art.set||[]),...d.add];}else for(const f of art.figs||[]){f.c=d.hex;f.l=d.hex;f.y=d.hex;if(f.hc2)f.hc2=d.hex;}}
      return `<figure><svg viewBox="0 0 100 100" role="img" aria-label="${e.trend}">${scene("compare"+(uid++),art)}</svg><figcaption><span class="kicker">${e.sym} · ${FAMILIES[e.fam]}</span><h3>${e.trend}</h3></figcaption></figure>`;
    }).join("");
    replayComparison();
  };
  comparison.querySelector(".compare-close").onclick=()=>comparison.close();
  $("compareWith").onchange=draw;$("compareDye").onchange=draw;$("compareReplay").onclick=replayComparison;
  draw();comparison.showModal();
}
function replayComparison(){
  if(reduced)return;
  comparison.querySelectorAll(".depth-person, .depth-front").forEach(node=>node.animate([{transform:"translateY(8px) rotate(-2deg)",opacity:.5},{transform:"translateY(-3px) rotate(1deg)",opacity:1},{transform:"none",opacity:1}],{duration:850,easing:"cubic-bezier(.2,.8,.2,1)"}));
}
comparison.addEventListener("click",ev=>{if(ev.target===comparison){const r=comparison.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)comparison.close();}});
comparison.addEventListener("close",()=>{comparison.innerHTML="";exhibit.querySelector("[data-compare]")?.focus();});
