<template>
  <v-container fluid grid-list-md>
    <v-responsive color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-2">Welcome to Hodlfolio</h3>
            <span class="subheading">Cryptocurrency portfolio tracking for HODLers</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3">Create a collection to track your coins</div>
            <v-btn large color="green" dark class="mr-2 mt-1" v-on:click="newWallet">New collection</v-btn>
            <v-btn large color="primary" class="mt-1" v-if="mywallet && mywallet.length > 0" v-on:click="$router.push('/w/' + mywallet)"
              >Go to my collection</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'hello',
  methods: {
    newWallet() {
      axios.post('/api/wallets/', {}).then(response => {
        this.$store.commit('SETCURRENTWALLET', response.data.id);
        this.$router.push({ path: `w/${response.data.id}` });
      });
    },
  },
  computed: {
    mywallet() {
      return this.$store.state.currentWallet;
    },
  },
};
</script>
