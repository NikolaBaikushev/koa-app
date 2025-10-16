import { db } from "../config/knex";
import { BookRepository } from "./BookRepository";
import { UserBookRepository } from "./UserBookRepository";
import { UserRepository } from "./UserRepository";

export class RepositoryManager {
    static readonly BooksRepository = BookRepository.getInstance(db);
    static readonly UsersRepository = UserRepository.getInstance(db);
    static readonly UsersBooksRepository = UserBookRepository.getInstance(db);
}