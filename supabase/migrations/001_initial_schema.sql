-- ============================================================
-- 숙소 예약 프로젝트 초기 스키마
-- ============================================================

-- --------------------------------------------------------------
-- 1. profiles (auth.users 확장)
-- --------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'guest' check (role in ('guest', 'host', 'admin')),
  name text,
  avatar_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.profiles.role is
  'guest: 기본값 / host: 숙소 등록 시 자동 승격 / admin: 수동 부여';

-- 회원가입 시 auth.users -> profiles 자동 생성
-- 구글 OAuth 메타데이터는 보통 full_name / name / picture / avatar_url 중 일부만 채워지므로
-- coalesce로 우선순위를 두고 첫 번째로 존재하는 값을 사용한다.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    )
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- --------------------------------------------------------------
-- 2. listings (숙소)
-- --------------------------------------------------------------
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  address text not null,
  price_per_night integer not null check (price_per_night >= 0),
  max_guests integer not null default 1 check (max_guests >= 1),
  images text[] not null default '{}',
  amenities text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_listings_host on public.listings(host_id);
create index idx_listings_active on public.listings(is_active);

-- 숙소를 처음 등록하면 role을 host로 자동 승격
create function public.grant_host_role()
returns trigger as $$
begin
  update public.profiles
  set role = 'host'
  where id = new.host_id
    and role = 'guest';
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_listing_created
  after insert on public.listings
  for each row execute procedure public.grant_host_role();

-- --------------------------------------------------------------
-- 3. bookings (예약)
-- --------------------------------------------------------------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  guest_id uuid not null references public.profiles(id) on delete cascade,
  check_in date not null,
  check_out date not null,
  guests_count integer not null default 1 check (guests_count >= 1),
  total_price integer not null check (total_price >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_date_range check (check_out > check_in)
);

create index idx_bookings_listing on public.bookings(listing_id);
create index idx_bookings_guest on public.bookings(guest_id);
create index idx_bookings_status on public.bookings(status);

-- --------------------------------------------------------------
-- 4. updated_at 자동 갱신
-- --------------------------------------------------------------
create function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_updated_at_listings
  before update on public.listings
  for each row execute procedure public.set_updated_at();

create trigger set_updated_at_bookings
  before update on public.bookings
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- 5. Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.bookings enable row level security;

-- ---- profiles ----
create policy "profiles_select_all"
  on public.profiles for select
  using (true);  -- 호스트 프로필(이름, 아바타)은 공개되어야 하므로 전체 공개

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select role from public.profiles where id = auth.uid())
  );

-- ---- listings ----
create policy "listings_select_public_or_own"
  on public.listings for select
  using (is_active = true or host_id = auth.uid());

create policy "listings_insert_own"
  on public.listings for insert
  with check (auth.uid() = host_id);

create policy "listings_update_own"
  on public.listings for update
  using (auth.uid() = host_id);

create policy "listings_delete_own"
  on public.listings for delete
  using (auth.uid() = host_id);

-- ---- bookings ----
-- 게스트: 본인이 만든 예약만 조회
create policy "bookings_select_as_guest"
  on public.bookings for select
  using (auth.uid() = guest_id);

-- 호스트: 자신의 숙소에 걸린 예약 조회
create policy "bookings_select_as_host"
  on public.bookings for select
  using (
    auth.uid() in (
      select host_id from public.listings where id = listing_id
    )
  );

-- 게스트만 예약 생성 가능
create policy "bookings_insert_as_guest"
  on public.bookings for insert
  with check (auth.uid() = guest_id);

-- 게스트: 본인 예약 취소(update)
create policy "bookings_update_as_guest"
  on public.bookings for update
  using (auth.uid() = guest_id);

-- 호스트: 본인 숙소 예약의 상태 변경(승인/거절)
create policy "bookings_update_as_host"
  on public.bookings for update
  using (
    auth.uid() in (
      select host_id from public.listings where id = listing_id
    )
  );