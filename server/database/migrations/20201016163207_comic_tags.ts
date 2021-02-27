import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("tags", table => {
    table.increments();
    table.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("tags");
}
