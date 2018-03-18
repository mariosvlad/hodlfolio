<template>
    <v-form v-model="valid" row ref="form" lazy-validation>
      <v-layout row wrap>
        <v-flex xs12 sm5 class="px-1">
          <coin-selector></coin-selector>
        </v-flex>
        <v-flex xs12 sm5 class="px-1">
          <v-text-field
            label="Amount"
            type="number"
            v-model.number="amount"
            :rules="[v => !!v || 'Amount is required']"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs4 sm2>
          <v-btn
            @click="submit"
            :disabled="!valid"
            color="info"
          >Add</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
</template>

<script>
import CoinSelector from '@/components/CoinSelector';

export default {
  components: {
    CoinSelector,
  },
  data() {
    return {
      valid: null,
    };
  },
  computed: {
    amount: {
      get() {
        return this.$store.state.newCoin.amount;
      },
      set(value) {
        this.$store.commit('SETNEWCOINAMOUNT', value);
      },
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addCoin', {});
      }
    },
  },
};
</script>
