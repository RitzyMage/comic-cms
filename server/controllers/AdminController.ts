import knex from "knex";
const connection = knex(require("../knexfile"));

interface AddComicParams {
  title: string;
  transcript: string;
  mouseover: string;
  image: string;
  image_lowres: string;
  height: number;
  width: number;
}

export default class AdminController {
  public async addComic(params: AddComicParams) {
    let [{ id: lastComic }] = await connection("comics").whereNull("next");
    let posted = new Date().toISOString().split("T")[0];
    await connection("comics").insert({
      ...params,
      posted,
      previous: lastComic,
    });
    let [{ id: newID }] = await connection("comics")
      .where({ previous: lastComic })
      .select("id");
    await connection("comics").update({ next: newID }).where({ id: lastComic });
  }
}
