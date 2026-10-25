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
