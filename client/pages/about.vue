<template>
  <div class="mainContainer">
    <nuxt-content :document="content" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import options from "~/options.json";

@Component({
  async asyncData({ $content }) {
    const content = await $content("about").fetch();
    return { content };
  },

  head() {
    return {
      title: `About ${options.name}`,
    };
  },
})
export default class About extends Vue {}
</script>
