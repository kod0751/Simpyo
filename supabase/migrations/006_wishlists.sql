create table public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, listing_id)
);

create index idx_wishlists_user on public.wishlists(user_id);
create index idx_wishlists_listing on public.wishlists(listing_id);

alter table public.wishlists enable row level security;

create policy "wishlists_select_own"
  on public.wishlists for select
  using (auth.uid() = user_id);

create policy "wishlists_insert_own"
  on public.wishlists for insert
  with check (auth.uid() = user_id);

create policy "wishlists_delete_own"
  on public.wishlists for delete
  using (auth.uid() = user_id);