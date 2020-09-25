<template>
  <div class="comicList">
    <router-link :to="searchLink">search</router-link>
    <PageLink
      v-for="page in pages"
      :image="page.image"
      :key="page.name"
      :index="page.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageLink from "../components/PageLink.vue";

@Component({
  name: "ComicArchives",
  components: {
    PageLink
  },
  async asyncData({ $axios }: any) {
    let pages = await $axios.$get("/images?first=1&last=3");
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

  constructor() {
    super();
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
