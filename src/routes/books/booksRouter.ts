import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { CreateBookSchema, UpdateBookSchema } from '../../schemas/bookSchemas';
import { validateBody } from '../../middlewares/validationMiddleware';
import { createBookController, deleteBookController, getAllUserBooksController, getBookByIdController, updateBookController } from '../../controllers/books/booksController';
import { errorControllerWrapper } from '../../utils/errorHandlerWrapper';

export const booksRouter = new Router({
    prefix: '/books',
});

// booksRouter.get('/', authMiddleware, getAllBooksController);

booksRouter.get('/:id', authMiddleware, errorControllerWrapper(getBookByIdController));
booksRouter.get('/', authMiddleware, errorControllerWrapper(getAllUserBooksController));
booksRouter.post('/', authMiddleware, validateBody(CreateBookSchema), errorControllerWrapper(createBookController));
booksRouter.put('/:id', authMiddleware, validateBody(UpdateBookSchema), errorControllerWrapper(updateBookController));
booksRouter.delete('/:id', authMiddleware, errorControllerWrapper(deleteBookController));

