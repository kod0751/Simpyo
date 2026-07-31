import { HeaderWrapper } from "@/widgets/header/ui/HeaderWrapper";
import { RegisterFlow } from "@/widgets/registration-layout";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrapper />
      <RegisterFlow>{children}</RegisterFlow>
    </>
  );
}
