import { z } from 'zod';

export const bookEntitySchema = z.object({
    id: z.number().int().nonnegative().optional(),
    author: z.string().min(1),
    title: z.string().min(1),
});

export type BookEntity = z.infer<typeof bookEntitySchema>;