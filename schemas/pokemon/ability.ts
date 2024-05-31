import { z } from "zod";

export const Ability = z.object({
  ability: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  is_hidden: z.boolean(),
  slot: z.number(),
});

export type Ability = z.infer<typeof Ability>;
