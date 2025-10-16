
import knex from 'knex';
import dotenv from 'dotenv';
import { config } from '../../config';

dotenv.config();

const setup = {
    client: 'pg',
    connection: {
        host: config.POSTGRES_HOST,
        port: Number(config.POSTGRES_DB_PORT),
        user: config.POSTGRES_USER,
        password: config.POSTGRES_PASSWORD,
        database: config.POSTGRES_DB,
    }
};
export const knexSetup = setup;
export const db = knex(setup);