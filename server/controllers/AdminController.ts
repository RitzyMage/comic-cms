import { DAOFunction, TransactionType } from "../dao/DAOFunction";
import ComicDAO from "../dao/ComicDAO";
import AddComicParams from "../utils/addComicParams";

export default class AdminController {
  public addComic = DAOFunction(
    async (comicDAO: ComicDAO, params: AddComicParams) => {
      let posted = new Date().toISOString().split("T")[0];
      await comicDAO.create(params, posted);
    },
    TransactionType.ADMIN,
    ComicDAO
  );

  public editComic = DAOFunction(
    async (comicDAO: ComicDAO, { id, params }: { id: number; params: AddComicParams }) => {
      comicDAO.update(params, id);
    },
    TransactionType.ADMIN,
    ComicDAO
  );
}
