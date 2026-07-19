# Doulabot

An AI-powered wardrobe organizer with a Moroccan cultural identity. This is
the Phase 1 build: manual closet cataloging, starting with the onboarding
screen.

## What's in this project (plain-language tour)

You don't need a coding background to follow this — here's what each piece
does:

- **`index.html`** — the single page the browser actually loads. It pulls in
  the fonts (Playfair Display for headings, Inter for everything else) and
  points at `src/main.jsx` to start the app.
- **`src/main.jsx`** — the entry point. It boots up React and wraps the app
  in a router (`BrowserRouter`), which is what lets the app have multiple
  "pages" (like `/` and `/closet`) without reloading the browser.
- **`src/App.jsx`** — the map of pages. Right now it has two: the onboarding
  screen (`/`) and a placeholder closet screen (`/closet`) you land on after
  finishing onboarding.
- **`src/pages/`** — one file per screen. `Onboarding.jsx` is the first
  screen: it asks for a name and closet size, then saves that locally and
  moves you to `/closet`.
- **`src/components/`** — small reusable pieces. `StarMark.jsx` draws the
  eight-pointed Moroccan star used as Doulabot's signature mark.
- **`src/lib/supabaseClient.js`** — sets up the connection to Supabase (the
  database/auth/storage service this app will use). It's wired up but not
  used yet in Phase 1 — closet size and name are just saved in the browser
  for now.
- **`src/index.css`** — the design system: the parchment/ivory backgrounds,
  warm brown text colors, and the four accent colors (fuchsia, Majorelle
  blue, saffron, emerald), plus the two fonts. Every screen pulls its colors
  from here via Tailwind CSS.
- **`public/`** — static files served as-is: the favicon and the PWA icons
  (what shows up if someone installs the app to their home screen).
- **`vite.config.js`** — configuration for Vite (the tool that runs the app
  locally and bundles it for deployment) — Tailwind and the PWA plugin are
  wired in here.

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## Setting up Supabase (not required yet)

Phase 1 doesn't need Supabase — the onboarding screen just saves to your
browser for now. When later phases add real accounts and closets:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the project dashboard, go to **Project Settings > API** and copy the
   **Project URL** and **anon public key**.
3. Copy `.env.example` to a new file named `.env` and paste those values in.
4. Restart `npm run dev` so it picks up the new values.

`.env` is already excluded from git (see `.gitignore`), so your keys won't
get committed.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub (already done if you're reading this on the
   `claude/doulabot-project-brief-p14fil` branch).
2. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to
   **Workers & Pages > Create > Pages > Connect to Git** and pick this repo.
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. If you've set up Supabase, add `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` as environment variables in the Pages project
   settings (same values as your local `.env`).
5. Deploy — Cloudflare gives you a live URL, and every push to this branch
   will redeploy automatically.

## Build phases

1. **Phase 1 (current)** — manual cataloging: onboarding, add item, closet
   grid, item detail, create outfit, outfit gallery, profile/settings.
2. **Phase 2** — AI auto-tagging in the add-item flow.
3. **Phase 3** — space-planning tool + in-store shopping match.
4. **Phase 4** — styling/body/skin-tone advice.

## Design system

- Backgrounds: parchment `#FBF6EC` / ivory `#F6EEDD` (60–70% of every
  screen).
- Text: warm brown `#4A3320` (headings), `#8A7052` (secondary).
- Accents (rotate across tags/buttons, never one dominant color): fuchsia
  `#E85D75`, Majorelle blue `#2C6E8E`, saffron `#E0972E`, emerald `#3D8361`.
- Serif (Playfair Display) for headings and item names; sans-serif (Inter)
  for functional UI.
- Flat design — no gradients or drop shadows. The eight-pointed Moroccan
  star appears sparingly as a signature mark.
