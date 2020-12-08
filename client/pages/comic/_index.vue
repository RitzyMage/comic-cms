<template>
  <div class="comic">
    <comic-page
      :page="this.$route.params.index"
      :comic-info="comicInfo"
      :max-comic="comicCount"
      :first-image="extraImages.first"
      :last-image="extraImages.last"
    />
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
      return await $axios.$get(`/${params.index}/all`);
    } catch (e) {
      error({
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

  async validate({ params, $axios, error }: any) {
    let index = parseInt(params.index);
    try {
      return await $axios.get("/count").then(({ data }: { data: { count: number } }) => {
        return /^\d+$/.test(params.index) && index > 0 && index <= data.count;
      });
    } catch (e) {
      error({
        message: e.response?.statusText ?? "Server Error",
      });
    }
    return true;
  },
})
export default class Page extends Vue {
  testVar!: string;
}
</script>

<style lang="scss" scoped></style>
