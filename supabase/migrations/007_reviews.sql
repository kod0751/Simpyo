-- ============================================================
-- 리뷰 기능: reviews 테이블, listings 평점 집계 컬럼, 자동 갱신 트리거
-- ============================================================

-- --------------------------------------------------------------
-- 1. reviews
-- --------------------------------------------------------------
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  guest_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_reviews_listing on public.reviews(listing_id);
create index idx_reviews_guest on public.reviews(guest_id);

create trigger set_updated_at_reviews
  before update on public.reviews
  for each row execute procedure public.set_updated_at();

-- --------------------------------------------------------------
-- 2. listings 평점 집계 컬럼
-- --------------------------------------------------------------
alter table public.listings
  add column rating numeric(2,1) not null default 0,
  add column review_count integer not null default 0;

comment on column public.listings.rating is
  '리뷰 평균 평점. 트리거로 자동 갱신되므로 직접 수정 금지';

-- --------------------------------------------------------------
-- 3. 평점 자동 갱신 트리거
-- --------------------------------------------------------------
create function public.refresh_listing_rating()
returns trigger as $$
declare
  target_listing_id uuid;
begin
  target_listing_id := coalesce(new.listing_id, old.listing_id);

  update public.listings
  set
    rating = coalesce((
      select round(avg(rating)::numeric, 1)
      from public.reviews
      where listing_id = target_listing_id
    ), 0),
    review_count = (
      select count(*)
      from public.reviews
      where listing_id = target_listing_id
    )
  where id = target_listing_id;

  return null;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_review_changed
  after insert or update or delete on public.reviews
  for each row execute procedure public.refresh_listing_rating();

-- --------------------------------------------------------------
-- 4. RLS
-- --------------------------------------------------------------
alter table public.reviews enable row level security;

-- 리뷰는 모두에게 공개 (숙소 상세 페이지에서 비로그인도 봐야 함)
create policy "reviews_select_all"
  on public.reviews for select
  using (true);

-- 본인이 체크아웃을 마친 예약에 대해서만 작성 가능
create policy "reviews_insert_own_completed_booking"
  on public.reviews for insert
  with check (
    auth.uid() = guest_id
    and exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and b.guest_id = auth.uid()
        and b.listing_id = reviews.listing_id
        and b.status <> 'cancelled'
        and b.check_out < current_date
    )
  );

create policy "reviews_update_own"
  on public.reviews for update
  using (auth.uid() = guest_id);

create policy "reviews_delete_own"
  on public.reviews for delete
  using (auth.uid() = guest_id);