import { z } from "zod";

export const Paginated = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    })
  ),
});

export type Paginated = z.infer<typeof Paginated>;
