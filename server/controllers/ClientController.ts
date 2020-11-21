import knex from "knex";
const connection = knex(require("../knexfile-client"));

export default class ClientController {
  async getComicCount() {
    return await connection("comics").count("id", { as: "count" }).first();
  }

  async getEndImages() {
    let [first, last] = await connection
      .select("image", "image_lowres", "height", "width")
      .from("comics")
      .whereNull("next")
      .orWhereNull("previous");
    return { first, last };
  }

  async getBlockImages(start: number, end: number) {
    return await connection
      .select("id", "image", "image_lowres", "title")
      .from("comics")
      .where("id", ">=", start)
      .andWhere("id", "<=", end);
  }

  async getTags(id: number) {
    return await connection
      .select("tags.name as name", "tags.id as id")
      .from("tags")
      .leftJoin("comic_tags", "tags.id", "comic_tags.tag")
      .where({ "comic_tags.comic": id });
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
        "comics.height",
        "next.height as nextHeight",
        "prev.height as prevHeight",
        "next.width as nextWidth",
        "comics.width",
        "prev.width as prevWidth",
        "next.image as nextImage",
        "prev.image as prevImage",
        "prev.image_lowres as prevLowres",
        "comics.image_lowres",
        "next.image_lowres as nextLowres",
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
