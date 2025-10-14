import {z} from 'zod';
export const RegisterUserSchema = z.object({
    username: z.string().nonempty('Username is required!'),
    password: z.string().nonempty('Password is required!'),
    confirmPassword: z.string().nonempty('Confirm Password is required!'),
});

export const LoginUserSchema = z.object({
    username: z.string().nonempty('Username is required!'),
    password: z.string().nonempty('Password is required!'),
});

export type RegisterUserPayload = z.infer<typeof RegisterUserSchema>;
export type LoginUserPayload = z.infer<typeof LoginUserSchema>;
