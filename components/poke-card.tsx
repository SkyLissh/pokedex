import { Text, View } from "react-native";

import type { Type } from "@/schemas/pokemon";
import { Image } from "expo-image";

type Props = {
  id: number;
  name: string;
  image: string | null;
  types: Type[];
};

export function PokeCard({ id, name, image, types }: Props) {
  return (
    <View className="flex w-full flex-row justify-between gap-2 rounded-2xl bg-lime-50">
      <View className="flex flex-col gap-2 p-4">
        <Text className="text-xs font-semibold">Nº {id}</Text>
        <Text className="text-xl font-semibold capitalize">{name}</Text>
        <View className="flex flex-row gap-2">
          {types.map((type) => (
            <View
              key={type.slot}
              className="flex flex-row items-center gap-2 rounded-full bg-green-500 p-2"
            >
              <View className="size-8 rounded-full bg-white ">
                <Image className="size-6" source={require("@/assets/svg/grass.svg")} />
              </View>
              <Text className="text-base font-bold capitalize text-white">
                {type.type.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View className="flex h-full w-[126] flex-col items-center justify-center rounded-2xl bg-green-500">
        <Image
          className="h-full w-full"
          source={image}
          contentFit="cover"
          cachePolicy="none"
        />
      </View>
    </View>
  );
}
