import Router from '@koa/router';
import {authRouter} from './auth/authRouter';
import { booksRouter } from './books/booksRouter';
import { userRouter } from './users/usersRouter';

// Main router;
export const router = new Router({
    'prefix': '/v1'
});

router.use(authRouter.routes()).use(authRouter.allowedMethods());
router.use(booksRouter.routes()).use(booksRouter.allowedMethods());
router.use(userRouter.routes()).use(userRouter.allowedMethods());
