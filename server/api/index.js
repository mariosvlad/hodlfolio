import combineRouters from 'koa-combine-routers';
import assetRouter from './asset/asset.index.js';
import dataRouter from './data/data.index.js';
import walletRouter from './wallet/wallet.index.js';

const router = combineRouters([
  assetRouter,
  dataRouter,
  walletRouter,
]);

export default router;
