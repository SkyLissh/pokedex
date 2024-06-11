import { useRef } from "react";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { Type } from "@/schemas/pokemon";

import { colorByType } from "@/functions/color-by-type";
import { ChevronDown } from "@/functions/icons/ChevronDown";
import { cn } from "@/functions/utils";

import { BottomSheetModal } from "@/components/sheets/bottom-sheet-modal";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type Props = {
  value?: Type;
  onSelect: (value?: Type) => void;
};

export function TypeSelectionSheet({ value, onSelect }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const bgColor = value ? colorByType(value) : "#333333";

  return (
    <>
      <Button
        variant="secondary"
        className={cn("grow basis-0", bgColor)}
        onPress={() => bottomSheetRef.current?.present()}
      >
        <Text className="grow text-center capitalize">{value ?? "All types"}</Text>
        <ChevronDown size={24} className="text-white" />
      </Button>

      <BottomSheetModal ref={bottomSheetRef} snapPoints={["50%", "80%"]}>
        <BottomSheetScrollView className="flex flex-col justify-center gap-4 rounded-t-lg p-4">
          <Text className="text-center text-lg font-bold">Select a type</Text>
          <Button
            variant="secondary"
            onPress={() => {
              onSelect(undefined);
              bottomSheetRef.current?.close();
            }}
          >
            <Text>All types</Text>
          </Button>
          {Type.options.map((type) => (
            <Button
              key={type}
              className={colorByType(type)}
              onPress={() => {
                onSelect(type);
                bottomSheetRef.current?.close();
              }}
            >
              <Text className="capitalize">{type}</Text>
            </Button>
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
}
