# WebShell

WebShell is my terminal-style portfolio, built to present work, background, and contact details through a shell-like interface instead of a traditional landing page.

Live site: https://hughscott.dev/
## About

The design blends a NixOS, macOS, and oh-my-posh-inspired shell aesthetic: clean prompts, soft terminal contrast, and a polished command-line feel. It is meant to feel like a personal workstation turned into a portfolio.

## What You Can Explore

- A short introduction and contact links.
- Selected projects and experience.
- Browser/device details through `whoami`.
- Theme switching with `dark`, `light`, and `system`.

## Commands

- `help` or `ls` - list available commands.
- `about` - view the introduction.
- `projects` - browse selected work.
- `ex` - see background and experience.
- `whoami` - inspect browser/device details.
- `contact` - open email.
- `repo` - open the repository.
- `dark`, `light`, `system` - switch themes.
- `clear` - clear the terminal.

## Tech

- Vite
- TypeScript
- HTML and CSS
- Bun

## Local Development

```bash
bun install
bun run dev
```

Build for production:

```bash
bun run build
```
