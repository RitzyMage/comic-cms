<template>
  <div id="app" class="comic-app">
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
export default class ComicLayout extends Vue {}
</script>

<style lang="scss">
@import "assets/scss/global.scss";

.comic-app {
  height: 100vh;
}
</style>
