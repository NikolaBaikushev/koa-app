import { Context } from "koa";
import { createErrorResponse, createFailResponse, createSuccessResponse } from "../utils/createResponse";
import { data } from "../../data/users";

export const getAllBooks = (ctx:Context) => {
    const books = data.users.flatMap(u => u.books);
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, '', books);
}

export const getCurrentUserBooks = (ctx: Context) => {
    const user = ctx.state.user;
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Get books', user!.books)
}

export const getBookById = (ctx: Context) => {
    const { id } = ctx.params;
    
    const books = data.users.flatMap(u => u.books); 
    const book = books.find(b => b.id === Number(id));
    if (!book) {
        ctx.status = 400;
        ctx.body = createFailResponse(ctx.status, `Book Not Found! ID: ${id}`)
        return;
    }
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, "", book);
}
