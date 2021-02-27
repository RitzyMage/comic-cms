import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.raw("alter table comics add fulltext(title, transcript, mouseover)");
}

export async function down(knex: Knex): Promise<void> {
  return await knex.raw("alter table comics drop index title");
}
