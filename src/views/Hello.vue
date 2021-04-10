<template>
  <v-container color="grey lighten-2" fluid fill-height>
    <v-layout column justify-center align-center>
      <v-flex shrink class="align-center align-self-center justify-center">
        <div class="text-h5">Cryptocurrency portfolio tracking for HODLers</div>
        <v-divider class="my-3"></v-divider>
        <div class="d-flex my-4 ml-1">
          <v-icon class="mr-2">privacy_tip</v-icon>
          <div class="text-body-2">
            <a class="white--text" href="https://github.com/mariosvlad/hodlfolio" target="_blank" rel="noopener">Open source</a>, no
            tracking
          </div>
        </div>
        <div class="d-flex my-4 ml-1">
          <v-icon class="mr-2">security</v-icon>
          <div class="text-body-2">No account required, just bookmark your list's URL</div>
        </div>
        <div class="d-flex my-4 ml-1">
          <v-icon class="mr-2">share</v-icon>
          <div class="text-body-2">Simple read-only URL sharing</div>
        </div>
        <v-divider class="my-3"></v-divider>
        <div class="text-body-1 mb-3">Create a new asset list to track the value of your cryptocurencies</div>
        <v-btn color="green" dark class="mr-2 mt-2" v-on:click="newWallet">New list</v-btn>
        <v-btn color="primary" class="mt-2" v-if="mywallet && mywallet.length > 0" v-on:click="$router.push('/w/' + mywallet)"
          >My list</v-btn
        >
      </v-flex>
    </v-layout>
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
