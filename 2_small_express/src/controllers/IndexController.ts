import { JsonController, Get } from 'routing-controllers';

@JsonController()
export class IndexController {
  @Get('/')
  index() {
    return `Server is up and running. Version ${process.env.APP_VERSION}`;
  }
}