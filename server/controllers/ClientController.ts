import knex from "knex";
const connection = knex(require("../knexfile"));

export default class ClientController {
  async getComicCount() {
    return await connection("comics").count("id", { as: "count" }).first();
  }

  async getEndImages() {
    let [first, last] = await connection
      .select("image")
      .from("comics")
      .whereNull("next")
      .orWhereNull("previous");
    return { firstImage: first.image, lastImage: last.image };
  }

  async getComic(id: number) {
    return await connection
      .select(
        "comics.id",
        "next.id as next",
        "prev.id as previous",
        "comics.title",
        "comics.transcript",
        "comics.mouseover",
        "comics.image",
        "next.image as nextImage",
        "prev.image as prevImage",
        "comics.image_lowres",
        "comics.posted"
      )
      .from("comics")
      .where({ "comics.id": id })
      .leftJoin("comics as prev", "comics.previous", "prev.id")
      .leftJoin("comics as next", "comics.next", "next.id")
      .select()
      .first();
  }
}
