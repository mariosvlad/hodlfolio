<template>
  <v-container fluid grid-list-md>
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
    <v-layout v-if="!this.$store.getters.isReadOnly" row>
      <v-flex xs12 d-flex>
        <add-coin></add-coin>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CoinSelector from '@/components/CoinSelector';
import CoinTable from '@/components/CoinTable';
import AddCoin from '@/components/AddCoin';
import Highlights from '@/components/Highlights';
import store from '../store';

const OverviewPieChart = () => import('@/components/OverviewPieChart');

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
