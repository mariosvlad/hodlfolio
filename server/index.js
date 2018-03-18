import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import send from 'koa-send';
import serve from 'koa-static';
import Knex from 'knex';
import { Model } from 'objection';
import path from 'path';
import knexConfig from './knexfile';
import routing from './api/';
import { port } from './config';
import errorHandler from './utils/errorHandler';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let dbEnv = 'development';
let staticFilesPath = path.join(__dirname, '..', 'dist', 'public');
if (process.env.NODE_ENV === 'production') {
  staticFilesPath = path.join(__dirname, '..', 'public');
  dbEnv = 'production';
}

const knex = Knex(knexConfig[dbEnv]);

Model.knex(knex);

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(errorHandler);

routing(app).then(() => {
  app.use(serve(staticFilesPath));
  app.use(async (ctx) => {
    await send(ctx, 'index.html', { root: staticFilesPath });
  });
});

export default app.listen(port);
