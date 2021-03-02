<template>
  <div class="comic">
    <comic-page :page="this.$route.params.index" :comic-info="comicInfo" />
  </div>
</template>

<script lang="ts">
import ComicPage from "@/components/ComicPage.vue";

import { Vue, Component } from "~/util/Vue";
import { Route } from "vue-router";

@Component({
  components: {
    "comic-page": ComicPage,
  },

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
  testVar!: string;
}
</script>

<style lang="scss" scoped></style>
