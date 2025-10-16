import { Knex } from 'knex';

export const DB_BOOKS_SEED = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { title: '1984', author: 'George Orwell' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { title: 'Pride and Prejudice', author: 'Jane Austen' },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury' },
    { title: 'Moby-Dick', author: 'Herman Melville' },
    { title: 'War and Peace', author: 'Leo Tolstoy' },
    { title: 'The Odyssey', author: 'Homer' }
] as const;
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('books').del();

    // Inserts seed entries
    await knex('books').insert(DB_BOOKS_SEED);
};
