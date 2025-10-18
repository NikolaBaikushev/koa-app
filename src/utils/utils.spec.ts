import { Context, Next } from 'koa';
import { config } from '../../config';
import jwt from 'jsonwebtoken';
import { getContextStateData } from './getContextStateData';
import { User, UserRole } from '../schemas/models/userEntitySchema';
import { createToken, JwtTokenPayload } from './createToken';
import { errorControllerWrapper } from './errorHandlerWrapper';
import * as isHttpModule from '../types/guards/isHttpError';
import * as createResponseModule from './createResponse';
import { CustomHttpError } from '../common/HttpError';

/* eslint-disable @typescript-eslint/no-explicit-any */


jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

describe('utils', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    describe('createToken', () => {
        it('should return a string token', async () => {
            const payload = {} as JwtTokenPayload;
            createToken(payload);
            expect(jwt.sign).toHaveBeenCalledWith(payload, config.SECRET, { expiresIn: '1h' });
        });
    });

    describe('getContextStateData', () => {
        let ctx = {} as Context;

        beforeEach(() => {
            ctx = { state: {} } as any;
        });

        it('should throw error if don\'t have data on state', async () => {
            try {
                await getContextStateData(ctx);
            } catch (err: any) {
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toEqual('Context doesn\'t have "data"');
            }
        });
        it('should return the context state data with proper type', async () => {
            const user: User = {
                username: 'asd',
                role: UserRole.USER,
                id: 1
            };
            ctx.state.data = { user };
            const result = getContextStateData<User>(ctx);
            expect(result).toMatchObject(ctx.state.data as any);
        });
    });

    describe('errorHandlerWrapper', () => {
        let ctx: Partial<Context>;
        const next = jest.fn() as Next;

        beforeEach(() => {
            ctx = {
                status: 0,
                body: undefined,
            };
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        }
        );

        it('should run controller successfully and not change ctx on success', async () => {
            const controller = jest.fn().mockResolvedValue(undefined);

            const wrapped = errorControllerWrapper(controller);

            await wrapped(ctx as Context, next);

            expect(controller).toHaveBeenCalledWith(ctx);
            expect(ctx.status).toBe(0);
            expect(ctx.body).toBeUndefined();
        });

        it('should handle HTTP error correctly', async () => {
            const error = new CustomHttpError(404, 'Not Found');

            const failResponse = { success: false, status: 404, message: 'Not Found' } as createResponseModule.FailResponse;

            jest.spyOn(isHttpModule, 'isHttpError').mockReturnValue(true);
            jest.spyOn(createResponseModule, 'createFailResponse').mockReturnValue(failResponse);
            const controller = jest.fn().mockImplementation(() => {
                throw error;
            });

            const wrapped = errorControllerWrapper(controller);
            await wrapped(ctx as Context, next);

            expect(isHttpModule.isHttpError).toHaveBeenCalledWith(error);
            expect(isHttpModule.isHttpError).toHaveBeenCalledWith(error);
            expect(ctx.status).toBe(404);
            expect(ctx.body).toEqual(failResponse);
            expect(createResponseModule.createFailResponse).toHaveBeenCalledWith(404, 'Not Found');
        });

        it('should handle non-HTTP error correctly', async () => {
            const error = new Error();

            const errorResponse = {
                success: false,
                status: 500,
                message: 'Internal Server Error'
            } as createResponseModule.ErrorResponse;

            jest.spyOn(isHttpModule, 'isHttpError').mockReturnValue(false);
            jest.spyOn(createResponseModule, 'createErrorResponse').mockReturnValue(errorResponse);

            const controller = jest.fn().mockImplementation(() => {
                throw error;
            });

            const wrapped = errorControllerWrapper(controller);

            await wrapped(ctx as Context, next);

            expect(isHttpModule.isHttpError).toHaveBeenCalledWith(error);
            expect(ctx.status).toBe(500);
            expect(ctx.body).toEqual(errorResponse);
            expect(createResponseModule.createErrorResponse).toHaveBeenCalledWith(500, 'Something went wrong', {});
        });
    });

    describe('createResponse', () => {
        afterEach(() => jest.clearAllMocks());

        it('should create success response', () => {
            const status = 200;
            const message = 'OK!';
            const data = {
                user: { id: 1 }
            };
            const result = createResponseModule.createSuccessResponse(status, message, data);
            expect(result.status).toEqual(status);
            expect(result.message).toEqual(message);
            expect(result.data).toStrictEqual(data);
            expect(result.success).toBe(true);
        });

        it('should create fail response', () => {
            const status = 400;
            const message = 'OK!';
            const result = createResponseModule.createFailResponse(status, message);
            expect(result.status).toEqual(status);
            expect(result.message).toEqual(message);
            expect(result.success).toBe(false);
        });

        it('should create error response', () => {
            const status = 500;
            const message = 'Internal Server Error';
            const errors = {
                message: 'Server Error'
            };
            const result = createResponseModule.createErrorResponse(status, message, errors);
            expect(result.status).toEqual(status);
            expect(result.message).toEqual(message);
            expect(result.success).toBe(false);
        });
    });
});