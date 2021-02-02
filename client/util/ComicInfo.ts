export interface Comic {
  id: number;
  title: string;
  transcript: string;
  mouseover: string;
  image: string;
  image_lowres: string;
  height: number;
  width: number;
  posted: string;
  next: number;
  previous: number;
  tags: { name: string; id: number }[];
}

export interface ComicInfo {
  comic: Comic;
  previous?: Comic;
  next?: Comic;
  first: Comic;
  last: Comic;
  count: number;
}
