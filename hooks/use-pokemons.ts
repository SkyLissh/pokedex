import { gql, useQuery } from "urql";

import type { Pokemon } from "@/schemas/pokemon";

const getAllPkemons = gql`
  query {
    pokemons: pokemon_v2_pokemon {
      id
      name
      types: pokemon_v2_pokemontypes {
        slot
        type: pokemon_v2_type {
          name
        }
      }
      sprites: pokemon_v2_pokemonsprites {
        sprite: sprites
      }
    }
  }
`;

export const usePokemons = () => {
  const [result] = useQuery<{ pokemons: Pokemon[] } | undefined>({
    query: getAllPkemons,
  });

  const { data, error, fetching: isLoading } = result;
  return { data: data?.pokemons, error, isLoading };
};
