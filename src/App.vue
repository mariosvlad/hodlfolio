<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
          fixed
          v-model="drawer"
          app
        >
        <v-list>
          <v-list-tile to="/" exact>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="mywallet && mywallet.length > 0" :to="'/w/'+mywallet">
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
        <v-toolbar-title>HodlFolio</v-toolbar-title>
        <v-spacer></v-spacer>
        <share-url></share-url>
        <v-btn v-if="$route.name === 'Wallet'" icon @click="refreshData()" :loading="!$store.getters.fetchedData">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer class="pa-3" color="indigo">
        <a class="white--text" href="https://github.com/mariosvlad/hodlfolio"
            target="_blank" rel="noopener">Source Code</a>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
// eslint-disable-next-line
import 'material-design-icons/iconfont/material-icons.css';
import 'vuetify/dist/vuetify.min.css';
import 'cryptocoins-icons/webfont/cryptocoins.css';

import ShareUrl from '@/components/ShareUrl';

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
      this.$store.dispatch('getCoinsOverview');
      this.$store.dispatch('getWallet', this.$store.state.currentWallet);
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
