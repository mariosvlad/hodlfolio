<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer fixed v-model="drawer" app :disable-resize-watcher="true">
        <v-list>
          <v-list-item to="/" exact>
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="mywallet && mywallet.length > 0" :to="'/w/' + mywallet">
            <v-list-item-action>
              <v-icon>account_balance</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Assets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar color="indigo" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-footer class="pa-3" color="indigo">
        <a class="white--text" href="https://github.com/mariosvlad/hodlfolio" target="_blank" rel="noopener">Source Code</a>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import './assets/fonts/index.css';
import 'cryptocoins-icons/webfont/cryptocoins.css';

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
