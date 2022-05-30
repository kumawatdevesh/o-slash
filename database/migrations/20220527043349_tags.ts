import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tags', (t: Knex.TableBuilder) => {
        t.uuid('id').primary().notNullable().unique()
        t.string('name').notNullable()
        t.boolean('isActive').defaultTo(true).notNullable()
        t.enum('accessType', ["PRIVATE", "PUBLIC"]).defaultTo("PRIVATE").notNullable();
        t.timestamp('createdAt').defaultTo(knex.fn.now())
        t.timestamp('updatedAt').defaultTo(knex.fn.now())
        t.uuid('userId')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('cascade')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('tags');
}