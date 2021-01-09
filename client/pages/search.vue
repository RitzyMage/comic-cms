<template>
  <div class="search-page">
    <TextInput v-model="searchInput" name="search" rounded :icon="SearchIcon" />
    <p v-if="loading">
      LOADING
    </p>
    <div v-else-if="comics.length">
      <PageLink v-for="comic in comics" :key="comic.id" :page="comic" />
    </div>
    <div v-else>
      No results found.
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "../util/Vue";
import TextInput from "@/components/inputs/TextInput.vue";
import { SearchIcon } from "vue-feather-icons";
import { Comic } from "~/util/ComicInfo";
import PageLink from "~/components/PageLink.vue";

const SEARCH_WAIT = 300;

@Component({
  components: { TextInput, SearchIcon, PageLink },
})
export default class Search extends Vue {
  private searchTerm = "";
  private timeoutID: number | null = null;
  private loading = false;
  private SearchIcon = SearchIcon;
  private comics: Comic[] = [];

  private get searchInput() {
    return this.searchTerm;
  }

  private set searchInput(newInput: string) {
    this.searchTerm = newInput;
    this.loading = true;
    if (this.timeoutID) {
      window.clearTimeout(this.timeoutID);
    }
    this.timeoutID = window.setTimeout(() => {
      this.search();
    }, SEARCH_WAIT);
  }

  private async search() {
    this.comics = await this.$axios.$get(
      `/search?params=${this.searchTerm.replace(/[\&?\/]/, " ")}`
    );
    this.loading = false;
  }
}
</script>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
