import { JsonController, Get, QueryParams } from 'routing-controllers';
import { DataTypeEnum, OmdbService } from '../../services/OmdbService';
import { GetMovieQuery } from './definition/GetMovieQuery';
import { SearcMovieQuery } from './definition/SearchMovieQuery';

const omdbService = new OmdbService(process.env.OMDB_API_URL, process.env.OMDB_API_KEY);

@JsonController()
export class MovieController {
  @Get('/search')
  async search(@QueryParams() searchMovieQueries: SearcMovieQuery) {
    const [searchRes, searchErr] = await omdbService.search({ 
      s: searchMovieQueries.title, page: searchMovieQueries.page, type: searchMovieQueries.type, y: searchMovieQueries.year, r: DataTypeEnum.json
    })
    if(searchErr) {
      if(searchErr.isClient) return { data: null, error: { message: searchErr.message }};

      console.error("MovieController::search", searchErr.message)
      return { data: null, error: { message: "Something when wrong. Please try again later" }}
    }

    return { data: searchRes, error: null }
  }

  @Get('/get')
  async getByIdOrTitle(@QueryParams() getMoviewQueries: GetMovieQuery) {
    const [getRes, getErr] = await omdbService.get({ 
      i: getMoviewQueries.id, t: getMoviewQueries.title, plot: getMoviewQueries.plot, type: getMoviewQueries.type, y: getMoviewQueries.year, r: DataTypeEnum.json 
    })
    if(getErr) {
      if(getErr.isClient) return { data: null, error: { message: getErr.message }};

      console.error("MovieController::getByIdOrTitle", getErr.message)
      return { data: null, error: { message: "Something when wrong. Please try again later" }}
    }

    return { data: getRes, error: null }
  }
}