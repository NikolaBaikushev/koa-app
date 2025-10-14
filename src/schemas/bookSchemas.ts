import z from 'zod';

export const CreateBookSchema = z.object({
    title: z.string().nonempty('Title cannot be empty!'),
    author: z.string().nonempty('Authro cannot be empty!'),
});

export const UpdateBookSchema = CreateBookSchema.partial();

export type CreateBookPayload = z.infer<typeof CreateBookSchema>;
export type UpdateBookPayload = z.infer<typeof UpdateBookSchema>;