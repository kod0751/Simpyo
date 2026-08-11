"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  RegistrationSuccess,
  useRegistrationStore,
  useSubmitListing,
} from "@/features/host-registration";

export default function CompletePage() {
  const { form, reset } = useRegistrationStore();
  const { mutate, isPending, isSuccess, isError, error } = useSubmitListing();
  const hasSubmittedRef = useRef(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    async function submit() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAuthError(true);
        return;
      }

      mutate({ form, hostId: user.id }, { onSuccess: () => reset() });
    }

    submit();
  }, [form, mutate, reset]);

  if (authError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-brand-500">
          로그인 정보가 확인되지 않아 등록을 완료할 수 없어요.
          <br />
          다시 로그인 후 시도해 주세요.
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-brand-500">등록 처리 중입니다...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-brand-500">
          등록에 실패했어요. 잠시 후 다시 시도해 주세요.
          <br />
          <span className="text-sm text-brand-300">{error.message}</span>
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return <RegistrationSuccess title={form.title} />;
  }

  return null;
}
