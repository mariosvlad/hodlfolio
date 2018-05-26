import axios from 'axios';
import router from '../router';

export default {
  async getWallet({ commit }, id) {
    if (window.initialWalletData) {
      commit('SETCURRENTWALLET', id);
      commit('SETWALLET', window.initialWalletData);
    } else {
      axios
        .get(`/api/wallets/${id}`)
        .then(response => {
          commit('SETCURRENTWALLET', id);
          commit('SETWALLET', response.data);
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            router.replace('/');
          }
        });
    }
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
    let data = window.initialCoinsData;
    if (!data) {
      data = (await axios.get('/api/data/coins')).data;
    }
    commit('SETCOINS', data);
  },
  async refreshData({ commit, state }) {
    const id = state.currentWallet;
    commit('SETCOINSLOADING', true);
    try {
      const [walletData, coinsData] = await Promise.all([axios.get(`/api/wallets/${id}`), axios.get('/api/data/coins')]);
      commit('SETCOINS', coinsData.data);
      commit('SETWALLET', walletData.data);
      commit('SETCOINSLOADING', false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        router.replace('/');
      }
    }
  },
};
