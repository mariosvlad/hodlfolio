import axios from 'axios';
import Cache from 'interval-cache';

const APIURL = 'https://api.coincap.io/v2';

const intervalCache = new Cache()
  .every(
    'allCoins',
    1000 * 60 * 10,
    async () => {
      const { data } = await axios.get(`${APIURL}/assets?limit=2000`);
      const allCoinsData = data.data.map(coin => ({
        coin: coin.symbol,
        id: coin.id,
        label: `${coin.name} (${coin.symbol})`,
        price: coin.priceUsd,
        change: coin.changePercent24Hr,
      }));
      return JSON.stringify(allCoinsData);
    },
    0
  )
  .start();

export async function getAllCoins() {
  return intervalCache.get('allCoins');
}

export async function getHistoricData(coin, timeframe) {
  const days = Number(timeframe.split('day')[0]);
  let interval = 'd1';
  if (days <= 7) {
    interval = 'h1';
  } else if (days <= 90) {
    interval = 'h12';
  }

  // 1 day = 1000 * 60 * 60 * 24
  const start = Date.now() - 86400000 * days;

  const { data } = await axios.get(`${APIURL}/assets/${coin}/history?interval=${interval}&start=${start}&end=${Date.now()}`);
  const result = data.data.map(coinData => {
    return [coinData.time, Number(coinData.priceUsd)];
  });
  return result;
}
