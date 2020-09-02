<template>
  <div class="container">
    <div>
      <nuxt-link to='/comic/1'>First Comic</nuxt-link>
      <nuxt-link :to='lastComic'>Last Comic</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component 
export default class MainPage extends Vue {
  @State('maxComic') maxComic !: number;

  private get lastComic() {
    return '/comic/' + this.maxComic;
  }

 
}
</script>

<style lang="scss">

</style>
