import { DAOFunction, TransactionType, TransactionFunction } from "../dao/DAOFunction";
import ComicDAO from "../dao/ComicDAO";
import TagDAO from "../dao/TagDAO";
import { AddComicParams, AddComicDatabase } from "../utils/addComicParams";
import { Transaction } from "knex";

export default class AdminController {
  public addComic = TransactionFunction(
    async (transaction: Transaction, params: AddComicParams) => {
      let posted = new Date().toISOString().split("T")[0];
      let comicDAO = new ComicDAO(transaction);
      let tagDAO = new TagDAO(transaction);

      let databaseParams: AddComicDatabase = {
        ...params,
      };
      delete (databaseParams as any).tags;

      let newComicID = await comicDAO.create(databaseParams, posted);
      await tagDAO.addTags(params.tags, newComicID);
    },
    TransactionType.ADMIN
  );

  public editComic = DAOFunction(
    async (comicDAO: ComicDAO, { id, params }: { id: number; params: AddComicParams }) => {
      comicDAO.update(params, id);
    },
    TransactionType.ADMIN,
    ComicDAO
  );
}
