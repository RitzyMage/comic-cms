<template>
  <div class="pageContainer">
    <comic-page :page="this.$route.params.index" :comic-info="comicInfo" />
    <div v-if="$auth.loggedIn" class="editButton" @click="$router.push(`/admin/edit/${id}`)">
      <EditIcon class="editButton-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import ComicPage from "@/components/ComicPage.vue";

import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import { ComicInfo } from "~/util/ComicInfo";
import { EditIcon } from "vue-feather-icons";
import options from "~/options.json";

export const PAGE_KEY = "comic_cms_page";

@Component({
  components: {
    "comic-page": ComicPage,
    EditIcon,
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

  head() {
    return {
      //@ts-ignore
      title: `${options.name}: ${(this.comicInfo as ComicInfo).comic.title}`,
    };
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

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";
@import "~/assets/scss/grid.scss";
.editButton {
  position: absolute;
  top: #{$gridUnit * 2};
  right: #{$gridUnit * 2};
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: #{$gridUnit * 2};
  border-radius: #{$gridUnit * 4};
  cursor: pointer;
  z-index: 1;
}

.editButton-icon {
  color: $mediumBackground;
}

.pageContainer {
  height: 100%;
}
</style>
