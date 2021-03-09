<template>
  <div class="comicImageArea swiper-zoom-container" ref="container" :style="containerStyle">
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
    <span v-if="shouldRotate" class="rotate">
      <SmartphoneIcon class="rotate-icon" />
      <RotateCcwIcon size="32" class="rotate-icon rotate-icon--large rotate-icon--translucent" />
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { directive } from "vue-awesome-swiper";
import { SmartphoneIcon, RotateCcwIcon } from "vue-feather-icons";

const MIN_SCROLL_HEIGHT = 200;
const SMALL_SCREEN = 600;
const ROTATION_ASPECT_RATIO = 1.1;

export interface ImageInfo {
  src: string;
  height: number;
  width: number;
  alt?: string;
  title?: string;
  smallSrc?: string;
  isMain?: boolean;
}

@Component({
  components: { SmartphoneIcon, RotateCcwIcon },
})
export class ComicImage extends Vue {
  @Prop() private info!: ImageInfo;
  private imageLoaded = false;
  private tooTall = false;
  private stopScroll = false;
  private shouldRotate = false;

  private get id() {
    return parseInt(this.$route.params.index);
  }

  mounted() {
    if (this.info.src) {
      (this.$refs.image as HTMLElement).onload = () => {
        this.imageLoaded = true;
        this.updateScroll();
      };
    }
    this.updateScroll();
    window.addEventListener("resize", this.updateScroll);
    screen.orientation.addEventListener("change", this.updateScroll);
  }

  private get imageHeight() {
    return this.info.height;
  }

  private get imageWidth() {
    return this.info.width;
  }

  private updateRotation() {
    let isScreenSmall = screen.width <= SMALL_SCREEN || screen.height <= SMALL_SCREEN;
    if (this.info.isMain && isScreenSmall) {
      let imageAspectRatio = this.imageWidth / this.imageHeight;
      let screenAspectRatio = screen.width / screen.height;
      let tooWide =
        imageAspectRatio > ROTATION_ASPECT_RATIO && screenAspectRatio < ROTATION_ASPECT_RATIO;
      let tooTall =
        imageAspectRatio < ROTATION_ASPECT_RATIO && screenAspectRatio > ROTATION_ASPECT_RATIO;
      if (tooWide || tooTall) {
        this.shouldRotate = true;
      } else {
        this.shouldRotate = false;
      }
    } else {
      this.shouldRotate = false;
    }
  }

  private updateScroll() {
    this.updateRotation();
    let imageHeight = (this.$refs.image as HTMLImageElement)?.clientHeight;
    if (!imageHeight) {
      imageHeight = this.imageHeight;
    }

    this.stopScroll = false;
    let heightDifference = imageHeight - (this.$refs.container as Element)?.clientHeight;
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

.rotate {
  position: absolute;
  bottom: 16px;
  right: 16px;
  height: 24px;
  width: 24px;
}

.rotate-icon {
  position: absolute;
  top: 0;
  left: 0;
}

.rotate-icon--large {
  top: -4px;
  left: -4px;
}

.rotate-icon--translucent {
  opacity: 0.6;
}
</style>
