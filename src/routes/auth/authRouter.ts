import Router from '@koa/router';
import { data } from '../../../data/users';
import { registerUser } from '../../services/authService';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateBody } from '../../middlewares/validationMiddleware';
import { LoginUserSchema, RegisterUserSchema } from '../../schemas/authSchemas';
import { loginUserController, registerUserController } from '../../controllers/auth/authController';
import { Context } from 'koa';
import { Next } from 'koa';
import { errorControllerWrapper } from '../../utils/errorHandlerWrapper';

export const authRouter = new Router({
    prefix: '/auth'
});

authRouter.get('/users', authMiddleware, (ctx) => {
    ctx.body = data;
});
authRouter.post('/login', validateBody(LoginUserSchema), errorControllerWrapper(loginUserController));
authRouter.post('/register', validateBody(RegisterUserSchema), errorControllerWrapper(registerUserController));