import { Context } from "koa"
import { validateParams } from "../../validators/validateParams"
import { ParamsSchema } from "../../schemas/common/paramsSchema"
import { bookService } from "../../services/bookService";
import { createSuccessResponse } from "../../utils/createResponse";
import { UserRepository } from "../../repository/UserRepository";
import { db } from "../../config/knex";
import { userService } from "../../services/userService";

const getBooksByUserId = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    const user = await userService.getUserById(id);
    const books = await bookService.getBooksByUserId(user.id);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, '', books)
}

export const userController = {
    getBooksByUserId
}