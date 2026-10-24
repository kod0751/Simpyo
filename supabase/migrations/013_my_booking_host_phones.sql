-- ============================================================
-- 게스트가 예약한 숙소들의 호스트 연락처를 한 번에 조회
-- 취소하지 않은 본인 예약이 있는 숙소만 반환
-- ============================================================

create function public.get_my_booking_host_phones()
returns table (listing_id uuid, host_phone text)
language sql
stable
security definer
set search_path = public
as $$
  select distinct l.id, l.host_phone
  from bookings b
  join listings l on l.id = b.listing_id
  where b.guest_id = auth.uid()
    and b.status <> 'cancelled'
    and l.host_phone is not null;
$$;

grant execute on function public.get_my_booking_host_phones() to authenticated;