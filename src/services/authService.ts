import { Context } from "koa";
import { data } from "../../data/users";
import jwt from 'jsonwebtoken';
import { config } from "../../config";

function createToken(payload: { id: number, username: string }) {
    return jwt.sign(payload, config.SECRET, { expiresIn: '1h' })
}

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
}