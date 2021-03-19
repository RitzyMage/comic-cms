import { Transaction } from "knex";
import { AddComicDatabase, EditComicParams } from "../utils/addComicParams";
import CheckIfError from "../utils/CheckIfError";
import CustomError from "../utils/CustomError";
import ServerError from "../utils/ServerError";
import DAO from "./DAO";
import DatabaseError from "./DatabaseError";
import { Tag } from "./TagDAO";

export interface ComicImage {
  id: string;
  image: string;
  image_lowres: string;
  height: number;
  width: number;
}

export interface ComicUpload {
  id: string;
  title: string;
  image: string;
  posted: string;
}

export interface Comic {
  id: string;
  title: string;
  transcript: string;
  mouseover: string;
  image: string;
  height: string;
  width: string;
  image_lowres: string;
  posted: string;
  next?: number;
  previous?: number;
  tags?: Tag[];
}

export default class ComicDAO extends DAO {
  constructor(transaction: Transaction) {
    super(transaction);
  }

  async getComicCount(): Promise<number | DatabaseError> {
    try {
      return Number((await this.transaction("comics").count("id", { as: "count" }).first())?.count);
    } catch (e) {
      console.error(e);
      return new DatabaseError("could not get comic info from database");
    }
  }

  async getEndImages(): Promise<{ first: ComicImage; last: ComicImage } | DatabaseError> {
    try {
      let [first, last] = await this.transaction
        .select("id", "image", "image_lowres", "height", "width")
        .from("comics")
        .whereNull("next")
        .orWhereNull("previous");
      return { first, last };
    } catch (e) {
      console.error(e);
      return new DatabaseError("could not get end images from database");
    }
  }

  async findComicsMatching(toFind: string[]): Promise<ComicImage[] | DatabaseError> {
    let terms = toFind.join(" ");

    try {
      return await this.transaction
        .select("id", "image", "image_lowres", "title")
        .where(
          this.transaction.raw(
            `match(TITLE,TRANSCRIPT,MOUSEOVER) against ("${terms}" in natural language mode)`
          )
        )
        .from("comics")
        .limit(5);
    } catch (e) {
      console.error(e);
      return new DatabaseError(`database error when searching for ${terms}`);
    }
  }

  async getBlockImages(start: number, end: number): Promise<ComicImage[] | DatabaseError> {
    try {
      return await this.transaction
        .select("id", "image", "image_lowres", "title")
        .from("comics")
        .where("id", ">=", start)
        .andWhere("id", "<=", end);
    } catch (e) {
      console.error(e);
      return new DatabaseError(
        `database error when searching for comics between ${start} and ${end}`
      );
    }
  }

  async getRecentUploads(count: number): Promise<ComicUpload[] | CustomError> {
    if (count < 1) {
      return new ServerError(`${count} is invalid count for getting recent uploads`);
    }
    try {
      return await this.transaction
        .select("id", "image", "posted", "title")
        .from("comics")
        .orderBy("posted", "desc")
        .limit(count);
    } catch (e) {
      console.error(e);
      return new DatabaseError(`database error while fetching ${count} most recent entires`);
    }
  }

  async getTaggedImages(tag: string): Promise<ComicImage[] | DatabaseError> {
    try {
      return await this.transaction
        .select("comics.id", "image", "image_lowres", "title")
        .from("comics")
        .join("comic_tags", "comics.id", "=", "comic_tags.comic")
        .join("tags", "tags.id", "=", "comic_tags.tag")
        .where(this.transaction.raw("LOWER(tags.name)"), "=", tag);
    } catch (e) {
      return new DatabaseError(`database error while fetching comics marked with tag ${tag}`);
    }
  }

  async comicExists(id: number): Promise<boolean | DatabaseError> {
    try {
      let matches = await this.transaction.select("id").from("comics").where({ id });
      return matches.length > 0;
    } catch (e) {
      console.error(e);
      return new DatabaseError(`could not get comic ${id} from database`);
    }
  }

  async getComic(id: number): Promise<Comic | DatabaseError> {
    try {
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
    } catch (e) {
      console.error(e);
      return new DatabaseError(`could not get comic ${id} from database`);
    }
  }

  async getLastId(): Promise<number | DatabaseError> {
    try {
      let { id } = await this.transaction("comics").whereNull("next").first();
      return Number(id);
    } catch (e) {
      console.error(e);
      return new DatabaseError("could not get last ID from database");
    }
  }

  async create(params: AddComicDatabase, posted: string): Promise<number | DatabaseError> {
    try {
      let previousID = await this.getLastId();
      let previousResult = CheckIfError(previousID);
      if (previousResult.error) {
        return previousResult.error;
      }
      let previous = previousResult.result;

      await this.transaction("comics").insert({
        ...params,
        posted,
        previous,
      });

      let [{ id }] = await this.transaction("comics").select("id").where({ previous });

      await this.transaction("comics").update({ next: id }).where({ id: previous });

      return id;
    } catch (e) {
      console.error(e);
      return new DatabaseError("could not insert comic into database");
    }
  }

  async update(params: EditComicParams, id: number): Promise<DatabaseError | void> {
    try {
      await this.transaction("comics").update(params).where({ id });
    } catch (e) {
      console.error(e);
      return new DatabaseError(`could not update comic ${id} in database`);
    }
  }
}
