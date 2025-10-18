import { Context } from "koa";
import { LoginUserPayload, RegisterUserPayload } from "../../schemas/authSchemas";
import { authService } from "../../services/authService";
import { authController } from "./authController";
import * as getContextStateDataModule from '../../utils/getContextStateData';
import { User, UserEntity, UserRole } from "../../schemas/models/userEntitySchema";


const controller = authController;
const service = authService;

describe('authController', () => {
    let ctx: Context;

    afterEach(() => jest.clearAllMocks());

    beforeEach(() => {
        ctx = {
            status: undefined,
            body: undefined,
            state: undefined,
            data: undefined
        } as unknown as Context;
    })

    describe('loginUser', () => {
        it('should properly call the loginUser', async () => {
            const payload = { username: 'asd', password: 'asd' } as LoginUserPayload;
            const token = 'asdasdasd'
            jest.spyOn(service, 'loginUser').mockResolvedValue(token);
            jest.spyOn(getContextStateDataModule, 'getContextStateData').mockReturnValue(payload);

            await controller.loginUser(ctx as Context);

            expect(service.loginUser).toHaveBeenCalledWith(payload);
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

            jest.spyOn(service, 'registerUser').mockResolvedValue(user as UserEntity);
            jest.spyOn(getContextStateDataModule, 'getContextStateData').mockReturnValue(payload);

            await controller.registerUser(ctx as Context);

            expect(service.registerUser).toHaveBeenCalledWith(payload);
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