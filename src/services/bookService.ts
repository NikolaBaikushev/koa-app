import { CustomHttpError } from '../common/HttpError';
import { BookEntity } from '../schemas/models/bookEntitySchema';
import { CreateBookPayload, UpdateBookPayload } from '../schemas/bookSchemas';
import { RepositoryManager } from '../repository/RepositoryManager';

const repository = RepositoryManager.BooksRepository;

const getAllBooks = async (): Promise<BookEntity[]> => {
    return await repository.getAll();
};

const getBookById = async (id: number) => {
    const book = await repository.findById(id);

    if (!book) {
        throw new CustomHttpError(404, `Book with ID: ${id} not found!`);
    }

    return book;
};

const getBooksByUserId = async (userId: number): Promise<BookEntity[]> => {
    return await repository.getBooksByUserId(userId);
};

const createBook = async (payload: CreateBookPayload): Promise<BookEntity> => {
    return await repository.create(payload);
};

const updateBook = async (id: number, payload: UpdateBookPayload): Promise<BookEntity> => {
    const book = await repository.findById(id);
    if (!book) {
        throw new CustomHttpError(404, `Book with ID: ${id} Not Found`);
    }

    return await repository.update(id, payload);
};

const deleteBook = async (id: number) => {
    const book = await repository.findById(id);
    if (!book) {
        throw new CustomHttpError(404, `Book with ID: ${id} Not Found`);
    }

    return await repository.delete(id);
};

// function getMutableUser(id: number) {
//     return data.users.find(user => user.id === id);
// }

export const bookService = {
    getAllBooks,
    getBookById,
    getBooksByUserId,
    createBook,
    updateBook,
    deleteBook,

};