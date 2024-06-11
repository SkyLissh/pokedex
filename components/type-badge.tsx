import { Text, View } from "react-native";

import { Image } from "expo-image";

import { clsx } from "clsx";

import type { TypeInfo } from "@/schemas/pokemon";

import { colorByType } from "@/functions/color-by-type";
import { imageByType } from "@/functions/image-by-type";

export function TypeBadge({ type }: { type: TypeInfo }) {
  const bgColor = colorByType(type.type.name);
  const image = imageByType(type.type.name);

  return (
    <View
      className={clsx(
        "flex flex-row items-center gap-2 rounded-full py-2 pl-2 pr-4",
        bgColor
      )}
    >
      <View className="flex size-8 items-center justify-center rounded-full bg-white p-2">
        <Image className="size-full" source={image} contentFit="contain" />
      </View>
      <Text className="text-base font-bold capitalize text-white">{type.type.name}</Text>
    </View>
  );
}
