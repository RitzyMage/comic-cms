import DAO from "./DAO";

interface Tag {
  id: number;
  name: string;
}

export default class TagDAO extends DAO {
  async getComicTags(comicId: number) {
    return await this.transaction
      .select("tags.name", "tags.id")
      .from("tags")
      .leftJoin("comic_tags", "tags.id", "comic_tags.tag")
      .where({ "comic_tags.comic": comicId });
  }

  async getTags() {
    return this.transaction.select("name", "id").from("tags");
  }

  async replaceTags(names: string[], comicId: number) {
    await this.transaction("comic_tags").where({ comic: comicId }).del();
    await this.addTags(names, comicId);
  }

  async addTags(names: string[], comicId: number) {
    let alreadyExistingTags: Tag[] = await this.transaction
      .select("name", "id")
      .from("tags")
      .whereIn("name", names);

    let tagsToAdd = names
      .filter(name => alreadyExistingTags.findIndex(tag => tag.name === name) === -1)
      .map(name => name.toLowerCase().replace(/[^a-z0-9 ]/g, ""));
    if (tagsToAdd.length > 0) {
      await this.transaction.insert(tagsToAdd.map(name => ({ name }))).into("tags");
    }
    let newTags: Tag[] = await this.transaction
      .select("name", "id")
      .from("tags")
      .whereIn("name", tagsToAdd);

    let comicTags = [...alreadyExistingTags, ...newTags];
    if (comicTags.length > 0) {
      return await this.transaction
        .insert(comicTags.map(tag => ({ tag: tag.id, comic: comicId })))
        .into("comic_tags");
    }
  }
}