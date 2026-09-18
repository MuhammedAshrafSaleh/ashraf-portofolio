# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a static HTML/CSS/JS portfolio site for Muhammed Ashraf — a full-stack developer. No build step, no framework, no package manager. Open `index.html` directly in a browser or serve with any static file server.

## Running locally

```bash
# Any of these work:
open index.html
python3 -m http.server 8080
npx serve .
```

## File structure

- `index.html` — main portfolio page (home)
- `project-web.html` — CHR Developments case study
- `project-mobile.html` — debitPro case study
- `project-cashes.html` — Cashes case study
- `project-eux.html` — EUX Client App case study
- `project-lms.html` — FegmaPlatform LMS case study
- `style.css` — all styles; BEM naming, mobile-first, CSS custom properties
- `main.js` — all JS; vanilla ES6+, one IIFE, shared across all pages
- `assets/` — images organized by project (`chr/`, `debitpro/`, `cashes/`)
- `Screens/` — project screenshots organized by project folder
- `docs/` — feature documentation markdown files per project

## Architecture

**No build tooling.** Everything is plain HTML/CSS/JS — no TypeScript, no bundler, no npm.

**Single JS file (`main.js`):** All behavior lives in one IIFE. Page context is detected via `document.body.dataset.page` (`"home"` or project page name). The file handles: i18n, theming, terminal animation, scroll reveal, navbar scroll state, and event delegation.

**i18n system:** All UI strings are defined in the `I18N` object at the top of `main.js` as `{ key: { en: "...", ar: "..." } }`. Elements declare `data-i18n="key"` and `applyI18n()` injects the correct string as `innerHTML`. Language and theme are persisted in `localStorage` (`ma_lang`, `ma_theme`) and applied before first paint via an inline script in `<head>` to prevent flash.

**Theming:** Light/dark via `data-theme` attribute on `<html>`. All colours are CSS custom properties defined in `:root` (light) and `[data-theme="dark"]` (dark). Accent colour is green (`#178a2c`).

**RTL support:** When Arabic is active, `document.documentElement.dir = "rtl"` is set. Arrow SVGs in `main.js` (`arrowSvg`, `backArrowSvg`) flip direction based on `state.lang`.

**CSS conventions:** BEM block names (`navbar`, `hero`, `project-card`, etc.). Animations use `.anim-reveal` + `.anim-reveal--visible` toggled by IntersectionObserver. Font is Cairo (Google Fonts) for both display and body, monospace sections use JetBrains Mono / Cascadia Code.

## Adding a new project

1. Copy an existing `project-*.html` as a template
2. Set `data-page` on `<body>` to the new project slug
3. Add all i18n string keys to the `I18N` object in `main.js`
4. Mark HTML elements with `data-i18n="key"` for translated text
5. Add project images under `assets/<projectname>/`
6. Link the project card from `index.html`'s work section
