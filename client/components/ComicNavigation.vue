<template>     
        <div class='links'>

          
          <nuxt-link :to="firstURL" v-if="previousExists" class="link first">first</nuxt-link>
          <div v-else class="empty first"></div>

          <nuxt-link :to="previousURL" 
          :event="''"
          @click.native.prevent="previous"
          v-if="previousExists"
          class="link previous"
          >
            previous
          </nuxt-link>
          <div v-else class="empty previous"></div>

          <nuxt-link :to='home' class="link home">home</nuxt-link>
        
          <nuxt-link :to="nextURL"
          :event="''"
          @click.native.prevent="next"
          v-if="nextExists"
          class="link next"
          >
            next
          </nuxt-link>
          <div v-else class="empty next"></div>

          <nuxt-link :to="lastURL" v-if="nextExists" class="link last">last</nuxt-link>
          <div v-else class="empty last"></div>
        </div>
 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';


@Component({
  name: 'ComicNavigation'
})
export default class Navigation extends Vue {
  @Prop() private getSwiper!: () => any;
  @Prop() private maxComic!: number;
  @Prop() private page!: string;

 private previous() {
   this.getSwiper().slideTo(0, 200);
 }

 private next() {
   this.getSwiper().slideTo(2, 200);
 }

 private get index(): number {
   return parseInt(this.page);
 }

 public get nextURL(): string {
   return this.getLink(this.index + 1);
 }

 public get previousURL(): string {
   return this.getLink(this.index - 1);
 }

 private get firstURL(): string {
   return this.getLink(1);
 }

 private get lastURL(): string {
   return this.getLink(this.maxComic);
 }

 private get home(): string {
   return "/";
 }

 private getLink(index: number): string {
   return "/comic/" + index;
 }

 public get nextExists(): boolean {
     return this.index + 1 <= this.maxComic;
 }

 public get previousExists(): boolean {
     return this.index > 1;
 }
   
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/colors.scss';
  .links {
    display: grid;
    grid-template-areas: "first previous home next last";
    width: 100%;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  .link {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin: 5px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    font-family: "Komika Axis", sans-serif;
    color: #bbb;
    font-size: 1.3em;
  }

  .first {
    grid-area: "first";
    background-image: url("/img/first.svg");
  }

  .previous {
    grid-area: "previous";
    background-image: url("/img/previous.svg");
  }

  .home {
    grid-area: "home";
    background-image: url("/img/home.svg");
  }

  .next {
    grid-area: "next";
    background-image: url("/img/next.svg");
  }

  .last {
    grid-area: "last";
    background-image: url("/img/last.svg");
  }

  .empty {
    background-image: none;
  }

  .fade-in-leave-active .links,  .fade-out-leave-active .links {
    z-index: -1;
    pointer-events: none;
  }

  @media screen and (max-width: 600px){
    .link {
      font-size: 1em;
    }
  }
</style>