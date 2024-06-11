import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useCallback } from "react";

import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { BottomSheetBackdrop, BottomSheetModal as Modal } from "@gorhom/bottom-sheet";

export const BottomSheetModal = forwardRef<
  ElementRef<typeof Modal>,
  ComponentPropsWithoutRef<typeof Modal>
>(({ children, ...props }, ref) => {
  const backdrop = useCallback((props: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />;
  }, []);

  return (
    <Modal
      ref={ref}
      backgroundStyle={{ borderRadius: 32 }}
      backdropComponent={backdrop}
      {...props}
    >
      {children}
    </Modal>
  );
});

BottomSheetModal.displayName = "BottomSheetModal";

export type BottomSheetModal = Modal;
