import { jsonFetch } from "../utils/json-fetch";
import * as qs from 'querystring';
import { ClassConstructor, Exclude, Expose, Type } from "class-transformer";
import { Equals, IsArray, IsDate, isEnum, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUrl, Validate, ValidatorConstraint } from "class-validator";
import { ApiError, AppError } from "../definition/common";
import { models } from "../models";
import moment from "moment";

export enum MovieTypeEnum { 
  movies = "movies",
  series = "series",
  episode = "episode"
}

export enum DataTypeEnum {
  json = "json",
  xml = "xml"
}

export enum MoviePlotType {
  short = "short",
  full = "full"
}

type OmdbSearchParam = {
  s: string,
  type?: MovieTypeEnum,
  y?: number,
  r?: DataTypeEnum,
  page?: number
}

type OmdbGetParam = {
  i: string,
  t: string,
  type?: MovieTypeEnum,
  y?: number,
  plot?: MoviePlotType,
  r: DataTypeEnum
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

class MovieRating {
  @Expose() @IsString() Source: string
  @Expose() @IsString() Value: string
} 
class OmdbGetResponse {
  @Expose() @IsString() @IsOptional() Title?: string
  @Expose() @IsString() @IsOptional() Year?: string
  @Expose() @IsString() @IsOptional() Rated?: string
  @Expose() @IsString() @IsOptional() Released?: string
  @Expose() @IsString() @IsOptional() Runtime?: string
  @Expose() @IsString() @IsOptional() Genre?: string
  @Expose() @IsString() @IsOptional() Director?: string
  @Expose() @IsString() @IsOptional() Writer?: string  
  @Expose() @IsString() @IsOptional() Actors?: string  
  @Expose() @IsString() @IsOptional() Plot?: string  
  @Expose() @IsString() @IsOptional() Language?: string  
  @Expose() @IsString() @IsOptional() Country?: string  
  @Expose() @IsString() @IsOptional() Awards?: string  
  @Expose() @IsString() @IsOptional() Poster?: string
  @Expose() @Type(() => MovieRating) @IsOptional() Ratings?: MovieRating[]
  @Expose() @IsString() @IsOptional() Metascore?: string  
  @Expose() @IsString() @IsOptional() imdbRating?: string  
  @Expose() @IsString() @IsOptional() imdbVotes?: string  
  @Expose() @IsString() @IsOptional() imdbID?: string  
  @Expose() @IsString() @IsOptional() Type?: string  
  @Expose() @IsString() @IsOptional() DVD?: string  
  @Expose() @IsString() @IsOptional() BoxOffice?: string  
  @Expose() @IsString() @IsOptional() Production?: string  
  @Expose() @IsString() @IsOptional() Website?: string
  @Expose() @IsEnum(ResponseType) @Exclude({ toPlainOnly: true }) Response: ResponseType
  @Expose() @IsString() @IsOptional() @Exclude({ toPlainOnly: true }) Error?: string
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

  async get(params: OmdbGetParam): Promise<[OmdbGetResponse?, ApiError?]> {
    const [getRes, getErr] = await this.send("/", params, OmdbGetResponse);
    if(getErr) return [null, { isClient: false, message: getErr.message }];

    if(getRes.Error) return [null, { isClient: true, message: getRes.Error }];

    return [getRes, null];
  }
}