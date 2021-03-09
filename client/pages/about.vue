<template>
  <div>
    <nuxt-content :document="content" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/util/Vue";
@Component({
  async asyncData({ $content }) {
    const content = await $content("about").fetch();
    return { content };
  },
})
export default class About extends Vue {}
</script>
