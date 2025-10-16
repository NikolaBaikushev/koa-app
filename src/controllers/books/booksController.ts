import { Context } from "koa";
import { createSuccessResponse } from "../../utils/createResponse";
import { bookService } from "../../services/bookService";
import { CreateBookPayload, UpdateBookPayload } from "../../schemas/bookSchemas";
import { getContextStateData } from "../../utils/getContextStateData";
import { BookRepository } from "../../repository/BookRepository";
import { db } from "../../config/knex";
import { validateParams } from "../../validators/validateParams";
import { ParamsSchema } from "../../schemas/common/paramsSchema";


const getAllBooks = async (ctx: Context) => {
    const books = await bookService.getAllBooks();
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, '', books)
}

const getAllUserBooks = (ctx: Context) => {
    const user = ctx.state.user;
    ctx.status = 200;
    // ctx.body = createSuccessResponse(ctx.status, 'Get books', user!.books);
};

const getBookById = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const book = await bookService.getBookById(id);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, '', book);
};

// const createBook = (ctx: Context) => {
//     const payload = getContextStateData<CreateBookPayload>(ctx);
//     const book = bookService.createBook(payload, ctx.state.user)
//     ctx.status = 200;
//     ctx.body = createSuccessResponse(ctx.status, 'Successfully created book!', book);
// }

// const updateBook = (ctx: Context) => {
//     const { id } = ctx.params;

//     const payload = getContextStateData<UpdateBookPayload>(ctx);
//     const book = bookService.updateBook(Number(id), payload, ctx.state.user);
//     ctx.status = 200;
//     ctx.body = createSuccessResponse(ctx.status, 'Successfully updated!', book);
// }

// const deleteBook = (ctx: Context) => {
//     const { id } = ctx.params;
//     const book = bookService.deleteBook(Number(id), ctx.state.user)
//     ctx.status = 200;
//     ctx.body = createSuccessResponse(ctx.status, 'Successfully deleted book!', book);
// }

export const bookController = {
    getAllBooks,
    getAllUserBooks,
    // createBook,
    // updateBook,
    // deleteBook,
    getBookById,
}