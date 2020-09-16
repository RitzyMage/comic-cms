<template>
  <div class="comicImageArea" :style="containerStyle">
    <img
      v-if="info.src"
      ref="image"
      :src="info.src"
      :alt="info.alt"
      :title="info.title"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { directive } from "vue-awesome-swiper";

export interface ImageInfo {
  src: string;
  height: number;
  width: number;
  alt?: string;
  title?: string;
  smallSrc?: string;
}

@Component({
  name: "ComicImage"
})
export class ComicImage extends Vue {
  @Prop() private info!: ImageInfo;
  private imageLoaded = false;

  mounted() {
    if (this.info.src) {
      (this.$refs.image as HTMLElement).onload = () => {
        this.imageLoaded = true;
      };
    }
  }

  private get containerStyle() {
    if (!this.imageLoaded && this.info.smallSrc) {
      return (
        "background-image: url('" +
        this.info.smallSrc +
        "'); height: " +
        this.info.height +
        "px"
      );
    }
    return "height: " + this.info.height + "px";
  }
}

export default ComicImage;
</script>

<style scoped>
.comicImageArea {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
