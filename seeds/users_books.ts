import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users_books").del();

    await knex("users_books").insert([
        { user_id: 1, book_id: 1 },
        { user_id: 1, book_id: 2 },
        { user_id: 1, book_id: 3 },
        { user_id: 2, book_id: 4 },
        { user_id: 2, book_id: 5 },
        { user_id: 3, book_id: 2 },
        { user_id: 3, book_id: 7 },
    ]);
};
