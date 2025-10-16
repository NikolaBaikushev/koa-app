import { Context, Next } from 'koa';
import passport from '../config/authConfig';
import { User } from '../schemas/models/userEntitySchema';
import { createErrorResponse } from '../utils/createResponse';

export const authMiddleware = async (ctx: Context, next: Next) => {
    return new Promise<void>((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user: User, info) => {
            if (err) {
                ctx.status = 500;
                ctx.body = createErrorResponse(ctx.status, 'Internal Server Error', { message: "Oops! Something went wrong. Please try again!"})
                return reject(err);
            }

            if (!user) {
                ctx.status = 401;
                ctx.body = createErrorResponse(ctx.status, 'Unathorized', { message: "Invalid or Missing User."})
                return resolve();
            }

            ctx.state.user = user;
             
            resolve(next());
        })(ctx, next);
    });
};