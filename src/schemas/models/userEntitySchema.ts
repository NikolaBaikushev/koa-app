import { z } from "zod";

export const userEntitySchema = z.object({
    id: z.number().int().nonnegative(),
    username: z.string().min(1),
    password: z.string().min(1),
});

// TODO: Add the created_at and updated_at ... 
export type UserEntity = z.infer<typeof userEntitySchema>;

export type User = Pick<UserEntity, 'id' | 'username'>;