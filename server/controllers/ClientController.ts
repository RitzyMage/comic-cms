import { DAOFunction, TransactionType, TransactionFunction } from "../dao/DAOFunction";
import ComicDAO from "../dao/ComicDAO";
import TagDAO from "../dao/TagTAO";
import { Transaction } from "knex";

interface Range {
  first: number;
  last: number;
}

export default class ClientController {
  public getComicCount = DAOFunction(
    async (comicDAO: ComicDAO) => {
      return await comicDAO.getComicCount();
    },
    TransactionType.CLIENT,
    ComicDAO
  );

  public getBlockImages = DAOFunction(
    async (comicDAO: ComicDAO, range: Range) => {
      return await comicDAO.getBlockImages(range.first, range.last);
    },
    TransactionType.CLIENT,
    ComicDAO
  );

  public search = DAOFunction(
    async (comicDAO: ComicDAO, search: string) => {
      let searchTerms = search.split(" ");
      return await comicDAO.findComicsMatching(searchTerms);
    },
    TransactionType.CLIENT,
    ComicDAO
  );

  public getComicInfo = TransactionFunction(async (transaction: Transaction, id: number) => {
    let comicDAO = new ComicDAO(transaction);
    let tagDAO = new TagDAO(transaction);

    let comic = await comicDAO.getComic(id);

    let next, previous;
    if (comic.next) {
      next = await comicDAO.getComic(comic.next);
    }
    if (comic.previous) {
      previous = await comicDAO.getComic(comic.previous);
    }

    comic.tags = await tagDAO.getComicTags(id);
    return {
      comic,
      previous,
      next,
      ...(await comicDAO.getEndImages()),
      ...(await comicDAO.getComicCount()),
    };
  }, TransactionType.CLIENT);
}
