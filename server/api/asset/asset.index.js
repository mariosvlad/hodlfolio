import Router from '@koa/router';
import { add, update, remove } from './asset.controller';

const routeName = 'assets';

const router = new Router();

router.prefix(`/api/${routeName}`);

router.post('/', add);

router.post('/update', update);

router.post('/remove', remove);

export default router;
