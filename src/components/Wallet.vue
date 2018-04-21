<template>
  <v-container fluid grid-list-md :class="{ fabPadding: !$store.getters.isReadOnly }">
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 align-start>
        <highlights></highlights>
      </v-flex>
      <v-flex xs12 sm6 md9>
        <overview-pie-chart></overview-pie-chart>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 d-flex>
        <coin-table></coin-table>
      </v-flex>
    </v-layout>
    <add-coin v-if="!$store.getters.isReadOnly && $store.getters.fetchedData"></add-coin>
  </v-container>
</template>

<script>
import CoinSelector from './CoinSelector.vue';
import CoinTable from './CoinTable.vue';
import AddCoin from './AddCoin.vue';
import Highlights from './Highlights.vue';
import store from '../store';

const OverviewPieChart = () => import('./OverviewPieChart.vue');

export default {
  components: {
    CoinSelector,
    CoinTable,
    OverviewPieChart,
    AddCoin,
    Highlights,
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('getWallet', to.params.id);
    next();
  },
};
</script>

<style scoped>
.fabPadding {
  padding-bottom: 36px
}
</style>
