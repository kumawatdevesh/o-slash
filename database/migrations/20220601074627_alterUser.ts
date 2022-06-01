import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (t: Knex.TableBuilder) => {
        t.text('userToken').alter()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (t: Knex.TableBuilder) => {
        t.dropColumn('userToken')
    })
}