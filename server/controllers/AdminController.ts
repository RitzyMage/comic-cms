import { TransactionType, TransactionFunction } from "../dao/DAOFunction";
import ComicDAO from "../dao/ComicDAO";
import TagDAO from "../dao/TagDAO";
import { AddComicParams, AddComicDatabase, EditComicParams } from "../utils/addComicParams";
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

  public editComic = TransactionFunction(
    async (transaction: Transaction, { id, params }: { id: number; params: EditComicParams }) => {
      let comicDAO = new ComicDAO(transaction);
      let tagDAO = new TagDAO(transaction);

      let databaseParams: EditComicParams = {};
      for (let key in params) {
        let newObj = databaseParams as any;
        let oldObj = params as any;
        if (oldObj[key] && key !== "tags") {
          newObj[key] = oldObj[key];
        }
      }
      if (Object.keys(databaseParams).length > 0) {
        await comicDAO.update(databaseParams, id);
      }

      if (params.tags) {
        await tagDAO.replaceTags(params.tags, id);
      }
    },
    TransactionType.ADMIN
  );
}
