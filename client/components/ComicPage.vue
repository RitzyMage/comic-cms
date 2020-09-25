<template>
  <div class="page">
    <div class="comic">
      <h2 class="title">{{ this.title }}</h2>
      <div
        class="comic-height"
        v-swiper:mySwiper="{
          initialSlide: startingImage,
          centeredSlides: true,
          centeredSlidesBounds: true
        }"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            :key="index"
            v-for="(image, index) in images"
          >
            <ComicImage :info="image" />
          </div>
        </div>
      </div>
    </div>
    <ComicNavigation
      ref="nav"
      :get-swiper="getSwiper"
      :max-comic="maxComic"
      :previous="comicInfo.previous"
      :page="comicInfo.id"
      :next="comicInfo.next"
      :navigate-first="navigateFirst"
      :navigate-previous="navigatePrevious"
      :navigate-next="navigateNext"
      :navigate-last="navigateLast"
    />
    <p>
      {{ postedDate }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ComicNavigation from "~/components/ComicNavigation.vue";
import { ComicImage, ImageInfo } from "~/components/ComicImage.vue";

const SWIPER_ANIMATION_LENGTH = 200;
const FILLER_SLIDES = 2;
const FILLER_TIME = 20;

@Component({
  name: "Comic",
  directives: {
    swiper: directive
  },
  components: {
    ComicNavigation,
    ComicImage
  }
})
export default class ComicPage extends Vue {
  @Prop() private comicInfo!: any;
  @Prop() private maxComic!: number;
  @Prop() private firstImage!: any;
  @Prop() private lastImage!: any;
  private mySwiper!: any;
  public $axios!: any;

  private get title() {
    return this.comicInfo.title;
  }

  private get postedDate() {
    return new Date(this.comicInfo.posted).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
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

  private databaseToImage(databaseObject: any) {
    return {
      src: databaseObject.image,
      height: databaseObject.height,
      width: databaseObject.width,
      smallSrc: databaseObject.image_lowres
    };
  }

  private get images(): ImageInfo[] {
    return [
      this.infoAsImage,
      ...[
        this.databaseToImage(this.firstImage),
        ...Array(FILLER_SLIDES).fill(this.infoAsImage)
      ],
      {
        src: this.comicInfo.previmage,
        height: this.comicInfo.prevheight,
        width: this.comicInfo.prevwidth,
        smallSrc: this.comicInfo.prevlowres
      },
      this.infoAsImage,
      {
        src: this.comicInfo.nextimage,
        height: this.comicInfo.nextheight,
        width: this.comicInfo.nextwidth,
        smallSrc: this.comicInfo.nextlowres
      },
      ...[
        ...Array(FILLER_SLIDES).fill(this.infoAsImage),
        this.databaseToImage(this.lastImage)
      ]
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

  private get infoAsImage(): ImageInfo {
    return {
      src: this.comicInfo.image,
      height: this.comicInfo.height,
      width: this.comicInfo.width,
      alt: this.comicInfo.transcript,
      title: this.comicInfo.mouseover,
      smallSrc: this.comicInfo.image_lowres
    };
  }

  private getApiURL(index: number) {
    return "/" + index;
  }

  private get previousAPI() {
    return this.getApiURL(this.comicInfo.previous);
  }

  private get nextAPI() {
    return this.getApiURL(this.comicInfo.next);
  }

  private removeAllSlidesExcept(index: number) {
    let allSlides = [...Array(this.lastImageIndex + 1).keys()];
    let toRemove = allSlides.filter(slide => slide !== index);
    this.mySwiper.removeSlide(toRemove);
  }

  mounted() {
    this.mySwiper.on("slideChangeTransitionEnd", () => {
      if (this.mySwiper.realIndex == 1) {
        this.removeAllSlidesExcept(1);
        this.$router.push(this.nav.firstURL);
      } else if (this.mySwiper.realIndex == this.startingImage - 1) {
        this.removeAllSlidesExcept(this.startingImage - 1);
        this.$router.push(this.nav.previousURL);
      } else if (this.mySwiper.realIndex == this.startingImage + 1) {
        this.removeAllSlidesExcept(this.startingImage + 1);
        this.$router.push(this.nav.nextURL);
      } else if (this.mySwiper.realIndex == this.lastImageIndex) {
        this.removeAllSlidesExcept(this.lastImageIndex);
        this.$router.push(this.nav.lastURL);
      } else {
        this.mySwiper.slideTo(this.startingImage);
      }
    });

    this.mySwiper.allowSlidePrev = !!this.comicInfo.previous;
    this.mySwiper.allowSlideNext = !!this.comicInfo.next;
  }
}
</script>

<style lang="scss" scoped>
.fade-in-leave-active .title,
.fade-out-enter-active .title {
  opacity: 0;
}

.title {
  margin: 5px 0;
}

.comic-height {
  max-height: calc(100vh - 223px);
}
</style>
