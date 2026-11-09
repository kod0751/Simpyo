"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useDragControls } from "framer-motion";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  children: ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  ariaLabel,
  children,
}: BottomSheetProps) {
  const isClient = useIsClient();
  const dragControls = useDragControls();

  // 열려 있는 동안 배경 스크롤 잠금 + ESC로 닫기
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-brand-950/40 backdrop-blur-sm"
          />
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) onClose();
            }}
            className="fixed inset-x-0 bottom-0 z-61 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-2xl"
          >
            {/* 손잡이 — 여기서만 끌 수 있음 */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="shrink-0 cursor-grab touch-none px-4 pt-3 pb-3 active:cursor-grabbing"
            >
              <div className="mx-auto h-1.5 w-10 rounded-full bg-brand-200" />
            </div>

            {/* 내용 */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
