<template>
  <nuxt-link :to="path" :class="`listLink${arrow ? ' listLink--arrow' : ''}`" :style="style">
    <div :class="`innerLink innerLink--arrow-${arrowDirection}`">{{ name }}</div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class ComicLink extends Vue {
  @Prop(String)
  private name!: string;

  @Prop(String)
  private path!: number;

  @Prop(String)
  private backgroundImage?: string;

  @Prop(String)
  private smallBackgroundImage?: string;

  @Prop()
  private arrow?: string | boolean;

  private imageLoaded = false;

  mounted() {
    this.updateBg();
  }

  @Watch("backgroundImage")
  private updateBg() {
    this.imageLoaded = false;
    let img: HTMLImageElement | null = this.getDetachedImage();
    if (img) {
      img.onload = () => {
        this.imageLoaded = true;
        img = null;
      };
    }
  }

  private getDetachedImage() {
    if (!this.backgroundImage) {
      return null;
    }
    let result = document.createElement("img");
    result.src = this.backgroundImage;
    return result;
  }

  private get style() {
    if (!this.backgroundImage || (!this.imageLoaded && !this.smallBackgroundImage)) {
      return "";
    }
    let image = this.imageLoaded ? this.backgroundImage : this.smallBackgroundImage;
    return {
      "background-image": "url('" + image + "')",
    };
  }

  private get arrowDirection() {
    if (this.arrow === "left" || this.arrow === "right") {
      return this.arrow;
    } else if (this.arrow) {
      return "none";
    }
    return "";
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";
@import "~/assets/scss/grid.scss";
.listLink {
  height: #{$gridUnit * 12};
  width: 100%;
  margin: #{$gridUnit} 0;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  box-shadow: 1px 1px 3px #0008;
  position: relative;
  overflow: hidden;
  background-size: 0%;
}

.listLink:hover {
  box-shadow: 1px 1px 6px #000c;
  color: $primaryLight;
  font-size: 1.05em;
  text-shadow: 1px 1px 2px black;
  transition: all 50ms ease-in;
}

.listLink--arrow {
  justify-content: center;
  align-items: center;
}

.listLink:before {
  content: "";
  position: absolute;
  width: 110%;
  height: 300%;
  background-image: inherit;
  background-size: cover;
  background-position: center;
  z-index: 1;
  filter: brightness(55%) contrast(50%) saturate(50%);
  left: -5%;
  top: -100%;
  transform: rotate(11deg);
}
.listLink:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to left, $primaryLight, $primary, $primaryDark);
  z-index: 0;
}

.listLink:hover:before {
  filter: none;
  -webkit-transition: -webkit-filter 50ms ease-in;
}

.innerLink {
  z-index: 1;
  font-size: 1.2em;
  background: #111;
  padding: #{$gridUnit * 1} #{$gridUnit * 4} #{$gridUnit * 1} #{$gridUnit * 2};
  clip-path: polygon(0% 0%, 100% 0%, calc(100% - 32px) 100%, 0% 100%);
  margin: 8px;
}

.innerLink--arrow-right {
  clip-path: polygon(
    0 0,
    calc(100% - #{$gridUnit * 4}) 0,
    100% 50%,
    calc(100% - #{$gridUnit * 4}) 100%,
    0 100%
  );
  margin-left: #{$gridUnit * 4};
}

.innerLink--arrow-left {
  clip-path: polygon(100% 0, #{$gridUnit * 4} 0, 0% 50%, #{$gridUnit * 4} 100%, 100% 100%);
  padding-left: #{$gridUnit * 4};
  padding-right: #{$gridUnit * 2};
  margin-right: #{$gridUnit * 4};
}

.innerLink--arrow-none {
  clip-path: none;
  padding: #{$gridUnit * 1} #{$gridUnit * 2};
}
</style>
