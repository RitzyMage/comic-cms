<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="main-links">
      <PageLink :page="{ ...first, title: 'Start From the Beginning!' }" arrow="left" />
      <ListLink path="/archive" name="All Comics" :arrow="true" />
      <PageLink :page="{ ...last, title: 'Read the lastest comic!' }" arrow="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "~/util/Vue";
import PageLink from "~/components/PageLink.vue";
import ListLink from "~/components/ListLink.vue";
import options from "~/options.json";

@Component({
  components: {
    PageLink,
    ListLink,
  },

  async asyncData({ $axios }) {
    let {
      images: { first, last },
    } = await $axios.$get("/images");
    return { first, last };
  },
})
export default class MainPage extends Vue {
  private title: string = options.name;
}
</script>

<style lang="scss" scoped>
.main-links {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
}
</style>
