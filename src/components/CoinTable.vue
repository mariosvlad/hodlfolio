<template>
  <v-card v-if="$store.getters.fetchedData && assets.length !== 0">
    <v-card-title class="title">
      Assets
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="assets" :search="search" no-data-text="No assets added" dense>
      <template v-slot:item.amount="{ item }">
        <v-edit-dialog v-if="!isReadOnly" lazy>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.amount }}</span>
            </template>
            <span>Click to edit</span>
          </v-tooltip>
          <v-text-field slot="input" label="Edit" v-model="item.amount" single-line type="number" @change="coinSave(item)"></v-text-field>
        </v-edit-dialog>
        <div v-else>{{ item.amount }}</div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-flex d-inline-flex>
          <v-btn text icon color="indigo accent-1" @click="openCoinHistory(item.id)">
            <v-icon>timeline</v-icon>
          </v-btn>
          <v-btn v-if="!isReadOnly" text icon color="red" @click="coinDelete(item.coin)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-flex>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }"> From {{ pageStart }} to {{ pageStop }} </template>
      <template slot="footer">
        <td colspan="100%" class="pl-4">
          <strong>Total value: ${{ totalValue }}</strong>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="coinHistoryDialog">
      <v-card>
        <chart v-if="coinHistoryDialog" :coin="currentCoinHistory"></chart>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Big from 'big.js';

// eslint-disable-next-line
const Chart = () => import('./HistoryChart.vue');

export default {
  components: {
    Chart,
  },
  computed: {
    assets() {
      if (this.$store.state.coinsSetTracker) {
        return this.$store.state.coinsSetTracker && this.$store.getters.assetsDetailsDisplayed;
      }
      return [];
    },
    totalValue() {
      return Big(this.$store.getters.totalValue)
        .round(1)
        .toString();
    },
    isReadOnly() {
      return this.$store.getters.isReadOnly;
    },
  },
  data() {
    return {
      search: '',
      coinHistoryDialog: null,
      currentCoinHistory: null,
      pagination: {
        sortBy: 'value',
        descending: true,
      },
      headers: [
        { text: 'Coin', value: 'label', align: 'left' },
        { text: 'Total Value ($)', value: 'value', align: 'right' },
        { text: 'Price ($)', value: 'price', align: 'right' },
        { text: '24hr Change (%)', value: 'change', align: 'right' },
        { text: 'Amount', value: 'amount', align: 'right' },
        { text: '', value: 'action', sortable: false },
      ],
    };
  },
  methods: {
    coinSave(data) {
      this.$store.dispatch('addCoin', {
        coin: data.coin,
        amount: parseFloat(data.amount),
      });
    },
    coinDelete(coin) {
      this.$store.dispatch('removeCoin', { coin });
    },
    openCoinHistory(coin) {
      this.coinHistoryDialog = true;
      this.currentCoinHistory = coin;
    },
  },
};
</script>
