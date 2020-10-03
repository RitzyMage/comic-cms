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
  width: 100%;
  margin: 10px 0;
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
  background-image: linear-gradient(
    to left,
    $primaryLight,
    $primary,
    $primaryDark
  );
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
  padding: 16px 64px;
  clip-path: pol;
  clip-path: polygon(30% 0%, 100% 10%, 70% 100%, 0% 90%);
  margin: 8px;
}
</style>
