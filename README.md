# Vinit Marbles

Production-ready marketing site, legal pages, and a stealth admin vault for
Vinit Marbles - a luxury stone and granite retailer in Narela, New Delhi.

Built with Next.js 14 (App Router), Tailwind CSS, shadcn/ui primitives,
Framer Motion, Lenis smooth scroll, and Supabase.

## 1. Install

```bash
npm install
```

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Where to get it | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings | Safe to expose publicly |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings | Safe to expose publicly (RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings | **Server only.** Never prefix with `NEXT_PUBLIC_`, never commit it |
| `ADMIN_PASSCODE` | You choose | The passcode typed into the stealth vault modal |
| `ADMIN_JWT_SECRET` | Generate with `openssl rand -base64 48` | Signs the admin session cookie |
| `NEXT_PUBLIC_SITE_URL` | Your deployed domain | Used for metadata/OG tags |

## 3. Set up Supabase

1. Create a new Supabase project.
2. Open the SQL editor and run everything in `supabase/schema.sql`. This creates
   the `trade_inquiries` table and locks it down with Row Level Security so that
   the public `anon` key can never read, update, or delete leads - only the
   server-side service role key (used exclusively in Server Actions and Route
   Handlers) can touch the data.

## 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 5. How the stealth admin vault works

- There are **no visible links** to `/admin` anywhere in the UI.
- Tap or click the `© 2026 Vinit Marbles` text in the footer **5 times within
  2 seconds**. This opens a glassmorphic passcode modal.
- Submitting the correct `ADMIN_PASSCODE` calls `POST /api/admin/login`, which
  issues a signed, HttpOnly, short-lived JWT session cookie (`vm_admin_session`)
  via `jose`, then redirects to `/admin`.
- `middleware.ts` verifies that cookie on every request to `/admin/*` and
  redirects to `/` if it's missing, expired, or invalid - the dashboard itself
  never renders without a valid session.
- The dashboard fetches leads with the Supabase **service role** key (server
  only), renders them in a data table, and lets you delete a row (server
  action, re-checks the session) or export everything to CSV
  (`GET /api/inquiries/export`, also session-gated).
- "Sign out" clears the cookie.

## 6. Deploying

This is a standard Next.js 14 app - deploy to Vercel or any Node host that
supports the App Router, Server Actions, and Edge Middleware. Set all the
environment variables above in your hosting provider's dashboard (never in
the repo). Rotate `ADMIN_PASSCODE` and `ADMIN_JWT_SECRET` periodically.

## Security notes

- `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_JWT_SECRET` must **never** be exposed
  to the browser. They're only imported in files marked with `import
  "server-only"` (`lib/auth.ts`, `lib/supabase-admin.ts`), which will throw a
  build error if accidentally bundled into client code.
- The login route has a small in-memory rate limiter to slow down passcode
  brute-forcing. For a production deployment with real traffic, swap this for
  a durable rate limiter (e.g. Upstash Redis) since in-memory state resets on
  every server restart/redeploy.
- Consider adding `robots.txt` disallow rules for `/admin` and this file
  already sets `robots: { index: false, follow: false }` on the admin page
  metadata as a secondary precaution (the real protection is the JWT check).
