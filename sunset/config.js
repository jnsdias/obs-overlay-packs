// ============ EDIT HERE / EDITE AQUI ============
window.OVERLAY = {
  lang: "en",                     // "en" (English) or "pt" (Português)
  preset: "sunset",               // "sunset" | "miami" | "dusk" | "palm" | "night"
  effects: "full",                // "full" (all animations) | "calm" (soft glow only) | "none" (static)
  webcam: "16:9",                 // webcam shape: "16:9" wide, "4:3", "1:1" square, "9:16" vertical
  brbOpacity: 0.8,                // BRB scene background: 1 = solid, lower = see-through (0.5 shows the game more)
  name: "YOUR CHANNEL",
  handle: "@yourchannel",
  schedule: { en: "Mon · Wed · Fri — 8 PM", pt: "Seg · Qua · Sex — 20h" },
  colors: {}                      // optional overrides on top of the preset, e.g. { accent: "#ff8800", sky1: "#101040" }
};

// Color presets. Add your own: copy one block and rename it.
// Presets de cor. Para criar o seu, copie um bloco e troque o nome.
window.OVERLAY_PRESETS = {
  sunset: { bg: "#12062b", panel: "rgba(26,10,52,.88)", accent: "#ff3d9a", accent2: "#ffb347", text: "#fff4f9", muted: "#d6a3c9", sky1: "#1a0b3d", sky2: "#6b1f8f", sky3: "#ff5a7a" },
  miami:  { bg: "#04122b", panel: "rgba(6,22,48,.88)",  accent: "#00e0d0", accent2: "#ff5fa2", text: "#f0fffd", muted: "#8fc9cc", sky1: "#06143a", sky2: "#0c5a7a", sky3: "#ff6fa8" },
  dusk:   { bg: "#0e0624", panel: "rgba(20,10,44,.88)", accent: "#b05cff", accent2: "#ff8a3d", text: "#faf5ff", muted: "#b7a2d6", sky1: "#120a33", sky2: "#4b2a9a", sky3: "#ff7a4d" },
  palm:   { bg: "#04161a", panel: "rgba(5,26,30,.88)",  accent: "#19e68c", accent2: "#ffd34d", text: "#f2fff8", muted: "#86c4aa", sky1: "#05202a", sky2: "#0b6b6e", sky3: "#ffb547" },
  night:  { bg: "#070b2a", panel: "rgba(10,14,50,.88)", accent: "#4d7cff", accent2: "#ff4fd8", text: "#f2f5ff", muted: "#98a6e0", sky1: "#070b2e", sky2: "#2b2fa6", sky3: "#ff5ec4" }
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
  const C = Object.assign({}, window.OVERLAY_PRESETS[preset] || window.OVERLAY_PRESETS.sunset, O.colors);
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
