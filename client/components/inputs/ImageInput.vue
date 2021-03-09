<template>
  <input class="image-input" type="file" accept="image/*" @change="imageChange" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ImageInput extends Vue {
  @Prop() private value!: string;

  private async fileToDataURL(file: File) {
    let fileReader = new FileReader();
    let promise = new Promise(resolve => {
      fileReader.addEventListener("load", () => {
        resolve(fileReader.result);
      });
    });
    fileReader.readAsDataURL(file);
    return await promise;
  }

  private async imageChange({
    target: {
      files: [image],
    },
  }: any) {
    if (image) {
      this.$emit("input", await this.fileToDataURL(image));
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/colors.scss";

.image-input {
  background-color: $lightBackground;
  border: 0px;
  border-radius: 4px 4px 0 0;
  outline: none;
  color: white;
  padding: 8px 0 8px 8px;
  width: 100%;
  font-family: "Kalam", sans-serif;
}

.image-input::-webkit-file-upload-button {
  background-color: $secondaryLight;
  color: $darkBackground;
  border: none;
  border-radius: 2px;
  font-family: "Kalam", sans-serif;
  box-shadow: 2px 2px 1px $darkBackground;
}
</style>
