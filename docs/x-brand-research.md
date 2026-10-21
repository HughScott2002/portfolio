# X Personal-Brand Research (for link-preview card)

Audience for this research: how software/design engineers brand themselves on X, to inform a personal-brand card for hugh's portfolio. Target viewers of the card: hiring engineers and managers.
Researched 2026-10-15. Sources cited per claim.

## 0. Reachability note (primary-source method)

- `x.com/<handle>` pages load **without login** and expose: display name, @handle, bio, location, website, join date, following/follower counts, and banner/avatar image URLs. Verified live for @rauchg, @theo, @kentcdodds, @shadcn, @raunofreiberg, @emilkowalski, @dhh, @ThePrimeagen, @levelsio, @pacocoursey.
- The **timeline beyond the first few posts/pinned post is login-walled** ("Log in or sign up for X / See what's happening"). So bio + banner + pinned post are exactly the parts a logged-out hiring viewer sees — same elements a link-preview card should mirror.

## 1. Display-name formats

X allows 50 chars for display name, 15 for @username (Typefully/X character-counter guides; Rhys Keller bio guide). Observed formats on real engineer profiles (all fetched live 2026-10-15):

| Format | Real examples |
|---|---|
| Plain name | Guillermo Rauch (@rauchg); shadcn (@shadcn); Paco (@pacocoursey); rauno (@raunofreiberg); Emil Kowalski (@emilkowalski); DHH (@dhh) |
| Name + employer/project suffix | Theo - t3.gg (@theo, "Full time CEO @t3dotcodes & @t3dotchat"); Zhia Chong pattern "engineer @Facebook, ex-@Twitter" (search snippet, x.com/@zhiachong) |
| Name + emoji signifier | Kent C. Dodds 🐨 (@kentcdodds); ThePrimeagen (@ThePrimeagen, no emoji but meme bio) |
| Revenue-stack as identity (indie hackers) | @levelsio display "@levelsio": bio is a revenue list, not a name (see §2) |
| Role-first, name-second | @xjasonsong: "JS / Staff Engineer \| Building SuperInterview.ai…" (search snippet); @lustoykov: "Previously Staff Engineer at Yelp. Now: building Hallvi…" (search snippet) |

Takeaway for card: plain name is the norm for established engineers; suffix (`Name – role @ company` / `Name – building X`) is the cheap way to add context in one line. Emoji is limited to one signature mark (koala, etc.), not decoration.

## 2. Bio patterns (160-char hard limit)

Spec: bio max **160 characters** (X Help Center, "How to customize your profile"; confirmed by Typefully, SuperX, Replug counters). Structure engineers converge on (DEV "7 Cool Tips…" by Jeremy Ikwuje; daily.dev "Twitter for Developers"; Postory bio-ideas guide):

1. Role + seniority/niche ("Staff Engineer", "Python/NLP Engineer", "design @vercel")
2. Current thing + ex-proof ("Building X / ex-Y", "@vercel CEO")
3. Proof point (acquisition, stars, revenue, follower-scale product)
4. Link slot (personal site) + optional location/availability

### 8 real bio texts (verbatim, fetched 2026-10-15 unless noted)

