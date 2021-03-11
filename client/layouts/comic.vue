<template>
  <div id="app" class="app app--comic">
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
.app--comic {
  height: 100vh;
}
</style>
