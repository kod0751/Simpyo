-- ============================================================
-- profiles: 슈퍼호스트 여부 컬럼 추가
-- ============================================================

alter table public.profiles
  add column is_superhost boolean not null default false;