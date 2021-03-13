<template>
  <div class="comicPage">
    <h2 class="comicPage-title">{{ this.title }}</h2>
    <div class="comicPage-comic">
      <div
        v-swiper:mySwiper="{
          initialSlide: startingImage,
          centeredSlides: true,
          centeredSlidesBounds: true,
        }"
      >
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="index" v-for="(image, index) in images">
            <ComicImage :info="image" />
          </div>
        </div>
      </div>
    </div>
    <ComicNavigation
      ref="nav"
      :get-swiper="getSwiper"
      :max-comic="comicInfo.count"
      :previous="previousURL"
      :page="comic.id"
      :next="nextURL"
      :navigate-first="navigateFirst"
      :navigate-previous="navigatePrevious"
      :navigate-next="navigateNext"
      :navigate-last="navigateLast"
    />
    <p class="comicPage-date">
      {{ postedDate }}
    </p>
    <div class="comicPage-tags">
      <Chip v-for="tag in comic.tags" :text="tag.name" :key="tag.id" clickable />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ComicNavigation from "~/components/ComicNavigation.vue";
import { ComicImage, ImageInfo } from "~/components/ComicImage.vue";
import { ComicInfo, Comic } from "~/util/ComicInfo";
import Chip from "~/components/Chip.vue";

const SWIPER_ANIMATION_LENGTH = 200;
const FILLER_SLIDES = 2;
const FILLER_TIME = 20;

@Component({
  directives: {
    swiper: directive,
  },
  components: {
    ComicNavigation,
    ComicImage,
    Chip,
  },
})
export default class ComicPage extends Vue {
  @Prop() private comicInfo!: ComicInfo;
  private mySwiper!: any;
  private title: string = "";

  private get postedDate() {
    return new Date(this.comic.posted).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  private getSwiper() {
    return this.mySwiper;
  }

  private navigateFirst() {
    this.mySwiper.slideTo(1, SWIPER_ANIMATION_LENGTH);
  }

  private navigatePrevious() {
    this.mySwiper.slideTo(this.startingImage - 1, SWIPER_ANIMATION_LENGTH);
  }

  private navigateNext() {
    this.mySwiper.slideTo(this.startingImage + 1, SWIPER_ANIMATION_LENGTH);
  }

  private navigateLast() {
    this.mySwiper.slideTo(this.lastImageIndex, SWIPER_ANIMATION_LENGTH);
  }

  private comicToImage(databaseObject?: Comic): ImageInfo {
    if (!databaseObject) {
      return this.comicToImage(this.comicInfo.first);
    }
    return {
      src: databaseObject.image,
      height: databaseObject.height,
      width: databaseObject.width,
      smallSrc: databaseObject.imageLowres || databaseObject.image_lowres,
      alt: databaseObject.transcript,
      title: databaseObject.mouseover,
    };
  }

  private get images(): ImageInfo[] {
    return [
      this.mainImage,
      ...[this.comicToImage(this.comicInfo.first), ...Array(FILLER_SLIDES).fill(this.mainImage)],
      this.comicToImage(this.previous),
      { ...this.mainImage, isMain: true },
      this.comicToImage(this.next),
      ...[...Array(FILLER_SLIDES).fill(this.mainImage), this.comicToImage(this.comicInfo.last)],
    ];
  }

  private get startingImage() {
    return FILLER_SLIDES + 3;
  }

  private get lastImageIndex() {
    return this.startingImage + FILLER_SLIDES + 2;
  }

  private get nav(): ComicNavigation {
    return this.$refs.nav as ComicNavigation;
  }

  private get comic() {
    return this.comicInfo.comic;
  }

  private get previous() {
    return this.comicInfo.previous;
  }

  private get next() {
    return this.comicInfo.next;
  }

  private get previousURL() {
    return this.previous?.id;
  }

  private get nextURL() {
    return this.next?.id;
  }

  private get mainImage(): ImageInfo {
    return this.comicToImage(this.comic);
  }

  private removeAllSlidesExcept(index: number) {
    let allSlides = [...Array(this.lastImageIndex + 1).keys()];
    let toRemove = allSlides.filter(slide => slide !== index);
    this.mySwiper.removeSlide(toRemove);
  }

  mounted() {
    this.title = this.comic.title;
    this.mySwiper.on("slideChangeTransitionEnd", () => {
      if (this.mySwiper.realIndex == 1) {
        this.removeAllSlidesExcept(1);
        this.$router.push(this.nav.firstURL);
      } else if (this.mySwiper.realIndex == this.startingImage - 1) {
        this.removeAllSlidesExcept(this.startingImage - 1);
        if (this.previous) {
          this.title = this.previous.title;
        }
        this.$router.push(this.nav.previousURL);
      } else if (this.mySwiper.realIndex == this.startingImage + 1) {
        this.removeAllSlidesExcept(this.startingImage + 1);
        this.$router.push(this.nav.nextURL);
      } else if (this.mySwiper.realIndex == this.lastImageIndex) {
        this.removeAllSlidesExcept(this.lastImageIndex);
        if (this.next) {
          this.title = this.next.title;
        }
        this.$router.push(this.nav.lastURL);
      } else {
        this.mySwiper.slideTo(this.startingImage);
      }
    });

    this.mySwiper.allowSlidePrev = !!this.comicInfo.previous;
    this.mySwiper.allowSlideNext = !!this.comicInfo.next;
    this.mySwiper.zoom.enable();
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/grid.scss";
.comicPage {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comicPage-comic {
  flex-grow: 1;
  overflow: hidden;
  width: 100vw;
}

.swiper-container {
  height: 100%;
}

.swiper-slide {
  align-items: center;
  display: flex;
  justify-content: center;
}

.fade-in-leave-active .comicPage-title,
.fade-out-enter-active .comicPage-title,
.fade-in-enter-active .comicPage-title,
.fade-out-leave-active .comicPage-title,
.fade-in-leave-active .comicPage-tags,
.fade-out-enter-active .comicPage-tags {
  opacity: 0;
}

.comicPage-title {
  padding: #{$gridUnit / 2} 0;
  margin: 0;
}

.comicPage-date {
  margin: #{$gridUnit / 2};
}

.comicPage-tags {
  margin: #{$gridUnit};
  display: flex;
  max-width: 100vw;
}

@media screen and (max-width: 600px), screen and (max-height: 600px) {
  .comicPage-title {
    font-size: 1.2em;
    max-height: 1.2em;
  }

  .comicPage-tags {
    margin: #{$gridUnit / 2};
    overflow-x: auto;
  }

  .comicPage-date {
    margin: 0;
  }
}
</style>
