<template>
  <div class="container mainContainer">
    <h1>{{ title }}</h1>
    <div class="main-links">
      <PageLink
        v-if="lastReadPage"
        :path="`/comic/${lastReadPage}`"
        name="Continue where you left off!"
        :smallBackgroundImage="lastReadImageLowres"
        :backgroundImage="lastReadImage"
        arrow="true"
      />
      <PageLink
        name="Start From the Beginning!"
        :path="`/comic/1`"
        :smallBackgroundImage="first.image_lowres"
        :backgroundImage="first.image"
        arrow="left"
      />
      <PageLink path="/archive" name="All Comics" arrow="true" />
      <PageLink
        :path="`/comic/${last.id}`"
        name="Read the latest comic!"
        :smallBackgroundImage="last.image_lowres"
        :backgroundImage="last.image"
        arrow="right"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { PAGE_KEY } from "~/pages/comic/_index.vue";
import PageLink from "~/components/PageLink.vue";
import ListLink from "~/components/PageLink.vue";
import options from "~/options.json";
import { ComicInfo } from "~/util/ComicInfo";

@Component({
  components: {
    PageLink,
    ListLink,
  },

  async asyncData({ $axios }) {
    let { images } = await $axios.$get("/comic/images");
    return images;
  },

  head() {
    return {
      title: `${options.name}`,
    };
  },
})
export default class MainPage extends Vue {
  private title: string = options.name;
  private lastReadPage: string | null = null;

  private lastReadImage = "";
  private lastReadImageLowres = "";

  async mounted() {
    this.lastReadPage = localStorage.getItem(PAGE_KEY);
    if (this.lastReadPage) {
      let lastReadPageInfo = (
        await this.$axios.$get(`/comic/images?first=${this.lastReadPage}&last=${this.lastReadPage}`)
      ).images[0];
      if (!lastReadPageInfo) {
        this.lastReadPage = null;
      } else {
        this.lastReadImage = lastReadPageInfo.image;
        this.lastReadImageLowres = lastReadPageInfo.image_lowres;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-links {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}
</style>
