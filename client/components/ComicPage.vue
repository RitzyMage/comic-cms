<template>
  <div class="page">
    <div class="comic">
      <h2 class="title">{{ this.title }}</h2>
      <div
        v-swiper:mySwiper="{
          initialSlide: 1,
          centeredSlides: true,
          centeredSlidesBounds: true
        }"
      >
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="image.src" v-for="image in images">
            <div class="comicImageArea">
              <img :src="image.src" :alt="image.alt" :title="image.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ComicNavigation
      ref="nav"
      :getSwiper="getSwiper"
      :maxComic="maxComic"
      :previous="comicInfo.previous"
      :page="comicInfo.id"
      :next="comicInfo.next"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ComicNavigation from "~/components/ComicNavigation.vue";
import { State } from "vuex-class";

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
  private mySwiper!: any;
  public $axios!: any;

  private get title() {
    return this.comicInfo.title;
  }

  private getSwiper() {
    return this.mySwiper;
  }

  private previous() {
    this.mySwiper.slideTo(0, 200);
  }

  private next() {
    this.mySwiper.slideTo(2, 200);
  }

  private get images(): Image[] {
    return [
      { src: this.comicInfo.previmage },
      this.infoAsImage,
      { src: this.comicInfo.nextimage }
    ];
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

  mounted() {
    this.mySwiper.on("slideChangeTransitionEnd", async () => {
      if (this.mySwiper.realIndex == 0) {
        //console.log(await this.$axios.get(this.previousAPI));
        this.$router.push(this.nav.previousURL);
      } else if (this.mySwiper.realIndex == 2) {
        this.mySwiper.removeSlide([0, 1]);
        //console.log("getting", this.nextAPI);
        //console.log(await this.$axios.get(this.nextAPI));
        this.$router.push(this.nav.nextURL);
      }
    });

    this.mySwiper.on("slideChange", () => {
      if (this.mySwiper.realIndex == 2 && !this.comicInfo.next) {
        this.mySwiper.slideTo(1);
      }
      if (this.mySwiper.realIndex == 0 && !this.comicInfo.previous) {
        this.mySwiper.slideTo(1);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.fade-in-leave-active .title,
.fade-out-leave-active .title {
  opacity: 0;
}
</style>
