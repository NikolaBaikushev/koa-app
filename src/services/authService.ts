import { Context } from 'koa';
import { data } from '../../data/users';
import { LoginUserPayload, RegisterUserPayload } from '../schemas/authSchemas';
import { createErrorResponse, createFailResponse, createSuccessResponse } from '../utils/createResponse';
import { getContextStateData } from '../utils/getContextStateData';
import { createToken } from '../utils/createToken';
import { isHttpError } from '../types/guards/isHttpError';
import { formatUnknownError } from '../utils/formatUnknownError';

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const loginUser = (payload: LoginUserPayload) => {
    const user = data.users.find(u => u.username === payload.username && u.password === payload.password);

    if (!user) {
        throw new HttpError(401, 'Invalid username or password');
    }
    
    return createToken({ id: user.id, username: user.username });
};

export const loginUserController = (ctx:Context) => {
    try {
        const payload = getContextStateData<LoginUserPayload>(ctx);
        const token = loginUser(payload);
        ctx.status = 201;
        ctx.body = createSuccessResponse(ctx.status, 'Successfully logged in!', { accessToken: token })
    } catch(err) {
        if (isHttpError(err)) {
            ctx.status = err.status;
            ctx.body = createFailResponse(ctx.status, err.message);
            return;
        }
        ctx.status = 500;
        ctx.body = createErrorResponse(ctx.status, 'Something went wrong!', formatUnknownError(err))
    }
}

export const registerUser = (ctx: Context) => {
    const { username, password, confirmPassword } = getContextStateData<RegisterUserPayload>(ctx);

    if (password !== confirmPassword) {
        ctx.status = 400;
        ctx.body = createFailResponse(ctx.status, 'Paswords don\'t match');
        return;
    }

    const existingUser = data.users.find((u) => u.username === username);
    if (existingUser) {
        ctx.status = 409;
        ctx.body = createFailResponse(ctx.status, 'Username already exists!');
        return;
    }

    const user = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        username,
        password,
        books: []
    };

    data.users.push(user);

    ctx.status = 201;

    const createdUserData = { user: { id: user.id, username: user.username } };

    ctx.body = createSuccessResponse(ctx.status, 'User successfully created!', createdUserData);

};
