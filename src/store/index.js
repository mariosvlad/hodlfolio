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
  currentWallet: localStorage.getItem('wallet'),
  fetchedWallet: false,
  fetchedCoins: false,
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
