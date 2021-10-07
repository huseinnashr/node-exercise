import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { MovieTypeEnum } from "../../../services/OmdbService"

export class SearcMovieQuery {
  @IsString()
  title: string

  @IsEnum(MovieTypeEnum)
  @IsOptional()
  type?: MovieTypeEnum

  @IsNumber()
  @IsOptional()
  year?: number

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  page?: number = 1;
}