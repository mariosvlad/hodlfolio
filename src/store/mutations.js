export default {
  SETWALLET(state, { data }) {
    state.assets = data.assets;
    state.fetchedWallet = true;
  },
  ADDCOIN(state, { data, isUpdate }) {
    if (data && data.coin) {
      if (isUpdate) {
        const existingAsset = state.assets.find(asset => asset.coin === data.coin);
        if (existingAsset) {
          existingAsset.amount = data.amount;
        }
      } else {
        state.assets.push(data);
      }
    }
    state.newCoin = {
      name: '',
      amount: 1,
    };
  },
  REMOVECOIN(state, { coin }) {
    state.assets = state.assets.filter(asset => asset.coin !== coin);
  },
  SETNEWCOIN(state, coin) {
    state.newCoin.name = coin;
  },
  SETNEWCOINAMOUNT(state, amount) {
    state.newCoin.amount = amount;
  },
  SETCURRENTWALLET(state, walletId) {
    state.currentWallet = walletId;
    localStorage.setItem('wallet', walletId);
  },
  SETCOINS(state, { data }) {
    data.forEach((coin) => {
      state.coins.set(coin.coin, coin);
    });
    state.coinsSetTracker += 1;
    state.coinsArray = Array.from(state.coins.values());
    state.fetchedCoins = true;
  },
  SETCOINSLOADING(state, loading) {
    state.fetchedCoins = !loading;
  },
};
