import { Context } from 'koa';
import { validateParams } from '../../validators/validateParams';
import { createParamSchema, ParamsSchema } from '../../schemas/common/paramsSchema';
import { bookService } from '../../services/bookService';
import { createSuccessResponse } from '../../utils/createResponse';
import { userService } from '../../services/userService';

const getBooksByUserId = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const user = await userService.getUserById(id);
    const books = await bookService.getBooksByUserId(user.id);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, '', books);
};

const addBookToCurrentUser = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const result = await userService.addBookToUser(id, ctx.state.user.id);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, `Successfully added book (ID:${id}) to user (ID:${ctx.state.user.id})`, result);

};

const removeBookFromCurrentUser = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const result = await userService.removeBookFromUser(id, ctx.state.user.id);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, `Successfully removed book (ID:${id}) from user (ID:${ctx.state.user.id})`, result);
};

const addBookToSpecificUser = async (ctx: Context) => {
    const { userId, bookId } = validateParams(ctx, createParamSchema('userId', 'bookId'));
    const result = await userService.addBookToUser(bookId as number, userId as number);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, `Successfully added book (ID:${bookId}) to user (ID:${userId})`, result);
};

const removeBookFromSpecificUser = async (ctx: Context) => {
    const { userId, bookId } = validateParams(ctx, createParamSchema('userId', 'bookId'));
    const result = await userService.removeBookFromUser(bookId as number, userId as number);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, `Successfully removed book (ID:${bookId}) from user (ID:${userId})`, result);
};


export const userController = {
    getBooksByUserId,
    addBookToCurrentUser,
    removeBookFromCurrentUser,
    addBookToSpecificUser,
    removeBookFromSpecificUser
};