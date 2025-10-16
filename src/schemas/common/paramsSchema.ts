import z from 'zod';

export const ParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const createParamSchema = (...paramsName: string[]) => {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const name of paramsName) {
        shape[name] = z.coerce.number().int().positive(); // currently works only for ids because 
    }
    return z.object(shape)
}
