import { Context, Next } from 'koa';
import passport from '../config/authConfig';
import { User } from '../schemas/models/userEntitySchema';

export const authMiddleware = async (ctx: Context, next: Next) => {
    return new Promise<void>((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user: User, info) => {
            if (err) {
                ctx.status = 500;
                ctx.body = { error: 'Internal Server Error' };
                return reject(err);
            }

            if (!user) {
                ctx.status = 401;
                ctx.body = { error: 'Unauthorized: Invalid or Missing user' };
                return resolve();
            }

            ctx.state.user = user;
             
            resolve(next());
        })(ctx, next);
    });
};