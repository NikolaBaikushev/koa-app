import { Context } from "koa"
import { validateParams } from "./validateParams"
import z from "zod";

describe('validateParams', () => {
    let ctx: Context;
    const schema = z.object({
        title: z.string().nonempty(),
    })

    beforeEach(() => {
        ctx = {
            state: {},
            data: undefined,
            params: {
                title: 'asd'
            },
            throw: jest.fn()
        } as unknown as Context;
    })

    afterEach(() => jest.clearAllMocks())

    it('should properly run the validation', () => {
        const spy = jest.spyOn(schema, 'safeParse').mockReturnValue({ success: true, data: ctx.params })

        const result = validateParams(ctx, schema)

        const spyResult = spy.mock.results[0]?.value;

        expect(result).toBeDefined();
        expect(result).toEqual(ctx.params);

        expect(schema.safeParse).toHaveBeenCalledWith(ctx.params);
        expect(ctx.throw).not.toHaveBeenCalled();
        
        expect(spyResult.success).toEqual(true)
        expect(spyResult.data).toEqual(ctx.params)
    })

    it('should fail the validation', () => {
        const spy = jest.spyOn(schema, 'safeParse').mockReturnValue({ success: false, error: new z.ZodError([])} as any)

        ctx.params = {}

        const result = validateParams(ctx, schema)

        const spyResult = spy.mock.results[0]?.value;

        expect(result).toBeUndefined();

        expect(schema.safeParse).toHaveBeenCalledWith(ctx.params);
        expect(ctx.throw).toHaveBeenCalledWith(400, 'Invalid URL Parameters');
        
        expect(spyResult.success).toEqual(false)
        expect(spyResult.error).toBeDefined();
        expect(spyResult.data).toBeUndefined();
    })
})