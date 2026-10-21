# Link preview layout — how hughscott.dev renders when pasted into a message

Rendered reference: `preview-layout.png` (generated from `preview-layout.html`).
Verified 2026-10-21 against WhatsApp, Telegram, X and LinkedIn renderer behaviour.

## The rule that decides everything

**The image carries no text. The app renders the words.**

Every messaging app builds the card from the meta tags in `index.html`, not from pixels. When a
preview image also contains text, the reader sees the same words twice — the baked copy and the
app-rendered title. The old `public/og.png` was a terminal screenshot full of text, so every
preview showed duplicated copy and a stale UI.

So the split is:

| Slot | Source | Who controls it |
|---|---|---|
| Image | `og:image` | You, the pixels |
| Title | `og:title` | You, the words |
| Description | `og:description` | You, the words |
| Domain | `og:url` | The app, your domain |
| Card background | Reader's app theme | Nobody |

## Anatomy per platform

| Platform | Layout | Image size shown | Description shown |
|---|---|---|---|
| WhatsApp | Image on top, title, description, domain in green | 1.91:1 band | Yes, 2 lines |
| Telegram | Domain in bubble header, image, title, description | 1.91:1 band | Yes |
| X | Domain, title, description, then image below | 1.91:1 band | Yes, 2 lines |
| LinkedIn | Thumbnail left, title, domain | 104x60 thumb | **No — hidden entirely** |

Because LinkedIn drops the description, `og:title` has to carry the whole pitch on its own.

## Crops the image must survive

Same 1200x630 file, four different crops:

- **Full 1.91:1 band** — WhatsApp, Telegram, X. 1200x630 becomes roughly 320x168 on screen.
- **Centre square** — the WhatsApp small variant and the X small card cut a square from the middle
  (about 62x62 on screen). Anything at the edges is the first thing lost.
- **Short band** — LinkedIn thumbnail and message-list rows, roughly 104x60.

Design rule: one recognisable shape, dead centre, sized so it still reads at 62px. Everything else
is atmosphere.

## Copy shipped in the tags

```
og:title       Hugh Scott — Building AI-enabled systems end to end      (51 chars)
og:description Zero-admin AI sales agents (Agent Jae) and live price
               comparison (MassivCart). TypeScript, Go, Rust. Open to
               senior and staff roles.                               (~137 chars)
```

Title under 60 chars, description between 110 and 160 so it fills exactly two lines without
truncation.

## Technical constraints

- Image: exactly 1200x630 (1.91:1).
- File: PNG or JPG, **under 300 KB** — WhatsApp silently drops anything larger and shows a tiny
  square instead of the large card, then caches that failure.
- `og:image` must be an absolute `https://` URL.
- `og:image:width` / `og:image:height` must match the real pixels, or the card lays out wrong on
  first fetch.
- `og:image:alt` is required for accessibility and is what shows if the image fails to load.
- Every platform caches the first preview it fetches. After changing the image, force a re-scrape:
  Facebook Sharing Debugger, LinkedIn Post Inspector, `@WebpageBot` for Telegram, and a fresh paste
  in WhatsApp from a second device.

## Still open

The image itself. `public/og.png` is still the old 1448x1184 screenshot. It must be replaced with a
1200x630 art that follows the crop rule above, and `og:image:width` / `og:image:height` /
`og:image:alt` updated in the same change.
