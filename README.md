# Arka Cabinet (آرکا کابینت)

Frontend for a cabinet hardware shop and kitchen cabinet studio — Next.js 15, React 19, Tailwind CSS 4, React Three Fiber.

## Run locally

```bash
npm install
npm run dev   # http://localhost:3200
```

## Deploy (Vercel)

Import the repo in Vercel (framework preset: Next.js) and set:

| Variable | Example |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://arkacabinet.ir` |

This value is used for canonical URLs, sitemap, robots and JSON-LD.

## Content

- Brand, contact info, address: `src/lib/site.ts`
- Categories, products, services, projects, blog posts, FAQ: `src/lib/data.ts`
