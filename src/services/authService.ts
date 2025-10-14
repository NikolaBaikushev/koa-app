import { Context, Next, ParameterizedContext } from 'koa';
import { data } from '../../data/users';
import { LoginUserPayload, RegisterUserPayload, RegisterUserSchema } from '../schemas/authSchemas';
import z, { ZodSchema } from 'zod';
import { createErrorResponse, createFailResponse, createSuccessResponse } from '../utils/createResponse';
import { getContextStateData } from '../utils/getContextStateData';
import { createToken } from '../utils/createToken';


export const loginUser = (ctx: Context) => {
    const { username, password } = ctx.request.body;

    const user = data.users.find(u => u.username === username && u.password === password);

    if (!user) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid username or password' };
        return;
    }

    const payload = { id: user.id, username: user.username };
    const token = createToken(payload);

    ctx.body = { accessToken: token };
};


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
        password
    };

    data.users.push(user);

    ctx.status = 200;

    const createdUserData = { user: { id: user.id, username: user.username } };
    
    ctx.body = createSuccessResponse(ctx.status, 'User successfully created!', createdUserData);

};
