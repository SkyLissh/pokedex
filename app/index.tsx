import { useState } from "react";
import { View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";

import { Loader } from "@/components/loader";
import { PokeCard } from "@/components/poke-card";
import { TypeSelectionSheet } from "@/components/type-selection-sheet";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { useFilterPokemon } from "@/hooks/use-filter-pokemon";
import { usePokemons } from "@/hooks/use-pokemons";

import type { Type } from "@/schemas/pokemon";

import { Search } from "@/functions/icons/Search";

export default function Page() {
  const { data, error, isLoading } = usePokemons();
  const [type, setType] = useState<Type | undefined>();
  const [name, setName] = useState("");

  const filteredData = useFilterPokemon(data, type, name);

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
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className="flex flex-col gap-4 p-4">
        <Input
          placeholder="Search by name"
          value={name}
          onChangeText={(text) => setName(text)}
          icon={<Search className="text-black" />}
          iconPosition="start"
        />

        <View className="flex flex-row gap-4">
          <TypeSelectionSheet value={type} onSelect={setType} />
        </View>

        <View className="flex w-full grow flex-row">
          {filteredData.length > 0 && (
            <FlashList
              data={filteredData}
              estimatedItemSize={126}
              ItemSeparatorComponent={({ index }) => <View key={index} className="h-4" />}
              renderItem={({ item }) => {
                return (
                  <PokeCard
                    id={item.id}
                    name={item.name}
                    image={item.sprites[0].sprite.front_default}
                    types={item.types}
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
