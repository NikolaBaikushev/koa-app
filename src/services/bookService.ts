import { CreateBookPayload, UpdateBookPayload } from '../schemas/bookSchemas';
import { generateId } from '../utils/generateId';
import { CustomHttpError } from '../common/HttpError';
import { BookRepository } from '../repository/BookRepository';
import { db } from '../config/knex';
import { BookEntity } from '../schemas/models/bookEntitySchema';
import { User } from '../schemas/models/userEntitySchema';

const repository = new BookRepository(db);

const getAllBooks = (): Promise<BookEntity[]> => {
    return repository.getAll()
}

const getBookById = async (id: number) => {
    const book = await repository.findById(id)

    if (!book) {
        throw new CustomHttpError(404, `Book with ID: ${id} not found! `);
    }

    return book
};

const getBooksByUserId = async (userId: number): Promise<BookEntity[]> => {
    return await repository.getBooksByUserId(userId);
}

// const createBook = (payload: CreateBookPayload, user: Omit<User, 'password'>) => {
//     const newBook = {
//         id: generateId(),
//         ...payload
//     };

//     user.books.push(newBook); // Mutable
//     // user.books = [...user.books, newBook]; // Immutable
//     return newBook;
// };

// const updateBook = (bookId: number, payload: UpdateBookPayload, user: Omit<User, 'password'>) => {
//     const book = user.books.find((b: Book) => b.id === bookId);
//     if (!book) {
//         throw new CustomHttpError(404, `Book doesn't exist or it is not owned by current user! Book ID: ${bookId}`)
//     }

//     // const updatedBook = Object.assign({}, book, body);
//     // user.books = user.books.map((b: Book)=>
//     //     b.id === book.id ? updatedBook : b
//     // ); // Immutable
//     Object.assign(book, payload); // Mutable
//     return book;
// };

// const deleteBook = (bookId: number, user: Omit<User, 'password'>) => {
//     const book = user.books.find((b: Book) => b.id === bookId);

//     if (!book) {
//         throw new CustomHttpError(404, `Book doesn't exist or it is not owned by current user! Book ID: ${bookId}`)
//     }

//     user.books = user.books.filter((b: Book) => b.id !== bookId);

//     // NOTE: This is used to check the mutable data ... 
//     const mutableUser = getMutableUser(user.id);
//     mutableUser!.books = user.books;

//     return book;
// };

// function getMutableUser(id: number) {
//     return data.users.find(user => user.id === id);
// }

export const bookService = {
    getAllBooks,
    getBookById,
    getBooksByUserId,
    // createBook,
    // updateBook,
    // deleteBook,

}