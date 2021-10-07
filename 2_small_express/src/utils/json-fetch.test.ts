import { jsonFetch } from "./json-fetch"

describe("jsonFetch", () => {
  test("invalid json response", async () => {
    jest.spyOn(require('node-fetch'), "default").mockImplementationOnce((_, __) => {
      throw { message: "Unknown Error" }
    })

    const [fetchRes, fetchErr] = await jsonFetch("", { method: "GET" })
    expect(fetchRes).toBe(null);
    expect(fetchErr).toEqual({ message: "Unknown Error"});
  })

  test("invalid json response", async () => {
    jest.spyOn(require('node-fetch'), "default").mockImplementationOnce((_, __) => {
      throw { code: "ENOTFOUND" }
    })

    const [fetchRes, fetchErr] = await jsonFetch("http://aaa", { method: "GET" })
    expect(fetchRes).toBe(null);
    expect(fetchErr).toEqual({ message: "http://aaa could not be found"});
  })

  test("invalid json response", async () => {
    jest.spyOn(require('node-fetch'), "default").mockImplementationOnce((_, __) => {
      return { ok: true, text: async () => { return `Hello` }}
    })

    const [fetchRes, fetchErr] = await jsonFetch("", { method: "GET" })
    expect(fetchRes).toBe(null);
    expect(fetchErr).toEqual({ message: "Failed to parse Hello"});
  })

  test("valid json response", async () => {
    jest.spyOn(require('node-fetch'), "default").mockImplementation((_, __) => {
      return { ok: true, text: async () => { return `{"id":123}` }}
    })

    const [fetchRes, fetchErr] = await jsonFetch("", { method: "GET" })
    expect(fetchRes).toEqual({ id: 123 });
    expect(fetchErr).toBe(null);
  })
})