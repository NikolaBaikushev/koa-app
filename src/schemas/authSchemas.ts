import {z} from 'zod';
import { UserRole } from './models/userEntitySchema';
import { userRouter } from '../routes/users/usersRouter';
export const RegisterUserSchema = z.object({
    username: z.string().nonempty('Username is required!'),
    password: z.string().nonempty('Password is required!'),
    confirmPassword: z.string().nonempty('Confirm Password is required!'),
    role: z.enum([UserRole.USER, UserRole.AUTHOR]).optional().default(UserRole.USER)
});

export const LoginUserSchema = z.object({
    username: z.string().nonempty('Username is required!'),
    password: z.string().nonempty('Password is required!'),
});

export type RegisterUserPayload = z.infer<typeof RegisterUserSchema>;
export type LoginUserPayload = z.infer<typeof LoginUserSchema>;
