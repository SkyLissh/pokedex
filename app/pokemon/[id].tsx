import { useMemo } from "react";

import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Loader } from "@/components/loader";
import { StatusBar } from "@/components/status-bar";
import { TypeBadge } from "@/components/type-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";

import { bgImageByType } from "@/functions/bg-image-by-type";
import { colorByType } from "@/functions/color-by-type";
import { ChevronLeft } from "@/functions/icons/ChevronLeft";
import { Heart } from "@/functions/icons/Heart";
import { MoveVertical } from "@/functions/icons/MoveVertical";
import { Weight } from "@/functions/icons/Weight";
import { cn } from "@/functions/utils";

import { EvolutionCard } from "@/components/cards/evolution_card";
import { useGenderPercents } from "@/hooks/use-gender-percents";
import { usePokemon } from "@/hooks/use-pokemon";

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error, isLoading } = usePokemon(Number(id));

  const bgColor = useMemo(() => {
    if (!data) return undefined;

    return colorByType(data.types[0].type.name);
  }, [data]);

  const image = useMemo(() => {
    if (!data) return undefined;

    return bgImageByType(data.types[0].type.name);
  }, [data]);

  const { male, female } = useGenderPercents(data?.specy.gender_rate);

  if (error) {
    return (
      <SafeAreaView>
        <View className="flex items-center justify-center">
          <Text>Error</Text>
          <Text>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading || !data) {
    return (
      <SafeAreaView className="grow">
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <StatusBar className={bgColor} />
      <SafeAreaView className="relative w-full" edges={["bottom"]}>
        <View
          className={cn(
            "absolute left-0 top-0 flex h-64 w-full items-center justify-center rounded-b-full",
            bgColor
          )}
        >
          <Image className="size-52" source={image} contentFit="cover" />
        </View>
        <View className="flex flex-col gap-4 p-4">
          <View className="flex flex-row justify-between">
            <Button
              className="active:bg-zinc-300/30"
              variant="ghost"
              size="icon"
              onPress={() => router.back()}
            >
              <ChevronLeft className="text-white" size={24} />
            </Button>
            <Button className="active:bg-zinc-300/30" variant="ghost" size="icon">
              <Heart className="text-white" size={24} />
            </Button>
          </View>
          <View className="flex items-center justify-center">
            <Image
              className="size-64"
              source={data.sprites[0].sprite.front_default}
              contentFit="cover"
            />
          </View>
          <Text className="text-3xl font-medium capitalize">{data.name}</Text>
          <Text className="text-base font-medium">
            Nº {data.id.toString().padStart(3, "0")}
          </Text>
          <View className="flex flex-row gap-4">
            {data.types.map((type) => (
              <TypeBadge key={type.slot} type={type.type.name} />
            ))}
          </View>
          <Text className="text-sm capitalize">
            {data.specy.descriptions[0].description
              .replaceAll("\n", " ")
              .replaceAll("\f", " ")}
          </Text>

          <View className="flex flex-row gap-4">
            <View className="flex grow flex-col gap-2">
              <View className="flex flex-row items-center gap-1">
                <Weight className="text-zinc-600" size={16} />
                <Text className="text-xs font-medium text-zinc-600">Weight</Text>
              </View>
              <View className="flex items-center justify-center rounded-lg border border-zinc-300 p-2">
                <Text className="text-lg font-medium">{data.weight / 10} kg</Text>
              </View>
            </View>

            <View className="flex grow flex-col gap-2">
              <View className="flex flex-row gap-1">
                <MoveVertical className="text-zinc-600" size={16} />
                <Text className="text-xs font-medium text-zinc-600">Height</Text>
              </View>
              <View className="flex items-center justify-center rounded-lg border border-zinc-300 p-2">
                <Text className="text-lg font-medium">{data.height / 10} m</Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-center font-medium">Gender</Text>
            <Progress
              value={male}
              className="h-2 bg-pink-500"
              indicatorClassName="bg-blue-500"
            />
            <View className="flex flex-row justify-between">
              <View className="flex flex-row gap-1">
                <Image source={require("@/assets/svg/male.svg")} className="size-6" />
                <Text className="font-medium">{male.toFixed(2)}%</Text>
              </View>
              <View className="flex flex-row gap-1">
                <Image source={require("@/assets/svg/female.svg")} className="size-6" />
                <Text className="font-medium">{female.toFixed(2)}%</Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-medium">Evolutions</Text>
            {data.specy.evolution_chain.species.map((evolution) => {
              const pokemon = evolution.pokemon[0];

              return (
                <EvolutionCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  evolutionInfo={evolution.evolution_info[0]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
