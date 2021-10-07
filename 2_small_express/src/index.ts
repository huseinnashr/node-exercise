import "reflect-metadata"
import { createExpressServer } from 'routing-controllers';
import { IndexController } from './controllers/index/IndexController';
import { MovieController } from './controllers/movie/MovieController';

const app = createExpressServer({
  controllers: [IndexController, MovieController],
});

app.listen(process.env.PORT, () => {
  console.log('🚀  Server ready at http://localhost:' + process.env.PORT)
});