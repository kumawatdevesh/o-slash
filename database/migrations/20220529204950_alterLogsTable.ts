import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tags', (t: Knex.TableBuilder) => {
        t.uuid('userId')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('cascade')
        .alter()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tags', (t: Knex.TableBuilder) => {
        t.dropColumn('userId')
    })
}