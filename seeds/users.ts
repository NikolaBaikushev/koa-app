import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex('users').del();

    await knex('users').insert([
        {
            id: 1,
            username: 'test',
            password: 'test'
        },
        {
            id: 2,
            username: 'Bobi',
            password: 'bobipass123'
        },
        {
            id: 3,
            username: 'Angel',
            password: 'angelpass123'
        }
    ])
};
