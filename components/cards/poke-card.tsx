import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

import type { TypeInfo } from "@/schemas/pokemon";

import { bgImageByType } from "@/functions/bg-image-by-type";

import { AnimatedPressable } from "@/components/animated-pressable";
import { TypeBadge } from "@/components/type-badge";
import { useImageColors } from "@/hooks/use-image-colors";

type Props = {
  id: number;
  name: string;
  image: string | null;
  types: TypeInfo[];
};

export function PokeCard({ id, name, image, types }: Props) {
  const bgImage = bgImageByType(types[0].type.name);

  const color = useImageColors(image!);

  return (
    <Link href={`/pokemon/${id}`} asChild>
      <AnimatedPressable
        className="flex h-[126px] w-full flex-row justify-between gap-2 rounded-2xl border border-slate-300 transition-transform duration-300 ease-in-out active:scale-95"
        style={{ backgroundColor: `${color}33` }}
      >
        <View className="flex flex-col gap-2 p-4">
          <Text className="text-xs font-semibold">
            Nº {id.toString().padStart(3, "0")}
          </Text>
          <Text className="text-xl font-semibold capitalize">{name}</Text>
          <View className="flex flex-row gap-2">
            {types.map((type) => (
              <TypeBadge key={type.slot} type={type.type.name} />
            ))}
          </View>
        </View>
        <View
          className="relative flex h-full w-[126] flex-col items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <Image className="absolute size-32" source={bgImage} />
          <Image className="size-32" source={image} contentFit="cover" />
        </View>
      </AnimatedPressable>
    </Link>
  );
}
