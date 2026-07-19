# Doulabot

An AI-powered wardrobe organizer with a Moroccan cultural identity. This is
the Phase 1 build: manual closet cataloging — onboarding, adding items with a
photo, browsing your closet grid, and viewing/deleting an item.

## What's in this project (plain-language tour)

You don't need a coding background to follow this — here's what each piece
does:

- **`index.html`** — the single page the browser actually loads. It pulls in
  the fonts (Playfair Display for headings, Inter for everything else) and
  points at `src/main.jsx` to start the app.
- **`src/main.jsx`** — the entry point. It boots up React and wraps the app
  in a router (`BrowserRouter`), which is what lets the app have multiple
  "pages" (like `/` and `/closet`) without reloading the browser.
- **`src/App.jsx`** — the map of pages: onboarding (`/`), the closet grid
  (`/closet`), adding an item (`/add-item`), and an item's detail view
  (`/item/:id`).
- **`src/pages/`** — one file per screen. `Onboarding.jsx` asks for a name
  and closet size. `ClosetGrid.jsx` shows everything you've catalogued (or a
  prompt to add your first item, if empty). `AddItem.jsx` is the photo +
  tagging form. `ItemDetail.jsx` shows one item full-size with a delete
  option.
- **`src/components/`** — small reusable pieces. `StarMark.jsx` draws the
  eight-pointed Moroccan star used as Doulabot's signature mark.
- **`src/lib/closetStore.js`** — where your closet items actually live right
  now: the browser's IndexedDB (a built-in local database), not Supabase.
  That means it works immediately with no account setup, but the data stays
  on whichever device/browser you use — it won't sync anywhere until this
  moves to Supabase in a later phase.
- **`src/lib/constants.js`** — the shared lists of categories, seasons, and
  occasions used in the add-item form and the closet grid's tags.
- **`src/lib/supabaseClient.js`** — sets up the connection to Supabase (the
  database/auth/storage service this app will eventually use for real
  accounts and cross-device sync). Wired up but unused for now.
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
4. **Phase 4** — styling advice: what flatters your silhouette, occasion, and
   skin tone (warm/cool undertone), framed as empowering, never corrective;
   plus jewelry recommendations by occasion and top/neckline shape,
   especially for women. Most sensitive phase — build last, after real user
   feedback, with warm language throughout ("colors that make you glow," not
   clinical "your season is...").
5. **Phase 5** — smart travel packing: given a trip's length and the
   destination's weather (calendar + weather API), recommend what to pack
   from the user's actual catalogued closet. Depends on Phase 1 (items to
   pack) and Phase 2 (outfits to pack as complete looks), so it can't be
   built or usefully tested before those exist.

## Design system

- Backgrounds: parchment `#FBF6EC` / ivory `#F6EEDD` (60–70% of every
  screen).
- Text: warm brown `#4A3320` (headings), `#8A7052` (secondary).
- Accents (rotate across tags/buttons, never one dominant color): deep,
  jewel-toned rather than flat/bright — fuchsia `#A6395F`, Majorelle blue
  `#1F5C78`, saffron `#B9760F`, emerald `#2E6B4C`.
- Serif (Playfair Display) for headings and item names; sans-serif (Inter)
  for functional UI.
- Flat design — no gradients or drop shadows. The eight-pointed Moroccan
  star appears sparingly as a signature mark.
