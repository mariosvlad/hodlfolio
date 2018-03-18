import { getAllCoins, getHistoricData } from 'utils/coins';

export async function coinsOverview(ctx) {
  try {
    ctx.body = await getAllCoins();
  } catch (err) {
    ctx.throw(400, err);
  }
}

export async function history(ctx) {
  const { coin, timeframe } = ctx.params;
  try {
    ctx.body = await getHistoricData(coin, timeframe);
  } catch (err) {
    ctx.throw(400, err);
  }
}
