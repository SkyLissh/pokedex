import { z } from "zod";
import { EvolutionInfo } from "./evolution_info";
import { Pokemon } from "./pokemon";
import { Sprite } from "./sprite";
import { TypeInfo } from "./type-info";

export const PokemonDetail = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(TypeInfo),
  sprites: z.array(z.object({ sprite: Sprite })),
  specy: z.object({
    gender_rate: z.number(),
    descriptions: z.array(
      z.object({
        description: z.string(),
      })
    ),
    evolution_chain: z.object({
      species: z.array(
        z.object({
          evolution_info: z.array(EvolutionInfo),
          pokemon: z.array(Pokemon),
        })
      ),
    }),
  }),
});

export type PokemonDetail = z.infer<typeof PokemonDetail>;
