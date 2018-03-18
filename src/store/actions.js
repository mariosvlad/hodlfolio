import axios from 'axios';

export default {
  async getWallet({ commit }, id) {
    commit('SETCURRENTWALLET', id);
    commit('SETWALLET', await axios.get(`/api/wallets/${id}`));
  },
  async addCoin({ commit, state }, { coin, amount }) {
    const coinData = {
      walletId: state.route.params.id,
      coin,
      amount,
    };
    let isUpdate = true;
    if (!coin || !amount) {
      coinData.coin = state.newCoin.name;
      coinData.amount = state.newCoin.amount;
      const existingAsset = state.assets.find(asset => asset.coin === coinData.coin);
      if (existingAsset) {
        coinData.amount += parseFloat(existingAsset.amount);
      } else {
        isUpdate = false;
      }
    }

    const { data } = await axios.post(`/api/assets/${isUpdate ? 'update' : ''}`, coinData);
    commit('ADDCOIN', {
      data,
      isUpdate,
    });
  },
  async removeCoin({ commit, state }, { coin }) {
    const coinData = {
      walletId: state.route.params.id,
      coin,
    };
    await axios.post('/api/assets/remove', coinData);
    commit('REMOVECOIN', {
      coin,
    });
  },
  async getCoinsOverview({ commit }) {
    commit('SETCOINSLOADING', true);
    commit('SETCOINS', await axios.get('/api/data/coins'));
  },
};
