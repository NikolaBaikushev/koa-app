import { Knex } from 'knex';
import { UserBook } from '../schemas/models/userBookEntitySchema';
import { KnexRepository } from './Repository';

export class UserBookRepository extends KnexRepository<UserBook> {
    protected tableName: string = 'users_books';

    static #instance: UserBookRepository;

    private constructor(knex: Knex) {
        if (UserBookRepository.#instance) {
            throw new Error('UserBookRepository is singleton!');
        }
        super(knex);
    }

    public static getInstance(knex: Knex): UserBookRepository {
        if (!this.#instance) {
            this.#instance = new UserBookRepository(knex);
        }
        return this.#instance;
    }

    async removeBookFromUser(userId: number, bookId: number) {
        return this.qb.where({ user_id: userId, book_id: bookId }).delete().returning('*').then(rows => rows[0]);
    }

}