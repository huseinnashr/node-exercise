import { OmdbService } from "./OmdbService"

const omdbService = new OmdbService(process.env.OMDB_API_URL, process.env.OMDB_API_KEY);

describe("OmdbService.search", () => {
  test("found", async () => {
    const [searchRes, searchErr] = await omdbService.search({ s: "Batman v Superman: Dawn of Justice" });

    expect(searchRes.movies[0]?.Title).toEqual("Batman v Superman: Dawn of Justice");
    expect(searchErr).toBe(null)
  })

  test("not found", async () => {
    const [searchRes, searchErr] = await omdbService.search({ s: "Not existed title ##@#1414" });

    expect(searchRes).toBe(null)
    expect(searchErr).toEqual({ isClient: true, message: "Movie not found!" })
  })
})