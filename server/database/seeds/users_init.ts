import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      username: "admin",
      hash: "$2a$10$u5482KFTjQdsDvyw40riWuttnY9zLfRGtojYC2dMYH60XXOs0LXnS",
    },
  ]);
}
