import Router from 'koa-router';
import { coinsOverview, history } from './data.controller';

const routeName = 'data';

const router = new Router();

router.prefix(`/api/${routeName}`);

router.get('/coins', coinsOverview);

router.get('/history/:coin/:timeframe', history);

export default router;
