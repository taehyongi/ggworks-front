<template>
  <v-card
    color="primary"
    dark
  >
    <v-card-text>
      {{message}}
      <v-progress-linear
        indeterminate
        color="white"
        class="mb-0"
      ></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'progress-circle',
  computed: {
    message() {
      return this.$store.getters.getProgressDialogMessage;
    },
  },
};
</script>

<style>

</style>
