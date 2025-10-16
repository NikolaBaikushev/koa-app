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
    const result = await userService.addBookToCurrentUser(id, ctx.state.user.id)
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, `Book ID: ${id} added to user ${ctx.state.user.id}`, result);
}

const removeBookFromCurrentUser = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const result = await userService.removeBookFromCurrentUser(id, ctx.state.user.id)
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, `Book ID: ${id} removed from user ${ctx.state.user.id}`, result);
}

export const userController = {
    getBooksByUserId,
    addBookToCurrentUser,
    removeBookFromCurrentUser
};