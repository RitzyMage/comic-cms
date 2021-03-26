<template>
  <input class="imageInput" type="file" accept="image/*" @change="imageChange" />
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
@import "~/assets/scss/grid.scss";

.imageInput {
  background-color: $lightBackground;
  border: 0px;
  border-radius: #{$gridUnit / 2} #{$gridUnit / 2} 0 0;
  outline: none;
  color: white;
  padding: #{$gridUnit * 1} 0 #{$gridUnit * 1} #{$gridUnit * 1};
  width: calc(100% - #{$gridUnit * 1});
  font-family: "Kalam", sans-serif;
}

.imageInput::-webkit-file-upload-button {
  background-color: $secondaryLight;
  color: $darkBackground;
  border: none;
  border-radius: 2px;
  font-family: "Kalam", sans-serif;
  box-shadow: 2px 2px 1px $darkBackground;
}
</style>
