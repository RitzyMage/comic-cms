<template>
  <input type="file" accept="image/*" @change="imageChange" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "../../util/Vue";

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
