import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { getAllBooks, getBookById, getCurrentUserBooks } from '../../services/bookService';

export const booksRouter = new Router({
    prefix: '/books',
});

booksRouter.get('/', authMiddleware, getAllBooks);
booksRouter.get('/me', authMiddleware, getCurrentUserBooks);
booksRouter.get('/:id', authMiddleware, getBookById)
