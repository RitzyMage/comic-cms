interface AddComicDatabase {
  title: string;
  transcript: string;
  mouseover: string;
  image: string;
  image_lowres: string;
  height: number;
  width: number;
}
interface AddComicParams extends AddComicDatabase {
  tags: string[];
}
interface EditComicParams {
  title?: string;
  transcript?: string;
  mouseover?: string;
  image?: string;
  image_lowres?: string;
  height?: number;
  width?: number;
  tags?: string[];
}

export { AddComicParams, AddComicDatabase, EditComicParams };
