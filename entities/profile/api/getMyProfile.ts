import { createClient } from "@/lib/supabase/server";
import type { Profile } from "../model/types";

export async function getMyProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("getMyProfile error:", error);
    return null;
  }

  return data as Profile;
}
