<template>
  <div class="mainContainer errorPage">
    <h1 v-if="error.statusCode === 404" class="errorPage-header">Page not found</h1>
    <h1 class="errorPage-header" v-else>Error</h1>
    <p class="errorPage-message">{{ errorMessage }}</p>
    <nuxt-link to="/">Return to home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"],
  computed: {
    errorMessage() {
      return this.error ? this.error.message : "an error occured";
    },
  },
};
</script>

<style lang="scss">
.errorPage {
  text-align: center;
}

.errorPage-header {
  font-size: 3em;
}

.errorPage-message {
  font-size: 1.5em;
}
</style>
