import "reflect-metadata"
import { createExpressServer } from 'routing-controllers';
import { IndexController } from './controllers/index/IndexController';
import { MovieController } from './controllers/movie/MovieController';
import { sequelize } from "./models";

const app = createExpressServer({
  controllers: [IndexController, MovieController],
});

app.listen(process.env.PORT, async () => {
  await sequelize.sync({ force: true });
  console.log('🚀  Server ready at http://localhost:' + process.env.PORT)
});