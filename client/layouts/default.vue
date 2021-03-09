<template>
  <div id="app">
    <ToastDisplay />
    <NavHeader />
    <div class="page">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader.vue";
import ToastDisplay from "~/components/ToastDisplay.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    NavHeader,
    ToastDisplay,
  },
})
export default class Default extends Vue {}
</script>

<style lang="scss">
@import "assets/scss/global.scss";
</style>
