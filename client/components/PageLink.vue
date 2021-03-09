<template>
  <ListLink
    :name="page.title"
    :path="path"
    :smallBackgroundImage="page.imageLowres"
    :backgroundImage="page.image"
    :arrow="arrow"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ListLink from "./ListLink.vue";

@Component({
  components: {
    ListLink,
  },
})
export default class PageLink extends Vue {
  @Prop(Object)
  private page!: { title: string; image: string; id: number; imageLowres: string };

  @Prop(String)
  private arrow?: string;

  private get path(): string {
    return "/comic/" + this.page.id;
  }
}
</script>

<style lang="scss" scoped></style>
