import Big from 'big.js';

export default {
  assetsDetails: state =>
    state.assets.map((asset) => {
      if (!state.coinsSetTracker) return {};
      const coinInfo = state.coins.get(asset.coin);
      const details = { ...coinInfo, ...asset };
      details.amount = Big(asset.amount);

      if (coinInfo) {
        details.value = Big(asset.amount)
          .times(coinInfo.price);

        details.price = Big(coinInfo.price);
      }

      details.edit = false;
      return details;
    }),

  fetchedData: state => state.fetchedWallet && state.fetchedCoins,

  isReadOnly: state => !state.currentWallet || state.currentWallet.length === 8,

  totalValue: (state, getters) => {
    let sum = 0;
    const values = getters.assetsDetails.map(asset => Number(asset.value));
    if (!values.every(value => Number.isNaN(value))) {
      sum = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!Number.isNaN(value)) {
          return prev + curr;
        }
        return prev;
      }, 0);
    }
    return sum;
  },

  overral24hChange: (state, getters) => getters.assetsDetails
    .filter(asset => asset.value)
    .map(asset => Big(asset.value).div(getters.totalValue).times(asset.change))
    .reduce((p, c) => Big(p).plus(c), 0),

  assetsDetailsDisplayed: (state, getters) =>
    getters.assetsDetails.map((asset) => {
      const assetDisplay = { ...asset };
      if (assetDisplay.amount) {
        assetDisplay.amount = asset.amount
          .round(4)
          .toString();
      }

      if (asset.value) {
        assetDisplay.value = asset.value
          .toString();
      }

      if (asset.price) {
        assetDisplay.price = asset.price
          .round(4)
          .toString();
      }
      return assetDisplay;
    }),

  highlights: (state, getters) => {
    const cards = [];
    if (!getters.fetchedData || state.assets.length === 0) return cards;

    const totalValue = Big(getters.totalValue);
    const overralChange = getters.overral24hChange;
    const overral = {
      label: 'Overall',
      description: 'change last 24h',
      valueChange: overralChange.times(totalValue).div(100),
      change: overralChange.round(3).toString(),
      icon: 'trending_flat',
      color: 'blue-grey',
    };
    if (overralChange.gte(1)) {
      overral.icon = 'trending_up';
      overral.color = 'green';
    }
    if (overralChange.lte(-1)) {
      overral.icon = 'trending_down';
      overral.color = 'red';
    }
    cards.push(overral);

    let topGain;
    let mostLoss;
    getters.assetsDetails
      .filter(asset => asset && asset.value)
      .forEach((asset) => {
        const valueChange = Big(asset.value).times(asset.change).div(100);
        if (valueChange.gt(0) && (!topGain || valueChange.gt(topGain.valueChange))) {
          topGain = { ...asset, valueChange };
        }
        if (valueChange.lt(0) && (!mostLoss || valueChange.lt(mostLoss.valueChange))) {
          mostLoss = { ...asset, valueChange };
        }
      });
    if (topGain) {
      cards.push({
        ...topGain,
        description: 'Biggest gain last 24h',
        color: 'green',
        icon: 'trending_up',
      });
    }
    if (mostLoss) {
      cards.push({
        ...mostLoss,
        description: 'Biggest loss last 24h',
        color: 'red',
        icon: 'trending_down',
      });
    }

    return cards;
  },
};
