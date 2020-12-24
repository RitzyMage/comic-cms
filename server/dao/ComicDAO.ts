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
        "id",
        "title",
        "transcript",
        "mouseover",
        "image",
        "height",
        "width",
        "image_lowres",
        "posted",
        "next",
        "previous"
      )
      .from("comics")
      .where({ id })
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