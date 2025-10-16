
import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().min(4, '.env Varaiable PORT is required and must have atleast 4 digits'),
    SECRET: z.string().min(1, '.env variable SECRET is required!'),
    POSTGRES_USER: z.string().nonempty('Cannot be empty!'),
    POSTGRES_PASSWORD: z.string().nonempty('Cannot be empty!'),
    POSTGRES_HOST: z.string().nonempty('Cannot be empty!'),
    POSTGRES_DB: z.string().nonempty('Cannot be empty!'),
    POSTGRES_DB_PORT: z.string().nonempty('Cannot be empty!'),
});

type ConfigData = z.infer<typeof envSchema>;

const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error('.env file has errors', z.flattenError(env.error));
    process.exit(1);
}

export const config: ConfigData = {
    PORT: env.data.PORT,
    SECRET: env.data.SECRET,
    POSTGRES_USER: env.data.POSTGRES_USER,
    POSTGRES_PASSWORD: env.data.POSTGRES_PASSWORD,
    POSTGRES_HOST: env.data.POSTGRES_HOST,
    POSTGRES_DB: env.data.POSTGRES_DB,
    POSTGRES_DB_PORT: env.data.POSTGRES_DB_PORT,
};
