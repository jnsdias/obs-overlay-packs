# Horror Stream Overlay Pack

Animated horror overlays for OBS Studio and Streamlabs Desktop. Plain HTML, no install, fully editable. (Versão em português: `LEIAME.pt-BR.md`)

## What's inside

| File | Scene | Layers |
|---|---|---|
| `starting.html` | Starting Soon, with countdown | 1 source (full screen) |
| `ingame.html` | In game | 1 source (transparent, goes on top of your game) |
| `justchatting-bg.html` + `justchatting.html` | Just Chatting | 2 sources: background below, frame above |
| `brb.html` | Be Right Back | 1 source (full screen) |
| `ending.html` | Stream Ended | 1 source (full screen) |
| `config.js` | Channel name, handle, texts, colors, language | edit this one |
| `fonts/` | Metal Mania font + its license | do not move |

Everything is 1920×1080. Blood drips, flickering titles, film grain and glowing borders are animated.

## Requirements

OBS Studio 28 or newer, or Streamlabs Desktop. Anything that supports a Browser Source works.

## Quick start

1. **Unzip the folder somewhere permanent** (for example `Documents\Overlays\`). If you move it later, OBS loses the files and you must re-select them. Keep all files together, since every page uses `config.js`, `style.css`, `scenes.js` and the `fonts` folder.
2. Open `config.js` in Notepad and set your `name` and `handle`. Save.
3. In OBS, create a scene (for example "Starting").
4. Add a source: **Sources → + → Browser**.
5. Tick **Local file**, click **Browse** and pick `starting.html`.
6. Set **Width 1920** and **Height 1080**. Click OK.
7. Repeat for the other scenes (table above).

Recommended: in each browser source's properties, tick **Refresh browser when scene becomes active**. The countdown restarts and the blood animation plays every time you switch to the scene.

## Layer order

**Full-screen scenes** (Starting, BRB, Ending): just the one source.

**In Game** (bottom to top):
1. Your game capture
2. `ingame.html`: webcam frame, viewer and follower cards
3. Your webcam, placed inside the frame
4. Your alert sources (see below)

**Just Chatting** (bottom to top):
1. `justchatting-bg.html`: the background
2. Your webcam, placed inside the left frame
3. `justchatting.html`: frames and bar, with transparent windows
4. Your chat source, placed inside the right frame
5. Your alert sources

The frame files are transparent. Windows for the webcam and chat are cut out, so whatever is below shows through.

## Where things go (slots)

The overlay draws only the frames. Viewer count, latest follower, latest sub and alerts come from your own OBS sources (StreamElements, Streamlabs, or any other tool). Drag them on top of the frames.

**In Game**

| Slot | Size | Position (x, y) |
|---|---|---|
| Viewers card | 300×72 | bottom center, first |
| New follower card | 300×72 | bottom center, second |
| New sub card | 300×72 | bottom center, third |

**Just Chatting**

| Slot | Size | Position (x, y) |
|---|---|---|
| Chat | 708×820 | 1180, 120 |
| Viewers card | 353×72 | 32, 32 |
| New follower card | 353×72 | 405, 32 |
| New sub card | 354×72 | 778, 32 |

**Webcam**

Set your webcam shape in `config.js` (`webcam`). The frame resizes and stays centered in its area:

| `webcam` | In Game | Just Chatting |
|---|---|---|
| `"16:9"` (wide) | 400×225 | 1100×619 |
| `"4:3"` | 400×300 | 1093×820 |
| `"1:1"` (square) | 400×400 | 820×820 |
| `"9:16"` (vertical) | 400×711 | 461×820 |

Crop or resize your webcam source in OBS to the same size, or fit it inside the frame.

The cards have an icon on the left (eye = viewers, heart = new follower, skull = new sub). Put a text source for the number or username in the rest of the card, about 210 px wide (about 275 px in Just Chatting, where the cards are wider). Alerts have no reserved area: put your alert source at the top of the layer list, over everything, and size and place it as you like. The alert backgrounds in `alerts/media` are 800×150.

To change these positions, open `ingame.html` or `justchatting.html` in a text editor. Positions are in the `<style>` block at the top, with a comment above them.

## Customizing

Open `config.js`:

- `lang`: `"en"` (English) or `"pt"` (Português).
- `webcam`: shape of the webcam frame (see above).
- `brbOpacity`: how solid the Be Right Back background is. `1` is fully solid, `0.8` (default) lets the game or camera show through, `0.5` shows it a lot. Use `?brb=0.6` in the address to test one source.
- `name`, `handle`: shown on the scenes.
- `schedule`: shown on Starting and Ending. One text per language.
- `colors`: `blood` and `blood2` are the reds, `bone` is the text color, `bg` the background. Any CSS color works, for example `#3b82f6` for a blue theme.
- `OVERLAY_TEXT`: every phrase of every scene. Edit any of them, or copy the `en` block, rename it (for example `es`), translate it and set `lang: "es"`.

To hide a text you do not want (for example the schedule), set it to empty: `schedule: "",`. Do not use `#` or delete only the value: in this file, comments start with `//`.

Save and press **Refresh cache of current page** in the source's properties. No restart is needed.

### Options through the address

Untick **Local file** and use the address instead (the folder path below is only an example):

- Countdown length: `file:///C:/Users/You/Documents/Overlays/starting.html?min=10` (minutes, default 5).
- Language for one source only: add `?lang=pt` (or `&lang=pt` if the address already has a `?`).

### Blood length

In `justchatting-bg.html`, `data-blood-max="112"` is the longest drip in pixels. Full-screen scenes use 300. Add the same attribute to the `<body>` tag of any scene to change it.

## Troubleshooting

- **Black or white box instead of the overlay:** the Browser Source did not find the file. Re-select it with **Browse**, and check that the files were not moved out of the folder.
- **The font looks wrong (a plain serif):** the `fonts` folder was moved or is missing. It must stay next to the HTML files.
- **My webcam is hidden:** the frame source is above it with the wrong file. For Just Chatting, the background goes **below** the webcam and the frame goes **above** it.
- **Animations are frozen or choppy:** in the source's properties, untick **Shutdown source when not visible** and keep the frame rate at 30 or 60. Check that hardware acceleration is on in OBS **Settings → Advanced**.
- **Texts are cut off:** very long names do not fit the cards. Shorten them or reduce the font size in your text source.
- **Countdown does not restart:** tick **Refresh browser when scene becomes active**.

## License

You can use this pack on your own streams, including monetized channels, and on videos made from them. You cannot resell, share or redistribute the files, edited or not. Full terms in `LICENSE.txt`.

The Metal Mania font is licensed under the SIL Open Font License 1.1 (`fonts/OFL.txt`).

## Support

Questions or a problem? Contact: [your email or Discord here]
