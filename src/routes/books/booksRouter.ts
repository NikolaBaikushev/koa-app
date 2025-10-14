import Router from '@koa/router';
import { data } from '../../../data/users';
import { loginUser, registerUser } from '../../services/authService';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateBody } from '../../middlewares/validationMiddleware';
import { LoginUserSchema, RegisterUserSchema } from '../../schemas/authSchemas';
import { getBookById, getBooksByUserId, getCurrentUserBooks } from '../../services/bookService';

export const booksRouter = new Router({
    prefix: '/books'
});

booksRouter.get('/', authMiddleware, getCurrentUserBooks);
booksRouter.get('/:id', authMiddleware, getBookById)
booksRouter.get('/user/:id', authMiddleware, getBooksByUserId)
