import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import send from 'koa-send';
import serve from 'koa-static';
import compress from 'koa-compress';
import Knex from 'knex';
import { Model } from 'objection';
import path from 'path';
import ratelimit from 'koa-ratelimit-lru';
import knexConfig from './knexfile';
import ApiRouter from './api/';
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
  .use(
    ratelimit({
      duration: 60000,
      rate: 250,
      errorMessage: 'Slow down your requests',
    })
  )
  .use(logger())
  .use(compress())
  .use(bodyParser())
  .use(helmet())
  .use(errorHandler)
  .use(ApiRouter)
  .use(serve(staticFilesPath))
  .use(async ctx => {
    await send(ctx, 'index.html', { root: staticFilesPath });
  });

const server = app.listen(port).on('error', err => {
  console.error(err);
});

module.exports = server;
