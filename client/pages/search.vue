<template>
  <div>
    <TextInput v-model="searchInput" name="search" />
    <p v-if="loading">
      LOADING
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "../util/Vue";
import TextInput from "@/components/inputs/TextInput.vue";

const SEARCH_WAIT = 300;

@Component({
  components: { TextInput },
})
export default class Search extends Vue {
  private searchTerm = "";
  private timeoutID: number | null = null;
  private loading = false;

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

  private search() {
    console.log("search for", this.searchTerm);
    this.loading = false;
  }
}
</script>
