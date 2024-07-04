import { Image } from "expo-image";
import { Text, View } from "react-native";

import type { EvolutionInfo, Pokemon } from "@/schemas/pokemon";

import { useImageColors } from "@/hooks/use-image-colors";

import { bgImageByType } from "@/functions/bg-image-by-type";
import { colorByType } from "@/functions/color-by-type";
import { MoveDown } from "@/functions/icons/MoveDown";
import { cn } from "@/functions/utils";

type Props = {
  pokemon: Pokemon;
  evolutionInfo?: EvolutionInfo;
};

export function EvolutionCard({ pokemon, evolutionInfo }: Props) {
  const color = useImageColors(pokemon.sprites[0].sprite.front_default);
  const image = bgImageByType(pokemon.types[0].type.name);

  return (
    <View className="flex flex-col gap-4">
      {evolutionInfo && (
        <View className="flex flex-row items-center justify-center gap-2">
          <MoveDown className="text-blue-700" />
          <Text className="text-sm font-medium text-blue-700">
            Level {evolutionInfo?.min_level}
          </Text>
        </View>
      )}

      <View className="flex flex-row gap-4 rounded-2xl border border-zinc-300 p-4">
        <View
          className="relative flex size-24 items-center justify-center rounded-xl"
          style={{ backgroundColor: color }}
        >
          <Image className="absolute size-20" source={image} />
          <Image className="size-24" source={pokemon.sprites[0].sprite.front_default} />
        </View>
        <View className="flex grow flex-col gap-2">
          <Text className="text-balance font-medium capitalize">{pokemon.name}</Text>
          <Text className="text-xs font-medium">
            Nº {pokemon.id.toString().padStart(3, "0")}
          </Text>
          <View className="flex flex-row gap-2">
            {pokemon.types.map((type) => {
              const bgColor = colorByType(type.type.name);
              const image = bgImageByType(type.type.name);

              return (
                <View
                  key={type.type.name}
                  className={cn(
                    "flex grow items-center justify-center rounded-full p-2",
                    bgColor
                  )}
                >
                  <Image className="size-6" source={image} />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
