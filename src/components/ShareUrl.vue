<template>
  <div>
    <v-btn icon @click="showShareDialog = true">
      <v-icon>share</v-icon>
    </v-btn>
    <v-dialog v-model="showShareDialog" max-width="500px">
      <v-card class="mx-auto" max-width="500">
        <v-card-text>
          <v-layout row align-center>
            <v-text-field v-model="url" readonly ref="textarea"></v-text-field>
            <v-btn color="info" @click="copyUrl" class="ml-2">
              Copy
            </v-btn>
          </v-layout>
          <v-checkbox v-if="!$store.getters.isReadOnly" label="Allow editing" v-model="editable" :hide-details="true"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.native="showShareDialog = false">Close</v-btn>
          <v-btn v-if="nativeShare" text @click="share">Share</v-btn>
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
      return `${window.location.host}/w/${this.editable ? id : id.slice(0, 8)}`;
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
