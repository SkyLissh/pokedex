import { z } from "zod";

import { Sprite } from "./sprite";
import { TypeInfo } from "./type-info";

export const Pokemon = z.object({
  name: z.string(),
  id: z.number(),
  types: z.array(TypeInfo),
  sprites: z.array(z.object({ sprite: Sprite })),
});

export type Pokemon = z.infer<typeof Pokemon>;
