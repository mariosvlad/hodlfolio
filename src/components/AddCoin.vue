<template>
  <div>
    <v-btn color="green" dark fab fixed bottom right @click="showAddCoinDialog = true">
        <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="showAddCoinDialog" max-width="400px">
      <v-card>
        <v-form v-model="valid" row ref="form" lazy-validation>
          <v-card-title>
            <span class="headline">Add Cryptocurrency</span>
          </v-card-title>
          <v-card-text>
            <coin-selector></coin-selector>
              <v-text-field
                label="Amount"
                type="number"
                v-model.number="amount"
                :rules="[v => !!v || 'Amount is required']"
                required
              ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat small  @click.native="showAddCoinDialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat small @click="submit(false)" :disabled="!valid">Add</v-btn>
            <v-btn color="blue darken-1" flat small @click="submit(true)" :disabled="!valid">Add and close</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
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
      showAddCoinDialog: false,
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
    submit(close) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addCoin', {});
        if (close) {
          this.showAddCoinDialog = false;
        }
      }
    },
  },
};
</script>

<style scoped>
  .btn--small {
    min-width: 60px
  }
</style>
