import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { userController } from '../../controllers/users/userController';
import { errorControllerWrapper } from '../../utils/errorHandlerWrapper';

export const userRouter = new Router({
    prefix: '/users',
});

userRouter.get('/:id/books', authMiddleware, errorControllerWrapper(userController.getBooksByUserId));
userRouter.post('/books/:id', authMiddleware, errorControllerWrapper(userController.addBookToCurrentUser));
userRouter.delete('/books/:id', authMiddleware, errorControllerWrapper(userController.removeBookFromCurrentUser));
userRouter.post('/:userId/books/:bookId', authMiddleware, errorControllerWrapper(userController.addBookToSpecificUser));
userRouter.delete('/:userId/books/:bookId', authMiddleware, errorControllerWrapper(userController.removeBookFromSpecificUser));
