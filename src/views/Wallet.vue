<template>
  <v-responsive>
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
        <v-flex xs12>
          <coin-table></coin-table>
        </v-flex>
      </v-layout>
      <add-coin v-if="!$store.getters.isReadOnly && $store.getters.fetchedData"></add-coin>
    </v-container>
  </v-responsive>
</template>

<script>
import CoinTable from '@/components/CoinTable.vue';
import AddCoin from '@/components/AddCoin.vue';
import Highlights from '@/components/Highlights.vue';
// eslint-disable-next-line
import store from '../store';

// eslint-disable-next-line
const OverviewPieChart = () => import('../components/OverviewPieChart.vue');

export default {
  components: {
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

<style scoped lang="sass">
.fabPadding
  padding-bottom: 36px
</style>
