import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("COMIC_TAGS", table => {
    table.integer("COMIC").unsigned();
    table.integer("TAG").unsigned();
    table.foreign("COMIC").references("ID").inTable("COMICS");
    table.foreign("TAG").references("ID").inTable("TAGS");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("COMIC_TAGS");
}
