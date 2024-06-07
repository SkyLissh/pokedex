import { z } from "zod";

import { Type } from "./type";

export const TypeInfo = z.object({
  slot: z.number(),
  type: z.object({ name: Type, url: z.string().url() }),
});

export type TypeInfo = z.infer<typeof TypeInfo>;
