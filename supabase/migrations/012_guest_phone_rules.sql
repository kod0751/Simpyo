-- ============================================================
-- 게스트 연락처 규칙
-- 1) 형식: 휴대폰 번호 숫자만 (기존 예약은 비어 있을 수 있음)
-- 2) 새 예약은 연락처 필수
-- ============================================================

-- 1. 형식 검사 (null은 허용 — 기존 예약 때문)
alter table public.bookings
  add constraint guest_phone_format
  check (guest_phone is null or guest_phone ~ '^01[016789][0-9]{7,8}$');

-- 2. 새 예약은 연락처 필수
create function public.require_guest_phone()
returns trigger as $$
begin
  if new.guest_phone is null or new.guest_phone = '' then
    raise exception '연락처를 입력해 주세요.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$$ language plpgsql set search_path = public;

create trigger before_booking_insert_require_phone
  before insert on public.bookings
  for each row execute procedure public.require_guest_phone();