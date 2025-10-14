import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createBookForCurrentUser, getAllBooks, getBookById, getCurrentUserBooks } from '../../services/bookService';
import { CreateBookSchema } from '../../schemas/bookSchemas';
import { validateBody } from '../../middlewares/validationMiddleware';

export const booksRouter = new Router({
    prefix: '/books',
});

booksRouter.get('/', authMiddleware, getAllBooks);
booksRouter
    .get('/me', authMiddleware, getCurrentUserBooks);
    booksRouter.post('/me', authMiddleware, validateBody(CreateBookSchema), createBookForCurrentUser);
booksRouter.get('/:id', authMiddleware, getBookById)
