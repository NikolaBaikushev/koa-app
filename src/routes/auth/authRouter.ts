import Router from '@koa/router';
import { validateBody } from '../../middlewares/validationMiddleware';
import { LoginUserSchema, RegisterUserSchema } from '../../schemas/authSchemas';
import { authController } from '../../controllers/auth/authController';
import { errorControllerWrapper } from '../../utils/errorHandlerWrapper';

export const authRouter = new Router({
    prefix: '/auth'
});

authRouter.post('/login', validateBody(LoginUserSchema), errorControllerWrapper(authController.loginUser));
authRouter.post('/register', validateBody(RegisterUserSchema), errorControllerWrapper(authController.registerUser));