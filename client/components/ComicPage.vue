<template>
      <div class="page">
        <div class="comic">
            <h2 class="title">{{this.name}}</h2>
            <div>
              <div v-swiper:mySwiper="{
                  initialSlide: 1,
                  centeredSlides: true,
                  centeredSlidesBounds: true,
                }">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" 
                    :key="image" v-for="image in images">
                    <div class='comicImageArea'>
                        <p>{image}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ComicNavigation ref="nav" :getSwiper="getSwiper" :maxComic="maximum" :page="page"/>
        
      </div>
</template>

<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';
import {  directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ComicNavigation from '~/components/ComicNavigation.vue';
import { State } from 'vuex-class';

@Component({
  name: 'Comic',
  directives: {
    swiper: directive
  },
  components: {
    ComicNavigation
  }
})
export default class ComicPage extends Vue {
    @Prop(String) private page!:string;
    private mySwiper !: any;
    @State('maxComic') maximum !: number;

    private get name() {
      return "page" + this.page;
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

    private images = ['1', '2', '3'];

    private get nav(): ComicNavigation {
        return this.$refs.nav as ComicNavigation;
    }

    mounted() {
    this.mySwiper.on('slideChangeTransitionEnd', () => {
      if (this.mySwiper.realIndex == 0) {
        this.$router.push(this.nav.previousURL);
      }
      else if (this.mySwiper.realIndex == 2) {
        this.mySwiper.removeSlide([0, 1]);
        this.$router.push(this.nav.nextURL);
      }
    });
    
    this.mySwiper.on('slideChange', () => {
      if (this.mySwiper.realIndex == 2 && !this.nav.nextExists) {
        this.mySwiper.slideTo(1);
      }
      if (this.mySwiper.realIndex == 0 && !this.nav.previousExists) {
        this.mySwiper.slideTo(1);
      }
    });
    
  }
}

</script>

<style lang="scss" scoped>
  .fade-in-leave-active .title,  .fade-out-leave-active .title {
    opacity: 0;
  }
</style>