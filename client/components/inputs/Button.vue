<template>
  <button @click="press" class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  private press(...args: any[]) {
    this.$emit("click", ...args);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";
@import "~/assets/scss/grid.scss";

.button {
  border: none;
  background-color: $primary;
  padding: #{$gridUnit * 1};
  margin: #{$gridUnit * 1};
  border-radius: 2px;
}

.button:hover {
  background-color: $primaryLight;
  box-shadow: 1px 1px 3px #000d;
}
</style>
