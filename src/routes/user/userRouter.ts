import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { getBooksByUserId } from '../../services/userService';

export const userRouter = new Router({
    prefix: '/users',
});

userRouter.get('/:id/books', authMiddleware, getBooksByUserId);
