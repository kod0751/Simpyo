-- ============================================================
-- 쉼터 데모 데이터 (seed)
--
-- [실행 전 준비]
--   Authentication → Users 에서 아래 데모 계정 5개를 먼저 만든다.
--     demo-host-1@example.com, demo-host-2@example.com
--     demo-guest-1@example.com, demo-guest-2@example.com, demo-guest-3@example.com
--
-- [특징]
--   - 여러 번 실행해도 같은 결과: 데모 계정의 데이터만 지우고 다시 만든다.
--   - 계정 id를 하드코딩하지 않고 이메일로 찾는다 → 다른 DB에서도 그대로 실행 가능
--   - 숙소 id는 고정값 → 다시 실행해도 /listings/{id} 주소가 바뀌지 않는다.
--   - 예약 날짜는 실행한 날(current_date) 기준 상대값 → 언제 실행해도
--     지난 예약에는 리뷰가, 앞으로의 예약은 캘린더에 막힌 날짜로 보인다.
--   - 예약 금액·평점은 직접 넣지 않는다 → 트리거가 계산한다.
--   - 전체를 트랜잭션으로 감싸 중간에 실패하면 아무것도 바뀌지 않는다.
-- ============================================================

begin;

-- ------------------------------------------------------------
-- 0. 헬퍼 (이 실행 세션에서만 쓰는 임시 함수)
-- ------------------------------------------------------------

create or replace function pg_temp.demo_user(p_email text)
returns uuid language sql stable as $$
  select id from auth.users where email = p_email
$$;

create or replace function pg_temp.demo_listing(p_no int)
returns uuid language sql immutable as $$
  select ('00000000-0000-4000-8000-' || lpad(p_no::text, 12, '0'))::uuid
$$;

create or replace function pg_temp.demo_booking(p_no int)
returns uuid language sql immutable as $$
  select ('00000000-0000-4000-9000-' || lpad(p_no::text, 12, '0'))::uuid
$$;

create or replace function pg_temp.unsplash(p_photo text)
returns text language sql immutable as $$
  select 'https://images.unsplash.com/photo-' || p_photo || '?auto=format&fit=crop&w=1200&q=80'
$$;

-- 데모 계정이 없으면 여기서 중단
do $$
begin
  if (select count(*) from auth.users where email like 'demo-%@example.com') < 5 then
    raise exception '데모 계정 5개를 먼저 만들어주세요. (Authentication → Users)';
  end if;
end $$;

-- ------------------------------------------------------------
-- 1. 기존 데모 데이터 정리
--    숙소를 지우면 예약 → 리뷰 → 알림이 on delete cascade로 함께 지워진다.
-- ------------------------------------------------------------

delete from public.listings
where host_id in (
  pg_temp.demo_user('demo-host-1@example.com'),
  pg_temp.demo_user('demo-host-2@example.com')
);

delete from public.bookings
where guest_id in (
  pg_temp.demo_user('demo-guest-1@example.com'),
  pg_temp.demo_user('demo-guest-2@example.com'),
  pg_temp.demo_user('demo-guest-3@example.com')
);

delete from public.wishlists
where user_id in (
  pg_temp.demo_user('demo-guest-1@example.com'),
  pg_temp.demo_user('demo-guest-2@example.com'),
  pg_temp.demo_user('demo-guest-3@example.com')
);

delete from public.notifications
where user_id in (select id from auth.users where email like 'demo-%@example.com');

-- ------------------------------------------------------------
-- 2. 데모 계정 프로필
-- ------------------------------------------------------------

update public.profiles p
set name = v.name,
    is_superhost = v.is_superhost
from (values
  ('demo-host-1@example.com',  '김하윤', true),
  ('demo-host-2@example.com',  '이도현', false),
  ('demo-guest-1@example.com', '박서연', false),
  ('demo-guest-2@example.com', '정민준', false),
  ('demo-guest-3@example.com', '최지우', false)
) as v(email, name, is_superhost)
where p.id = pg_temp.demo_user(v.email);

-- ------------------------------------------------------------
-- 3. 숙소 9개
--    주소는 동·리 단위까지만 (실제 개인 주소가 되지 않도록)
--    amenities / tags 는 lib/host 의 라벨과 정확히 같아야 아이콘이 매칭된다.
-- ------------------------------------------------------------

