import { Transaction } from "knex";
import AddComicParams from "../utils/addComicParams";
import DAO from "./DAO";

export default class ComicDAO extends DAO {
  constructor(transaction: Transaction) {
    super(transaction);
  }

  async getComicCount() {
    return await this.transaction("comics").count("id", { as: "count" }).first();
  }

  async getEndImages() {
    let [first, last] = await this.transaction
      .select("image", "image_lowres", "height", "width")
      .from("comics")
      .whereNull("next")
      .orWhereNull("previous");
    return { first, last };
  }

  async getBlockImages(start: number, end: number) {
    return await this.transaction
      .select("id", "image", "image_lowres", "title")
      .from("comics")
      .where("id", ">=", start)
      .andWhere("id", "<=", end);
  }

  async getComic(id: number) {
    return await this.transaction
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

  async getLastId() {
    let { id } = await this.transaction("comics").whereNull("next").first();
    return id as number;
  }

  async create(params: AddComicParams, posted: string) {
    let previous = await this.getLastId();

    let [{ id }] = await this.transaction("comics")
      .insert({
        ...params,
        posted,
        previous,
      })
      .returning("id");

    await this.transaction("comics").update({ next: id }).where({ id: previous });
  }

  async update(params: AddComicParams, id: number) {
    await this.transaction("comics").update(params).where({ id });
  }
}
