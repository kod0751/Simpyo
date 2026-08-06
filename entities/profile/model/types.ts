export type Profile = {
  id: string;
  role: string;
  name: string | null;
  avatar_url: string | null;
  phone: string | null;
  is_superhost: boolean;
  created_at: string;
  updated_at: string;
};