insert into public.listings (
  id, host_id, host_name, host_phone,
  name, description, address, region, category,
  price_per_night, max_guests, bedrooms, beds, bathrooms,
  amenities, tags, images, created_at
)
values
-- 1. 제주 · 풀빌라 · 김하윤
(
  pg_temp.demo_listing(1), pg_temp.demo_user('demo-host-1@example.com'), '김하윤', '01000000001',
  '스테이 사계, 바다 앞 프라이빗 풀빌라',
  E'산방산과 사계 바다가 한눈에 들어오는 프라이빗 풀빌라입니다.\n온수 풀에서 노을을 바라보고, 저녁에는 정원에서 바비큐를 즐겨보세요.',
  '제주 서귀포시 안덕면 사계리', '제주', 'pool',
  420000, 4, 2, 2, 2,
  array['무선 인터넷', '무료 주차', '주방', '냉난방', '바비큐', '스파·욕조'],
  array['오션뷰', '수영장', '독채'],
  array[
    pg_temp.unsplash('1613490493576-7fde63acd811'),
    pg_temp.unsplash('1600596542815-ffad4c1539a9'),
    pg_temp.unsplash('1522708323590-d24dbb6b0267')
  ],
  now() - interval '9 days'
),
-- 2. 강원 · 독채 · 이도현
(
  pg_temp.demo_listing(2), pg_temp.demo_user('demo-host-2@example.com'), '이도현', '01000000002',
  '사천진 바다 앞 독채',
  E'해변까지 걸어서 3분, 통창 너머로 동해가 펼쳐지는 독채입니다.\n가족이나 친구들과 함께 머물기 좋은 넉넉한 공간을 준비했어요.',
  '강원 강릉시 사천면 사천진리', '강원', 'house',
  280000, 6, 3, 3, 2,
  array['무선 인터넷', '무료 주차', '주방', '냉난방', 'TV', '세탁기'],
  array['오션뷰', '독채', '주차 무료'],
  array[
    pg_temp.unsplash('1564013799919-ab600027ffc6'),
    pg_temp.unsplash('1502672260266-1c1ef2d93688'),
    pg_temp.unsplash('1505693416388-ac5ce068fe85')
  ],
  now() - interval '8 days'
),
-- 3. 전라 · 한옥 · 김하윤
(
  pg_temp.demo_listing(3), pg_temp.demo_user('demo-host-1@example.com'), '김하윤', '01000000001',
  '고즈넉한 한옥, 마루',
  E'전주 한옥마을 골목 안쪽에 자리한 조용한 한옥입니다.\n대청마루에 앉아 차 한잔과 함께 처마 끝 하늘을 바라보세요.',
  '전북 전주시 완산구 교동', '전라', 'hanok',
  190000, 4, 2, 2, 1,
  array['무선 인터넷', '냉난방', '주방'],
  array['한옥 체험', '데크'],
  -- TODO: 한옥 외관·내부 사진으로 교체
  array[
    pg_temp.unsplash('1540518614846-7eded433c457'),
    pg_temp.unsplash('1484154218962-a197022b5858'),
    pg_temp.unsplash('1505691938895-1758d7feb511')
  ],
  now() - interval '7 days'
),
-- 4. 경기 · 숲속 · 이도현
(
  pg_temp.demo_listing(4), pg_temp.demo_user('demo-host-2@example.com'), '이도현', '01000000002',
  '숲속의 미니멀 캐빈',
  E'잣나무 숲 한가운데 놓인 작은 캐빈입니다.\n벽난로 앞에서 장작 타는 소리를 들으며 온전히 쉬어가세요.',
  '경기 가평군 상면 행현리', '경기', 'forest',
  230000, 2, 1, 1, 1,
  array['무선 인터넷', '무료 주차', '바비큐', '냉난방'],
  array['숲뷰', '벽난로', '독채'],
  array[
    pg_temp.unsplash('1510798831971-661eb04b3739'),
    pg_temp.unsplash('1449158743715-0a90ebb6d2d8'),
    pg_temp.unsplash('1518780664697-55e3ad937233')
  ],
  now() - interval '6 days'
),
-- 5. 서울 · 도심 · 김하윤
(
  pg_temp.demo_listing(5), pg_temp.demo_user('demo-host-1@example.com'), '김하윤', '01000000001',
  '성수 감성 시티 로프트',
  E'카페와 편집숍이 모인 성수동 골목의 복층 로프트입니다.\n높은 층고와 큰 창 덕분에 낮에는 햇살이, 밤에는 도시 불빛이 가득해요.',
  '서울 성동구 성수동2가', '서울', 'city',
  175000, 2, 1, 1, 1,
  array['무선 인터넷', '주방', '세탁기', 'TV', '냉난방'],
  array['시티뷰'],
  array[
    pg_temp.unsplash('1560448204-e02f11c3d0e2'),
    pg_temp.unsplash('1484154218962-a197022b5858'),
    pg_temp.unsplash('1505691938895-1758d7feb511')
  ],
  now() - interval '5 days'
),
-- 6. 충청 · 글램핑 · 이도현
(
  pg_temp.demo_listing(6), pg_temp.demo_user('demo-host-2@example.com'), '이도현', '01000000002',
  '안면도 솔숲 글램핑',
  E'소나무 숲 사이에 자리한 글램핑 텐트입니다.\n해변 산책 후 모닥불 앞에서 별을 보며 하루를 마무리해 보세요. 반려동물과 함께할 수 있어요.',
  '충남 태안군 안면읍 승언리', '충청', 'camping',
  160000, 4, 1, 2, 1,
  array['무료 주차', '바비큐', '반려동물 동반'],
  array['숲뷰', '주차 무료'],
  array[
    pg_temp.unsplash('1504280390367-361c6d9f38f4'),
    pg_temp.unsplash('1523987355523-c7b5b0dd90a7'),
    pg_temp.unsplash('1487730116645-74489c95b41b')
  ],
  now() - interval '4 days'
),
-- 7. 부산 · 풀빌라 · 김하윤
(
  pg_temp.demo_listing(7), pg_temp.demo_user('demo-host-1@example.com'), '김하윤', '01000000001',
  '기장 오션 인피니티 풀빌라',
  E'수평선과 이어지는 인피니티 풀이 있는 오션뷰 풀빌라입니다.\n객실마다 바다가 보이고, 실내 스파에서 하루의 피로를 풀 수 있어요.',
  '부산 기장군 기장읍 연화리', '부산', 'pool',
  380000, 6, 3, 3, 2,
  array['무선 인터넷', '무료 주차', '주방', '냉난방', 'TV', '스파·욕조'],
  array['오션뷰', '수영장', '스파'],
  array[
    pg_temp.unsplash('1566073771259-6a8506099945'),
    pg_temp.unsplash('1571896349842-33c89424de2d'),
    pg_temp.unsplash('1582719508461-905c673771fd')
  ],
  now() - interval '3 days'
),
-- 8. 서울 · 한옥 · 이도현
(
  pg_temp.demo_listing(8), pg_temp.demo_user('demo-host-2@example.com'), '이도현', '01000000002',
  '북촌 한옥 스테이 가회',
  E'북촌 골목에 자리한 작은 한옥입니다.\n서울 한복판에서 기와지붕 너머로 남산을 바라보는 특별한 하룻밤을 보내세요.',
  '서울 종로구 가회동', '서울', 'hanok',
  240000, 3, 1, 2, 1,
  array['무선 인터넷', '냉난방', '주방'],
  array['한옥 체험', '시티뷰'],
  -- TODO: 한옥 외관·내부 사진으로 교체
  array[
    pg_temp.unsplash('1522708323590-d24dbb6b0267'),
    pg_temp.unsplash('1505693416388-ac5ce068fe85'),
    pg_temp.unsplash('1540518614846-7eded433c457')
  ],
  now() - interval '2 days'
),
-- 9. 경상 · 독채 · 김하윤
(
  pg_temp.demo_listing(9), pg_temp.demo_user('demo-host-1@example.com'), '김하윤', '01000000001',
  '황리단길 돌담 독채',
  E'황리단길 끝자락, 돌담으로 둘러싸인 아늑한 독채입니다.\n대릉원과 첨성대까지 걸어서 다녀올 수 있어요.',
  '경북 경주시 황남동', '경상', 'house',
  210000, 4, 2, 2, 1,
  array['무선 인터넷', '무료 주차', '주방', '냉난방', '세탁기'],
  array['독채', '데크', '주차 무료'],
  array[
    pg_temp.unsplash('1600585154340-be6161a56a0c'),
    pg_temp.unsplash('1556909114-f6e7ad7d3136'),
    pg_temp.unsplash('1505691938895-1758d7feb511')
  ],
  now() - interval '1 day'
);

