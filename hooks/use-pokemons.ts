import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import { Paginated } from "@/schemas/paginated";
import { Pokemon } from "@/schemas/pokemon/pokemon";

export const usePokemons = () => {
  const result = useQuery({
    queryKey: ["pokemons"],
    retry: false,
    queryFn: async () => {
      const stored = (
        await AsyncStorage.multiGet(Array.from({ length: 11 }, (_, i) => `pokemons-${i}`))
      ).map((e) => e[1]);

      if (!stored.includes(null)) {
        const x = stored.map((e) => Pokemon.array().parse(JSON.parse(e!)));
        return x.flat();
      }

      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const data = Paginated.parse(await res.json());

      const chunks = data.results.reduce(
        (acc: { name: string; url: string }[][], curr, i) => {
          if (i % 100 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        },
        []
      );

      const pokemons: Pokemon[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        const p = await Promise.all(
          chunk.map(async (pokemon) => {
            const item = await fetch(pokemon.url);
            return Pokemon.parse(await item.json());
          })
        );

        await AsyncStorage.setItem(`pokemons-${i}`, JSON.stringify(p));
        pokemons.push(...p);
      }

      return pokemons;
    },
  });

  return result;
};
