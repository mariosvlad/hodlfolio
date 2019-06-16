<template>
  <div>
    <highstock :options="chartOptions"></highstock>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import VueHighcharts from 'vue-highcharts';
import Vue from 'vue';
import axios from 'axios';

Vue.use(VueHighcharts, { Highcharts });

const dateRanges = [
  {
    timeframe: '1day',
    text: '1d',
    count: 1,
    type: 'day',
  },
  {
    timeframe: '7day',
    text: '7d',
    count: 7,
    type: 'day',
  },
  {
    timeframe: '30day',
    text: '1m',
    count: 1,
    type: 'month',
  },
  {
    timeframe: '90day',
    text: '3m',
    count: 3,
    type: 'month',
  },
  {
    timeframe: '180day',
    text: '6m',
    count: 6,
    type: 'month',
  },
  {
    timeframe: '365day',
    text: '1y',
    count: 1,
    type: 'year',
  },
];

export default {
  props: ['coin'],
  data() {
    return {
      chartData: [],
      timeframeToGet: '7day',
      timeframe: '7day',
      loading: true,
    };
  },
  mounted() {
    this.updateData();
    Highcharts.setOptions({
      chart: {
        style: {
          fontFamily: 'Roboto',
        },
      },
    });
  },
  methods: {
    updateData() {
      this.loading = true;
      axios.get(`/api/data/history/${this.coin}/${this.timeframeToGet}`).then(({ data }) => {
        this.timeframe = this.timeframeToGet;
        this.chartData = data;
        this.loading = false;
      });
    },
    updateTimeFrame(timeframe) {
      this.timeframeToGet = timeframe;
      this.updateData();
    },
  },
  computed: {
    chartOptions() {
      const buttons = dateRanges.map(options => ({
        ...options,
        events: {
          click: () => {
            this.updateTimeFrame(options.timeframe);
          },
        },
      }));
      return {
        title: {
          text: `${this.coin} Price History`,
        },
        style: {
          fontFamily: 'Roboto',
        },
        credits: false,
        series: [
          {
            name: this.coin,
            data: this.chartData,
          },
        ],
        rangeSelector: {
          buttons,
          inputEnabled: false,
          selected: buttons.findIndex(button => button.timeframe === this.timeframe),
          allButtonsEnabled: true,
        },
      };
    },
  },
};
</script>
