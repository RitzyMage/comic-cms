import { Tag } from "../dao/Tag";

export interface Comic {
  id: string;
  title: string;
  transcript: string;
  mouseover: string;
  image: string;
  height: string;
  width: string;
  image_lowres: string;
  posted: string;
  next?: number;
  previous?: number;
  tags?: Tag[];
}
