import { z } from 'zod';
import * as responseModule from '../utils/createResponse';
import { validateBody } from './validationMiddleware';
import { Context, Next } from 'koa';


describe('validationMiddleware', () => {
    const schema = z.object({
        title: z.string().nonempty('Title cannot be empty!'),
        author: z.string().nonempty('Authro cannot be empty!'),
    });

    let ctx: Context;
    const next = jest.fn() as Next;

    beforeEach(() => {
        ctx = {
            request: { body: {} },
            status: undefined,
            body: undefined,
            state: {},
        } as unknown as Context;

    });

    afterEach(() => jest.clearAllMocks());

    it('calls next and sets parsed data when validation succeeds', async () => {
        ctx.request.body = { title: 'asd', author: 'asd asd asd' };

        const middleware = validateBody(schema);

        await middleware(ctx, next);

        expect(ctx.state.data).toEqual({ title: 'asd', author: 'asd asd asd' });
        expect(next).toHaveBeenCalled();
        expect(ctx.status).toBeUndefined();
        expect(ctx.body).toBeUndefined();
    });

    it('sets 422 and error body when validation fails', async () => {
        ctx.request.body = { title: 'asd' };

        const errorResponse: responseModule.ErrorResponse = {
            success: false,
            status: 422,
            message: 'Validation failed',
            errors: {}
        };

        jest.spyOn(responseModule, 'createErrorResponse').mockReturnValue(errorResponse);

        const middleware = validateBody(schema);

        await middleware(ctx, next);

        expect(ctx.status).toBe(422);
        expect(ctx.body).toMatchObject({
            ...errorResponse,
            errors: expect.any(Object)
        });

        expect(next).not.toHaveBeenCalled();

        expect(responseModule.createErrorResponse).toHaveBeenCalledWith(
            422,
            'Validation failed',
            expect.any(Object)
        );

    });
});
