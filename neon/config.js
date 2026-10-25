// ============ EDIT HERE / EDITE AQUI ============
window.OVERLAY = {
  lang: "en",                     // "en" (English) or "pt" (Português)
  preset: "cyan",                 // "cyan" | "magenta" | "lime" | "amber" | "violet"
  effects: "full",                // "full" (all animations) | "calm" (soft glow only) | "none" (static)
  webcam: "16:9",                 // webcam shape: "16:9" wide, "4:3", "1:1" square, "9:16" vertical
  brbOpacity: 0.8,                // BRB scene background: 1 = solid, lower = see-through (0.5 shows the game more)
  name: "YOUR CHANNEL",
  handle: "@yourchannel",
  schedule: { en: "Mon · Wed · Fri — 8 PM", pt: "Seg · Qua · Sex — 20h" },
  colors: {}                      // optional overrides on top of the preset, e.g. { accent: "#ff8800" }
};

// Color presets. Add your own: copy one block and rename it.
// Presets de cor. Para criar o seu, copie um bloco e troque o nome.
window.OVERLAY_PRESETS = {
  cyan:    { bg: "#030a10", panel: "rgba(3,12,20,.88)", accent: "#00e5ff", accent2: "#b8f7ff", text: "#effdff", muted: "#6fb3c0" },
  magenta: { bg: "#0d030b", panel: "rgba(20,4,16,.88)", accent: "#ff2bd6", accent2: "#ffb3f2", text: "#fff0fb", muted: "#c27ab4" },
  lime:    { bg: "#050c03", panel: "rgba(8,18,4,.88)",  accent: "#9dff00", accent2: "#e3ffa6", text: "#f7ffe8", muted: "#8fb36a" },
  amber:   { bg: "#0d0602", panel: "rgba(22,10,3,.88)", accent: "#ff9100", accent2: "#ffd699", text: "#fff6ea", muted: "#c29566" },
  violet:  { bg: "#07030f", panel: "rgba(12,5,26,.88)", accent: "#8b5cff", accent2: "#cdbaff", text: "#f4f0ff", muted: "#9a86cf" }
};

// Texts of every scene. Edit any phrase, or add a new language below.
// Textos de todas as cenas. Edite qualquer frase ou adicione outro idioma.
window.OVERLAY_TEXT = {
  en: {
    starting: "Starting Soon", startingSub: "Grab a drink, we begin in a moment",
    brb: "Be Right Back", brbSub: "Stay tuned, we're coming back",
    ending: "Stream Ended", endingSub: "Thanks for watching",
    justChatting: "Just Chatting",
    viewers: "Viewers", follower: "New follower", sub: "New sub",
    userName: "Username", alerts: "Alerts area (OBS)", webcam: "Webcam", chat: "Chat"
  },
  pt: {
    starting: "Começando", startingSub: "Pegue algo para beber, já começamos",
    brb: "Já volto", brbSub: "Fique por aqui, já voltamos",
    ending: "Fim da transmissão", endingSub: "Obrigado por assistir",
    justChatting: "Just Chatting",
    viewers: "Viewers", follower: "Novo seguidor", sub: "Novo sub",
    userName: "Nome do usuário", alerts: "Área de alertas (OBS)", webcam: "Webcam", chat: "Chat"
  }
};

// ============ engine (no need to edit) ============
(() => {
  const O = window.OVERLAY, qs = new URLSearchParams(location.search);
  const lang = qs.get("lang") || O.lang;               // ?lang=pt, ?preset=blue, ?fx=calm override for testing
  const preset = qs.get("preset") || O.preset;
  const fx = qs.get("fx") || O.effects;
  const T = window.OVERLAY_TEXT[lang] || window.OVERLAY_TEXT.en;
  const C = Object.assign({}, window.OVERLAY_PRESETS[preset] || window.OVERLAY_PRESETS.cyan, O.colors);
  O.t = T; O.lang = lang;
  const S = O.schedule || "";
  O.scheduleText = typeof S === "string" ? S : (S[lang] || S.en || "");
  document.documentElement.lang = lang;
  const r = document.documentElement.style;
  for (const k in C) r.setProperty("--" + k, C[k]);
  document.documentElement.classList.add("fx-" + fx);
  r.setProperty("--brb-alpha", Math.round(100 * Math.min(1, Math.max(0, +(qs.get("brb") ?? O.brbOpacity ?? 1)))) + "%");
  const get = p => p.split(".").reduce((o, k) => o && o[k], O);
  document.querySelectorAll("[data-o]").forEach(el => { const v = get(el.dataset.o); if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-title]").forEach(el => { const v = get(el.dataset.title); if (v != null) el.title = v; });
})();