1. @rauchg — `@vercel CEO` / San Francisco, CA / rauchg.com
2. @theo — `Full time CEO @t3dotcodes & @t3dotchat. Part time YouTuber, investor, and developer` / San Francisco, CA / t3.gg
3. @shadcn — `I own a computer. / @vercel` / shadcn.com (anti-bio: works only with existing reputation)
4. @raunofreiberg — `design @vercel x devouringdetails.com 🇪🇪` / rauno.me (design-engineer minimal: role @ company x side-project + flag)
5. @emilkowalski — `Working at @Linear, teaching at aiforui.dev` / emilkowal.ski (role + teaching proof)
6. @dhh — `Father of three, Creator of Ruby on Rails + Omarchy, Co-owner & CTO of 37signals, Shopify director, NYT best-selling author, and Le Mans 24h class-winner.` / dhh.dk (stacked credentials, max-density)
7. @kentcdodds — `Husband, 6x Dad, Latter-day Saint, Dev, Educator / 🐨 kody.codes / 👾 mega.dev / 📺 youtube… / 🌌 kentcdodds.com` / Highland, UT (values + role + link tree inside bio)
8. @levelsio — `💸levels.vc 📸PhotoAI.com $86K/m 🎮VibeJam.com $44K/m 🏡InteriorAI.com $23K/m 👙@X $13K/m 🌍Nomads.com $7K/m 🏩Hotelist.com $5K/m 📕My book $5K/m 👉readMAKE.com` (bio-as-revenue-dashboard; indie-hacker extreme)
9. @ThePrimeagen — `skill issues: 🟩⬛️⬛️⬛️⬛️⬛️(69/420) / boot.dev/prime / youtube… / twitch…` / "Windows ME" joke location (personality-first; works at 386K followers, not as a job-seeking template)
10. @pacocoursey — *(empty bio*, just paco.me + join date) (ultra-minimal; relies on name recognition from cmdk)

Secondary corroboration: DEV guide stresses "tell us you are a software engineer," niche down ("Python/NLP Engineer. Prev @Twillo"), mention one accomplishment ("Created the #1 WP Stripe Plugin which got acquired by @stripe"), keywords for recruiter search; daily.dev gives template bios (`Web developer at a company | Know JavaScript, Python, React | Making apps for entrepreneurs`).

Takeaway for card: `<Name> — <role> · <stack> · <proof> · <location/availability>` fits the same scan pattern in ~1 line. Proof beats adjectives.

## 3. Banner/header image styles + spec

Spec: banner **1500×500 px (3:1)**, avatar **400×400 px**, JPG/GIF/PNG, no animated GIF (X Help Center, "How to customize your profile"; corroborated by Neal Schaffer, Snappa, InfluencerMarketingHub 2026 guides). Postory "X Profile Banner Strategy" (2026-05-30) adds: keep key content in a center safe zone (~1200×400), keep bottom-left clear (avatar overlap), PNG for text, preview on mobile (sides crop).

Banner archetypes that convert (Postory 2026; BrandBird X-header gallery tags):

1. **Value prop** (`[outcome] for [audience]`, one big centered line) — safest default.
2. **Social proof** (numbers, press, client logos) — e.g. levels-style revenue lists work as banners too.
3. **Lead magnet** (free guide/template/newsletter offer).
4. **Credibility** (employer logos, "building X", credential row).
5. **Personality** (face, hobby, meme — @ThePrimeagen end of spectrum).
6. **Offer** (product shot / "book a call").

What engineers/designers actually use (BrandBird gallery, filtered creator/brand tags): product **screenshots**, **tagline-on-solid/gradient**, **illustration**, **minimal** (Linear, Vercel, Raycast, Supabase end), **meme** (@levelsio tagged meme). Live checks: @rauchg uses a dark abstract/blue banner; @levelsio's slot reads as meme/personality. Developer-creator consensus (daily.dev Do's): "professional-looking photo and cover image" that matches bio promise.

Terminal/screenshot aesthetics, typographic value-prop cards, and project-collage banners all read at a glance; stock sunsets/blank banners waste the slot (Postory; Sketch blog guide).

Takeaway for card (1500×500-equivalent or OG 1200×630): centered one-line value prop + tiny proof row, high contrast, bottom-left clear, PNG text. Design once, verify cropped at narrow widths.

## 4. Pinned-post patterns

Mechanics: one pin, sits above timeline, first full content a visitor reads; pin/unpin via `··· → Pin to your profile` (X Help Center). Strategy consensus (TweetHunter 2026-03-26; Postory 2026-05-22; Sprout Social):

- **Best-performing thread** (evergreen, representative of what followers get) — safest default; threads show depth.
- **Lead magnet** (free guide/template/checklist, "comment GUIDE") — converts visits to emails; Buffer's own test cited: 359 leads pinned vs 36 unpinned.
- **Value-statement / "hire me" post** (who you help + proof + portfolio link) — explicit job-seeker archetype.
- **Testimonial/result** (shipped result, client win, with numbers).
- **Announcement/launch** (current campaign; rotate out after).
- Never pin: replies (confusing out of context), retweets, low-engagement posts, stale/meme-only posts.

