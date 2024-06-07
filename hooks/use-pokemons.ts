import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import { Paginated } from "@/schemas/paginated";
import { Pokemon } from "@/schemas/pokemon/pokemon";

export const usePokemons = () => {
  const result = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem("pokemons");

      if (stored) {
        return Pokemon.array().parse(JSON.parse(stored));
      }

      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const data = Paginated.parse(await res.json());

      const chunks = data.results.reduce(
        (acc: { name: string; url: string }[][], curr, i) => {
          if (i % 400 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        },
        []
      );

      const pokemons: Pokemon[] = [];

      for (const chunk of chunks) {
        const p = await Promise.all(
          chunk.map(async (pokemon) => {
            const item = await fetch(pokemon.url);
            return Pokemon.parse(await item.json());
          })
        );

        pokemons.push(...p);
      }

      await AsyncStorage.setItem("pokemons", JSON.stringify(pokemons));

      return pokemons;
    },
  });

  return result;
};
