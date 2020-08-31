<template>
    <div class="comic">
      <comic-page :page="this.$route.params.index"/>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import ComicPage from '~/components/ComicPage.vue';

import { Vue, Component, Watch } from 'vue-property-decorator';

@Component( {
  transition: 'test',
  validate ({ params }: any) {
    let index = parseInt(params.index);

    return axios.get('http://localhost:3002/comic').then((res) => {
        let data = res.data;
        return /^\d+$/.test(params.index) &&
          index > 0 &&
          index <= data.count;
      }
    );
    },

  components: {
    'comic-page': ComicPage,
  }
})
export default class Page extends Vue {

}

</script>

<style lang="scss" scoped>

</style>