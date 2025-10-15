
import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().min(4, '.env Varaiable PORT is required and must have atleast 4 digits'),
    SECRET: z.string().min(1, ".env variable SECRET is required!")
})

type ConfigData = z.infer<typeof envSchema>;

const parsedData = envSchema.safeParse(process.env);
if (!parsedData.success) {
    console.error('.env file has errors', z.flattenError(parsedData.error))
    process.exit(1);
}

export const config: ConfigData = {
    PORT: parsedData.data.PORT,
    SECRET: parsedData.data.SECRET,
};
