import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('books', (table) => {
        table.increments('id');
        table.string('author');
        table.string('title');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('books');
}

