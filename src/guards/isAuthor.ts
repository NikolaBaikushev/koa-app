import { Context, Next } from 'koa';
import { UserRole } from '../schemas/models/userEntitySchema';
import { createErrorResponse } from '../utils/createResponse';

export const isAuthor = async (ctx: Context, next: Next) => {
    const user = ctx.state.user;
    if (!user) {
        ctx.status = 401;
        ctx.body = createErrorResponse(ctx.status, 'Unathorized', {
            message: 'Invalid or Missing User!'
        });
        return;
    }

    if (ctx.state.user.role === UserRole.AUTHOR){
        return await next();
    }

    ctx.status = 403;
    ctx.body = createErrorResponse(ctx.status, 'Forbidden Resource', {message: 'Only authors have access to this resource!'});
};