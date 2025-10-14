import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { CreateBookSchema, UpdateBookSchema } from '../../schemas/bookSchemas';
import { validateBody } from '../../middlewares/validationMiddleware';
import { createBook, deleteBook, getAllUserBooks, getBookById, updateBook } from '../../services/bookService';

export const booksRouter = new Router({
    prefix: '/books',
});

// booksRouter.get('/', authMiddleware, getAllBooks);

booksRouter.get('/:id', authMiddleware, getBookById)
booksRouter.get('/', authMiddleware, getAllUserBooks)
booksRouter.post('/', authMiddleware, validateBody(CreateBookSchema), createBook);
booksRouter.put('/:id', authMiddleware, validateBody(UpdateBookSchema), updateBook);
booksRouter.delete('/:id', authMiddleware, deleteBook);

