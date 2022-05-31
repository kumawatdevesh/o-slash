import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('logs', (t: Knex.TableBuilder) => {
        t.uuid('id').primary().notNullable().unique()
        t.enum('eventType', ["CREATE", "UPDATE", "DELETE", "READ"]).defaultTo("READ").notNullable();
        t.text('eventDescription').notNullable()
        t.uuid('userId')
        .references('id')
        .inTable('users')
        .notNullable()
        t.string("objectName").notNullable()
        t.uuid('objectId').notNullable()
        t.timestamp('createdAt').defaultTo(knex.fn.now())
        t.timestamp('updatedAt').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('logs');
}

