"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { useCancelBooking } from "../model/useCancelBooking";

interface CancelBookingButtonProps {
  bookingId: string;
  hostId: string;
  listingId: string;
  listingName: string;
  className?: string;
}

export function CancelBookingButton({
  bookingId,
  hostId,
  listingId,
  listingName,
  className,
}: CancelBookingButtonProps) {
  const router = useRouter();
  const { mutate, isPending } = useCancelBooking();

  function handleCancel() {
    mutate(
      { bookingId, hostId, listingId, listingName },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className={
              className ??
              "rounded-xl border border-brand-200 bg-white py-3 text-sm font-bold text-brand-900 transition-all hover:bg-brand-50 active:scale-[0.98]"
            }
          >
            예약 취소
          </button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            &apos;{listingName}&apos; 예약을 취소할까요?
          </AlertDialogTitle>
          <AlertDialogDescription>
            취소 후에는 되돌릴 수 없어요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>돌아가기</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                취소 중...
              </span>
            ) : (
              "예약 취소하기"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
