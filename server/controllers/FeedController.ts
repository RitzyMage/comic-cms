import { Feed } from "feed";
import { DAOFunction, TransactionType, TransactionFunction } from "../dao/DAOFunction";
import ComicDAO from "../dao/ComicDAO";
import { Transaction } from "knex";

let CLIENT_URL = "http://localhost:3311";
let AUTHOR = "John Doe";
export default class FeedController {
  private getFeedGenerator() {
    return new Feed({
      title: "Feed Title",
      description: "This is my personal feed!",
      id: CLIENT_URL,
      link: CLIENT_URL,
      language: "en",
      image: `${CLIENT_URL}/image.png`,
      favicon: `${CLIENT_URL}/favicon.ico`,
      copyright: `All rights reserved 2013, ${AUTHOR}`,
      feedLinks: {},
      author: {
        name: AUTHOR,
        email: "johndoe@example.com",
        link: "https://example.com/johndoe",
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
            link: `${CLIENT_URL}/${comic.id}`,
            date: new Date(comic.posted),
          })
      );
      return feed.rss2();
    },
    TransactionType.CLIENT,
    ComicDAO
  );
}
