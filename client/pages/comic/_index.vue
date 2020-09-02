<template>
  <div class="comic">
    <comic-page :page="this.$route.params.index" />
  </div>
</template>

<script lang="ts">
import ComicPage from "@/components/ComicPage.vue";

import { Vue, Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  components: {
    "comic-page": ComicPage,
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

    return {
      name,
      mode: "in-out",
    };
  },
  validate({ params, $axios }: any) {
    let index = parseInt(params.index);

    return $axios
      .get("/count")
      .then(({ data }: { data: { count: number } }) => {
        return /^\d+$/.test(params.index) && index > 0 && index <= data.count;
      });
  },
} as any)
export default class Page extends Vue {
  transition = "test";
}
</script>

<style lang="scss" scoped></style>
