import { Context } from 'koa';
import { userService } from '../../services/userService';
import { userController } from './userController';
import * as validateParamsModule from '../../validators/validateParams';
import { bookService } from '../../services/bookService';
import { UserEntity } from '../../schemas/models/userEntitySchema';
import { BookEntity } from '../../schemas/models/bookEntitySchema';

const controller = userController;
const service = userService;


describe('userController', () => {
    let ctx: Context;

    beforeEach(() => {
        ctx = {
            status: undefined,
            body: undefined,
            state: undefined,
            data: undefined,
        } as unknown as Context;
    });

    afterEach(() => jest.clearAllMocks());

    describe('getBooksByUserId', () => {
        it('should properly call getBooksByUserId', async () => {
            const id = 1;
            const user = { id } as UserEntity;
            const books = [{ id: 1, title: 'asd', author: 'asd asd' }] as BookEntity[];

            jest.spyOn(validateParamsModule, 'validateParams').mockReturnValue({ id });
            jest.spyOn(service, 'getUserById').mockResolvedValue(user);
            jest.spyOn(bookService, 'getBooksByUserId').mockResolvedValue(books);

            await controller.getBooksByUserId(ctx);
            expect(service.getUserById).toHaveBeenCalledWith(id);
            expect(bookService.getBooksByUserId).toHaveBeenCalledWith(user.id);
            expect(ctx.status).toEqual(201);
            expect(ctx.body).toMatchObject({
                success: true,
                message: '',
                status: 201,
                data: books
            });
        });
    });

    describe('addBookToCurrentUser', () => {
        it('should properly call addBookToCurrentUser', async () => {
            const id = 1;

            ctx.state = {
                user: { id: 1, username: 'asd' } as UserEntity
            };

            const book = {
                user_id: 1,
                book_id: 1
            };

            jest.spyOn(validateParamsModule, 'validateParams').mockReturnValue({ id });
            jest.spyOn(service, 'addBookToUser').mockResolvedValue(book);

            await controller.addBookToCurrentUser(ctx);

            expect(service.addBookToUser).toHaveBeenCalledWith(id, ctx.state.user.id);
            expect(ctx.status).toEqual(200);
            expect(ctx.body).toMatchObject({
                success: true,
                message: `Successfully added book (ID:${id}) to user (ID:${ctx.state.user.id})`,
                status: 200,
                data: book
            });
        });
    });

    describe('removeBookFromCurrentUser', () => {
        it('should properly call removeBookFromCurrentUser', async () => {
            const id = 1;

            ctx.state = {
                user: { id: 1, username: 'asd' } as UserEntity
            };

            const book = {
                user_id: 1,
                book_id: 1
            };

            jest.spyOn(validateParamsModule, 'validateParams').mockReturnValue({ id });
            jest.spyOn(service, 'removeBookFromUser').mockResolvedValue(book);

            await controller.removeBookFromCurrentUser(ctx);

            expect(service.removeBookFromUser).toHaveBeenCalledWith(id, ctx.state.user.id);
            expect(ctx.status).toEqual(201);
            expect(ctx.body).toMatchObject({
                success: true,
                message: `Successfully removed book (ID:${id}) from user (ID:${ctx.state.user.id})`,
                status: 201,
                data: book
            });
        });
    });

    describe('addBookToSpecificUser', () => {
        it('should properly call addBookToSpecificUser', async () => {
            const userId = 1;
            const bookId = 1;

            ctx.state = {
                user: { id: 1, username: 'asd' } as UserEntity
            };

            const book = {
                user_id: userId,
                book_id: bookId
            };

            jest.spyOn(validateParamsModule, 'validateParams').mockReturnValue({ userId, bookId });
            jest.spyOn(service, 'addBookToUser').mockResolvedValue(book);

            await controller.addBookToSpecificUser(ctx);

            expect(service.addBookToUser).toHaveBeenCalledWith(bookId, userId);
            expect(ctx.status).toEqual(201);
            expect(ctx.body).toMatchObject({
                success: true,
                message: `Successfully added book (ID:${bookId}) to user (ID:${userId})`,
                status: 201,
                data: book
            });
        });
    });
    describe('removeBookFromSpecificUser', () => {
        it('should properly call removeBookFromSpecificUser', async () => {
            const userId = 1;
            const bookId = 1;

            ctx.state = {
                user: { id: 1, username: 'asd' } as UserEntity
            };

            const book = {
                user_id: userId,
                book_id: bookId
            };

            jest.spyOn(validateParamsModule, 'validateParams').mockReturnValue({ userId, bookId });
            jest.spyOn(service, 'removeBookFromUser').mockResolvedValue(book);

            await controller.removeBookFromSpecificUser(ctx);

            expect(service.removeBookFromUser).toHaveBeenCalledWith(bookId, userId);
            expect(ctx.status).toEqual(201);
            expect(ctx.body).toMatchObject({
                success: true,
                message: `Successfully removed book (ID:${bookId}) from user (ID:${userId})`,
                status: 201,
                data: book
            });
        });
    });
});