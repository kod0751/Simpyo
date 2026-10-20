-- ============================================================
-- profiles.phone을 다른 사용자에게 노출하지 않도록 컬럼 권한 제한
-- RLS는 행 단위라 특정 컬럼만 숨길 수 없으므로 컬럼 권한을 사용
-- ============================================================

-- 1) 테이블 전체 조회 권한을 먼저 회수
revoke select on public.profiles from anon, authenticated;

-- 2) 공개해도 되는 컬럼만 다시 허용 (phone 제외)
grant select (id, role, name, avatar_url, is_superhost, created_at, updated_at)
  on public.profiles to anon, authenticated;