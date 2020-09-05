<template>
  <div class="page">
    <div class="comic">
      <h2 class="title">{{ this.title }}</h2>
      <div
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
            <div class="comicImageArea">
              <img :src="image.src" :alt="image.alt" :title="image.title" />
            </div>
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ComicNavigation from "~/components/ComicNavigation.vue";
import { State } from "vuex-class";

const SWIPER_ANIMATION_LENGTH = 200;
const FILLER_SLIDES = 2;
const FILLER_TIME = 20;

interface Image {
  src: string;
  alt?: string;
  title?: string;
}

@Component({
  name: "Comic",
  directives: {
    swiper: directive
  },
  components: {
    ComicNavigation
  }
})
export default class ComicPage extends Vue {
  @Prop() private comicInfo!: any;
  @Prop() private maxComic!: number;
  @Prop() private firstImage!: string;
  @Prop() private lastImage!: string;
  private mySwiper!: any;
  public $axios!: any;

  private get title() {
    return this.comicInfo.title;
  }

  private getSwiper() {
    return this.mySwiper;
  }

  private navigateFirst() {
    this.mySwiper.slideTo(0, SWIPER_ANIMATION_LENGTH);
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

  private get images(): Image[] {
    return [
      ...[
        { src: this.firstImage, alt: "", title: "" },
        ...Array(FILLER_SLIDES).fill(this.infoAsImage)
      ],
      { src: this.comicInfo.previmage },
      this.infoAsImage,
      { src: this.comicInfo.nextimage },
      ...[
        ...Array(FILLER_SLIDES).fill(this.infoAsImage),
        { src: this.lastImage, alt: "", title: "" }
      ]
    ];
  }

  private get startingImage() {
    return FILLER_SLIDES + 2;
  }

  private get lastImageIndex() {
    return this.startingImage + FILLER_SLIDES + 2;
  }

  private get nav(): ComicNavigation {
    return this.$refs.nav as ComicNavigation;
  }

  private get infoAsImage(): Image {
    return {
      src: this.comicInfo.image,
      alt: this.comicInfo.transcript,
      title: this.comicInfo.mouseover
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
      if (this.mySwiper.realIndex == 0) {
        this.removeAllSlidesExcept(0);
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

.fade-in-enter-active .comicImageArea,
.fade-in-leave-active .comicImageArea,
.fade-out-enter-active .comicImageArea,
.fade-out-leave-active .comicImageArea {
  opacity: 5;
}
</style>
