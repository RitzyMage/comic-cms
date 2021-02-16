<template>
  <div
    class="comicImageArea comic-height swiper-zoom-container"
    ref="container"
    :style="containerStyle"
  >
    <img
      v-if="info.src"
      :id="`comic-image-${id}`"
      class="no-overflow comicImage swiper-zoom-target"
      ref="image"
      :style="stopScroll ? 'height: 100%;' : ''"
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
  private tooTall = false;
  private stopScroll = false;

  private static next_id = 0;
  private id = 0;

  mounted() {
    if (this.info.src) {
      (this.$refs.image as HTMLElement).onload = () => {
        this.imageLoaded = true;
        this.updateScroll();
      };
    }
    this.updateScroll();
    this.id = ComicImage.next_id++;
    window.addEventListener("resize", this.updateScroll);
  }

  private get containerHeight() {
    return (this.$refs.container as Element).clientHeight;
  }

  private updateScroll() {
    this.stopScroll = false;
    let heightDifference = this.info.height - this.containerHeight;
    this.stopScroll = heightDifference <= MIN_SCROLL_HEIGHT && heightDifference >= 0;
    this.tooTall = heightDifference >= 0;
  }

  private get containerStyle() {
    let scroll = this.tooTall && !this.stopScroll;
    let flex = "align-items: " + (scroll ? "flex-start;" : " center;");

    if (!this.imageLoaded && this.info.smallSrc) {
      let backgroundInfo = "";
      if (scroll) {
        backgroundInfo =
          "background-position: top;background-size: cover;background-attachment: local;";
      } else {
        backgroundInfo = "background-position: center;background-size: contain;";
      }
      return "background-image: url('" + this.info.smallSrc + "');" + backgroundInfo + flex;
    }
    return flex;
  }
}

export default ComicImage;
</script>

<style scoped lang="scss">
.comicImageArea {
  background-repeat: no-repeat;
  width: auto;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.comicImage {
  max-width: 100vw;
  max-height: unset;
}
</style>
