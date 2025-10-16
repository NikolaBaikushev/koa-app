import { Context, Next } from "koa";
import { LoginUserPayload, RegisterUserPayload } from "../../schemas/authSchemas";
import { isHttpError } from "../../types/guards/isHttpError";
import { createSuccessResponse, createFailResponse, createErrorResponse } from "../../utils/createResponse";
import { getContextStateData } from "../../utils/getContextStateData";
import { authService } from "../../services/authService";

const loginUser = async (ctx: Context) => {
    const payload = getContextStateData<LoginUserPayload>(ctx);
    const token = await authService.loginUser(payload);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully logged in!', { accessToken: token })
}

const registerUser = async (ctx: Context) => {
    const payload = getContextStateData<RegisterUserPayload>(ctx);
    const user = await authService.registerUser(payload);
    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully registered!', user);
};


export const authController = {
    loginUser,
    registerUser,
}