import { Context } from "koa";
import { createSuccessResponse } from "../../utils/createResponse";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../../services/bookService";
import { CreateBookPayload, UpdateBookPayload } from "../../schemas/bookSchemas";
import { getContextStateData } from "../../utils/getContextStateData";

export const getAllBooksController = async (ctx: Context) => {
    const books = await getAllBooks();
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, '', books)
}

export const getAllUserBooksController = (ctx: Context) => {
    const user = ctx.state.user;
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Get books', user!.books);
};

export const getBookByIdController = (ctx: Context) => {
    const { id } = ctx.params;
    const book = getBookById(Number(id), ctx.state.user);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, '', book);
};

export const createBookController = (ctx: Context) => {
    const payload = getContextStateData<CreateBookPayload>(ctx);
    const book = createBook(payload, ctx.state.user)
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully created book!', book);
}

export const updateBookController = (ctx: Context) => {
    const { id } = ctx.params;

    const payload = getContextStateData<UpdateBookPayload>(ctx);
    const book = updateBook(Number(id), payload, ctx.state.user);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully updated!', book);
}

export const deleteBookController = (ctx: Context) => {
    const { id } = ctx.params;
    const book = deleteBook(Number(id), ctx.state.user)
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully deleted book!', book);
}