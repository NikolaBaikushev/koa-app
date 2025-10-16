import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { errorControllerWrapper } from '../../utils/errorHandlerWrapper';
import { bookController } from '../../controllers/books/booksController';
import { validateBody } from '../../middlewares/validationMiddleware';
import { CreateBookSchema, UpdateBookSchema } from '../../schemas/bookSchemas';
import { isAuthor } from '../../guards/isAuthor';

export const booksRouter = new Router({
    prefix: '/books',
});

booksRouter.get('/all', authMiddleware, bookController.getAllBooks);

booksRouter.get('/:id', authMiddleware, errorControllerWrapper(bookController.getBookById));
booksRouter.get('/', authMiddleware, errorControllerWrapper(bookController.getCurrentUserBooks));
booksRouter.post('/', authMiddleware, isAuthor, validateBody(CreateBookSchema), errorControllerWrapper(bookController.createBook));
booksRouter.put('/:id', authMiddleware, isAuthor, validateBody(UpdateBookSchema), errorControllerWrapper(bookController.updateBook));
booksRouter.delete('/:id', authMiddleware, isAuthor, errorControllerWrapper(bookController.deleteBook));

