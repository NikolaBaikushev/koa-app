import { Context } from 'koa';
import { createSuccessResponse } from '../../utils/createResponse';
import { bookService } from '../../services/bookService';
import { validateParams } from '../../validators/validateParams';
import { ParamsSchema } from '../../schemas/common/paramsSchema';
import { getContextStateData } from '../../utils/getContextStateData';
import { CreateBookPayload, UpdateBookPayload } from '../../schemas/bookSchemas';


const getAllBooks = async (ctx: Context) => {
    const books = await bookService.getAllBooks();
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, '', books);
};

const getCurrentUserBooks = async (ctx: Context) => {
    ctx.status = 200;
    const books = await bookService.getBooksByUserId(ctx.state.user.id);
    ctx.body = createSuccessResponse(ctx.status, 'Get books', books);
};

const getBookById = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const book = await bookService.getBookById(id);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, '', book);
};

const createBook = async (ctx: Context) => {
    const payload = getContextStateData<CreateBookPayload>(ctx);
    const book = await bookService.createBook(payload);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully created book!', book);
};

const updateBook = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const payload = getContextStateData<UpdateBookPayload>(ctx);
    const book = await bookService.updateBook(id, payload);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully updated book!', book);
};

const deleteBook = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const book = await bookService.deleteBook(id);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully deleted book!', book);
};

export const bookController = {
    getAllBooks,
    getCurrentUserBooks,
    createBook,
    updateBook,
    deleteBook,
    getBookById,
};