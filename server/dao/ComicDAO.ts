import { Transaction } from "knex";
import { AddComicDatabase, EditComicParams } from "../utils/addComicParams";
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

  async findComicsMatching(toFind: string[]) {
    let terms = toFind.join(" ");
    return await this.transaction
      .select("id", "image", "image_lowres", "title")
      .where(
        this.transaction.raw(
          `match(TITLE,TRANSCRIPT,MOUSEOVER) against ("${terms}" in natural language mode)`
        )
      )
      .from("comics")
      .limit(5);
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

  async create(params: AddComicDatabase, posted: string) {
    let previous = await this.getLastId();

    await this.transaction("comics").insert({
      ...params,
      posted,
      previous,
    });

    let [{ id }] = await this.transaction("comics").select("id").where({ previous });

    await this.transaction("comics").update({ next: id }).where({ id: previous });

    return id;
  }

  async update(params: EditComicParams, id: number) {
    await this.transaction("comics").update(params).where({ id });
  }
}
