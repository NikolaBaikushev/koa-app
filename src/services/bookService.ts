import { Context } from "koa";
import { createErrorResponse, createFailResponse, createSuccessResponse } from "../utils/createResponse";
import { Book, data } from "../../data/users";
import { getContextStateData } from "../utils/getContextStateData";
import { CreateBookPayload, UpdateBookPayload } from "../schemas/bookSchemas";
import { generateId } from "../utils/generateId";
import { id } from "zod/v4/locales";

// export const getAllBooks = (ctx:Context) => {
//     const books = data.users.flatMap(u => u.books);
//     ctx.status = 200;
//     ctx.body = createSuccessResponse(ctx.status, '', books);
// }

export const getAllUserBooks = (ctx: Context) => {
    const user = ctx.state.user;
    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Get books', user!.books)
}

export const getBookById = (ctx: Context) => {
    const { id } = ctx.params;
    const user = ctx.state.user;
    const book = user.books.find((b: Book) => b.id === Number(id));

    if (!book) {
        ctx.status = 400;
        ctx.body = createFailResponse(ctx.status, `Book Not Found! ID: ${id}`)
        return;
    }

    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, "", book);
}

export const createBook = (ctx: Context) => {
    const user = ctx.state.user;
    const body = getContextStateData<CreateBookPayload>(ctx);

    const newBook = {
        id: generateId(),
        ...body
    }

    user.books.push(newBook); // Mutable
    // user.books = [...user.books, newBook]; // Immutable
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully created book!', newBook);
}

export const updateBook = (ctx: Context) => {
    const { id } = ctx.params;

    const user = ctx.state.user;
    let book = user.books.find((b: Book) => b.id === Number(id));
    if (!book) {
        ctx.status = 400;
        ctx.body = createFailResponse(ctx.status, `Book doesn\'t exist or it is not owned by current user! Book ID: ${id}`)
        return;
    }

    const body = getContextStateData<UpdateBookPayload>(ctx);

    // const updatedBook = Object.assign({}, book, body);
    // user.books = user.books.map((b: Book)=>
    //     b.id === book.id ? updatedBook : b
    // ); // Immutable
    Object.assign(book,body) // Mutable

    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully updated!', book)
}

export const deleteBook = (ctx: Context) => {
    const {id} = ctx.params;
    const user = ctx.state.user;
    const book = user.books.find((b:Book) => b.id === Number(id));

    if (!book) {
        ctx.status = 400;
        ctx.body = createFailResponse(ctx.status, `Book doesn\'t exist or it is not owned by current user! Book ID: ${id}`)
        return;
    }

    user.books = user.books.filter((b: Book) => b.id !== Number(id));

    // NOTE: This is used to check the mutable data ... 
    const mutableUser = getMutableUser(user.id);
    mutableUser!.books = user.books;

    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully deleted book!', book);
}

export function getMutableUser(id: number){
return data.users.find(user => user.id === id);
}