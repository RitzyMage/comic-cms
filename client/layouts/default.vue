<template>
  <div id="app">
    <ToastDisplay />
    <NavHeader />
    <div class="page">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader.vue";
import ToastDisplay from "~/components/ToastDisplay.vue";
import { Vue, Component } from "~/util/Vue";

@Component({
  components: {
    NavHeader,
    ToastDisplay,
  },
})
export default class Default extends Vue {}
</script>

<style lang="scss">
@import "assets/scss/colors.scss";

@font-face {
  font-family: "Kalam";
  src: url("/fonts/Kalam-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "Komika Axis";
  src: url("/fonts/KOMIKAX_.ttf") format("truetype");
}

body {
  margin: 0;
}

#app {
  font-family: "Kalam", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font;
  background-color: $darkBackground;
  min-height: 100vh;
}

a,
a:visited {
  font-weight: bold;
  color: $primary;
  text-decoration: none;
}

.page {
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
}

#app {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.icon {
  fill: transparent;
  stroke: white;
}

body > svg:last-child {
  display: none;
}
</style>
