<template>
  <div
    class="comicImageArea comic-height swiper-zoom-container"
    ref="container"
    :style="containerStyle"
  >
    <img
      v-if="info.src"
      id="comic-image"
      class="no-overflow comicImage swiper-zoom-target"
      ref="image"
      :style="shouldScroll ? '' : 'height: 100%'"
      :src="info.src"
      :alt="info.alt"
      :title="info.title"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "~/util/Vue";
import { directive } from "vue-awesome-swiper";

const MIN_SCROLL_HEIGHT = 100;

export interface ImageInfo {
  src: string;
  height: number;
  width: number;
  alt?: string;
  title?: string;
  smallSrc?: string;
}

@Component
export class ComicImage extends Vue {
  @Prop() private info!: ImageInfo;
  private imageLoaded = false;
  private shouldScroll = true;

  mounted() {
    if (this.info.src) {
      (this.$refs.image as HTMLElement).onload = () => {
        this.imageLoaded = true;
      };
    }
    this.updateScroll();
    window.addEventListener("resize", this.updateScroll);
  }

  private updateScroll() {
    this.shouldScroll = true;
    let image = (this.$refs.image as any) as { clientHeight: number; style: { height?: string } };
    delete image.style.height;
    let heightDifference = image.clientHeight - (this.$refs.container as Element).clientHeight;
    this.shouldScroll = heightDifference >= MIN_SCROLL_HEIGHT || heightDifference <= 0;
  }

  private get containerStyle() {
    if (!this.imageLoaded && this.info.smallSrc) {
      return "background-image: url('" + this.info.smallSrc + "');";
    }
    return "";
  }
}

export default ComicImage;
</script>

<style scoped lang="scss">
.comicImageArea {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: auto;
  max-width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.comicImage {
  max-width: 100vw;
  max-height: unset;
}
</style>
