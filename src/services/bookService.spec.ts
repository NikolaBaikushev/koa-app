import { CustomHttpError } from "../common/HttpError";
import { RepositoryManager } from "../repository/RepositoryManager";
import { BookEntity } from "../schemas/models/bookEntitySchema";
import { bookService } from "./bookService";

describe('bookService', () => {
    const repository = RepositoryManager.BooksRepository;

    afterEach(() => jest.clearAllMocks());

    describe('bookService.getAllBooks', () => {
        it('it should return all books', async () => {
            const books = [{ id: 1, author: 'some', title: 'some' }] as BookEntity[];
            jest.spyOn(repository, 'getAll').mockResolvedValue(books);

            const result = await bookService.getAllBooks();
            expect(result).toBe(books);
        })
    })

    describe('bookService.getBookById', () => {
        it('it should the book', async () => {
            const id = 1;
            const book = { id: id, author: 'some', title: 'some' } as BookEntity;

            jest.spyOn(repository, 'findById').mockResolvedValue(book);

            const result = await bookService.getBookById(id);
            expect(result).toBe(book);
        })

        it('it should throw error if book is not found', async () => {
            const id = 1;

            jest.spyOn(repository, 'findById').mockResolvedValue(null);

            try {
                await bookService.getBookById(id);
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual(`Book with ID: ${id} not found!`)
            }
        })
    })
})