Live examples: @shadcn pins a product launch (Copper Mac app + AI-elements Trace component); @raunofreiberg pins a course launch (interaction-design manual, 23 chapters/components, 2-week window); @kentcdodds pins a demo video ("ship 60+ valuable PRs a day solo"); @ThePrimeagen pins a long-form video; @dhh pins a keynote video. Pattern holds: **pin the single strongest proof-of-work with a next step**, rotate every few weeks–quarterly or when something outperforms it (Postory/TweetHunter cadence guidance).

Takeaway for card CTA: mirror the pin — one link, one action ("view work" / portfolio URL), not a link tree.

## 5. Job-hunting-via-X advice (engineer-specific)

- **Profile is a landing page**: bio = who/what, banner = visual promise, pin = proof, recent posts = ongoing value (TweetHunter; Postory; daily.dev Do's: photo + bio + portfolio link + pin).
- **Build in public with decisions, not announcements**: tradeoffs ("two schema approaches, constraint that decided it"), debugging stories (root cause + method), honest ship notes ("beta: 3 things we got wrong") outperform hot takes (Ambitology "Building in Public" 2026-08-16; daily.dev "learning in public" + #100DaysOfCode/#CodeNewbie).
- **Cadence**: ~2–3 posts/wk LinkedIn + 1–2 threads/wk X sustains compounding over ~6 months; consistency beats volume; side projects work better than day-job posts (no confidentiality friction + initiative signal) (Ambitology).
- **X still matters in 2026 for engineers**: dense technical audience + reply culture surfaces work to hiring managers; recruiters search keywords — put stack + role nouns in bio (Ambitology FAQ; DEV keyword tip; Undercover Recruiter Fortune-500 study via DEV).
- **Engage before DMing**: reply thoughtfully first, check bio for DM norms, keep cold DMs short + specific (daily.dev DM etiquette).
- **Don't leak the funnel**: strong posts without a clear profile (bio/banner/pin/link) waste the click — fix profile before posting more (Ambitology; Clifton Sellers via Postory: virality without profile conversion loses follows).

## Sources

- X Help Center, "How to customize your profile" (banner 1500×500, avatar 400×400, bio 160, pin HowTo) — https://help.x.com/en/managing-your-account/how-to-customize-your-profile
- Live profile fetches 2026-10-15: x.com/rauchg, x.com/theo, x.com/shadcn, x.com/raunofreiberg, x.com/emilkowalski, x.com/dhh, x.com/kentcdodds, x.com/ThePrimeagen, x.com/levelsio, x.com/pacocoursey (+ search snippets x.com/xjasonsong, x.com/lustoykov, x.com/zhiachong)
- Jeremy Ikwuje, "7 Cool Tips to Write Your Twitter Bio as a Developer" (DEV, 2022) — https://dev.to/ijsucceed/7-cool-tips-to-write-your-twitter-bio-as-a-developer-28c
- daily.dev, "Twitter for Developers: Networking Essentials" (2024) — https://daily.dev/blog/twitter-for-developers-networking-essentials/
- Postory, "The X/Twitter Pinned Tweet Strategy" (2026-05-22) — https://postory.io/blog/twitter-pinned-tweet-strategy
- Postory, "The X Profile Banner Strategy" (2026-05-30) — https://postory.io/blog/x-profile-banner-strategy
- TweetHunter, "How to Use Twitter Pinned Tweet…" (2026-03-26) — https://tweethunter.io/blog/twitter-pinned-tweet
- Ambitology, "Building in Public: The Engineer's Guide…" (2026-08-16) — https://ambitology.com/learn/career-insights/building-in-public-linkedin-twitter-career-growth
- BrandBird X Header Gallery (style tags + dims FAQ) — https://www.brandbird.app/tools/twitter-headers-gallery
- Limit corroboration: Typefully counter, SuperX bio-limit page, Rhys Keller bio guide, Neal Schaffer/Snappa banner-size guides (via web search 2026-10-15)
