import { z } from 'zod';

export const userBookSchema = z.object({
    book_id: z.number().int().nonnegative(),
    user_id: z.number().int().nonnegative(),
});

export type UserBookEntity = z.infer<typeof userBookSchema>;