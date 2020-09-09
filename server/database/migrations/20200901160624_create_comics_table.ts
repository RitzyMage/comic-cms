import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("COMICS", (table) => {
    table.increments();
    table.string("TITLE");
    table.string("TRANSCRIPT", 3000).notNullable();
    table.string("MOUSEOVER");
    table.string("IMAGE").notNullable();
    table.string("IMAGE_LOWRES").notNullable();
    table.dateTime("POSTED").notNullable();
    table.integer("PREVIOUS").unsigned();
    table.integer("HEIGHT").notNullable();
    table.integer("WIDTH").notNullable();
    table.foreign("PREVIOUS").references("ID").inTable("COMICS");
    table.integer("NEXT").unsigned();
    table.foreign("NEXT").references("ID").inTable("COMICS");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("COMICS");
}
