import { gql, useQuery } from "urql";

import type { PokemonDetail } from "@/schemas/pokemon";

const getPokemonById = gql`
  query ($id: Int!) {
    pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      types: pokemon_v2_pokemontypes {
        slot
        type: pokemon_v2_type {
          name
        }
      }
      sprites: pokemon_v2_pokemonsprites {
        sprite: sprites
      }
      specy: pokemon_v2_pokemonspecy {
        gender_rate
        descriptions: pokemon_v2_pokemonspeciesflavortexts(limit: 1) {
          description: flavor_text
        }
        evolution_chain: pokemon_v2_evolutionchain {
          species: pokemon_v2_pokemonspecies {
            evolution_info: pokemon_v2_pokemonevolutions {
              min_level
            }
            pokemon: pokemon_v2_pokemons {
              id
              name
              sprites: pokemon_v2_pokemonsprites {
                sprite: sprites
              }
              types: pokemon_v2_pokemontypes {
                slot
                type: pokemon_v2_type {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function usePokemon(id: number) {
  const [result] = useQuery<{ pokemon: PokemonDetail[] } | undefined>({
    query: getPokemonById,
    variables: { id },
  });

  const { data, error, fetching: isLoading } = result;
  return { data: data?.pokemon[0], error, isLoading };
}
