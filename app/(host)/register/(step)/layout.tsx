import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HeaderWrapper } from "@/widgets/header/ui/HeaderWrapper";
import { RegisterFlow } from "@/widgets/registration-layout/ui/RegisterFlow";

export default async function RegisterStepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <HeaderWrapper />
      <RegisterFlow>{children}</RegisterFlow>
    </>
  );
}
