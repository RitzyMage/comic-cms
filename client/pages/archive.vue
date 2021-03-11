<template>
  <div class="comicList mainContainer">
    <router-link to="/search">search</router-link>
    <PageLink
      v-for="page in pages"
      :path="`/comic/${page.id}`"
      :name="page.title"
      :smallBackgroundImage="page.image_lowres"
      :backgroundImage="page.image"
      :key="page.title"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageLink from "../components/PageLink.vue";

const CHUNK_SIZE = 6;

const LINK_HEIGHT = 104;

@Component({
  components: {
    PageLink,
  },

  async asyncData({ $axios }) {
    let { images: pages, count: totalNumber } = await $axios.$get(
      `/comic/images?first=1&last=${CHUNK_SIZE * 2}`
    );
    return { pages, totalNumber };
  },
})
export default class ComicArchives extends Vue {
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
          resolve(true);
        }
      }, this.SCROLL_INTERVAL);
    });
  }

  private async onScroll(event: Event) {
    if (this.numLoaded === this.totalNumber) {
      return;
    }
    await this.waitForScrollResolved();

    let scrollPos = window.scrollY + window.innerHeight;
    let shouldHaveLoaded = Math.ceil(scrollPos / LINK_HEIGHT) + CHUNK_SIZE;

    if (this.numLoaded < shouldHaveLoaded) {
      let startIndex = this.numLoaded + 1;

      let { images: newPages, count } = await this.$axios.$get(
        `/comic/images?first=${startIndex}&last=${startIndex + CHUNK_SIZE}`
      );
      this.pages = this.pages.concat(newPages).sort((a, b) => a.id - b.id);
      this.totalNumber = count;
    }

    this.repsondingToScroll = false;
  }

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  }

  private pages!: Array<{ id: number; image: string; image_lowres: string }>;
  private totalNumber!: number;
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.comicList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
