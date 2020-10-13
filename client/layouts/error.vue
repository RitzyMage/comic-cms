<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>Error</h1>
    <p>{{ errorMessage }}</p>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"],
  computed: {
    errorMessage() {
      return this.error ? this.error.message : "an error occured";
    }
  }
};
</script>
