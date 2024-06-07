import { Text, View } from "react-native";

import { Image } from "expo-image";

import { clsx } from "clsx";

import type { TypeInfo } from "@/schemas/pokemon";

import { bgImageByType } from "@/functions/bg-image-by-type";
import { colorByType } from "@/functions/color-by-type";

import { TypeBadge } from "@/components/type-badge";

type Props = {
  id: number;
  name: string;
  image: string | null;
  types: TypeInfo[];
};

export function PokeCard({ id, name, image, types }: Props) {
  const bgColor = colorByType(types[0].type.name);
  const bgImage = bgImageByType(types[0].type.name);

  return (
    <View className="flex w-full flex-row justify-between gap-2 rounded-2xl border border-slate-300 bg-slate-100">
      <View className="flex flex-col gap-2 p-4">
        <Text className="text-xs font-semibold">Nº {id.toString().padStart(3, "0")}</Text>
        <Text className="text-xl font-semibold capitalize">{name}</Text>
        <View className="flex flex-row gap-2">
          {types.map((type) => (
            <TypeBadge key={type.slot} type={type} />
          ))}
        </View>
      </View>
      <View
        className={clsx(
          "relative flex h-full w-[126] flex-col items-center justify-center rounded-2xl",
          bgColor
        )}
      >
        <Image className="absolute size-32 text-red-300" source={bgImage} />
        <Image className="size-32" source={image} contentFit="cover" />
      </View>
    </View>
  );
}
