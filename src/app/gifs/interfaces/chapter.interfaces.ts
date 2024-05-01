import { Verse } from "./verse";

export interface Chapter {
  testament: string;
  name: string;
  num_chapters: number;
  chapter: number;
  vers: Verse;
}
