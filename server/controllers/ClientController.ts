import { DAOFunction, TransactionType, TransactionFunction } from "../dao/DAOFunction";
import ComicDAO, { Comic } from "../dao/ComicDAO";
import TagDAO, { Tag } from "../dao/TagDAO";
import { Transaction } from "knex";
import isError from "../utils/IsError";
import DatabaseError from "../dao/DatabaseError";
import CheckIfError from "../utils/CheckIfError";
import ClientError from "../utils/ClientError";

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

  public getEndImages = DAOFunction(
    async (comicDAO: ComicDAO) => {
      return await comicDAO.getEndImages();
    },
    TransactionType.CLIENT,
    ComicDAO
  );

  public getTaggedImages = DAOFunction(
    async (comicDAO: ComicDAO, tag: string) => {
      return await comicDAO.getTaggedImages(tag);
    },
    TransactionType.CLIENT,
    ComicDAO
  );

  public search = DAOFunction(
    async (comicDAO: ComicDAO, search: string) => {
      let searchTerms = search
        .replace(/[^\w\s]+/gi, " ")
        .split(/[\s,]+/)
        .filter(x => x);
      return await comicDAO.findComicsMatching(searchTerms);
    },
    TransactionType.CLIENT,
    ComicDAO
  );

  public getComicInfo = TransactionFunction(async (transaction: Transaction, id: number) => {
    let comicDAO = new ComicDAO(transaction);
    let tagDAO = new TagDAO(transaction);

    let existsResult = CheckIfError(await comicDAO.comicExists(id));
    if (existsResult.error) {
      return existsResult.error;
    }
    if (!existsResult.result) {
      return new ClientError(`Comic ${id} does not exist`);
    }

    let comicResult = CheckIfError(await comicDAO.getComic(id));
    if (comicResult.error) {
      return comicResult.error;
    }
    let comic = comicResult.result;

    if (!comic) {
      throw new Error(`comic ${id} does not exist`);
    }

    let next: Comic | undefined;
    let previous: Comic | undefined;
    if (comic.next) {
      let nextResult = CheckIfError(await comicDAO.getComic(comic.next));
      if (!nextResult.error) {
        next = nextResult.result;
      }
    }
    if (comic.previous) {
      let previousResult = CheckIfError(await comicDAO.getComic(comic.previous));
      if (!previousResult.error) {
        previous = previousResult.result;
      }
    }

    let tagsResult = CheckIfError(await tagDAO.getComicTags(id));
    if (tagsResult.error) {
      return tagsResult.error;
    }
    comic.tags = tagsResult.result;

    let countResult = CheckIfError(await comicDAO.getComicCount());
    if (countResult.error) {
      return countResult.error;
    }

    let endImages = CheckIfError(await comicDAO.getEndImages());
    if (endImages.error) {
      return endImages.error;
    }

    return {
      comic,
      previous,
      next,
      first: endImages.result.first,
      last: endImages.result.last,
      count: countResult.result,
    };
  }, TransactionType.CLIENT);
}
