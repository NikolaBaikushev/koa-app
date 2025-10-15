import Router from '@koa/router';
import { data } from '../../../data/users';
import { loginUser, loginUserController, registerUser } from '../../services/authService';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateBody } from '../../middlewares/validationMiddleware';
import { LoginUserSchema, RegisterUserSchema } from '../../schemas/authSchemas';

export const authRouter = new Router({
    prefix: '/auth'
});

authRouter.get('/users', authMiddleware, (ctx) => {
    ctx.body = data;
});

authRouter.post('/login', validateBody(LoginUserSchema), loginUserController);
authRouter.post('/register', validateBody(RegisterUserSchema), registerUser);