<template>
  <div class="comicList">
    <h1>Comics with tag {{ $route.params.id }}</h1>
    <PageLink v-for="page in pages" :page="page" :key="page.title" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "~/util/Vue";
import PageLink from "@/components/PageLink.vue";

@Component({
  components: {
    PageLink,
  },

  async asyncData({ $axios, params }) {
    let { images: pages, count: totalNumber } = await $axios.$get(`/images?tag=${params.id}`);
    return { pages, totalNumber };
  },
})
export default class TaggedComics extends Vue {}
</script>

<style lang="scss" scoped>
.comicList {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}
</style>
