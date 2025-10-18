// tests/authMiddleware.test.ts

import { authMiddleware } from '../middlewares/authMiddleware';
import passport from '../config/authConfig';
import { Context } from 'koa';
import { createErrorResponse } from '../utils/createResponse';

jest.mock('../config/authConfig');

const mockedPassport = passport as jest.Mocked<typeof passport>;

describe('authMiddleware', () => {
    let ctx: Partial<Context>;
    let next: jest.Mock;

    beforeEach(() => {
        ctx = {
            state: {} as any,
        };
        next = jest.fn();
    });

    it('should authenticate and call next when user is valid', async () => {
        const fakeUser = { id: '123', name: 'Test User' };

        // Mock passport.authenticate to simulate a valid user
        mockedPassport.authenticate.mockImplementation((strategy, options, callback) => {
            return (ctx: any, next: any) => {
                callback!(null, fakeUser, null);
            };
        });

        await authMiddleware(ctx as Context, next);

        expect(ctx.state!.user).toEqual(fakeUser);
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 when user is invalid', async () => {
        mockedPassport.authenticate.mockImplementation((strategy, options, callback) => {
            return (ctx: any, next: any) => {
                callback!(null, null, { message: 'Invalid token' });
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

        mockedPassport.authenticate.mockImplementation((strategy, options, callback) => {
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
