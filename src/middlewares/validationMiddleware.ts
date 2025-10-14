import { Context, Next } from "koa";
import { z, ZodSchema } from "zod";
import { createErrorResponse } from "../utils/createResponse";

export const validateBody = <T>(schema: ZodSchema<T>) =>
  async (ctx: Context, next: Next) => {
    const parsed = schema.safeParse(ctx.request.body);

    if (!parsed.success) {
      ctx.status = 422;
      ctx.body = createErrorResponse(
        ctx.status,
        "Validation failed",
        z.flattenError(parsed.error)
      );
      return;
    }

    ctx.state.data = parsed.data;
    await next();
  };
