<div align="center">
  <img alt="Logo" src="./public/assets/images/logo.png" width="100" />
</div>

<div align="center">

# Portfolio_v3

A personal portfolio, journal, and project archive - built with Next.js, styled with Tailwind, and content-managed through Sanity.

</div>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity&logoColor=white)](https://www.sanity.io)
[![Deployed on Cloudflare](https://img.shields.io/badge/Deployed_on-Cloudflare_Workers-F38020?logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/)

</div>

## About

This is my personal site - part portfolio, part journal, part playground for interface details. It's fully content-managed through Sanity, so every project, blog post, and even the About/Toolkit sections can be edited without touching code.

**Some extra details:**

- A custom cursor that trails the pointer and grows on hover
- A film-grain texture layered across the whole site (crisp images are deliberately exempted from it)
- Light/dark mode with SSR-safe theme detection - no flash of the wrong theme on load
- Three ways to browse project work: list, grid, and index views
- A tag-filterable blog with related-post matching
- Fully typed with TypeScript, including the Sanity content model (`lib/types.ts`)

## Tech Stack

| Layer     | Choice                                                                             |
| --------- | ---------------------------------------------------------------------------------- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, React Server Components)             |
| Language  | TypeScript                                                                         |
| Styling   | [Tailwind CSS](https://tailwindcss.com) v4                                         |
| CMS       | [Sanity](https://www.sanity.io) - Studio lives in a **separate repo** (see below)  |
| Animation | [Motion](https://motion.dev) (`motion/react`)                                      |
| Theming   | [`@teispace/next-themes`](https://www.npmjs.com/package/@teispace/next-themes)     |
| Icons     | [Lucide](https://lucide.dev)                                                       |
| Forms     | [Formspree](https://formspree.io)                                                  |
| Fonts     | Cabinet Grotesk (display), Satoshi (body), JetBrains Mono (accents)                |
| Hosting   | Cloudflare Workers, via the [OpenNext](https://opennext.js.org/cloudflare) adapter |

## Getting Started

### Prerequisites

- Node.js ≥ 20 (some dependencies request ≥ 24 - check `npm install` warnings)
- A Sanity project (free tier is fine) - [create one here](https://www.sanity.io/manage)
- Access to the companion [Sanity Studio repo](#sanity-studio) for editing content

### Setup

```bash
# clone and install
git clone <this-repo-url>
cd portfolio-v3
npm install

# environment variables
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FORMSPREE_FORM_ID=formspee_project_id
```

```bash
# run the dev server
npm run dev
```

Visit `http://localhost:3000` for the site. Content is managed separately - see [Sanity Studio](#sanity-studio) below.

### First-time content setup

Two sections are **singletons** - there's meant to be exactly one of each:

- **About Section** - bio, stats, and "currently" items
- **Toolkit Section** - your skills/stack, grouped by category

Open the Studio project and fill these in once before the homepage will render them (they return `null` until published).

## Sanity Studio

Studio lives in **its own standalone repo** - a plain Sanity Studio project (`npm create sanity@latest`), with no Next.js, Cloudflare, or Workers involved. It's deployed straight to Sanity's own free hosting:

```bash
npx sanity deploy
```

which publishes it to `https://<your-studio-hostname>.sanity.studio` - no separate hosting account, build pipeline, or bundle-size limit to worry about.

**The two repos share nothing at build time** - they're connected purely through Sanity's hosted API:

| Repo          | Needs                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| This frontend | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (read-only, via the CDN) |
| Studio repo   | Same `projectId` / `dataset`, configured in its `sanity.config.ts`                     |

**Keeping the two in sync:**

- **CORS origins** - in [sanity.io/manage](https://www.sanity.io/manage) → API → CORS Origins, make sure this frontend's production domain (and `http://localhost:3000` for local dev) is allowed. The `.sanity.studio` domain is added automatically on `sanity deploy`.
- **Schema ↔ types** - schema changes (new fields, new document types) happen in the Studio repo and don't automatically propagate here. After changing a schema, update the matching interface in `lib/types.ts` and the relevant GROQ query in `lib/sanity.ts` by hand, or generate them straight from the schema with [Sanity TypeGen](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen) (`sanity typegen generate`) if you want the types to stay schema-accurate automatically instead of hand-maintained.
- **API version** - both repos pin an `apiVersion` (`NEXT_PUBLIC_SANITY_API_VERSION` here, `apiVersion` in the Studio config). They don't need to match exactly, but keeping them reasonably close avoids surprises if a query shape changes between API versions.
- **No auth token needed here** - this frontend only reads published content over the CDN (`perspective: "published"`, `useCdn: true` in production), so no API token or draft-mode secret is required in this repo's env vars. If you ever add preview-mode/draft content, that's when a read token would need to be introduced.

## Project Structure

```
app/
  layout.tsx         # root layout - theme, nav, footer, grain texture
  page.tsx           # home
  work/[slug]/       # individual project pages
  blog/[slug]/       # individual blog posts
components/
  ui/                # shared, reusable UI primitives
  layout/            # navbar + footer
  icons/             # brand icons
features/
  home/              # homepage sections (Hero, About, Toolkit, Contact, ...)
  work/              # project listing & detail components
  blog/              # blog listing & detail components
lib/
  sanity/
    client.ts        # Sanity client instance + config
    image.ts         # urlFor() image URL builder
    queries.ts       # all GROQ queries live here, typed against lib/types.ts
  types.ts           # TypeScript interfaces for every Sanity document/content shape
```

---

## Content Model

| Type                    | What it's for                                                    |
| ----------------------- | ---------------------------------------------------------------- |
| `project`               | Portfolio work - design, web, mobile, full-stack                 |
| `blogPost`              | Journal entries, with tags for filtering + related-post matching |
| `about` _(singleton)_   | Homepage About section                                           |
| `toolkit` _(singleton)_ | Homepage skills/stack grid                                       |
| `testimonial`           | (if in use - but it's not included in the website ui yet)        |
| `blockContent`          | Shared rich-text schema used across the above                    |

---

## Deployment

Deployed to **Cloudflare Workers** via the [OpenNext](https://opennext.js.org/cloudflare) adapter - not a static export, since this site relies on server-side rendering (Sanity-driven dynamic routes, cookie-based theme detection on every request).

> **Next.js version note:** `@opennextjs/cloudflare` requires Next.js `>=15.5.21 <16` or `>=16.2.11` - anything in between (e.g. a fresh `16.0.x`/`16.1.x` install) will fail to resolve. Run `npm install next@latest react@latest react-dom@latest` first if `npm i @opennextjs/cloudflare` throws an `ERESOLVE` error.

**One-time setup:**

```bash
npm i @opennextjs/cloudflare@latest
npm i -D wrangler@latest
```

`wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "portfolio-v3",
  "compatibility_date": "2026-07-21",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS",
  },
}
```

`open-next.config.ts`:

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

`package.json` scripts:

```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
```

**Environment variables** (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, any Sanity API tokens) aren't picked up from `.env.local` automatically - set them via:

```bash
wrangler secret put SECRET_NAME
```

or, if deploying through a connected Git repo, in the Cloudflare dashboard under **Workers Builds → Build variables and secrets**.

**Deploying:**

```bash
npm run deploy
```

**Testing before deploying** — `npm run preview` runs the app inside the actual `workerd` runtime (not the Node.js dev server), so it's a meaningfully more accurate pre-flight check than `next dev`.

Worth keeping an eye on `npm run preview` output if bundle size becomes a concern down the line.
