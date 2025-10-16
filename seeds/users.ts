import { Knex } from 'knex';
export const DB_USER_SEEDS = [
    {
        username: 'test',
        password: 'test'
    },
    {
        username: 'sony',
        password: 'sony'
    },
    {
        username: 'john',
        password: 'john'
    },
    {
        username: 'papi',
        password: 'papi'
    },
] as const;

export async function seed(knex: Knex): Promise<void> {
    await knex('users').del();

    await knex('users').insert(DB_USER_SEEDS);
};
