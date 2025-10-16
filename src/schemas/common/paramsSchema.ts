import z from "zod";

export const ParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
