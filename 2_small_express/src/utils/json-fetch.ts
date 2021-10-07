import fetch from 'node-fetch'

type Method = "GET" 

type FetchOption = {
  method: Method,
  body?: any,
  headers?: any,
}

export async function jsonFetch<R = any>(endpoint: string, options: FetchOption): Promise<[R?, AppError?]> {
  let res = null;
  try {
    res = await fetch(endpoint, options);
  } catch (e) {
    const message = e.code === 'ENOTFOUND' ? `${endpoint} could not be found` : e.message
    return [null, { message }]
  }
  const text = await res.text()

  let json = null;
  try {
    json = JSON.parse(text);
  } catch (e) {
    return [null, { message: `Failed to parse ${text}` }]
  }

  return [json, null]
}