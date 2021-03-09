<template>
  <div class="comicList mainContainer">
    <h1>Comics with tag {{ $route.params.id }}</h1>
    <PageLink v-for="page in pages" :page="page" :key="page.title" />
    <p v-if="!pages.length">
      No comics found!
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageLink from "@/components/PageLink.vue";

@Component({
  components: {
    PageLink,
  },

  async asyncData({ $axios, params }) {
    let { images: pages, count: totalNumber } = await $axios.$get(`/comic/images?tag=${params.id}`);
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
}
</style>
