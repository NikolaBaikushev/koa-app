import { CustomHttpError } from '../common/HttpError';
import { RepositoryManager } from '../repository/RepositoryManager';
import { CreateBookPayload, UpdateBookPayload } from '../schemas/bookSchemas';
import { BookEntity } from '../schemas/models/bookEntitySchema';
import { bookService } from './bookService';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('bookService', () => {
    const repository = RepositoryManager.BooksRepository;

    afterEach(() => jest.clearAllMocks());

    describe('bookService.getAllBooks', () => {
        it('it should return all books', async () => {
            const books = [{ id: 1, author: 'some', title: 'some' }] as BookEntity[];
            jest.spyOn(repository, 'getAll').mockResolvedValue(books);

            const result = await bookService.getAllBooks();
            expect(result).toBe(books);
            expect(repository.getAll).toHaveBeenCalled()
        });
    });

    describe('bookService.getBookById', () => {
        it('it should the book', async () => {
            const id = 1;
            const book = { id: id, author: 'some', title: 'some' } as BookEntity;

            jest.spyOn(repository, 'findById').mockResolvedValue(book);

            const result = await bookService.getBookById(id);
            expect(result).toBe(book);
            expect(repository.findById).toHaveBeenCalledWith(id)
        });

        it('it should throw error if book is not found', async () => {
            const id = 1;

            jest.spyOn(repository, 'findById').mockResolvedValue(null);

            try {
                await bookService.getBookById(id);
                expect(repository.findById).toHaveBeenCalledWith(id)
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual(`Book with ID: ${id} not found!`);
            }
        });
    });

    describe('bookService.getBooksByUserId', () => {
        it('it should return the books for the passed user id', async () => {
            const id = 1;
            const resultBook = {id: 1, title: 'book', author: 'book authro'} as BookEntity;

            jest.spyOn(repository, 'getBooksByUserId').mockResolvedValue([resultBook]);

            const result = await bookService.getBooksByUserId(id);
            expect(result.length).toEqual(1);
            expect(result[0]).toMatchObject(resultBook);
            expect(repository.getBooksByUserId).toHaveBeenCalledWith(id);
        });
    });

    describe('bookService.createBook', () => {
        it('should create book', async () => {
            const payload = { title: 'asd', author: 'asd'} as CreateBookPayload;

            jest.spyOn(repository,'create').mockResolvedValue({...payload, id: 1});

            const result = await bookService.createBook(payload);

            expect(result).toMatchObject(payload);
            expect(repository.create).toHaveBeenCalledWith(payload);
        });
    });

    describe('bookService.updatBook', () => {
        it('should update book', async () => {
            const id = 1;
            const payload = { title: 'asd', author: 'asd' } as UpdateBookPayload;
            const foundBook = { title: 'dsa', author: 'dsa', id: id};
            const updatedBookResult = { id: foundBook.id, title: payload!.title, author: payload!.author }  as BookEntity;

            jest.spyOn(repository, 'findById').mockResolvedValue(foundBook);
            jest.spyOn(repository,'update').mockResolvedValue(updatedBookResult);
            
            const result = await bookService.updateBook(id, payload);

            expect(repository.findById).toHaveBeenCalledWith(id);
            expect(repository.update).toHaveBeenCalledWith(id, payload);
            expect(result).toMatchObject(updatedBookResult);
        });
        
        it('should throw if no book found', async () => {
            const id = 1;
            const payload = { title: 'asd', author: 'asd' } as UpdateBookPayload;

            jest.spyOn(repository, 'findById').mockResolvedValue(null);
            
            try {
                await bookService.updateBook(id, payload);
                expect(repository.findById).toHaveBeenCalledWith(id);
                expect(repository.update).not.toHaveBeenCalled();

            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual(`Book with ID: ${id} Not Found`);
            }
        });
    });
    describe('bookService.deleteBook', () => {
        it('should delete book', async () => {
            const id = 1;
            const foundBook = { title: 'dsa', author: 'dsa', id: id};

            jest.spyOn(repository, 'findById').mockResolvedValue(foundBook);
            jest.spyOn(repository,'delete').mockResolvedValue(foundBook);
            
            const result = await bookService.deleteBook(id);

            expect(repository.findById).toHaveBeenCalledWith(id);
            expect(repository.delete).toHaveBeenCalledWith(id);
            expect(result).toStrictEqual(foundBook);
        });

        it('should throw if no book found', async () => {
            const id = 1;

            jest.spyOn(repository, 'findById').mockResolvedValue(null);
            
            try {
                await bookService.deleteBook(id);
                expect(repository.findById).toHaveBeenCalledWith(id);
                expect(repository.delete).not.toHaveBeenCalled();
            } catch (err: any) {
                expect(err).toBeInstanceOf(CustomHttpError);
                expect(err.status).toEqual(404);
                expect(err.message).toEqual(`Book with ID: ${id} Not Found`);
            }
        });
    });
});