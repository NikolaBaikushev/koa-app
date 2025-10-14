import { Context, Next } from 'koa';
import passport from '../config/authConfig';

export const authMiddleware = async (ctx: Context, next: Next) => {
    return new Promise<void>((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                ctx.status = 500;
                ctx.body = { error: 'Internal Server Error' };
                return reject(err);
            }

            if (!user) {
                ctx.status = 401;
                ctx.body = { error: 'Unauthorized: Invalid or missing user' };
                return resolve();
            }

            // TODO: Change this from the signing payload on the jwt
            ctx.state.user = {
                id: user.id,
                username: user.username,
                books: user.books
            };
             
            resolve(next());
        })(ctx, next);
    });
};