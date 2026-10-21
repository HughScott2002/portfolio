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

## Deployment notes (verified 2026-10-21)

- Vercel auto-deploys `main` to production. Commits `c6b2b83` and `296c947` both reported
  `success` on the GitHub Production deployment.
- The live production HTML serves the new `og:title` and `og:description`. Confirmed by fetching
  `https://hughscott.dev/` from an external reader: `og:title` is
  `Hugh Scott — Building AI-enabled systems end to end` and `og:description` is the Agent Jae line.
- `og:image` is still the old `public/og.png` at 1448x1184, and `og:image:width` / `og:image:height`
  still read 1448 / 1184. The card looks unchanged until the art is swapped.

### Vercel Deployment Protection is on

The Vercel preview URL for a deployment redirects to a Vercel login page
(`vercel.com/login?next=.../sso-api?url=...`). Only the preview deployments are protected — the
production domain `hughscott.dev` serves the real page. If a preview deployment URL is ever shared,
it will show a login page instead of the site, and it will not unfurl as a link preview.

### FortiGuard blocks the domain on some networks

Requests to `https://hughscott.dev/` from the local network are intercepted by a FortiGuard
Intrusion Prevention web filter, which returns a 403 "Web Filter Violation" page in place of the
site. Confirmed with a real browser, every user agent, and `HEAD` versus `GET` (HEAD passes, GET is
blocked). The block is a network-side policy, not a problem with the deployment — the site is
reachable from the public internet.

Consequences worth knowing:

- Testing the site or the preview image from a network behind the same filter fails locally, and
  the failure looks like a broken site rather than a blocked one.
- Any corporate, campus, or school network running FortiGuard with an unrated-domain policy will
  show visitors a block page instead of the portfolio.
- The block page carries a "re-evaluated" request link. Submitting it gets the domain categorised
  and the block lifted for that network.

## One place to change the preview

The preview copy and image live in the `preview` block of `config.json`. A Vite plugin
(`vite.config.ts`) injects the meta tags at build time and in dev, so the HTML can never drift
from the config.

```json
"preview": {
  "url": "https://hughscott.dev/",
  "siteName": "Hugh Scott",
  "pageTitle": "Hugh Scott | WebShell",
  "title": "Hugh Scott — Building AI-enabled systems end to end",
  "description": "Zero-admin AI sales agents (Agent Jae) and live price comparison (MassivCart). TypeScript, Go, Rust. Open to senior and staff roles.",
  "images": [{ "path": "/og.png", "alt": "..." }]
}
```

Change `title` and every place updates: `og:title`, `twitter:title`, the meta description, and the
browser tab (via `pageTitle`). Change `description` and `og:description`, `twitter:description` and
the meta description all follow.

### Images

`images` is a list, so more than one image of the same aspect ratio can be published from the same
place — the first entry is the primary one used for `twitter:image`, and every entry gets its own
`og:image`, `og:image:width`, `og:image:height`, `og:image:type` and `og:image:alt`.

**The dimensions are read from the file on disk at build time, not typed in by hand.** Drop a new
1200x630 file in `public/`, update the path in `config.json`, and the tags follow. This fixed a real
bug: `og:image:width` and `og:image:height` had been hand-written as 1448 and 1184 for a file that
has always been 1200x630. Platforms that trust those numbers lay the card out wrong when they
disagree with the real file.

### Why build time and not the browser

Link preview crawlers fetch raw HTML and never run JavaScript. Anything injected at runtime is
invisible to them, so the tags have to be in the served HTML. The plugin runs in
`transformIndexHtml`, which covers both `vite dev` and `vite build`, and it strips any
pre-existing `og:*`, `twitter:*` or description tags before injecting, so there is exactly one
source of truth.
