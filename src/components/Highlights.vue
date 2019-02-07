<template>
  <v-layout wrap>
    <v-flex v-for="card in cards" :key="card.description" xs12>
      <v-card :color="card.color" class="white--text">
        <v-container fluid grid-list-md>
          <v-layout row>
            <v-flex xs4>
              <v-layout column>
                <v-flex d-flex align-content-center>
                  <v-icon x-large dark>{{ card.icon }}</v-icon>
                </v-flex>
                <v-flex column justify-space-around align-content-space-around>
                  <v-flex class="pa-0">
                    <div class="title text-xs-center">{{ card.valueChange }}</div>
                  </v-flex>
                  <v-flex class="pa-0">
                    <div class="subheading text-xs-center">({{ card.change }}%)</div>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs8>
              <v-layout column fill-height justify-space-between>
                <v-flex>
                  <div class="headline">{{ card.label }}</div>
                </v-flex>
                <v-flex>
                  <div class="body-2">{{ card.description }}</div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    cards() {
      return this.$store.getters.highlights.map(highlight => {
        const card = { ...highlight };
        if (card.valueChange) {
          card.valueChange = Number(card.valueChange.round(1)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        return card;
      });
    },
  },
};
</script>
