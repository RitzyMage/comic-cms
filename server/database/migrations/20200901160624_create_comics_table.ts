import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("comics", table => {
    table.increments();
    table.string("title");
    table.string("transcript", 3000).notNullable();
    table.string("mouseover");
    table.string("image").notNullable();
    table.string("image_lowres").notNullable();
    table.dateTime("posted").notNullable();
    table.integer("previous").unsigned();
    table.integer("height").notNullable();
    table.integer("width").notNullable();
    table.foreign("previous").references("id").inTable("comics");
    table.integer("next").unsigned();
    table.foreign("next").references("id").inTable("comics");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comics");
}
