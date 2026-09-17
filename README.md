# Deploy check (React)

A minimal React + Vite app for verifying a deployment pipeline actually
installs dependencies, runs a build step, and handles client-side routing
correctly — rather than just serving static files.

Three routes, all client-side via React Router:

- `/` — clock, environment readout, interactive ping log
- `/about` — what this app checks and why
- `/status` — a counter held in app-level state, to prove navigating
  between routes doesn't remount the whole app

## Local dev

```
npm install
npm run dev
```

## Deploy settings

Most platforms auto-detect Vite, but if asked explicitly:

- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Output / publish directory:** `dist`
- **Node version:** 18+ (built/tested on Node 22)

## Important: SPA fallback

Because every route is served from the same `index.html`, a direct visit
or refresh on `/about` or `/status` has to be rewritten back to
`index.html` by the host, or it 404s. `public/_redirects` already handles
this for Cloudflare Pages:

```
/*    /index.html   200
```

Vite copies anything in `public/` straight into `dist/` on build, so this
ships automatically — no extra config needed on Cloudflare's side.

## What to look for once deployed

- The clock is ticking (JS is executing, not just parsed once)
- The environment panel shows your live host/protocol/viewport
- "React version" resolves to a real version number (proves the bundled
  React package loaded, not just the page shell)
- Clicking "Log a ping" adds timestamped entries (state + re-render work)
- Clicking Home / About / Status changes the page without a full reload —
  check the "App loaded at" timestamp on the Routing panel, it should stay
  fixed while "This page rendered at" changes each time
- Refreshing directly on `/about` or `/status` still works (confirms the
  `_redirects` fallback is deployed and active)
- The Status page's visit counter climbs across navigations instead of
  resetting
