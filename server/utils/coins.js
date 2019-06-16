import LRU from 'lru-cache';
import axios from 'axios';
import Cache from 'interval-cache';

const historyCache = new LRU({
  max: 3000,
  maxAge: 1000 * 60 * 60,
});
const APIURL = 'https://coincap.io';

const intervalCache = new Cache()
  .every(
    'allCoins',
    1000 * 60 * 10,
    async () => {
      const { data } = await axios.get(`${APIURL}/front`);
      const allCoinsData = data.map(coin => ({
        coin: coin.short,
        label: `${coin.long} (${coin.short})`,
        price: coin.price,
        change: coin.cap24hrChange,
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
  const key = `${coin}:${timeframe}`;
  const dataPoints = historyCache.get(key);
  if (dataPoints) return dataPoints;

  const { data } = await axios.get(`${APIURL}/history/${timeframe}/${coin}`);
  historyCache.set(key, data.price);
  return data.price;
}
