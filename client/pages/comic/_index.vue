<template>
  <comic-page :page="this.$route.params.index" :comic-info="comicInfo" />
</template>

<script lang="ts">
import ComicPage from "@/components/ComicPage.vue";

import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import { ComicInfo } from "~/util/ComicInfo";

export const PAGE_KEY = "comic_cms_page";

@Component({
  components: {
    "comic-page": ComicPage,
  },

  layout: "comic",

  async asyncData({ $axios, params, error }: any) {
    try {
      let comicInfo = await $axios.$get(`/comic/${params.index}`);
      return { comicInfo };
    } catch (e) {
      error({
        statusCode: e.response?.status,
        message: e.response?.statusText ?? "server error",
      });
    }
  },

  transition: (to?: Route, from?: Route) => {
    if (!to || !from) {
      return "";
    }
    let toIndex = to.params.index;
    let fromIndex = from.params.index;

    let fadeOut = toIndex > fromIndex;
    if (toIndex === "1" || fromIndex === "1") {
      fadeOut = !fadeOut;
    }
    let name = fadeOut ? "fade-out" : "fade-in";

    return {
      name,
      mode: "in-out",
    };
  },
})
export default class Page extends Vue {
  private comicInfo!: ComicInfo;
  private get id() {
    return this.$route.params.index;
  }

  private get isFirst() {
    return this.id === "1";
  }

  private get isLast() {
    return this.id === this.comicInfo.last.id.toString();
  }

  private get shouldSavePage() {
    return !this.isFirst && !this.isLast;
  }

  mounted() {
    if (this.shouldSavePage) {
      localStorage.setItem(PAGE_KEY, this.id);
    }
  }
}
</script>

<style lang="scss" scoped></style>
