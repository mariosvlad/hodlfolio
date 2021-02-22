import Big from 'big.js';

export default {
  assetsDetails: state =>
    state.assets.map(asset => {
      if (!state.coinsSetTracker) return {};
      const coinInfo = state.coins.get(asset.coin);
      const details = { ...coinInfo, ...asset };
      details.amount = Big(asset.amount);

      if (coinInfo) {
        details.value = Big(asset.amount).times(coinInfo.price);
        details.price = Big(coinInfo.price);

        if (coinInfo.change) {
          details.change = Big(coinInfo.change).round(2);
        }
      } else {
        details.label = asset.coin;
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

  overall24hChange: (state, getters) =>
    getters.assetsDetails
      .filter(asset => asset.value && asset.change != null)
      .map(asset =>
        Big(asset.value)
          .div(getters.totalValue)
          .times(asset.change)
      )
      .reduce((p, c) => Big(p).plus(c), 0),

  assetsDetailsDisplayed: (state, getters) =>
    getters.assetsDetails.map(asset => {
      const assetDisplay = { ...asset };
      if (assetDisplay.amount) {
        assetDisplay.amount = asset.amount.round(4).toString();
      }

      if (asset.value) {
        assetDisplay.value = asset.value.round(4).toString();
      }

      if (asset.price) {
        assetDisplay.price = asset.price.round(4).toString();
      }

      if (asset.change) {
        assetDisplay.change = asset.change.round(2).toString();
      }
      return assetDisplay;
    }),

  highlights: (state, getters) => {
    const cards = [];
    if (!getters.fetchedData || state.assets.length === 0) return cards;

    const totalValue = Big(getters.totalValue);
    const overallChange = getters.overall24hChange;
    const overall = {
      label: `Total: $${totalValue.round(0).toString()}`,
      description: 'change last 24h',
      valueChange: overallChange.times(totalValue).div(100),
      change: overallChange.round(3).toString(),
      icon: 'trending_flat',
      color: 'blue-grey',
    };
    if (overallChange.gte(1)) {
      overall.icon = 'trending_up';
      overall.color = 'green';
    }
    if (overallChange.lte(-1)) {
      overall.icon = 'trending_down';
      overall.color = 'red';
    }
    cards.push(overall);

    let topGain;
    let mostLoss;
    getters.assetsDetails
      .filter(asset => asset && asset.value && asset.change != null)
      .forEach(asset => {
        const previousValue = Big(asset.value).div(
          Big(asset.change)
            .add(100)
            .div(100)
        );

        const valueChange = Big(asset.value).minus(previousValue);

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
