-- ============================================================
-- 게스트의 예약 수정 규칙을 DB에서 강제
-- 1) 예약 내용(날짜, 인원, 금액 등)은 수정 불가
-- 2) 상태는 '취소'로만 바꿀 수 있고, 체크인 2일 전까지만 가능
-- ============================================================

create function public.enforce_guest_booking_update()
returns trigger as $$
declare
  today_kst date := (now() at time zone 'Asia/Seoul')::date;
begin
  -- 게스트 본인이 수정하는 경우에만 규칙 적용
  if auth.uid() = old.guest_id then

    -- 예약 내용 변경 금지
    if new.listing_id   <> old.listing_id
    or new.guest_id     <> old.guest_id
    or new.check_in     <> old.check_in
    or new.check_out    <> old.check_out
    or new.guests_count <> old.guests_count
    or new.total_price  <> old.total_price then
      raise exception '예약 정보는 변경할 수 없어요.'
        using errcode = 'P0001';
    end if;

    -- 상태 변경은 취소만, 체크인 2일 전까지
    if new.status <> old.status then
      if new.status <> 'cancelled' then
        raise exception '예약 상태를 변경할 수 없어요.'
          using errcode = 'P0001';
      end if;

      if old.check_in - today_kst < 2 then
        raise exception '체크인 2일 전까지만 취소할 수 있어요.'
          using errcode = 'P0001';
      end if;
    end if;

  end if;

  return new;
end;
$$ language plpgsql set search_path = public;

create trigger before_booking_update
  before update on public.bookings
  for each row execute procedure public.enforce_guest_booking_update();


create function public.set_booking_total_price()
returns trigger as $$
declare
  nightly_price integer;
begin
  select price_per_night into nightly_price
  from listings
  where id = new.listing_id;

  new.total_price := nightly_price * (new.check_out - new.check_in);
  return new;
end;
$$ language plpgsql set search_path = public;

create trigger before_booking_insert
  before insert on public.bookings
  for each row execute procedure public.set_booking_total_price();