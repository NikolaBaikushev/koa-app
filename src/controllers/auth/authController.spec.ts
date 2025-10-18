import { Context } from "koa";
import { LoginUserPayload, RegisterUserPayload } from "../../schemas/authSchemas";
import { authService } from "../../services/authService";
import { authController } from "./authController";
import * as ctxDataModule from '../../utils/getContextStateData';
import { User, UserEntity, UserRole } from "../../schemas/models/userEntitySchema";

describe('authController', () => {
    let ctx: Context;

    afterEach(() => jest.clearAllMocks());

    beforeEach(() => {
        ctx = {
            status: undefined,
            body: undefined,
            state: undefined,
            data: {}
        } as unknown as Context;
    })

    describe('loginUser', () => {
        it('should properly call the loginUser', async () => {
            const payload = { username: 'asd', password: 'asd' } as LoginUserPayload;
            const token = 'asdasdasd'
            jest.spyOn(authService, 'loginUser').mockResolvedValue(token);
            jest.spyOn(ctxDataModule, 'getContextStateData').mockReturnValue(payload);

            await authController.loginUser(ctx as Context);

            expect(authService.loginUser).toHaveBeenCalledWith(payload);
            expect(ctx.status).toEqual(201)
            expect(ctx.body).toMatchObject({
                success: true,
                status: 201,
                message: 'Successfully logged in!',
                data: {
                    accessToken: token
                }
            })

        })
    })
    describe('registerUser', () => {
        it('should properly call the registerUser', async () => {
            const payload = { username: 'asd', password: 'asd', confirmPassword: 'asd' } as RegisterUserPayload;
            const user: Partial<UserEntity> = {
                id: 1,
                role: UserRole.USER,
                username: 'asd'
            }

            jest.spyOn(authService, 'registerUser').mockResolvedValue(user as UserEntity);
            jest.spyOn(ctxDataModule, 'getContextStateData').mockReturnValue(payload);

            await authController.registerUser(ctx as Context);

            expect(authService.registerUser).toHaveBeenCalledWith(payload);
            expect(ctx.status).toEqual(201)
            expect(ctx.body).toMatchObject({
                success: true,
                status: 201,
                message: 'Successfully registered!',
                data: {
                    ...user
                }
            })

        })
    })
})