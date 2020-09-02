<template>
      <div class="comicList">
      <router-link :to="searchLink">search</router-link>
          <PageLink
          v-for="page in pages" 
          :name="page.name"
          :key="page.name"
          :index='page.index'
          />
      </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageLink from '../components/PageLink.vue';

@Component({
  name: 'ComicArchives',
  components: {
    PageLink,
  }
})
export default class ComicArchives extends Vue {

  private get params() {
    return this.$route.params;
  }

  private get name(): string {
    return this.params.name;
  }

  private getLink(name: string) {
    return '/comic/' + this.name + '/' + name;
  }

  private get searchLink() {
    return '/comic/' + this.name + '/search';
  }

  mounted() {
    this.pages =[
      {name:'Page 1', index: 1},
      {name:'Page 2', index: 2},
      {name:'Page 3', index: 3},
      {name:'Page 4', index: 4},
    ];
  }

  constructor() {
    super();
    this.pages = [];
  }

  private pages: Array<{name: string; index: number}>;
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/colors.scss';

.comicList {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

</style>