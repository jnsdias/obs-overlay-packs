// Sangue escorrendo no topo (SVG): faixa irregular + fios que descem devagar e terminam em gota.
// Para limitar o comprimento dos fios numa cena, use <body data-blood-max="110">.
if (document.body.classList.contains("solid")) {
  const NS = "http://www.w3.org/2000/svg", W = 1920;
  const max = +document.body.dataset.bloodMax || 300;
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const el = (n, a, par) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (par) par.appendChild(e); return e; };
  const svg = el("svg", { viewBox: "0 0 " + W + " 400", width: W, height: 400 });
  svg.style.cssText = "position:absolute;left:0;top:0;z-index:1;filter:drop-shadow(0 4px 5px rgba(0,0,0,.7))";
  const defs = el("defs", {}, svg);
  // um único degradê em coordenadas da tela: faixa e fios têm exatamente a mesma cor em cada x
  const g = el("linearGradient", { id: "bl", gradientUnits: "userSpaceOnUse", x1: 0, x2: W, y1: 0, y2: 0 }, defs);
  [["0", "#4a070c"], ["0.3", "#8e121b"], ["0.55", "#a3161f"], ["0.8", "#7d0f17"], ["1", "#4a070c"]].forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, g));
  // faixa do topo, borda inferior ondulada
  let d = "M0 0H" + W + "V" + (26 + rnd() * 12), x = W;
  while (x > 0) { x -= 50 + rnd() * 70; const y = 20 + rnd() * 30; d += "Q" + (x + 40) + " " + (y + 12) + " " + Math.max(x, 0) + " " + y; }
  el("path", { d: d + "V0Z", fill: "url(#bl)" }, svg);
  // fios: a ponta (gota) desce de verdade, sem máscara
  const drips = [];
  let px = 30;
  while (px < W - 30) {
    const w = 5 + rnd() * 9, L = Math.min(max, 45 + Math.pow(rnd(), 1.6) * (max - 30)), r = w * 1.05 + 4;
    const grp = el("g", {}, svg);
    drips.push({ cx: px, w, L, r, dur: (9 + rnd() * 14) * 1000, delay: rnd() * 5000, body: el("path", { fill: "url(#bl)" }, grp),
      hl: el("path", { stroke: "rgba(255,255,255,.22)", fill: "none", "stroke-linecap": "round" }, grp),
      sp: el("ellipse", { fill: "rgba(255,255,255,.3)" }, grp) });
    px += 70 + rnd() * 190;
  }
  const y0 = 8;
  const draw = (k, len) => {
    const { cx, w, r } = k;
    k.body.setAttribute("d", "M" + (cx - w * 2.2) + "," + y0 + "C" + (cx - w * .5) + "," + (y0 + (len - y0) * .15) + " " + (cx - w * .4) + "," + (y0 + (len - y0) * .45) + " " + (cx - w * .38) + "," + (len - r * 1.3)
      + "C" + (cx - r * 1.1) + "," + (len - r * 1.2) + " " + (cx - r) + "," + len + " " + cx + "," + len
      + "C" + (cx + r) + "," + len + " " + (cx + r * 1.1) + "," + (len - r * 1.2) + " " + (cx + w * .38) + "," + (len - r * 1.3)
      + "C" + (cx + w * .4) + "," + (y0 + (len - y0) * .45) + " " + (cx + w * .5) + "," + (y0 + (len - y0) * .15) + " " + (cx + w * 2.2) + "," + y0 + "Z");
    k.hl.setAttribute("d", "M" + (cx - w * .2) + ",34L" + (cx - w * .18) + "," + Math.max(36, len - r * 2.2));
    const vis = len > 80 ? "" : "none"; k.hl.style.display = vis; k.sp.style.display = vis;
    k.hl.setAttribute("stroke-width", Math.max(1.5, w * .22));
    k.sp.setAttribute("cx", cx - r * .3); k.sp.setAttribute("cy", len - r * 1.2); k.sp.setAttribute("rx", r * .22); k.sp.setAttribute("ry", r * .38);
  };
  drips.forEach(k => { k.start = 42; draw(k, k.start); });
  const t0 = performance.now();
  (function frame(now) {
    let busy = false;
    drips.forEach(k => {
      const t = Math.min(1, Math.max(0, (now - t0 - k.delay) / k.dur));
      if (t < 1) busy = true;
      draw(k, k.start + (k.L - k.start) * (1 - Math.pow(1 - t, 3)));
    });
    if (busy) requestAnimationFrame(frame);
  })(t0);
  document.body.appendChild(svg);
}
// Contagem regressiva: ?min=5 (padrão 5). Elemento #count
const q = new URLSearchParams(location.search), cd = document.getElementById("count");
if (cd) {
  let s = Math.round(parseFloat(q.get("min") || "5") * 60);
  const tick = () => {
    const m = String(Math.floor(s / 60)).padStart(2, "0"), ss = String(s % 60).padStart(2, "0");
    cd.textContent = m + ":" + ss;
    if (s > 0) s--;
  };
  tick(); setInterval(tick, 1000);
}
if (q.get("slots") === "1") document.body.classList.add("show-slots");
// Luz animada nas bordas de cada painel
document.querySelectorAll(".panel").forEach(p => {
  ["edge", "edge rev"].forEach(c => { const e = document.createElement("i"); e.className = c; p.appendChild(e); });
});

// Formato da webcam (config.js -> webcam, ou ?cam=1:1): a moldura cabe na área reservada e fica centralizada
const camEl = document.getElementById("cam");
if (camEl && camEl.dataset.box) {
  const [bx, by, bw, bh] = camEl.dataset.box.split(",").map(Number);
  const [ra, rb] = String(q.get("cam") || window.OVERLAY.webcam || "4:3").split(":").map(Number);
  const ratio = ra > 0 && rb > 0 ? ra / rb : 4 / 3;
  const w = Math.round(Math.min(bw, bh * ratio)), h = Math.round(w / ratio);
  Object.assign(camEl.style, { left: Math.round(bx + (bw - w) / 2) + "px", top: Math.round(by + (bh - h) / 2) + "px", width: w + "px", height: h + "px" });
  const dim = camEl.querySelector(".dim"); if (dim) dim.textContent = w + "×" + h;
}
