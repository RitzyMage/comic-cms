<template>
  <div class="comic">
    <comic-page
      :page="this.$route.params.index"
      :comic-info="comicInfo"
      :max-comic="parseInt(comicCount)"
      :first-image="extraImages.firstImage"
      :last-image="extraImages.lastImage"
    />
  </div>
</template>

<script lang="ts">
import ComicPage from "@/components/ComicPage.vue";

import { Vue, Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  components: {
    "comic-page": ComicPage
  },
  async asyncData({ $axios, params }: any) {
    let [comicCount, comicInfo, extraImages] = await Promise.all([
      $axios.get(`/count`),
      $axios.get(`/${params.index}`),
      $axios.get(`/ends`)
    ]);
    return {
      comicInfo: comicInfo.data,
      comicCount: comicCount.data.count,
      extraImages: extraImages.data
    };
  },
  transition: (to: Route, from: Route) => {
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

    console.log(name);

    return {
      name,
      mode: "in-out"
    };
  },
  validate({ params, $axios }: any) {
    let index = parseInt(params.index);

    return $axios
      .get("/count")
      .then(({ data }: { data: { count: number } }) => {
        return /^\d+$/.test(params.index) && index > 0 && index <= data.count;
      });
  }
} as any)
export default class Page extends Vue {
  testVar!: string;
}
</script>

<style lang="scss" scoped></style>
