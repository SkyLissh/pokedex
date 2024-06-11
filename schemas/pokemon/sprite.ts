import { z } from "zod";

export const Sprite = z
  .object({
    other: z.object({
      "official-artwork": z.object({
        front_default: z.string().url(),
        front_shyny: z.string().url().nullable(),
      }),
    }),
    back_default: z.string().url(),
    back_female: z.string().url().nullable(),
    back_shiny: z.string().url().nullable(),
    back_shiny_female: z.string().url().nullable(),
    front_default: z.string().url(),
    front_female: z.string().url().nullable(),
    front_shiny: z.string().url().nullable(),
    front_shiny_female: z.string().url().nullable(),
  })
  .transform((value) => ({
    ...value,
    other: {
      ...value.other,
      official_artwork: value.other["official-artwork"],
    },
  }));

export type Sprite = z.infer<typeof Sprite>;