-- ------------------------------------------------------------
-- 4. 예약 + 리뷰 원본
--    start_offset: 오늘로부터 며칠 뒤에 체크인하는지 (음수 = 과거)
--    rating이 있는 행 = 지난 예약 + 리뷰 / rating이 null인 행 = 앞으로의 예약
--    같은 숙소 안에서 날짜가 겹치지 않게 배치 (EXCLUDE 제약)
-- ------------------------------------------------------------

create temp table seed_stays (
  booking_no   int,
  listing_no   int,
  guest_no     int,
  start_offset int,
  nights       int,
  guests       int,
  rating       int,
  content      text
) on commit drop;

insert into seed_stays values
-- 1. 사계 풀빌라 (5, 5, 4 → 4.7)
(101, 1, 1, -75, 3, 2, 5, '온수 풀에서 바라본 산방산 노을이 아직도 생생해요. 침구도 정말 포근했습니다.'),
(102, 1, 2, -48, 2, 4, 5, '부모님 모시고 다녀왔는데 모두 만족하셨어요. 바비큐 준비가 잘 되어 있어서 편했습니다.'),
(103, 1, 3, -20, 3, 2, 4, '뷰와 수영장은 최고였어요. 다만 주변에 편의점이 멀어서 미리 장을 봐가시는 걸 추천해요.'),
(104, 1, 2,   9, 3, 2, null, null),

