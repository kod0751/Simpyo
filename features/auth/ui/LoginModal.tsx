"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { useAuthModal } from "../model/useAuthModal";
import Image from "next/image";

export function LoginModal() {
  const { isOpen, close } = useAuthModal();
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const next = window.location.pathname;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(
          next,
        )}`,
      },
    });

    if (error) console.error(error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md rounded-2xl p-8">
        <DialogHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="text-3xl">🏡</span>
          </div>

          <DialogTitle className="text-2xl font-bold">Simpyo</DialogTitle>

          <DialogDescription className="text-sm leading-relaxed">
            로그인하고 숙소 예약과
            <br />
            나만의 여행을 시작해보세요.
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          size="lg"
          className="h-12 rounded-xl text-base font-medium"
        >
          <Image src="./icons/google.svg" alt="Google" width={18} height={18} />
          Google로 계속하기
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          로그인하면 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
        </p>
      </DialogContent>
    </Dialog>
  );
}
