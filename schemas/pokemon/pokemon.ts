import { z } from "zod";

import { Ability } from "./ability";
import { TypeInfo } from "./type-info";

export const Pokemon = z.object({
  abilities: z.array(Ability),
  base_experience: z.number().nullable(),
  forms: z.array(z.object({ name: z.string(), url: z.string().url() })),
  game_indices: z.array(
    z.object({
      game_index: z.number(),
      version: z.object({ name: z.string(), url: z.string().url() }),
    })
  ),
  height: z.number(),
  held_items: z.array(
    z.object({
      item: z.object({ name: z.string(), url: z.string().url() }),
    })
  ),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string(),
  moves: z.array(
    z.object({
      move: z.object({ name: z.string(), url: z.string().url() }),
    })
  ),
  sprites: z.object({
    back_default: z.string().url().nullable(),
    back_female: z.string().url().nullable(),
    back_shiny: z.string().url().nullable(),
    back_shiny_female: z.string().url().nullable(),
    front_default: z.string().url().nullable(),
    front_female: z.string().url().nullable(),
    front_shiny: z.string().url().nullable(),
    front_shiny_female: z.string().url().nullable(),
  }),
  cries: z.object({
    latest: z.string().url().nullable(),
    legacy: z.string().url().nullable(),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({ name: z.string(), url: z.string().url() }),
    })
  ),
  types: z.array(TypeInfo),
  name: z.string(),
});

export type Pokemon = z.infer<typeof Pokemon>;
