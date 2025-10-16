import { z } from 'zod';

export enum UserRole {
    USER = 'user',
    AUTHOR = 'author'
}

export const userEntitySchema = z.object({
    id: z.number().int().nonnegative(),
    username: z.string().min(1),
    password: z.string().min(1),
    role: z.enum([UserRole.USER, UserRole.AUTHOR]),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),

});

export type UserEntity = z.infer<typeof userEntitySchema>;

export type User = Pick<UserEntity, 'id' | 'username' | 'role'>;