import { Context, Next } from 'koa';
import { UserRole } from '../schemas/models/userEntitySchema';
import { isAuthor } from './isAuthor';

describe('isAuthor', () => {
    let ctx: Context;
    const next = jest.fn() as Next;

    beforeEach(() => {
        ctx = {
            status: undefined,
            body: undefined,
            state: {},
            data: undefined,
        } as unknown as Context;
    });

    afterEach(() => jest.clearAllMocks());

    it('should not continue if there is no user', async () => {
        
        await isAuthor(ctx, next);

        expect(ctx.status).toEqual(401);
        expect(ctx.body).toMatchObject({
            success: false,
            message: 'Unauthorized',
            errors: {
                message: 'Invalid or Missing User!'
            }
        });
    });

    it('should not continue if the user\'s role is USER', async () => {
        ctx.state.user = {
            id: 1,
            username: 'asd',
            role: UserRole.USER
        };

        await isAuthor(ctx, next);

        expect(ctx.status).toEqual(403);
        expect(ctx.body).toMatchObject({
            success: false,
            message: 'Forbidden Resource',
            errors: {
                message: 'Only authors have access to this resource!'
            }
        });
    });

    it('should properly continue to next function', async () => {
        ctx.state.user = {
            id: 1,
            username: 'asd',
            role: UserRole.AUTHOR
        };

        await isAuthor(ctx, next);

        expect(ctx.status).toBeUndefined();
        expect(ctx.body).toBeUndefined();
        expect(next).toHaveBeenCalled();
    });
});