# Design audit implementation, 2026-10-07

Branch: `design/audit-polish-2026-10-07`.
Baseline commit: `aa17d0751904c12142a5a23e3192d51a8a9ea938` (the original checkout's `main`).

The supplied local and project-scoped audit reports are byte-identical. Their seven findings also appear in the supplied JSON baseline. The screenshots support the mobile phantom prompt and punctuation findings. Code and fresh browser checks confirm the underlying issues, with the qualifications below.

The existing personal workstation identity passes the design anti-pattern review: the sky photograph, ASCII name, NixOS/GNOME chrome, Geist type, and shell prompt are intentional and remain the visual system for these fixes.

| Finding | Verified diagnosis | Implementation |
| --- | --- | --- |
| F001, P1 | `Tab` always cancelled, including `Shift+Tab`, even with empty, exact, or unknown input. | Consume unmodified forward Tab only when a completion suggestion is visible. Backward Tab and Tab without a suggestion retain native focus navigation. |
| F002, P1 | The prompt prototype paints above the banner on desktop and mobile. Desktop invisibility is dependent on scroll position, contrary to the report's general claim. | Hide its containing element, removing both the prototype and its wrapper spacing from layout and accessibility. History still reads the stored prompt markup. |
| F003, P1 | Mobile flex formatting inserts gaps around punctuation and removes instructional words from accessibility. | Keep hints and command lists inline at every width. Show complete instructions on mobile so visitors can understand what commands do. |
| F004, P2 | Fresh measurements: desktop contact targets about 25px, mobile targets already 40px, input about 19px. The audit's 25px mobile and 1088px mobile input measurements are stale or from another viewport. | Contact links and input now have a 44px minimum height. The suggestion button retains its 44px target without overlapping adjacent rows. The short inline `here` link remains in its sentence; inline links have a [WCAG 2.5.8 target-size exception](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). |
| F005, P2 | Transcript text can show through the translucent sticky titlebar. | Use a separate opaque theme-aware titlebar surface. Keep the translucent terminal body. Avoid adding more blur. |
| F006, P2 | ASCII art is exposed to assistive technology despite an existing semantic heading. | Hide decorative `<pre>` artwork from accessibility; retain the semantic Hugh Scott heading and site overview. |
| F007, P3 | Resolved themes do not declare their native color scheme. | Set light on the root and dark on the dark-theme root. Both explicit theme commands and system preference changes resolve correctly. The main scrollbar is already deliberately hidden; a light main scrollbar was not reproduced. |

The command and password inputs also receive accessible names. Reduced motion disables short transitions as well as the existing cursor and transcript animations.

## Validation and comparison

- `bun run test`: all 9 test files and 10 tests pass.
- `bun run build`: TypeScript and the production build pass.
- Browser regression checks cover light/dark at 320, 375, 436, 560, 620, 768, 1280, and 1440px, including initial content and scrolled help.
- Checks verify native keyboard escape from the input, completion by Tab/right arrow/click, accessibility snapshots, 44px targets, inline hints, absence of horizontal overflow, opaque pinned chrome, theme persistence and system updates, reduced motion, command history after clear/banner, and 200% desktop text scaling.
- Before/after screenshots cover mobile, tablet, desktop, both themes, and scrolled help. Browser evidence is stored locally in `.gstack/design-reports/audit-polish-2026-10-07/`; the original external baseline and reports remain available for future comparison.

Open the changed site at `http://localhost:5173/`, the original baseline at `http://localhost:5174/`, or the local visual comparison at `http://localhost:5173/.gstack/design-reports/audit-polish-2026-10-07/comparison.html` while the development servers are running.

These checks use local Chromium and a local Vite server. They do not establish deployed Core Web Vitals or replace testing on physical phones and screen readers. The change adds no runtime packages or remote assets.
