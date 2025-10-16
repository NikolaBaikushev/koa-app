import { BookEntity } from '../schemas/models/bookEntitySchema';
import { KnexRepository } from './Repository';

export class BookRepository extends KnexRepository<BookEntity> {
    protected tableName: string = 'books';

    async getBooksByUserId(userId: number): Promise<BookEntity[]> {
        return await this.qb.join('users_books', 'books.id', 'users_books.book_id')
            .where('users_books.user_id', userId)
            .select('books.*');
    }
}