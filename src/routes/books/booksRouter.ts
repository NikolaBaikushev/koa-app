import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { CreateBookSchema, UpdateBookSchema } from '../../schemas/bookSchemas';
import { validateBody } from '../../middlewares/validationMiddleware';
import { errorControllerWrapper } from '../../utils/errorHandlerWrapper';
import { bookController } from '../../controllers/books/booksController';

export const booksRouter = new Router({
    prefix: '/books',
});

booksRouter.get('/all', authMiddleware, bookController.getAllBooks);

booksRouter.get('/:id', authMiddleware, errorControllerWrapper(bookController.getBookById));
booksRouter.get('/', authMiddleware, errorControllerWrapper(bookController.getAllUserBooks));
booksRouter.post('/', authMiddleware, validateBody(CreateBookSchema), errorControllerWrapper(bookController.createBook));
booksRouter.put('/:id', authMiddleware, validateBody(UpdateBookSchema), errorControllerWrapper(bookController.updateBook));
booksRouter.delete('/:id', authMiddleware, errorControllerWrapper(bookController.deleteBook));

