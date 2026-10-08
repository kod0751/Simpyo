-- ============================================================
-- 예약 가능 여부 조회 함수
-- RLS를 우회하되, 예약자/금액 없이 날짜 정보만 노출
-- ============================================================

-- 1. 특정 기간에 예약이 걸린 숙소 id 목록 (리스트 페이지 날짜 필터용)
create function public.get_unavailable_listing_ids(p_check_in date, p_check_out date)
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select distinct listing_id
  from bookings
  where status <> 'cancelled'
    and check_in < p_check_out
    and check_out > p_check_in;
$$;

-- 2. 특정 숙소의 예약 기간 목록 (상세 페이지 캘린더용)
create function public.get_listing_booked_ranges(p_listing_id uuid)
returns table (check_in date, check_out date)
language sql
stable
security definer
set search_path = public
as $$
  select b.check_in, b.check_out
  from bookings b
  where b.listing_id = p_listing_id
    and b.status <> 'cancelled'
    and b.check_out >= current_date;
$$;

grant execute on function public.get_unavailable_listing_ids(date, date) to anon, authenticated;
grant execute on function public.get_listing_booked_ranges(uuid) to anon, authenticated;