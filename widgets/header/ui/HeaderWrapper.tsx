import { createClient } from "@/lib/supabase/server";
import { Header } from "./Header";

export async function HeaderWrapper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Header user={user} />;
}
