import Router from '@koa/router';
import {authRouter} from './auth/authRouter';
import { booksRouter } from './books/booksRouter';

// Main router;
export const router = new Router({
    'prefix': '/v1'
});

router.use(authRouter.routes()).use(authRouter.allowedMethods());
router.use(booksRouter.routes()).use(booksRouter.allowedMethods());
