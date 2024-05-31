import { z } from "zod";

export const Type = z.object({
  slot: z.number(),
  type: z.object({ name: z.string(), url: z.string().url() }),
});

export type Type = z.infer<typeof Type>;
