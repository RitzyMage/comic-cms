<template>
  <div class="text-input">
    <label class="text-input-label">{{ name }}</label>
    <textarea v-if="large" class="largeInput" :value="value" @input="update" />
    <input v-else :class="inputClass" :type="type" :value="value" @input="update" />
    <component v-if="icon" :is="icon" class="text-input-icon"></component>
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
  @Prop(Boolean) private rounded!: boolean;
  @Prop() private icon?: Vue;

  update({ target: { value } }: { target: { value: HTMLInputElement } }) {
    this.$emit("input", value);
  }

  get type() {
    if (this.password) {
      return "password";
    }
    return "text";
  }

  get inputClass() {
    let result = "input";
    if (this.rounded) {
      result += " rounded";
    }
    return result;
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/colors.scss";

.text-input {
  display: flex;
  flex-direction: column;
  position: relative;
}

.text-input-label {
  text-transform: capitalize;
  text-align: left;
}

.text-input-icon {
  position: absolute;
  right: 4px;
  bottom: 4px;
  opacity: 0.6;
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

.rounded {
  border-radius: 32px;
}

.input:focus {
  border-bottom: 1px solid $primary;
}

.input:focus ~ .text-input-icon {
  opacity: 0.9;
  bottom: 5px;
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

.largeInput:focus,
.rounded:focus {
  border: 1px solid $primary;
}
</style>
