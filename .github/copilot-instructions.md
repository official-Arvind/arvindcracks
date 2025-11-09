## Copilot / AI agent instructions — arvindcracks

This file contains concise, repository-specific guidance for AI coding agents to be immediately productive.

### Big picture (what this repo is)
- Frontend: React + TypeScript + Vite located in `src/` (entry: `src/main.tsx`, root component `src/App.tsx`).
- Backend: minimal Express API in `server/api.js` that loads scraper data and exposes endpoints under `/api/*`.
- Scraper: `server/scraper.js` (class `LrepacksScraper`) scrapes lrepacks.net, saves JSON to `data/scraped_software.json`, and can run on a schedule (node-cron).

### Key dataflow to know
1. `server/scraper.js` -> writes `data/scraped_software.json` via `saveData()`.
2. `server/api.js` loads that file on startup (`scraper.loadData()`) into memory and serves it via endpoints such as `/api/software` and `/api/software/:id`.
3. The frontend currently consumes the static JSON in development in `src/pages/Software.tsx` by fetching `/data/scraped_software.json` (note: it does not call the API by default).

### Important files and why they matter (quick reference)
- `server/scraper.js` — scraping logic, category list (`this.categories`), rating calc (Sentiment), ID generation (`generateId`), and cron schedule (`startScheduledScraping`). Change categories, limits or schedule here.
- `server/api.js` — API routes: `/api/software`, `/api/software/:id`, `/api/categories`, `/api/stats`, `/api/scrape`. Also starts scheduled scraping and triggers initial scrape if no existing data.
- `data/scraped_software.json` — canonical scraped dataset used by server and dev frontend.
- `src/pages/Software.tsx` — UI list, filtering/sorting, pagination. Note it fetches the static JSON at `/data/scraped_software.json`.
- `src/pages/SoftwareDetail.tsx` & `src/components/SoftwareCard.tsx` — detail view and card UI patterns (useful when adding fields or changing UI).
- `package.json` — useful npm scripts: `dev` (vite), `build`, `preview`, `scraper` (node server/scraper.js).

### Developer workflows & commands
- Run frontend dev server: `npm run dev` (Vite, default port ~5173).
- Run build: `npm run build`.
- Run scraper manually: `npm run scraper` (executes `node server/scraper.js`).
- Run the API directly: `node server/api.js` (the file uses ESM; `package.json` has `type: "module"`).
Tip: there's no combined `start` script; to develop against the API, run the API in one terminal and Vite in another.

### Project-specific conventions / gotchas
- Frontend sometimes reads the static JSON under `/data` instead of calling the Express API. When changing API contract, update `src/pages/Software.tsx` (or redirect calls) to prevent divergence.
- `scrapeAll()` intentionally limits details to a small sample per category (`slice(0, 5)`); this is a functional demo limit — be aware when increasing volume.
- `server/api.js` caches scraper data in-memory (`softwareData`). After manual scraping via `POST /api/scrape` the in-memory cache is replaced.
- `vite.config.ts` excludes `lucide-react` from optimizeDeps — if you add icons or change that package, remember this config.

### Integration points & external dependencies
- External sites: scraper targets `https://lrepacks.net` and relies on specific DOM selectors used in `scraper.js` (changes in that site will break scraping).
- Storage: JSON file at `data/scraped_software.json` acts as persistent data between runs.
- Scheduling: `node-cron` runs `scrapeAll()` every 6 hours by default (modify cron in `startScheduledScraping`).

### What an AI agent can do first (concrete tasks)
1. If asked to add a new API route, update `server/api.js` and add tests or a curl example referencing `/api/*` endpoints.
2. If asked to change UI fields, update `data/scraped_software.json` shape (via scraper) and update `SoftwareCard.tsx` and `SoftwareDetail.tsx` to consume new fields.
3. If asked to wire frontend to API during dev, add a Vite proxy or change fetch calls in `src/pages/Software.tsx` to `http://localhost:3001/api/software`.

### When editing code, check these places for related logic
- Pagination/sorting/filtering: `src/pages/Software.tsx` (client side). Also check server `/api/software` which supports `category`, `search`, `limit` query params.
- Scraper parsing rules and download-host list: `server/scraper.js` (very long `downloadHosts` list). Keep parsing logic conservative and add robust null checks when modifying.

### Final notes
- There is no existing `.github/copilot-instructions.md` to merge; this file is being created fresh. If you want stricter rules (tests, lint, CI details), point me to preferred tooling and I will add corresponding steps.
- Ask for clarification on any ambiguous behavior (for example: whether the frontend should call the API or use static JSON in production).

----
Please review this draft and tell me if you'd like more detail on any workflow (CI, debugging, tests) or if I should include quick code snippets for common edits (e.g., adding a Vite proxy, running API + frontend together).
