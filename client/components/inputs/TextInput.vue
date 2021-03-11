<template>
  <div class="textInput">
    <label class="textInput-label">{{ name }}</label>
    <textarea
      v-if="large"
      class="textInput-input textInput-input--large"
      :value="value"
      @input="update"
    />
    <input v-else :class="inputClass" :type="type" :value="value" @input="update" />
    <component v-if="icon" :is="icon" class="textInput-icon"></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

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
    let result = "textInput-input";
    if (this.rounded) {
      result += " textInput-input--rounded";
    }
    return result;
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/colors.scss";

.textInput {
  display: flex;
  flex-direction: column;
  position: relative;
}

.textInput-label {
  text-transform: capitalize;
  text-align: left;
}

.textInput-icon {
  position: absolute;
  right: 4px;
  bottom: 4px;
  opacity: 0.6;
}

.textInput-input {
  background-color: $lightBackground;
  border: 0px;
  border-radius: 4px 4px 0 0;
  outline: none;
  color: white;
  padding: 8px 0 8px 8px;
  width: 100%;
}

.textInput-input--rounded {
  border-radius: 32px;
}

.textInput-input:focus {
  border-bottom: 1px solid $primary;
}

.textInput-input:focus ~ .textInput-icon {
  opacity: 0.9;
  bottom: 5px;
}

.textInput-input--large {
  border-radius: 4px;
  padding: 8px;
  width: calc(100% - 8px);
}

.textInput-input--large:focus,
.textInput-input--rounded:focus {
  border: 1px solid $primary;
}
</style>
