import DAO from "./DAO";

export default class TagDAO extends DAO {
  async getComicTags(comicId: number) {
    return await this.transaction
      .select("tags.name as name", "tags.id as id")
      .from("tags")
      .leftJoin("comic_tags", "tags.id", "comic_tags.tag")
      .where({ "comic_tags.comic": comicId });
  }
}
