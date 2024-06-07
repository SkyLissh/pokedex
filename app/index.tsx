import { useMemo, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";

import { PokeCard } from "@/components/poke-card";
import { Input } from "@/components/ui/input";

import { usePokemons } from "@/hooks/use-pokemons";

import { Type } from "@/schemas/pokemon";

import { colorByType } from "@/functions/color-by-type";
import { ChevronDown } from "@/functions/icons/ChevronDown";
import { Search } from "@/functions/icons/Search";
import { cn } from "@/functions/utils";

export default function Page() {
  const { data, error, isLoading } = usePokemons();
  const [type, setType] = useState<Type | undefined>();
  const [name, setName] = useState("");
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const filteredData = useMemo(() => {
    if (!data) return [];

    const filteredType = type
      ? data.filter((pokemon) => pokemon.types.some((t) => t.type.name === type))
      : data;
    const filteredName = name
      ? filteredType.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(name.toLowerCase())
        )
      : filteredType;

    return filteredName;
  }, [data, type, name]);

  const bgColor = type ? colorByType(type) : "#333333";

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

  if (isLoading || !filteredData) {
    return (
      <SafeAreaView className="grow">
        <View className="flex h-full w-full flex-col items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className="flex flex-col gap-4 p-4">
        <Input
          placeholder="Search by name"
          value={name}
          onChangeText={setName}
          icon={<Search className="text-black" />}
          iconPosition="start"
        />

        <View className="flex flex-row gap-4">
          <Pressable
            className={cn(
              "flex grow flex-row items-center gap-2 rounded-full bg-[#333333] p-4",
              bgColor
            )}
            onPress={() => bottomSheetRef.current?.present()}
          >
            <Text className="grow text-center text-base font-semibold capitalize text-white">
              {type ?? "All types"}
            </Text>
            <ChevronDown size={24} className="text-white" />
          </Pressable>
        </View>
        <View className="flex w-full grow flex-row">
          {filteredData.length > 0 && (
            <FlashList
              data={filteredData}
              estimatedItemSize={200}
              ItemSeparatorComponent={({ index }) => <View key={index} className="h-4" />}
              renderItem={({ item }) => {
                return (
                  <PokeCard
                    id={item.id}
                    name={item.name}
                    image={item.sprites.front_default}
                    types={item.types}
                  />
                );
              }}
            />
          )}
        </View>
        <BottomSheetModal ref={bottomSheetRef} snapPoints={["50%", "80%"]}>
          <BottomSheetScrollView className="flex flex-col justify-center gap-4 rounded-t-lg p-4">
            <Text className="text-center text-lg font-bold">Select a type</Text>
            <Pressable
              className="rounded-full bg-[#333333] p-4"
              onPress={() => {
                setType(undefined);
                bottomSheetRef.current?.close();
              }}
            >
              <Text className="text-center text-lg font-bold text-white">All types</Text>
            </Pressable>
            {Type.options.map((type) => (
              <Pressable
                key={type}
                className={cn(
                  "flex flex-row items-center gap-2 rounded-full p-4",
                  colorByType(type)
                )}
                onPress={() => {
                  setType(type);
                  bottomSheetRef.current?.close();
                }}
              >
                <Text className="grow text-center text-base font-semibold capitalize text-white">
                  {type}
                </Text>
              </Pressable>
            ))}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </SafeAreaView>
  );
}
