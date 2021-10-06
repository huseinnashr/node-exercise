import { groupByAnagram } from "./group_by_anagram";

describe("groupByAnagram", () => {
  test("Test group #1", () => {
    const words = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']
    const anagramGroup = groupByAnagram(words);
    console.log(anagramGroup)
    expect(anagramGroup).toEqual([["kita", "atik", "tika"], ["aku", "kua"], ["kia"], ["makan"]]);
  })
})