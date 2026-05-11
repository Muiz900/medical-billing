# Env-Driven React + Vite Frontend

Production-ready React + Vite frontend with public company/contact details sourced from `VITE_` environment variables.

## Requirements

- Node.js `18.18+`
- npm

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` folder.

## Deployment notes

- The app is a client-side SPA and includes route fallback support for common static hosts.
- `public/_redirects` handles Netlify-style rewrites.
- `vercel.json` handles Vercel rewrites.
- The HTML metadata, web manifest, favicon, and OG image are generated at build time from your public `VITE_` variables.
- The Vite build also emits `dist/404.html` for static hosts that use a 404 fallback pattern.
- `public/.nojekyll` is included for GitHub Pages-style static publishing.

## Vercel deployment

1. Import the repository into Vercel.
2. Keep the detected framework as `Vite`.
3. Add the public environment variables from `.env.example` in `Project Settings -> Environment Variables`.
4. Deploy with the default root output directory `dist`.

Required public env vars for this project:

- `VITE_COMPANY_NAME`
- `VITE_CONTACT_NAME`
- `VITE_CONTACT_EMAIL`
- `VITE_CONTACT_PHONE`
- `VITE_CONTACT_WEBSITE`
- `VITE_CONTACT_LINKEDIN`
- `VITE_CONTACT_TWITTER`
- `VITE_CONTACT_ADDRESS`

Optional Vercel env vars:

- `VITE_SITE_DESCRIPTION` to override the default metadata description.
- `VITE_APP_BASE` only if you are deploying under a subpath instead of the Vercel domain root.

## Base path deployments

If you deploy under a subfolder instead of the domain root, build with a base path:

```bash
VITE_APP_BASE=/your-subpath/ npm run build
```

Examples:

- `/clinic-site/`
- `/mhm/`

The router and generated asset paths will respect that base URL.

## Project structure

- `src/main.jsx`: app entry
- `src/App.jsx`: app shell and metadata handling
- `src/lib/router.jsx`: lightweight client-side router with base-path support
- `src/components/`: shared UI and page rendering
- `src/pages/HomePage.jsx`: homepage experience
- `src/data/pages.json`: imported page content
