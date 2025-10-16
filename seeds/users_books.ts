import { Knex } from 'knex';
import { DB_USER_SEEDS } from './users';
import { DB_BOOKS_SEED } from './books';

export async function seed(knex: Knex): Promise<void> {
    await knex('users_books').del();

    const user1 = await knex('users').select('id').where({username: DB_USER_SEEDS[0].username}).first();
    const user2 = await knex('users').select('id').where({username: DB_USER_SEEDS[1].username}).first();
    const user3 = await knex('users').select('id').where({username: DB_USER_SEEDS[2].username}).first();
    const user4 = await knex('users').select('id').where({username: DB_USER_SEEDS[3].username}).first();

    const book1 = await knex('books').select('id').where({title: DB_BOOKS_SEED[0].title}).first();
    const book2 = await knex('books').select('id').where({title: DB_BOOKS_SEED[1].title}).first();
    const book3 = await knex('books').select('id').where({title: DB_BOOKS_SEED[2].title}).first();
    const book4 = await knex('books').select('id').where({title: DB_BOOKS_SEED[3].title}).first();
    const book5 = await knex('books').select('id').where({title: DB_BOOKS_SEED[4].title}).first();
    const book6 = await knex('books').select('id').where({title: DB_BOOKS_SEED[5].title}).first();
    const book7 = await knex('books').select('id').where({title: DB_BOOKS_SEED[6].title}).first();
    const book8 = await knex('books').select('id').where({title: DB_BOOKS_SEED[7].title}).first();
    const book9 = await knex('books').select('id').where({title: DB_BOOKS_SEED[8].title}).first();
    const book10 = await knex('books').select('id').where({title: DB_BOOKS_SEED[9].title}).first();

    await knex('users_books').insert([
        { user_id: user1.id, book_id: book1.id },
        { user_id: user1.id, book_id: book2.id },
        { user_id: user1.id, book_id: book3.id },
        { user_id: user2.id, book_id: book4.id },
        { user_id: user2.id, book_id: book5.id },
        { user_id: user3.id, book_id: book2.id },
        { user_id: user3.id, book_id: book7.id },
        { user_id: user4.id, book_id: book8.id },
        { user_id: user4.id, book_id: book9.id },
        { user_id: user4.id, book_id: book10.id },
    ]);
};
