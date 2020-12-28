<template>
  <input class="input" :type="type" :value="value" @input="update" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "~/util/Vue";

@Component
export default class TextInput extends Vue {
  @Prop() private value!: string;
  @Prop(Boolean) private password!: boolean;

  update({ target: { value } }: { target: { value: HTMLInputElement } }) {
    this.$emit("input", value);
  }

  get type() {
    if (this.password) {
      return "password";
    }
    return "text";
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/colors.scss";

.input {
  background-color: $lightBackground;
  border: 0px;
  border-radius: 8px 8px 0 0;
  outline: none;
  color: white;
  padding: 8px;
}

.input:focus {
  border-bottom: 1px solid $primary;
}
</style>
