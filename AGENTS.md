# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) and other AI coding agents when working with code in this repository. `CLAUDE.md` points here — this file is the single source of truth; edit it, not `CLAUDE.md`.

## Repository Layout

The deployable app lives in the `portfolio/` subdirectory — run all npm commands from there, not the repo root. The root holds only deployment plumbing: `CNAME` (custom domain `vcalbucci.com`), `.github/workflows/deploy.yml`, and this file.

## Commands

```bash
cd portfolio
npm install        # once
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build → dist/
npm run lint       # ESLint (flat config: typescript-eslint + react-hooks + react-refresh)
npm run preview    # serve the production build locally
```

There is no test suite. `npm run build` runs `tsc -b` first with `strict`, `noUnusedLocals`, and `noUnusedParameters` enabled, so type errors — including merely unused variables — fail the build. Run it to validate changes.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: Node 18, `npm ci` (keep `portfolio/package-lock.json` in sync with `package.json`), `npm run build`, then `portfolio/dist` is published to GitHub Pages at https://vcalbucci.com. `vite.config.ts` uses `base: '/'` because of the custom domain — do not change it to a repo subpath. `dist/` is gitignored; never edit it.

## Architecture

Single-page React 19 + TypeScript + Vite 6 site. No routing, no state library, no CSS framework.

### Page composition

`src/main.tsx` → `App.tsx`, which stacks the sections in order: `NavBar`, `Profile` (hero with typewriter effect and the `AnimatedBackground` canvas), `About`, `Projects`, floating `ThemeToggle`, inline footer. `NavBar` scroll-spies and smooth-scrolls using a hardcoded `sections` array (`home`, `about`, `projects`) that must match the `id`s of the `<section>` elements the components render — adding or removing a page section means updating both sides.

`src/components/Experience.tsx` and `Contact.tsx` exist but are **not mounted** in `App.tsx` (Experience still contains placeholder data). Their stylesheets are still imported, so they can be re-enabled just by adding them to `App.tsx`.

### Theming (the main cross-cutting concern)

Three-state theme — light / dark / auto — cycled by `ThemeToggle` and persisted in `localStorage('theme')`:

- A manual choice adds a `light-mode` or `dark-mode` class to `<html>`; auto removes both and defers to `prefers-color-scheme`.
- Colors are CSS custom properties in `src/styles/global.css`, defined in **three parallel blocks**: `:root` (light default), `@media (prefers-color-scheme: dark) :root:not(.light-mode)` (auto-dark), and the `.dark-mode`/`.light-mode` class overrides. A palette change must be applied to every matching block.
- Components whose JS output depends on the theme (`Projects` swaps light/dark screenshot variants, `AnimatedBackground` picks canvas colors) detect it by checking the `<html>` classes with a `matchMedia('(prefers-color-scheme: dark)')` fallback, and track changes via a `MutationObserver` on `<html>`'s `class` attribute plus a media-query listener. Follow the same pattern in any new theme-aware component.

### Styling

One CSS file per component in `src/styles/`, wired through a chain of `@import`s — components import no CSS themselves: `index.css` → `style.css` → `styles/*.css` (with `styles/global.css` holding the variables, reset, and Poppins font). A new component's stylesheet must be added to `src/style.css`. Components also use inline `style` props for animation timing and one-off tweaks, so check both places when hunting a style.

Vite-template leftover to be aware of: `App.css` (imported but mostly unused). `index.css` now holds only the `style.css` import plus font-smoothing and body sizing — the template's OS-scheme-tied colors were removed because they fought the manual theme toggle; theme-aware `color-scheme` lives in `global.css`'s three theme blocks.

### Assets

Everything in `src/assets/` — icons, project screenshots, and the resume PDF (`Victor-Calbucci-Resume.pdf`, opened by the hero's Resume button) — is imported as an ES module so Vite fingerprints it into the bundle. Skill badges in `About.tsx` are hotlinked from img.shields.io. The production favicon is `portfolio/public/favicon.ico`.
