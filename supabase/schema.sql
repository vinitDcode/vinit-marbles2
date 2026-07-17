-- Run this in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

create table if not exists public.trade_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  project_details text not null
);

-- Enable Row Level Security. With RLS on and no policies for a role,
-- that role has zero access by default - this is our safety net.
alter table public.trade_inquiries enable row level security;

-- Belt-and-braces: explicitly deny anon/authenticated roles from ever
-- reading or deleting rows directly. The service role used by our
-- Next.js Server Actions and Route Handlers bypasses RLS entirely and
-- does not need a policy to operate - these policies exist purely so
-- the intent is explicit and auditable in the Supabase dashboard.

drop policy if exists "no anon select" on public.trade_inquiries;
create policy "no anon select"
  on public.trade_inquiries
  for select
  to anon, authenticated
  using (false);

drop policy if exists "no anon delete" on public.trade_inquiries;
create policy "no anon delete"
  on public.trade_inquiries
  for delete
  to anon, authenticated
  using (false);

drop policy if exists "no anon update" on public.trade_inquiries;
create policy "no anon update"
  on public.trade_inquiries
  for update
  to anon, authenticated
  using (false);

-- No insert policy is defined for anon/authenticated, so direct
-- client-side inserts using the anon key are also blocked. All inserts
-- happen server-side via submitInquiry() in lib/actions.ts, using the
-- service role key, which bypasses RLS by design.

create index if not exists trade_inquiries_created_at_idx
  on public.trade_inquiries (created_at desc);
