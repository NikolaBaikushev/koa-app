import Router from '@koa/router';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateBody } from '../../middlewares/validationMiddleware';
import { LoginUserSchema, RegisterUserSchema } from '../../schemas/authSchemas';
import { authController } from '../../controllers/auth/authController';
import { errorControllerWrapper } from '../../utils/errorHandlerWrapper';

export const authRouter = new Router({
    prefix: '/auth'
});

authRouter.get('/users', authMiddleware, (ctx) => {
    ctx.body = ['1','2','3'];
});
authRouter.post('/login', validateBody(LoginUserSchema), errorControllerWrapper(authController.loginUser));
authRouter.post('/register', validateBody(RegisterUserSchema), errorControllerWrapper(authController.registerUser));