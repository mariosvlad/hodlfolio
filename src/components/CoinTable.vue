<template>
  <v-card>
    <v-card-title class="title">
      Assets
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="assets"
        :search="search"
        no-data-text="No assets added, use form below to add"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.label }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.change }}</td>
        <td class="text-xs-right">{{ props.item.value }}</td>
        <td class="text-xs-right">
          <v-edit-dialog v-if="!isReadOnly"
            lazy
          > {{ props.item.amount }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.amount"
              single-line
              type="number"
              @change="coinSave(props.item)"
            ></v-text-field>
          </v-edit-dialog>
          <div v-else>{{props.item.amount}}</div>
        </td>
        <td>
          <v-flex d-inline-flex>
            <v-btn flat icon dark color="indigo" @click="openCoinHistory(props.item.coin)">
              <v-icon dark>timeline</v-icon>
            </v-btn>
            <v-btn v-if="!isReadOnly" flat icon color="red" @click="coinDelete(props.item.coin)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
      <template slot="footer">
        <td colspan="100%">
          <strong>Total value: ${{totalValue}}</strong>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="coinHistoryDialog">
      <v-card>
        <chart v-if="coinHistoryDialog" :coin='currentCoinHistory'></chart>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Big from 'big.js';

const Chart = () => import('@/components/HistoryChart');

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
      pagination: {},
      headers: [
        { text: 'Coin', value: 'label', align: 'left' },
        { text: 'Price ($)', value: 'price', align: 'right' },
        { text: '24hr Change(%)', value: 'change', align: 'right' },
        { text: 'Total Value($)', value: 'value', align: 'right' },
        { text: 'Amount', value: 'amount', align: 'right' },
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
