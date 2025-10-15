import { BookEntity } from "../schemas/models/bookEntitySchema";
import { KnexRepository } from "./Repository";

export class BookRepository extends KnexRepository<BookEntity> {
    protected tableName: string = 'books'
}