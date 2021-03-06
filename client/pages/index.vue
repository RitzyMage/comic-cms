<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="main-links">
      <PageLink v-if="lastReadPage" :page="lastRead" arrow="true" />
      <PageLink :page="{ ...first, title: 'Start From the Beginning!' }" arrow="left" />
      <ListLink path="/archive" name="All Comics" arrow="true" />
      <PageLink :page="{ ...last, title: 'Read the lastest comic!' }" arrow="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "~/util/Vue";
import { PAGE_KEY } from "~/pages/comic/_index.vue";
import PageLink from "~/components/PageLink.vue";
import ListLink from "~/components/ListLink.vue";
import options from "~/options.json";
import { ComicInfo } from "~/util/ComicInfo";

@Component({
  components: {
    PageLink,
    ListLink,
  },

  async asyncData({ $axios }) {
    let {
      images: { first, last },
    } = await $axios.$get("/images");
    return { first, last };
  },
})
export default class MainPage extends Vue {
  private title: string = options.name;
  private lastReadPage: string | null = null;

  private lastReadImage = "";
  private lastReadImageLowres = "";

  private get lastRead() {
    return {
      title: "Continue where you left off!",
      image: this.lastReadImage,
      id: this.lastReadPage,
      imageLowres: this.lastReadImageLowres,
    };
  }

  async mounted() {
    this.lastReadPage = localStorage.getItem(PAGE_KEY);
    if (this.lastReadPage) {
      let lastReadPageInfo = (
        await this.$axios.$get(`/images?first=${this.lastReadPage}&last=${this.lastReadPage}`)
      ).images[0];
      console.log(lastReadPageInfo);
      this.lastReadImage = lastReadPageInfo.image;
      this.lastReadImageLowres = lastReadPageInfo.image_lowres;
    }
  }
}
</script>

<style lang="scss" scoped>
.main-links {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
}
</style>
