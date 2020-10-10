<template>
  <div class="comicList">
    <router-link :to="searchLink">search</router-link>
    <PageLink v-for="page in pages" :page="page" :key="page.title" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageLink from "../components/PageLink.vue";

const CHUNK_SIZE = 6;

const LINK_HEIGHT = 140;

@Component({
  name: "ComicArchives",
  components: {
    PageLink
  },
  async asyncData({ $axios }: any) {
    let pages = await $axios.$get(`/images?first=1&last=${CHUNK_SIZE}`);
    return { pages };
  }
} as any)
export default class ComicArchives extends Vue {
  private get params() {
    return this.$route.params;
  }

  private get name(): string {
    return this.params.name;
  }

  private get searchLink() {
    return "/comic/" + this.name + "/search";
  }

  private numLoaded = 6;

  private onScroll(event: Event) {
    let scrollPos = window.scrollY + window.innerHeight;
    let numVisible = Math.ceil(scrollPos / LINK_HEIGHT);
    if (numVisible <= this.numLoaded + CHUNK_SIZE) {
      console.log("LAZY LOAD!");
    }
  }

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  }

  private pages!: Array<{ id: number; image: string; image_lowres: string }>;
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.comicList {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}
</style>
