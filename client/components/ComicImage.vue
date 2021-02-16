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
  private tooTall = true;
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

  private get imageHeight() {
    return (document.getElementById(`comic-image-${this.id}`) as Element).clientHeight;
  }

  private get conatinerHeight() {
    return (this.$refs.container as Element).clientHeight;
  }

  private updateScroll() {
    this.stopScroll = false;
    let heightDifference = this.imageHeight - this.conatinerHeight;
    this.stopScroll = heightDifference <= MIN_SCROLL_HEIGHT && heightDifference >= 0;
    this.tooTall = this.stopScroll || heightDifference >= 0;
  }

  private get containerStyle() {
    let flex = "align-items: " + (this.tooTall ? "flex-start;" : " center;");

    if (!this.imageLoaded && this.info.smallSrc) {
      return "background-image: url('" + this.info.smallSrc + "');" + flex;
    }
    return flex;
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
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.comicImage {
  max-width: 100vw;
  max-height: unset;
}
</style>
