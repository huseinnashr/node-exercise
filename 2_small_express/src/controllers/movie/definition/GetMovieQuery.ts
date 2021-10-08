import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator"
import { MoviePlotType, MovieTypeEnum } from "../../../services/OmdbService"

export class GetMovieQuery {
  @IsString()
  @ValidateIf(i => i.title == undefined || i.id)
  id: string

  @IsString()
  @ValidateIf(i => i.id == undefined || i.title)
  title: string

  @IsEnum(MovieTypeEnum)
  @IsOptional()
  type?: MovieTypeEnum

  @IsNumber()
  @IsOptional()
  year?: number

  @IsEnum(MoviePlotType)
  @IsOptional()
  plot?: MoviePlotType;
}