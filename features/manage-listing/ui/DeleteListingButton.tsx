"use client";

import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
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
import { useDeleteListing } from "../model/useDeleteListing";

interface DeleteListingButtonProps {
  id: string;
  name: string;
  images: string[];
}

export function DeleteListingButton({
  id,
  name,
  images,
}: DeleteListingButtonProps) {
  const router = useRouter();
  const { mutate, isPending } = useDeleteListing();

  function handleDelete() {
    mutate(
      { id, images },
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
            aria-label="숙소 삭제"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-brand-200 text-brand-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            &apos;{name}&apos;을(를) 삭제할까요?
          </AlertDialogTitle>
          <AlertDialogDescription>
            삭제하면 등록된 사진과 정보가 모두 사라지며 되돌릴 수 없어요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                삭제 중...
              </span>
            ) : (
              "삭제하기"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
