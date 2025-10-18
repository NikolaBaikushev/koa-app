import { Context } from "koa";
import { bookService } from "../../services/bookService"
import { BookEntity } from "../../schemas/models/bookEntitySchema";
import { bookController } from "./booksController";
import { UserEntity } from "../../schemas/models/userEntitySchema";
import * as validateParamsModule from "../../validators/validateParams";
import * as getContextStateDataModule from "../../utils/getContextStateData";
import { CreateBookPayload, UpdateBookPayload } from "../../schemas/bookSchemas";

const controller = bookController;
const service = bookService;
describe('bookController', () => {
    let ctx: Context;
    beforeEach(() => {
        ctx = {
            status: undefined,
            body: undefined,
            state: undefined,
            data: undefined,
        } as unknown as Context;
    })

    afterEach(() => jest.clearAllMocks());

    describe('getAllBooks', () => {
        it('should properly call the getAllBooks', async () => {
            const books = [
                {
                    id: 1,
                    title: 'Asd',
                    author: 'Asd Author'
                }
            ] as BookEntity[];
            jest.spyOn(service, 'getAllBooks').mockResolvedValue(books);

            await controller.getAllBooks(ctx);
            expect(service.getAllBooks).toHaveBeenCalled();
            expect(ctx.status).toEqual(201)
            expect(ctx.body).toMatchObject({
                status: 201,
                success: true,
                message: '',
                data: { ...books }
            })
        })
    })

    describe('getCurrentUserBooks', () => {
        it('should properly call the getCurrentUserBooks', async () => {
            const books = [
                {
                    id: 1,
                    title: 'Asd',
                    author: 'Asd Author'
                }
            ] as BookEntity[];

            ctx.state = {
                user: {
                    id: 1
                } as UserEntity,
            };

            jest.spyOn(service, 'getBooksByUserId').mockResolvedValue(books);

            await controller.getCurrentUserBooks(ctx);

            expect(service.getBooksByUserId).toHaveBeenCalled();
            expect(ctx.status).toEqual(200)
            expect(ctx.body).toMatchObject({
                status: 200,
                success: true,
                message: '',
                data: { ...books }
            })
        })
    })

    describe('getBookById', () => {
        it('should properly call the getBookById', async () => {
            const book = {
                id: 1,
                title: 'Asd',
                author: 'Asd Author'
            } as BookEntity


            jest.spyOn(service, 'getBookById').mockResolvedValue(book);
            jest.spyOn(validateParamsModule, 'validateParams').mockResolvedValue({ id: 1 });

            await controller.getBookById(ctx);

            expect(service.getBookById).toHaveBeenCalled();
            expect(ctx.status).toEqual(200)
            expect(ctx.body).toMatchObject({
                status: 200,
                success: true,
                message: '',
                data: { ...book }
            })
        })
    })

    describe('createBook', () => {
        it('should properly call the createBook', async () => {
            const book = {
                id: 1,
                title: 'asd',
                author: 'asd author'
            } as BookEntity

            const payload = { title: 'asd', author: 'asd author' } as CreateBookPayload;

            jest.spyOn(validateParamsModule, 'validateParams').mockResolvedValue({ id: 1 });
            jest.spyOn(getContextStateDataModule, 'getContextStateData').mockReturnValue(payload)
            jest.spyOn(service, 'createBook').mockResolvedValue(book);

            await controller.createBook(ctx);

            expect(service.createBook).toHaveBeenCalledWith(payload);
            expect(ctx.status).toEqual(200)
            expect(ctx.body).toMatchObject({
                status: 200,
                success: true,
                message: 'Successfully created book!',
                data: book
            })
        })
    })

    describe('updateBook', () => {
        it('should properly call the updateBook', async () => {
            const id = 1;
            const book = {
                id,
                title: 'asd',
                author: 'asd author'
            } as BookEntity

            const payload = { title: 'asd' } as UpdateBookPayload;

            jest.spyOn(getContextStateDataModule, 'getContextStateData').mockReturnValue(payload)
            jest.spyOn(validateParamsModule, 'validateParams').mockReturnValue({ id })
            jest.spyOn(service, 'updateBook').mockResolvedValue(book);

            await controller.updateBook(ctx);

            expect(service.updateBook).toHaveBeenCalledWith(id, payload);
            expect(ctx.status).toEqual(200)
            expect(ctx.body).toMatchObject({
                status: 200,
                success: true,
                message: 'Successfully updated book!',
                data: book
            })
        })
    })

    describe('deleteBook', () => {
        it('should properly call the deleteBook', async () => {
            const id = 1;
            const book = {
                id,
                title: 'asd',
                author: 'asd author'
            } as BookEntity

            jest.spyOn(validateParamsModule, 'validateParams').mockReturnValue({ id })
            jest.spyOn(service, 'deleteBook').mockResolvedValue(book);

            await controller.deleteBook(ctx);

            expect(service.deleteBook).toHaveBeenCalledWith(id);
            expect(ctx.status).toEqual(200)
            expect(ctx.body).toMatchObject({
                status: 200,
                success: true,
                message: 'Successfully deleted book!',
                data: book
            })
        })
    })
})