import { Context } from 'koa';
import z, { ZodSchema } from 'zod';


export function validateParams<T extends ZodSchema<any>>(ctx: Context, schema: T): z.infer<T> {
    const result = schema.safeParse(ctx.params);
    if (!result.success) {
        ctx.throw(400, 'Invalid URL Parameters');
    }
    return result.data;
}