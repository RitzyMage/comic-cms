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
    let pages = await $axios.$get(`/images?first=1&last=${CHUNK_SIZE * 2}`);
    return { pages };
  }
} as any)
export default class ComicArchives extends Vue {
  $axios!: any;

  private get params() {
    return this.$route.params;
  }

  private get name(): string {
    return this.params.name;
  }

  private get searchLink() {
    return "/comic/" + this.name + "/search";
  }

  private get numLoaded() {
    return this.pages.length;
  }

  private repsondingToScroll = false;

  private SCROLL_INTERVAL = 50;

  private waitForScrollResolved() {
    return new Promise(resolve => {
      let intervalTimer = window.setInterval(() => {
        if (!this.repsondingToScroll) {
          this.repsondingToScroll = true;
          window.clearInterval(intervalTimer);
          resolve();
        }
      }, this.SCROLL_INTERVAL);
    });
  }

  private async onScroll(event: Event) {
    await this.waitForScrollResolved();

    let scrollPos = window.scrollY + window.innerHeight;
    let numVisible = Math.ceil(scrollPos / LINK_HEIGHT);

    if (numVisible <= this.numLoaded) {
      let startIndex = this.numLoaded + 1;

      let newPages = await this.$axios.$get(
        `/images?first=${startIndex}&last=${startIndex + CHUNK_SIZE}`
      );
      this.pages = this.pages.concat(newPages).sort((a, b) => a.id - b.id);
    }

    this.repsondingToScroll = false;
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
