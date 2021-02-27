import { Feed } from "feed";
import { DAOFunction, TransactionType, TransactionFunction } from "../dao/DAOFunction";
import ComicDAO from "../dao/ComicDAO";
import { Transaction } from "knex";

let TITLE = process.env.COMIC_TITLE ?? "";
let CLIENT_URL = process.env.APP_URL ?? "";
let AUTHOR = process.env.COMIC_AUTHOR ?? "";
let DESCRIPTION = process.env.COMIC_DESCRIPTION ?? "";
let YEAR = new Date().getFullYear();
export default class FeedController {
  private getFeedGenerator() {
    return new Feed({
      title: TITLE,
      description: DESCRIPTION,
      id: CLIENT_URL,
      link: CLIENT_URL,
      language: "en",
      image: `${CLIENT_URL}/image.png`,
      favicon: `${CLIENT_URL}/favicon.ico`,
      copyright: `All rights reserved ${YEAR}, ${AUTHOR}`,
      feedLinks: {},
      author: {
        name: AUTHOR,
        email: process.env.COMIC_EMAIL,
      },
    });
  }

  public generateFeed = DAOFunction(
    async (comicDAO: ComicDAO) => {
      let feed = this.getFeedGenerator();
      (await comicDAO.getRecentUploads(5)).forEach(
        (comic: { id: string; title: string; posted: string }) =>
          feed.addItem({
            title: comic.title,
            link: `${CLIENT_URL}/comic/${comic.id}`,
            date: new Date(comic.posted),
          })
      );
      return feed.rss2();
    },
    TransactionType.CLIENT,
    ComicDAO
  );
}
