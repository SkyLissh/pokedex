import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PokeCard } from "@/components/poke-card";
import { usePokemons } from "@/hooks/use-pokemons";

export default function Page() {
  const { data, error, isLoading } = usePokemons();

  if (error) {
    return <Text>Error</Text>;
  }

  if (isLoading || !data) {
    return (
      <SafeAreaView className="grow">
        <View className="flex h-full w-full flex-col items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex h-screen w-screen">
      <View className="flex w-full grow flex-row p-4">
        <FlashList
          data={data}
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
      </View>
    </SafeAreaView>
  );
}
