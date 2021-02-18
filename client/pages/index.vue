<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="main-links">
      <nuxt-link to="/comic/1">First Comic</nuxt-link>
      <nuxt-link to="/archive">List</nuxt-link>
      <nuxt-link :to="lastComic">Last Comic</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "~/util/Vue";
import { State, Mutation } from "vuex-class";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import options from "~/options.json";

@Component({
  async asyncData({ $axios }) {
    let { count } = await $axios.$get("/count");
    return { maxComic: count };
  },
})
export default class MainPage extends Vue {
  private maxComic!: number;

  private title: string = options.name;

  private get lastComic() {
    return "/comic/" + this.maxComic;
  }
}
</script>

<style lang="scss" scoped>
.main-links {
  display: flex;
  justify-content: space-evenly;
  max-width: 500px;
  margin: 0 auto;
}
</style>
