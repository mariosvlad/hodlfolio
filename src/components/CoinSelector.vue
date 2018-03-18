<template>
  <v-select
    label="Select"
    :items="coins"
    v-model="coin"
    item-text="label"
    item-value="coin"
    max-height="300"
    autocomplete
    required
  >
    <template slot="item" slot-scope="data">
      <v-list-tile-content>
        <v-list-tile-title v-text="data.item.label"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-avatar>
        <i :class="['cc ' + data.item.coin]"></i>
      </v-list-tile-avatar>
    </template>
  </v-select>
</template>

<script>
export default {
  computed: {
    coins() {
      return this.$store.state.coinsArray.slice(0, 300);
    },
    coin: {
      get() {
        return this.$store.state.newCoin.name;
      },
      set(value) {
        this.$store.commit('SETNEWCOIN', value);
      },
    },
  },
};
</script>

<style>
.label {
  float: left
}

i {
  font-size: 15px;
  float: right;
}
</style>
