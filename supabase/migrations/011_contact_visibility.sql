-- ============================================================
-- 연락처 공개 범위 제한
-- 호스트 번호: 호스트 본인 + 해당 숙소를 예약한 게스트만
-- 게스트 번호: 게스트 본인 + 예약한 숙소의 호스트만
-- ============================================================

-- --------------------------------------------------------------
-- 1. listings.host_phone을 공개 조회 컬럼에서 제외
-- --------------------------------------------------------------
revoke select on public.listings from anon, authenticated;

grant select (
  id, host_id, name, description, address, region, category,
  price_per_night, max_guests, bedrooms, beds, bathrooms,
  amenities, tags, images, host_name,
  is_active, instant_book, rating, review_count,
  created_at, updated_at
) on public.listings to anon, authenticated;

-- --------------------------------------------------------------
-- 2. bookings에 예약별 게스트 연락처 추가
-- --------------------------------------------------------------
alter table public.bookings
  add column guest_phone text;

comment on column public.bookings.guest_phone is
  '예약 시 입력받는 게스트 연락처. 게스트 본인과 해당 숙소 호스트만 조회 가능 (bookings RLS)';

-- --------------------------------------------------------------
-- 3. 호스트 번호 조회 함수
-- --------------------------------------------------------------
create function public.get_listing_host_phone(p_listing_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select l.host_phone
  from listings l
  where l.id = p_listing_id
    and (
      -- 호스트 본인
      l.host_id = auth.uid()
      -- 또는 이 숙소를 예약한 게스트 (취소된 예약 제외)
      or exists (
        select 1 from bookings b
        where b.listing_id = l.id
          and b.guest_id = auth.uid()
          and b.status <> 'cancelled'
      )
    );
$$;

grant execute on function public.get_listing_host_phone(uuid) to authenticated;