import { z } from "zod";

export const userEntitySchema = z.object({
    id: z.number().int().nonnegative().optional(),
    username: z.string().min(1),
    password: z.string().min(1),
});

export type UserEntity = z.infer<typeof userEntitySchema>;