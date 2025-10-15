import { Context, Next } from "koa";
import { LoginUserPayload, RegisterUserPayload } from "../../schemas/authSchemas";
import { loginUser, registerUser } from "../../services/authService";
import { isHttpError } from "../../types/guards/isHttpError";
import { createSuccessResponse, createFailResponse, createErrorResponse } from "../../utils/createResponse";
import { getContextStateData } from "../../utils/getContextStateData";

export const loginUserController = (ctx: Context) => {
    const payload = getContextStateData<LoginUserPayload>(ctx);
    const token = loginUser(payload);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully logged in!', { accessToken: token })
}

export const registerUserController = (ctx: Context) => {
    const payload = getContextStateData<RegisterUserPayload>(ctx);
    const user = registerUser(payload);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully registered!', user);
};
