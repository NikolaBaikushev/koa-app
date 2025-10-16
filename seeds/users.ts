import { Knex } from 'knex';
import { UserRole } from '../src/schemas/models/userEntitySchema';
export const DB_USER_SEEDS = [
    {
        username: 'test',
        password: 'test',
        role: UserRole.AUTHOR
    },
    {
        username: 'sony',
        password: 'sony',
        role: UserRole.USER
    },
    {
        username: 'john',
        password: 'john',
        role: UserRole.USER
    },
    {
        username: 'papi',
        password: 'papi',
        role: UserRole.USER
    },
] as const;

export async function seed(knex: Knex): Promise<void> {
    await knex('users').del();

    await knex('users').insert(DB_USER_SEEDS);
};
