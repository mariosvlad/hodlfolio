<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer fixed v-model="drawer" app :disable-resize-watcher="true">
        <v-list>
          <v-list-tile to="/" exact>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="mywallet && mywallet.length > 0" :to="'/w/' + mywallet">
            <v-list-tile-action>
              <v-icon>account_balance</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Wallet</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Hodlfolio</v-toolbar-title>
        <v-spacer></v-spacer>
        <share-url v-if="$route.name === 'Wallet'"></share-url>
        <v-btn
          v-if="$route.name === 'Wallet'"
          icon
          @click="refreshData()"
          :loading="!$store.getters.fetchedData || $store.state.loadingCoinsData"
        >
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer class="pa-3" color="indigo">
        <a class="white--text" href="https://github.com/mariosvlad/hodlfolio" target="_blank" rel="noopener">Source Code</a>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import './assets/fonts/index.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'cryptocoins-icons/webfont/cryptocoins.css';
import 'vuetify/dist/vuetify.min.css';

import ShareUrl from './components/ShareUrl.vue';
/* eslint-enable */

export default {
  name: 'app',
  data() {
    return {
      drawer: false,
    };
  },
  components: {
    ShareUrl,
  },
  methods: {
    refreshData() {
      this.$store.dispatch('refreshData');
    },
  },
  created() {
    this.$store.dispatch('getCoinsOverview');
  },
  computed: {
    mywallet() {
      return this.$store.state.currentWallet;
    },
  },
};
</script>
