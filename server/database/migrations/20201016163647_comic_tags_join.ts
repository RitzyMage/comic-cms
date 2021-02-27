import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("comic_tags", table => {
    table.integer("comic").unsigned();
    table.integer("tag").unsigned();
    table.foreign("comic").references("id").inTable("comics");
    table.foreign("tag").references("id").inTable("tags");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comic_tags");
}
