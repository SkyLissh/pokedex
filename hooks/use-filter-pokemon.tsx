import type { Pokemon, Type } from "@/schemas/pokemon";

export function useFilterPokemon(pokemons?: Pokemon[], type?: Type, name?: string) {
  if (!pokemons) return [];

  const byType = type
    ? pokemons.filter((pokemon) => pokemon.types.some((t) => t.type.name === type))
    : pokemons;
  const byName = name
    ? byType.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()))
    : byType;

  return byName;
}
