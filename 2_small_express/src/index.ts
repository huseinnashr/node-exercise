import { createExpressServer } from 'routing-controllers';
import { IndexController } from './controllers/IndexController';

const app = createExpressServer({
  controllers: [IndexController],
});

app.listen(process.env.PORT, () => {
  console.log('🚀  Server ready at http://localhost:' + process.env.PORT)
});