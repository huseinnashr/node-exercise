import { jsonFetch } from "../utils/json-fetch";
import * as qs from 'querystring';
import { ClassConstructor, Expose } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiError, AppError } from "../definition/common";
import { models } from "../models";

export enum MovieTypeEnum { 
  movies = "movies",
  series = "series",
  episode = "episode"
}

type OmdbSearchParam = {
  s: string,
  type?: MovieTypeEnum,
  y?: number,
  r?: "json" | "xml",
  page?: number,
}

enum ResponseType { 
  True = "True",
  False = "False"
}

class SearchResponse {
  @Expose()
  @IsArray()
  @IsOptional()
  Search?: [SearchResult]

  @Expose()
  @IsEnum(ResponseType)
  Response: ResponseType

  @Expose()
  @IsString()
  @IsOptional()
  Error?: string

  @Expose()
  @IsString()
  @IsOptional()
  totalResults? : string
}

class SearchResult {
  @Expose()
  @IsString()
  Title: string

  @Expose()
  @IsNumber()
  Year: number

  @Expose()
  @IsString()
  imdbID: string

  @Expose()
  @IsEnum(MovieTypeEnum)
  Type: MovieTypeEnum
}

type OmdbSearchRes = {
  movies: [SearchResult]
  totalResults: string
}

export class OmdbService {
  apiUrl: string
  apiKey: string

  constructor(apiUrl: string, apiKey: string){
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private async send<T>(path: string, params: any, cls: ClassConstructor<T>): Promise<[T?, AppError?]> {
    const queries = qs.stringify({ ...params, apikey: this.apiKey });
    const endpoint = `${this.apiUrl}${path}/?${queries}`;
    
    const [fetchRes, fetchErr] = await jsonFetch(endpoint, { method: "GET",  headers: { 'content-type': "application/json" } }, cls);
    if(fetchErr) return [null, fetchErr]

    await models.OmdbApiRecord.create({ endpoint: `${this.apiUrl}${path}`, params: JSON.stringify(params) })
    
    return [fetchRes, null]
  }

  async search(params: OmdbSearchParam): Promise<[OmdbSearchRes?, ApiError?]> {
    const [searchRes, searchErr] = await this.send("/", params, SearchResponse);
    if(searchErr) return [null, { isClient: false, message: searchErr.message }];

    if(searchRes.Error) return [null, { isClient: true, message: searchRes.Error }];

    return [{ movies: searchRes.Search, totalResults: searchRes.totalResults }, null];
  }
}