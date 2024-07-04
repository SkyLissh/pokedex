import { z } from "zod";

export const EvolutionInfo = z.object({
  min_level: z.number(),
});

export type EvolutionInfo = z.infer<typeof EvolutionInfo>;
