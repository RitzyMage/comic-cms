import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("TAGS").del();
  await knex("TAGS").insert([
    { name: "Spot", id: 1 },
    { name: "Stripe", id: 2 },
  ]);

  await knex("COMIC_TAGS").insert([
    { comic: 1, tag: 1 },
    { comic: 1, tag: 2 },
  ]);
}
