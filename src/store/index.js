import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
  assets: [],
  newCoin: {
    name: '',
    amount: null,
  },
  coins: new Map(),
  coinsSetTracker: 1,
  coinsArray: [],
  loadingCoinsData: true,
  currentWallet: localStorage.getItem('wallet'),
  fetchedWallet: false,
  fetchedCoins: false,
  showAddCoinDialog: false,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
