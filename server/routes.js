import path from 'path';
import fs from 'fs';
import { getAllCoins } from 'utils/coins';
import Router from 'koa-router';
import Wallet from './api/wallet/wallet.model';

const router = new Router();

let staticFilesPath = path.join(__dirname, '..', 'dist', 'public');
if (process.env.NODE_ENV === 'production') {
  staticFilesPath = path.join(__dirname, '..', 'public');
}
// index.html doesn't change during runtime, so reading it once at startup is enough
const insertAfter = '</noscript>';
let indexHtml;
let htmlParts;
try {
  indexHtml = fs.readFileSync(path.join(staticFilesPath, 'index.html'), 'utf8');
  htmlParts = indexHtml.split(insertAfter);
} catch (err) {
  console.log(err);
}

// add the required data for the initial load (wallet assets, coins data) for faster page load
router.get('/w/:id', async (ctx, next) => {
  const { id } = ctx.params;

  const getWalletData = async () => {
    let dbResult;
    if (id.length > 8) {
      dbResult = await Wallet.query()
        .where('id', id)
        .eager('assets');
    } else {
      dbResult = await Wallet.query()
        .where('readonlyId', id)
        .eager('assets')
        .omit(['id']);
    }
    if (dbResult.length === 0) {
      throw new Error('wallet not found');
    }
    return dbResult[0];
  };

  try {
    const [walletData, coinsData] = await Promise.all([getWalletData(), getAllCoins()]);
    ctx.body = `${htmlParts[0]}${insertAfter}<script type="text/javascript">window.initialWalletData = ${JSON.stringify(
      walletData
    )}</script>
    <script type="text/javascript">window.initialCoinsData = ${coinsData}</script>${htmlParts[1]}`;
  } catch (err) {
    next();
  }
});

export default router;
