import CustomError from "../utils/CustomError";
import ServerError from "../utils/ServerError";
import DAO from "./DAO";
import DatabaseError from "./DatabaseError";
import { Tag } from "./Tag";

export default class TagDAO extends DAO {
  async getComicTags(comicId: number): Promise<Tag[] | DatabaseError> {
    try {
      return await this.transaction
        .select("tags.name", "tags.id")
        .from("tags")
        .leftJoin("comic_tags", "tags.id", "comic_tags.tag")
        .where({ "comic_tags.comic": comicId });
    } catch (e) {
      console.error(e);
      return new DatabaseError(`could not get tags for comic ${comicId} from database`);
    }
  }

  async getTags(): Promise<Tag[] | DatabaseError> {
    try {
      return this.transaction.select("name", "id").from("tags");
    } catch (e) {
      console.error(e);
      return new DatabaseError("could not get tags from database");
    }
  }

  async replaceTags(names: string[], comicId: number): Promise<DatabaseError | void> {
    try {
      await this.transaction("comic_tags").where({ comic: comicId }).del();
      await this.addTags(names, comicId);
    } catch (e) {
      console.error(e);
      return new DatabaseError(`could not replace tags for comic ${comicId}`);
    }
  }

  async addTags(names: string[], comicId: number): Promise<CustomError | void> {
    let alreadyExistingTags: Tag[] = [];
    let tagsToAdd: string[] = [];
    let newTags: Tag[] = [];
    try {
      alreadyExistingTags = await this.transaction
        .select("name", "id")
        .from("tags")
        .whereIn("name", names);
    } catch (e) {
      console.log(e);
      return new DatabaseError(`Could not fetch tags with names ${names} from database`);
    }

    try {
      tagsToAdd = names
        .filter(name => alreadyExistingTags.findIndex(tag => tag.name === name) === -1)
        .map(name => name.toLowerCase().replace(/[^a-z0-9 ]/g, ""));
      if (tagsToAdd.length > 0) {
        await this.transaction.insert(tagsToAdd.map(name => ({ name }))).into("tags");
      }
    } catch (e) {
      console.error(e);
      return new DatabaseError(`error while adding tags ${tagsToAdd}`);
    }

    try {
      newTags = await this.transaction.select("name", "id").from("tags").whereIn("name", tagsToAdd);
    } catch (e) {
      console.error(e);
      return new DatabaseError(`could not fetch new tag ids for ${tagsToAdd}`);
    }

    let comicTags = [...alreadyExistingTags, ...newTags];

    try {
      if (comicTags.length > 0) {
        await this.transaction
          .insert(comicTags.map(tag => ({ tag: tag.id, comic: comicId })))
          .into("comic_tags");
      }
    } catch (e) {
      console.error(e);
      return new DatabaseError(`database error while adding ${comicTags} to comic ${comicId}`);
    }
  }
}
