import { DAOFunction, TransactionType } from "../dao/DAOFunction";
import TagDAO from "../dao/TagDAO";
import CheckIfError from "../utils/CheckIfError";

export default class TagController {
  public getTags = DAOFunction(
    async (tagDAO: TagDAO) => {
      let tagsResult = CheckIfError(await tagDAO.getTags());
      if (tagsResult.error) {
        return tagsResult.error;
      }
      return tagsResult.result.map((tag: { name: string }) => tag.name);
    },
    TransactionType.CLIENT,
    TagDAO
  );
}
