import { sortStringAsc } from "./sort_string_asc";

describe("sortStringAsc", () => {
  test("correctly sort 'dabc'", () => {
    const sortedString = sortStringAsc("dabc");

    expect(sortedString).toEqual("abcd");
  });

  test("correctly sort 'zaaffg'", () => {
    const sortedString = sortStringAsc("zaaffg");

    expect(sortedString).toEqual("aaffgz");
  });
})