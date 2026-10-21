/**
 * listings에서 누구나 조회할 수 있는 컬럼 목록.
 * host_phone은 제외 — get_listing_host_phone 함수로만 조회 가능.
 * DB의 컬럼 권한(grant select)과 반드시 같은 목록이어야 한다.
 */
export const LISTING_PUBLIC_COLUMNS = `
  id, host_id, name, description, address, region, category,
  price_per_night, max_guests, bedrooms, beds, bathrooms,
  amenities, tags, images, host_name,
  is_active, instant_book, rating, review_count,
  created_at, updated_at
`;
