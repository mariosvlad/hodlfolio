<template>
  <v-autocomplete
    label="Select cryptocurrency"
    :items="coins"
    v-model="coin"
    item-text="label"
    item-value="coin"
    :menu-props="{ maxHeight: '300' }"
    required
  >
    <template slot="item" slot-scope="data">
      <v-list-item-content>
        <v-list-item-title v-text="data.item.label"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-avatar>
        <i :class="['cc ' + data.item.coin]"></i>
      </v-list-item-avatar>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  computed: {
    coins() {
      return this.$store.state.coinsArray.slice();
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

<style lang="sass">
.label
  float: left

i
  font-size: 15px
  float: right
</style>
