import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.raw("alter table COMICS add fulltext(TITLE,TRANSCRIPT,MOUSEOVER)");
}

export async function down(knex: Knex): Promise<void> {
  return await knex.raw("alter table COMICS drop index TITLE");
}
