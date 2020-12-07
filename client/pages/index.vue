<template>
  <div class="container">
    <div>
      <nuxt-link to="/comic/1">First Comic</nuxt-link>
      <nuxt-link :to="lastComic">Last Comic</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "~/util/Vue";
import { State, Mutation } from "vuex-class";

@Component({
  async asyncData({ $axios }: { $axios: any }) {
    let { count } = await $axios.$get("/count");
    return { maxComic: count };
  },
} as any)
export default class MainPage extends Vue {
  private maxComic!: number;

  private get lastComic() {
    return "/comic/" + this.maxComic;
  }
}
</script>

<style lang="scss"></style>
