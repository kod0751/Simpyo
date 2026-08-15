-- ============================================================
-- 예약 기능: 즉시예약 플래그, 겹침 방지, 알림 테이블
-- ============================================================

-- --------------------------------------------------------------
-- 1. listings: 즉시예약 여부 (지금은 항상 true로 사용, 추후 승인제 대비)
-- --------------------------------------------------------------
alter table public.listings
  add column instant_book boolean not null default true;

comment on column public.listings.instant_book is
  'true: 게스트 예약 시 즉시 확정 / false: 호스트 승인 필요 (추후 기능)';

-- --------------------------------------------------------------
-- 2. bookings: 겹치는 날짜 예약 방지 (동시성 제어)
-- --------------------------------------------------------------
create extension if not exists btree_gist;

alter table public.bookings
  add constraint no_overlapping_bookings
  exclude using gist (
    listing_id with =,
    daterange(check_in, check_out, '[)') with &&
  )
  where (status != 'cancelled');

-- --------------------------------------------------------------
-- 3. notifications (신규 테이블)
-- --------------------------------------------------------------
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('booking_created', 'booking_cancelled')),
  booking_id uuid references public.bookings(id) on delete cascade,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_notifications_user on public.notifications(user_id);
create index idx_notifications_unread on public.notifications(user_id, is_read);

alter table public.notifications enable row level security;

create policy "notifications_select_own"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "notifications_update_own"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "notifications_insert_system"
  on public.notifications for insert
  with check (true);