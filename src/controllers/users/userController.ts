import { Context } from "koa"
import { validateParams } from "../../validators/validateParams"
import { ParamsSchema } from "../../schemas/common/paramsSchema"
import { bookService } from "../../services/bookService";

const getBooksByUserId = async (ctx: Context) => {
    const { id } = validateParams(ctx, ParamsSchema);
    return await bookService.getBooksByUserId(id);

}

export const userController = {
    getBooksByUserId
}