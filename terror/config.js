// ============ EDIT HERE / EDITE AQUI ============
window.OVERLAY = {
  lang: "en",                     // "en" (English) or "pt" (Português)
  webcam: "16:9",                 // webcam shape: "16:9" wide, "4:3", "1:1" square, "9:16" vertical
  brbOpacity: 0.8,                // BRB scene background: 1 = solid, lower = see-through (0.5 shows the game more)
  name: "YOUR CHANNEL",
  handle: "@yourchannel",
  schedule: { en: "Mon · Wed · Fri — 8 PM", pt: "Seg · Qua · Sex — 20h" },
  colors: {
    bg: "#070304",
    panel: "rgba(14,6,8,.86)",
    blood: "#b3121f",
    blood2: "#e0283a",
    bone: "#e9e0d0",
    muted: "#8a7b75"
  }
};

// Texts of every scene. Edit any phrase, or add a new language below.
// Textos de todas as cenas. Edite qualquer frase ou adicione outro idioma.
window.OVERLAY_TEXT = {
  en: {
    starting: "Starting Soon", startingSub: "Something is about to wake up...",
    brb: "Be Right Back", brbSub: "Don't go anywhere... they are close",
    ending: "Stream Ended", endingSub: "Thanks for surviving this far",
    justChatting: "Just Chatting",
    viewers: "Viewers", follower: "New follower", sub: "New sub",
    userName: "Username", alerts: "Alerts area (OBS)", webcam: "Webcam", chat: "Chat"
  },
  pt: {
    starting: "Iniciando", startingSub: "Algo está prestes a acordar...",
    brb: "Já volto", brbSub: "Não saia daí... eles estão por perto",
    ending: "Fim da transmissão", endingSub: "Obrigado por sobreviver até aqui",
    justChatting: "Just Chatting",
    viewers: "Viewers", follower: "Novo seguidor", sub: "Novo sub",
    userName: "Nome do usuário", alerts: "Área de alertas (OBS)", webcam: "Webcam", chat: "Chat"
  }
};

// ============ engine (no need to edit) ============
(() => {
  const O = window.OVERLAY, qs = new URLSearchParams(location.search);
  const lang = qs.get("lang") || O.lang;               // ?lang=pt overrides, handy for testing
  const T = window.OVERLAY_TEXT[lang] || window.OVERLAY_TEXT.en;
  O.t = T; const S = O.schedule || "";
  O.scheduleText = typeof S === "string" ? S : (S[lang] || S.en || "");
  document.documentElement.lang = lang;
  const r = document.documentElement.style;
  for (const k in O.colors) r.setProperty("--" + k, O.colors[k]);
  r.setProperty("--brb-alpha", Math.round(100 * Math.min(1, Math.max(0, +(qs.get("brb") ?? O.brbOpacity ?? 1)))) + "%");
  const get = p => p.split(".").reduce((o, k) => o && o[k], O);
  document.querySelectorAll("[data-o]").forEach(el => { const v = get(el.dataset.o); if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-title]").forEach(el => { const v = get(el.dataset.title); if (v != null) el.title = v; });
})();
