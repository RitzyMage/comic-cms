<template>
  <div class="text-input">
    <label class="text-input-label">{{ name }}</label>
    <textarea v-if="large" class="largeInput" :value="value" @input="update" />
    <input v-else class="input" :type="type" :value="value" @input="update" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "~/util/Vue";

@Component
export default class TextInput extends Vue {
  @Prop() private value!: string;
  @Prop() private name!: string;
  @Prop(Boolean) private password!: boolean;
  @Prop(Boolean) private large!: boolean;

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

.text-input {
  display: flex;
  flex-direction: column;
}

.text-input-label {
  text-transform: capitalize;
  text-align: left;
}

.input {
  background-color: $lightBackground;
  border: 0px;
  border-radius: 4px 4px 0 0;
  outline: none;
  color: white;
  padding: 8px 0 8px 8px;
  width: 100%;
}

.input:focus {
  border-bottom: 1px solid $primary;
}

.largeInput {
  background-color: $lightBackground;
  border: 0px;
  border-radius: 4px;
  outline: none;
  color: white;
  padding: 8px;
  width: calc(100% - 8px);
}

.largeInput:focus {
  border: 1px solid $primary;
}
</style>
