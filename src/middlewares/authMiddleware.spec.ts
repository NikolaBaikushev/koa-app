// tests/authMiddleware.test.ts

import { authMiddleware } from '../middlewares/authMiddleware';
import passport from '../config/authConfig';
import { Context, Next } from 'koa';
import { createErrorResponse } from '../utils/createResponse';
import { UserEntity } from '../schemas/models/userEntitySchema';

jest.mock('../config/authConfig');


describe('authMiddleware', () => {
    let ctx: Partial<Context>;
    let next = jest.fn() as Next;

    beforeEach(() => {
        ctx = {
            state: {} as any,
        };
    });

    afterEach(() => jest.clearAllMocks())

    it('should authenticate and call next when user is valid', async () => {
        const user = { id: 1, username: 'asd' } as UserEntity;

        jest.spyOn(passport, 'authenticate').mockImplementation((strategy, options, callback) => {
            return (ctx: any, next: any) => {
                callback!(null, user, null);
            };
        });

        await authMiddleware(ctx as Context, next);

        expect(ctx.state!.user).toEqual(user);
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 when user is invalid', async () => {
        jest.spyOn(passport, 'authenticate').mockImplementation((strategy, options, callback) => {
            return (ctx: any, next: any) => {
                callback!(null, null, null);
            };
        });

        await authMiddleware(ctx as Context, next);

        expect(ctx.status).toBe(401);
        expect(ctx.body).toEqual(
            createErrorResponse(401, 'Unathorized', { message: 'Invalid or Missing User.' })
        );
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 500 when there is an error', async () => {
        const error = new Error('Something went wrong');

        jest.spyOn(passport, 'authenticate').mockImplementation((strategy, options, callback) => {
            return (ctx: any, next: any) => {
                callback!(error, null, null);
            };
        });

        await expect(authMiddleware(ctx as Context, next)).rejects.toThrow(error);

        expect(ctx.status).toBe(500);
        expect(ctx.body).toEqual(
            createErrorResponse(500, 'Internal Server Error', {
                message: 'Oops! Something went wrong. Please try again!',
            })
        );
        expect(next).not.toHaveBeenCalled();
    });
});
