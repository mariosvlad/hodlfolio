<template>
  <div>
    <v-btn icon @click="showShareDialog = true">
      <v-icon>share</v-icon>
    </v-btn>
    <v-dialog v-model="showShareDialog" max-width="500px">
      <v-card>
          <v-card-text>
            <v-layout row>
              <v-flex>
                <v-text-field
                  v-model="url" readonly ref="textarea"
                ></v-text-field>
              </v-flex>
              <v-btn color="info" @click="copyUrl">
                Copy
              </v-btn>
            </v-layout>
            <v-checkbox v-if="!$store.getters.isReadOnly"
              label="Allow editing"
              v-model="editable"
              hide-details="true"
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="showShareDialog = false">Close</v-btn>
            <v-btn v-if="nativeShare" color="blue darken-1" flat @click="share">Share</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showShareDialog: false,
      editable: false,
      nativeShare: false,
    };
  },
  mounted() {
    if (navigator.share) {
      this.nativeShare = true;
    }
  },
  computed: {
    url() {
      const id = this.$store.state.currentWallet;
      return `https://www.hodlfolio.org/w/${this.editable ? id : id.slice(0, 8)}`;
    },
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator.share({
          url: this.url,
        });
      }
      this.showShareDialog = false;
    },
    copyUrl() {
      this.$refs.textarea.$refs.input.select();
      document.execCommand('copy');
    },
  },
};
</script>
