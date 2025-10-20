import dotenv from 'dotenv';
import knex from 'knex';

export default async function globalSetup() {
    dotenv.config({ path: '.env.test' });
    const { knexSetup } = await import('../../src/config/knex');
    const db = knex(knexSetup);

    try {
        await db.migrate.latest();
        await db.seed.run();
    } finally {
        await db.destroy();
    }
}
