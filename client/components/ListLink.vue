<template>
  <nuxt-link :to="path" class="listLink" :style="style">
    <div class="innerLink">{{ name }}</div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class ComicLink extends Vue {
  @Prop(String)
  private name!: string;

  @Prop(String)
  private path!: number;

  @Prop(String)
  private backgroundImage!: string;

  private get style() {
    return {
      "background-image": "url('" + this.backgroundImage + "')"
    };
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";
.listLink {
  height: 120px;
  width: calc(100% - 100px);
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 50px;
  box-shadow: 1px 1px 3px #0008;
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.listLink:hover {
  box-shadow: 1px 1px 6px #000c;
  color: $primaryLight;
  background-color: $mediumBackground;
  font-size: 1.05em;
  text-shadow: 1px 1px 2px black;
  transition: all 50ms ease-in;
}

.listLink:before {
  content: "";
  position: absolute;
  width: 110%;
  height: 300%;
  background: inherit;
  z-index: 0;
  filter: brightness(55%) contrast(50%) saturate(50%);
  left: -5%;
  top: -100%;
  transform: rotate(11deg);
}

.listLink:hover:before {
  filter: brightness(70%);
  -webkit-transition: -webkit-filter 50ms ease-in;
}

.innerLink {
  z-index: 1;
  font-size: 3em;
}

@media screen and (max-width: 600px) {
  .innerLink {
    font-size: 1.2em;
  }
}
</style>
