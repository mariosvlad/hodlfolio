import Router from 'koa-router';
import { add, get, setLastSeen } from './wallet.controller';

const routeName = 'wallets';

const router = new Router();

router.prefix(`/api/${routeName}`);

router.get('/:id', get);

router.post('/', add);

router.post('/lastseenvalue', setLastSeen);

export default router;
