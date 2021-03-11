<template>
  <div class="comicNav">
    <nuxt-link
      :to="firstURL"
      id="first-link"
      :event="''"
      @click.native.prevent="navigateFirst"
      v-if="previousExists"
      class="comicNav-link comicNav-link--first"
    >
      first
    </nuxt-link>
    <div v-else class="comicNav-link--empty comicNav-link--first"></div>

    <nuxt-link
      :to="previousURL"
      id="previous-link"
      :event="''"
      @click.native.prevent="navigatePrevious"
      v-if="previousExists"
      class="comicNav-link comicNav-link--previous"
    >
      previous
    </nuxt-link>
    <div v-else class="comicNav-link--empty comicNav-link--previous"></div>

    <nuxt-link :to="home" id="home-link" class="comicNav-link comicNav-link--home">home</nuxt-link>

    <nuxt-link
      :to="nextURL"
      id="next-link"
      :event="''"
      @click.native.prevent="navigateNext"
      v-if="nextExists"
      class="comicNav-link comicNav-link--next"
    >
      next
    </nuxt-link>
    <div v-else class="comicNav-link--empty comicNav-link--next"></div>

    <nuxt-link
      :to="lastURL"
      id="last-link"
      :event="''"
      @click.native.prevent="navigateLast"
      v-if="nextExists"
      class="comicNav-link comicNav-link--last"
    >
      last
    </nuxt-link>
    <div v-else class="comicNav-link--empty comicNav-link--last"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
  @Prop() private getSwiper!: () => any;
  @Prop() private maxComic!: number;
  @Prop() private page!: number;
  @Prop() private next!: number;
  @Prop() private previous!: number;
  @Prop() private navigateFirst!: () => void;
  @Prop() private navigatePrevious!: () => void;
  @Prop() private navigateNext!: () => void;
  @Prop() private navigateLast!: () => void;

  public get nextURL(): string {
    return this.getLink(this.next);
  }

  public get previousURL(): string {
    return this.getLink(this.previous);
  }

  public get firstURL(): string {
    return this.getLink(1);
  }

  public get lastURL(): string {
    return this.getLink(this.maxComic);
  }

  private get home(): string {
    return "/";
  }

  private getLink(index?: number): string {
    return "/comic/" + index;
  }

  private get nextExists(): boolean {
    return !!this.next;
  }

  private get previousExists(): boolean {
    return !!this.previous;
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";
@import "~/assets/scss/grid.scss";

.comicNav {
  display: grid;
  grid-template-areas: "first previous home next last";
  width: 100%;
  grid-template-columns: 20% 20% 20% 20% 20%;
  max-height: 5vh;
  height: #{$gridUnit * 6};
}

.comicNav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Komika Axis", sans-serif;
  color: #bbb;
  font-size: 1.3em;
  max-height: 5vh;
  padding-bottom: 0.3rem;
}

.comicNav-link--first {
  grid-area: "first";
  background-image: url("/img/first.svg");
}

.comicNav-link--previous {
  grid-area: "previous";
  background-image: url("/img/previous.svg");
}

.comicNav-link--home {
  grid-area: "home";
  background-image: url("/img/home.svg");
}

.comicNav-link--next {
  grid-area: "next";
  background-image: url("/img/next.svg");
}

.comicNav-link--last {
  grid-area: "last";
  background-image: url("/img/last.svg");
}

.comicNav-link--empty {
  background-image: none;
}

.fade-in-leave-active .comicNav,
.fade-out-leave-active .comicNav {
  z-index: -1;
  pointer-events: none;
}

@media screen and (max-width: 600px) {
  .comicNav-link {
    font-size: 1em;
  }
}

@media screen and (max-height: 600px) {
  .comicNav-link {
    font-size: 0.8em;
  }
}
</style>
