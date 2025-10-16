import type { Knex } from 'knex';
import { UserRole } from '../src/schemas/models/userEntitySchema';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.enu('role', Object.values(UserRole), {
            useNative: true,
            enumName: 'user_role',
        }).notNullable().defaultTo(UserRole.USER);
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
    await knex.raw('DROP TYPE IF EXISTS user_role');

}

