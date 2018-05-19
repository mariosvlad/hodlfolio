<template>
  <v-card v-show="$store.getters.fetchedData && assets.length!==0" >
    <highcharts :options="chartOptions"></highcharts>
  </v-card>
</template>

<script>
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';
import loadStock from 'highcharts/modules/stock';
import Vue from 'vue';
import Big from 'big.js';

loadStock(Highcharts);
Vue.use(VueHighcharts, { Highcharts });

export default {
  data() {
    return {
      chartData: [],
    };
  },
  computed: {
    assets() {
      if (this.$store.state.coinsSetTracker) {
        return this.$store.state.coinsSetTracker && this.$store.getters.assetsDetails;
      }
      return [];
    },
    chartOptions() {
      let total = Big(0);
      this.assets.forEach(asset => {
        total = Big(asset.value || 0).plus(total);
      });

      if (total.lte(0)) return {};
      const data = this.assets.map(asset => ({
        name: asset.label,
        y: parseFloat(
          Big(asset.value)
            .div(total)
            .times(100)
            .toFixed(2)
        ),
      }));

      Highcharts.setOptions({
        chart: {
          style: {
            fontFamily: 'Roboto',
          },
        },
      });

      return {
        title: {
          text: 'Portfolio overview',
        },
        credits: false,
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        style: {
          fontFamily: 'Roboto',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: [
          {
            name: 'Coin percentage',
            colorByPoint: true,
            data,
          },
        ],
      };
    },
  },
};
</script>


<style lang="sass">
  .highcharts-container
    width: 100% !important;
</style>
