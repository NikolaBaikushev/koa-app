import { Context } from "vm";
import { data } from "../../data/users";
import { createFailResponse, createSuccessResponse } from "../utils/createResponse";

export const getBooksByUserId = (ctx: Context) => {
    const { id } = ctx.params;
    const user = data.users.find(u => u.id === Number(id));
    if (!user) {
        ctx.status = 400;
        ctx.body = createFailResponse(ctx.status, 'User doesn\'t exist!')
        return;
    }

    ctx.status = 200;
    ctx.body = createSuccessResponse(ctx.status, "", user.books);
}

