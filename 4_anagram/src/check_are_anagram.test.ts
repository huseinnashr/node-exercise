import { checkAreAnagram } from "./check_are_anagram"

describe("checkAreAnagram", () => {
  test("'kita' and 'atik' should be anagram", () => {
    const areAnagram = checkAreAnagram("kita", "akit");
    expect(areAnagram).toEqual(true);
  })

  test("'kita' and 'kia' should not be anagram", () => {
    const areAnagram = checkAreAnagram("kita", "kia");
    expect(areAnagram).toEqual(false);
  })
})