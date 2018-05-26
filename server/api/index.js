import combineRouters from 'koa-combine-routers';
import assetRouter from './asset/asset.index.js';
import dataRouter from './data/data.index.js';
import walletRouter from './wallet/wallet.index.js';
import otherRoutes from '../routes.js';

const router = combineRouters([assetRouter, dataRouter, walletRouter, otherRoutes]);

export default router;
