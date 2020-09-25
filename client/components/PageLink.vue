<template>
  <ListLink name="link" :path="path" :backgroundImage="image" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ListLink from "./ListLink.vue";
@Component({
  name: "PageLink",
  components: {
    ListLink
  }
})
export default class PageLink extends Vue {
  @Prop(String)
  private image!: string;

  @Prop(Number)
  private index!: number;

  private get path(): string {
    return "/comic/" + this.index;
  }
}
</script>

<style lang="scss" scoped></style>