-- 2. 사천진 독채 (5, 4 → 4.5)
(201, 2, 3, -62, 2, 5, 5, '아침에 일어나 커튼을 걷으면 바로 바다예요. 아이들이 해변에서 정말 신나게 놀았어요.'),
(202, 2, 1, -27, 3, 4, 4, '공간이 넓고 깔끔했어요. 성수기라 그런지 주변이 조금 붐볐지만 숙소는 조용했습니다.'),
(203, 2, 3,  14, 2, 3, null, null),

-- 3. 전주 한옥 (5, 5 → 5.0)
(301, 3, 2, -55, 2, 2, 5, '대청마루에서 비 오는 소리를 들으며 쉬었던 시간이 최고였어요. 한옥마을과도 가깝습니다.'),
(302, 3, 1, -16, 1, 2, 5, '호스트님이 주변 맛집을 꼼꼼하게 알려주셔서 여행이 훨씬 즐거웠어요.'),
(303, 3, 3,   6, 2, 2, null, null),

-- 4. 가평 캐빈 (4, 5, 4 → 4.3)
(401, 4, 1, -80, 2, 2, 4, '벽난로 앞에서 보낸 저녁이 정말 좋았어요. 겨울에 다시 오고 싶습니다.'),
(402, 4, 3, -41, 2, 2, 5, '숲 냄새 맡으며 일어나는 아침이 이렇게 좋을 줄 몰랐어요. 완벽한 힐링이었습니다.'),
(403, 4, 2, -10, 1, 2, 4, '조용하고 아늑해요. 산길이라 밤에 운전할 땐 조금 조심하셔야 해요.'),
(404, 4, 1,  18, 2, 2, null, null),

-- 5. 성수 로프트 (4, 4 → 4.0)
(501, 5, 2, -33, 2, 1, 4, '성수동 카페 투어하기 딱 좋은 위치예요. 복층 구조가 독특했어요.'),
(502, 5, 3,  -8, 2, 2, 4, '인테리어가 감각적이고 깔끔해요. 주말 밤에는 바깥 소리가 조금 들리는 편이에요.'),
(503, 5, 1,   4, 3, 2, null, null),

