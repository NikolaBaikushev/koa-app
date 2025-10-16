import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { userController } from '../../controllers/users/userController';

export const userRouter = new Router({
    prefix: '/users',
});

userRouter.get('/:id/books', authMiddleware, userController.getBooksByUserId);
