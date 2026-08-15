-- ============================================================
-- listings: title → name 컬럼명 변경 및 상세 필드 추가
-- ============================================================

alter table public.listings rename column title to name;

alter table public.listings
  add column category text not null default 'pool'
    check (category = any (array[
      'house', 'apartment', 'pool', 'ocean',
      'hanok', 'forest', 'city', 'lake', 'camping'
    ])),
  add column region text not null default '기타',
  add column tags text[] not null default '{}',
  add column bedrooms integer not null default 1,
  add column beds integer not null default 1,
  add column bathrooms integer not null default 1,
  add column host_name text,
  add column host_phone text;