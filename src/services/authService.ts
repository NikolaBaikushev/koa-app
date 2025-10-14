import { Context } from 'koa';
import { data } from '../../data/users';
import { LoginUserPayload, RegisterUserPayload } from '../schemas/authSchemas';
import { createFailResponse, createSuccessResponse } from '../utils/createResponse';
import { getContextStateData } from '../utils/getContextStateData';
import { createToken } from '../utils/createToken';


export const loginUser = (ctx: Context) => {
    const { username, password } = getContextStateData<LoginUserPayload>(ctx);

    const user = data.users.find(u => u.username === username && u.password === password);

    if (!user) {
        ctx.status = 401;
        ctx.body = createFailResponse(ctx.status, 'Invalid username or password');
        return;
    }

    const payload = { id: user.id, username: user.username };
    const token = createToken(payload);

    ctx.status = 201;
    ctx.body = createSuccessResponse(ctx.status, 'Successfully logged in user!', { accessToken: token });
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
        password,
        books: []
    };

    data.users.push(user);

    ctx.status = 201;

    const createdUserData = { user: { id: user.id, username: user.username } };

    ctx.body = createSuccessResponse(ctx.status, 'User successfully created!', createdUserData);

};
