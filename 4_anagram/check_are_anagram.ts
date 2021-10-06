import { sortStringAsc } from "./sort_string_asc";

export const checkAreAnagram = (strA: string, strB: string) => {
  return sortStringAsc(strA) == sortStringAsc(strB);
}