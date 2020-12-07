<template>
  <ListLink :name="page.title" :path="path" :backgroundImage="page.image" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "~/util/Vue";
import ListLink from "./ListLink.vue";
@Component({
  name: "PageLink",
  components: {
    ListLink,
  },
})
export default class PageLink extends Vue {
  @Prop(Object)
  private page!: { title: string; image: string; id: number };

  private get path(): string {
    return "/comic/" + this.page.id;
  }
}
</script>

<style lang="scss" scoped></style>
