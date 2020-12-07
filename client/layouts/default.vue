<template>
  <div id="app">
    <NavHeader />
    <div class="pageAnchor">
      <div class="pageContainer">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader.vue";
import { Vue, Component, Prop } from "~/util/Vue";
import { State, Mutation } from "vuex-class";

@Component({
  components: {
    NavHeader,
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

.pageContainer {
  max-width: 100vw;
  overflow: hidden;
}

.pageAnchor {
  position: relative;
}

#app {
  overflow: hidden;
}

.icon {
  fill: transparent;
  stroke: white;
}

body > svg:last-child {
  display: none;
}
</style>
