import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("USERS", (table) => {
    table.string("USERNAME").notNullable().unique();
    table.string("HASH").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("USERS");
}