-- 6. 안면도 글램핑 (5, 4 → 4.5)
(601, 6, 1, -45, 1, 4, 5, '강아지와 함께 갈 수 있는 곳을 찾다가 왔는데 너무 만족했어요. 별이 정말 많이 보여요.'),
(602, 6, 2, -22, 2, 3, 4, '모닥불과 바비큐 모두 좋았어요. 텐트라 밤에는 조금 쌀쌀하니 겉옷 챙기세요.'),
(603, 6, 3,  11, 2, 4, null, null),

-- 7. 기장 풀빌라 (5, 5, 5 → 5.0)
(701, 7, 3, -90, 3, 6, 5, '인피니티 풀 사진이 그대로예요. 친구들 여섯 명이 머물러도 넉넉했습니다.'),
(702, 7, 1, -50, 2, 4, 5, '스파에서 바다를 보며 반신욕을 했는데 최고의 경험이었어요.'),
(703, 7, 2, -15, 3, 5, 5, '청결도, 위치, 응대 모두 완벽했어요. 부산 여행 숙소는 앞으로 여기로 정했습니다.'),
(704, 7, 3,  21, 3, 4, null, null),

-- 8. 북촌 한옥 (4, 5 → 4.5)
(801, 8, 1, -38, 2, 2, 4, '서울 한가운데서 이런 고요함이라니. 골목이 좁아 짐이 많으면 조금 힘들 수 있어요.'),
(802, 8, 2, -13, 1, 2, 5, '외국인 친구와 함께 묵었는데 정말 좋아했어요. 한옥의 매력을 제대로 느꼈습니다.'),
(803, 8, 1,   8, 2, 2, null, null),

-- 9. 경주 독채 (5, 4, 4 → 4.3)
(901, 9, 2, -70, 2, 3, 5, '황리단길이 바로 앞이라 저녁 산책하기 좋았어요. 돌담 정원이 정말 예뻐요.'),
(902, 9, 3, -36, 2, 4, 4, '깔끔하고 아늑했어요. 주차 공간이 넓어서 편했습니다.'),
(903, 9, 1,  -6, 2, 2, 4, '대릉원까지 걸어서 금방이에요. 주방 도구가 잘 갖춰져 있었어요.'),
(904, 9, 2,  15, 3, 4, null, null);

-- 예약
--   total_price는 0으로 넣어도 before insert 트리거가 1박 요금 × 박수로 다시 계산한다.
--   guest_phone은 require_guest_phone 트리거 때문에 반드시 필요하다.
insert into public.bookings (
  id, listing_id, guest_id,
  check_in, check_out, guests_count,
  total_price, guest_phone, status, created_at
)
select
  pg_temp.demo_booking(s.booking_no),
  pg_temp.demo_listing(s.listing_no),
  pg_temp.demo_user('demo-guest-' || s.guest_no || '@example.com'),
  current_date + s.start_offset,
  current_date + s.start_offset + s.nights,
  s.guests,
  0,
  '0100000001' || s.guest_no,
  'confirmed',
  (current_date + s.start_offset - 14)::timestamptz
from seed_stays s;

-- 리뷰
--   insert할 때마다 refresh_listing_rating 트리거가 숙소 평점·리뷰 수를 갱신한다.
insert into public.reviews (
  booking_id, listing_id, guest_id, rating, content, created_at
)
select
  pg_temp.demo_booking(s.booking_no),
  pg_temp.demo_listing(s.listing_no),
  pg_temp.demo_user('demo-guest-' || s.guest_no || '@example.com'),
  s.rating,
  s.content,
  (current_date + s.start_offset + s.nights + 1)::timestamptz
from seed_stays s
where s.rating is not null;

commit;

-- ------------------------------------------------------------
-- 확인: 숙소별 평점과 예약 수
-- ------------------------------------------------------------
select
  l.name,
  l.category,
  l.rating,
  l.review_count,
  (select count(*) from public.bookings b
    where b.listing_id = l.id and b.check_in >= current_date) as 예정_예약
from public.listings l
where l.id::text like '00000000-0000-4000-8000-%'
order by l.id;