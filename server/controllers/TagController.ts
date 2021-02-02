import { DAOFunction, TransactionType } from "../dao/DAOFunction";
import TagDAO from "../dao/TagDAO";

export default class TagController {
  public getTags = DAOFunction(
    async (tagDAO: TagDAO) => {
      return (await tagDAO.getTags()).map((tag: { name: string }) => tag.name);
    },
    TransactionType.CLIENT,
    TagDAO
  );
}
