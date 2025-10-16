import { Knex } from 'knex';
import { BookEntity } from '../schemas/models/bookEntitySchema';
import { KnexRepository } from './Repository';

export class BookRepository extends KnexRepository<BookEntity> {
    protected tableName: string = 'books';

    static #instance: BookRepository;

    private constructor(knex: Knex) {
        if (BookRepository.#instance) {
            throw new Error("BookRepository is singleton!");
        }
        super(knex);
    }

    public static getInstance(knex: Knex): BookRepository {
        if (!this.#instance) {
            this.#instance = new BookRepository(knex);
        }
        return this.#instance;
    }

    async getBooksByUserId(userId: number): Promise<BookEntity[]> {
        return await this.qb.join('users_books', 'books.id', 'users_books.book_id')
            .where('users_books.user_id', userId)
            .select('books.*');
    }
}