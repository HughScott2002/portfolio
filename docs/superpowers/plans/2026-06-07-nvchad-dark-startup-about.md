# NvChad Dark Startup About Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the terminal portfolio to a pitch-black NvChad-inspired dark theme and automatically show the `about` output on startup.

**Architecture:** Keep the existing configuration-driven color system and update only the `colors` object in `config.json`, with matching fallback CSS custom properties in `src/css/style.css` so first paint and runtime styles agree. Reuse the existing `ABOUT` command payload in `src/main.ts` during the window load startup sequence.

**Tech Stack:** Vite, TypeScript, JSON runtime config, CSS.

---

## File Structure

- Modify `config.json`
  - Owns site content and runtime theme colors consumed by `src/styles.ts`.
  - Set background to pitch black `#000000`.
  - Use NvChad/Tokyo Night-style dark colors commonly associated with NvChad defaults: foreground `#c0caf5`, cyan `#7dcfff`, blue `#7aa2f7`, green `#9ece6a`, purple `#bb9af7`, red/pink `#f7768e`, and neutral gray `#565f89`.
- Modify `src/css/style.css`
  - Owns static first-paint CSS defaults before `src/styles.ts` injects config values.
  - Mirror the same palette in `:root` and hard-coded fallback selectors so there is no purple/pink flash or mismatch.
- Modify `src/main.ts`
  - Owns terminal startup behavior.
  - Change the `window.addEventListener('load', ...)` callback to write the banner and then write `ABOUT` after the banner finishes rendering.

## Success Criteria

- Page background is pitch black.
- Terminal foreground, prompt, links, border, banner, command highlights, and input colors read as a coherent NvChad-like dark theme.
- On page load, the banner still appears and the about section appears automatically below it.
- Running `about` manually still prints the same about section.
- `npm run build` passes.

### Task 1: Update Runtime Theme Palette

**Files:**
- Modify: `config.json`

- [ ] **Step 1: Change only the `colors` object in `config.json`**

Replace the current `colors` object with:

```json
"colors": {
  "background": "#000000",
  "foreground": "#c0caf5",
  "banner": "#7aa2f7",
  "border": {
    "visible": true,
    "color": "#565f89"
  },
  "prompt": {
    "default": "#9ece6a",
    "user": "#7dcfff",
    "host": "#bb9af7",
    "input": "#c0caf5"
  },
  "link": {
    "text": "#7aa2f7",
    "highlightColor": "#7dcfff",
    "highlightText": "#000000"
  },
  "commands": {
    "textColor": "#f7768e"
  }
}
```

- [ ] **Step 2: Run JSON validation through the build**

Run:

```bash
npm run build
```

Expected: PASS with TypeScript and Vite build output.

- [ ] **Step 3: Commit the config color change**

```bash
git add config.json
git commit -m "style: apply nvchad dark terminal colors"
```

### Task 2: Align Static CSS Fallback Colors

**Files:**
- Modify: `src/css/style.css`

- [ ] **Step 1: Update the `:root` color variables**

Replace the current color variables in `:root` with:

```css
  --bg: #000000;
  --border: #565f89;
  --text: #c0caf5;
  --prompt-default: #9ece6a;
  --prompt-1: #7dcfff;
  --prompt-2: #bb9af7;
```

- [ ] **Step 2: Update hard-coded fallback colors in selectors**

In `src/css/style.css`, change:

```css
pre {
  color: #7aa2f7;
}

input {
  color: #c0caf5;
}

a {
  color: #7aa2f7;
}

.command {
  color: #f7768e;
}

.keys {
  color: #7aa2f7;
}
```

Keep the existing declarations in those blocks that are not color-related, including font, spacing, and text-shadow.

- [ ] **Step 3: Run the build**

Run:

```bash
npm run build
```

Expected: PASS with TypeScript and Vite build output.

- [ ] **Step 4: Commit the CSS fallback change**

```bash
git add src/css/style.css
git commit -m "style: align css fallbacks with dark theme"
```

### Task 3: Print About Automatically On Startup

**Files:**
- Modify: `src/main.ts`

- [ ] **Step 1: Replace the startup load handler**

Find this block:

```ts
  window.addEventListener('load', () => {
    writeLines(BANNER);
  });
```

Replace it with:

```ts
  window.addEventListener('load', () => {
    writeLines(BANNER);

    setTimeout(() => {
      writeLines(ABOUT);
    }, BANNER.length * 40);
  });
```

This uses the existing line delay in `displayText`, waits until the banner sequence is done, then prints the existing about output.

- [ ] **Step 2: Run the build**

Run:

```bash
npm run build
```

Expected: PASS with TypeScript and Vite build output.

- [ ] **Step 3: Commit the startup behavior**

```bash
git add src/main.ts
git commit -m "feat: show about on startup"
```

### Task 4: Browser Verification

**Files:**
- Verify: `config.json`
- Verify: `src/css/style.css`
- Verify: `src/main.ts`

- [ ] **Step 1: Start the local dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite reports a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify first load visually**

Open the Vite URL and confirm:

- The body background is pitch black, not purple.
- The border is muted gray-blue.
- The banner is blue.
- The prompt uses green/cyan/purple accents.
- The `about` section appears automatically below the banner.
- The input remains focused after clicking the page.

- [ ] **Step 3: Verify manual `about` still works**

Type:

```text
about
```

Expected: A second copy of the about section prints below the typed command.

- [ ] **Step 4: Verify no startup regressions**

Type:

```text
help
projects
clear
```

Expected:

- `help` prints command help.
- `projects` prints project links.
- `clear` clears prior output and leaves the prompt/input usable.

### Task 5: Final Check

**Files:**
- Verify all modified files

- [ ] **Step 1: Inspect the diff**

Run:

```bash
git diff -- config.json src/css/style.css src/main.ts
```

Expected: Diff contains only theme color changes and the startup `ABOUT` call.

- [ ] **Step 2: Run final build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Optional final commit if previous task commits were skipped**

If the earlier commits were not made individually, run:

```bash
git add config.json src/css/style.css src/main.ts
git commit -m "feat: apply nvchad dark startup theme"
```

## Self-Review

- Spec coverage: The plan covers the pitch-black NvChad-like color request and automatic `about` startup behavior.
- Placeholder scan: No implementation step relies on unspecified TODOs.
- Type consistency: `ABOUT`, `BANNER`, and `writeLines` already exist in `src/main.ts`; the startup change reuses those existing symbols.
