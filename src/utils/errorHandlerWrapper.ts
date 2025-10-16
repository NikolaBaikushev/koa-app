import { Context, Next } from 'koa';
import { isHttpError } from '../types/guards/isHttpError';
import { createErrorResponse, createFailResponse } from './createResponse';


export const errorControllerWrapper = (controller: (ctx: Context) => Promise<void> | void) => {
    return async (ctx: Context, next: Next) => {
        try {
            await controller(ctx);
        } catch (err) {
            if (isHttpError(err)) {
                ctx.status = err.status;
                ctx.body = createFailResponse(ctx.status, err.message);
                return;
            }

            ctx.log?.error?.(err); // works if using koa-pino-logger or similar
            ctx.status = 500;
            ctx.body = createErrorResponse(ctx.status, 'Something went wrong', {});

        }
    };
};