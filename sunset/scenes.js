// Cenário: sol listrado, chão em perspectiva e palmeiras (só nas cenas de tela cheia)
if (document.body.classList.contains("solid")) {
  const H = 750;                       // linha do horizonte
  let stripes = "", floor = "";
  for (let i = 0; i < 6; i++) stripes += `<rect x="600" y="${590 + i * 28}" width="720" height="${4 + i * 3.6}" fill="#000"/>`;
  const ROWS = 10;                     // linhas horizontais do chão (posição definida em draw(), que também as anima)
  for (let k = 0; k < ROWS; k++) floor += `<line class="fh" x1="0" x2="1920"/>`;
  for (let i = -14; i <= 14; i++) floor += `<line x1="960" y1="${H}" x2="${960 + i * 260}" y2="1080"/>`;
  const palm = (x, y, s, flip) => {
    // fronds arch up and droop at the tips, mirrored left/right; [rotation, length]
    const leaf = "M0 0 C50 -75 150 -70 215 45 C150 -38 60 -42 0 0Z";
    let f = "";
    [[-62, .8], [-34, 1], [-8, 1.05], [18, .95], [44, .8], [70, .6]].forEach(([r, l]) => {
      f += `<path transform="rotate(${r}) scale(${l})" d="${leaf}"/><path transform="scale(-1 1) rotate(${r}) scale(${l * .94})" d="${leaf}"/>`;
    });
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="#0a0220"><path d="M-8 560 Q-34 300 4 8 L16 8 Q-14 300 12 560Z"/><g transform="translate(10 6)">${f}<circle cx="-7" cy="12" r="9"/><circle cx="8" cy="16" r="9"/></g></g>`;
  };
  const wrap = document.createElement("div"); wrap.className = "scene-art";
  wrap.innerHTML = `<svg viewBox="0 0 1920 1080"><defs>
    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent2)"/><stop offset="1" style="stop-color:var(--accent)"/></linearGradient>
    <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.55"/><stop offset=".25" style="stop-color:var(--bg)"/><stop offset="1" style="stop-color:var(--bg)"/></linearGradient>
    <radialGradient id="gl"><stop offset=".55" style="stop-color:var(--accent);stop-opacity:.4"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/></radialGradient>
    <mask id="sm"><rect width="1920" height="1080" fill="#fff"/>${stripes}</mask>
    <clipPath id="fc"><rect x="0" y="${H}" width="1920" height="${1080 - H}"/></clipPath></defs>
    <g class="sun-glow"><circle cx="960" cy="${H + 10}" r="460" fill="url(#gl)"/>
    <circle cx="960" cy="${H + 10}" r="300" fill="url(#sg)" mask="url(#sm)" opacity=".92"/></g>
    <rect x="0" y="${H}" width="1920" height="${1080 - H}" fill="url(#fg)"/>
    <g clip-path="url(#fc)" style="stroke:var(--accent2)" stroke-opacity=".45" stroke-width="2">${floor}</g>
    <rect x="0" y="${H - 2}" width="1920" height="4" style="fill:var(--accent2);filter:drop-shadow(0 0 8px var(--accent))"/>
    ${palm(120, 520, 1.15, false)}${palm(1800, 560, 1.0, true)}${palm(300, 640, .7, true)}</svg>`;
  document.body.insertBefore(wrap, document.body.firstChild);
  // Chão em movimento, como se a câmera avançasse: as linhas horizontais descem em perspectiva e o ciclo se repete sem emenda.
  // Fica parado com effects "calm" ou "none" (config.js).
  const rows = [...wrap.querySelectorAll(".fh")], fxc = document.documentElement.classList;
  const draw = ph => rows.forEach((l, k) => {
    const u = (k + ph) / ROWS, y = H + (1080 - H + 40) * u * u;
    l.setAttribute("y1", y); l.setAttribute("y2", y);
    l.setAttribute("stroke-opacity", Math.min(1, u * 3) * .55); l.setAttribute("stroke-width", 1 + u * 2.5);
  });
  draw(0);
  if (!fxc.contains("fx-calm") && !fxc.contains("fx-none")) {
    const t0 = performance.now();
    (function f(n) { draw(((n - t0) / 1800) % 1); requestAnimationFrame(f); })(t0);
  }
}
// Luzes de fundo animadas nas cenas de tela cheia (movimento definido em style.css: .orb.o1/.o2/.o3)
if (document.body.classList.contains("solid")) {
  [[-100, 120, 760], [1150, 560, 820], [520, 640, 600]].forEach(([x, y, s], i) => {
    const o = document.createElement("div");
    o.className = "orb o" + (i + 1);
    o.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px`;
    document.body.appendChild(o);
  });
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
