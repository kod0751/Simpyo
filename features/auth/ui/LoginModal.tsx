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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="mr-2 h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.207 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.278 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.278 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.176 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.143 35.091 26.715 36 24 36c-5.186 0-9.625-3.331-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.03 12.03 0 0 1-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          Google로 계속하기
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          로그인하면 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
        </p>
      </DialogContent>
    </Dialog>
  );
}
