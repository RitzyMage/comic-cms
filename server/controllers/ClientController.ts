import { DAOFunction, TransactionType } from "../dao/DAOFunction";
import ComicDAO from "../dao/ComicDAO";
import TagDAO from "../dao/TagTAO";

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

  public getEndImages = DAOFunction(
    async (comicDAO: ComicDAO) => {
      return await comicDAO.getEndImages();
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

  public getTags = DAOFunction(
    async (tagDAO: TagDAO, comicId: number) => {
      return await tagDAO.getComicTags(comicId);
    },
    TransactionType.CLIENT,
    TagDAO
  );

  public getComic = DAOFunction(
    async (comicDAO: ComicDAO, id: number) => {
      return await comicDAO.getComic(id);
    },
    TransactionType.CLIENT,
    ComicDAO
  );
}
