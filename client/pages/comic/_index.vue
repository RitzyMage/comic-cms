<template>
	<div class="comic">
		<comic-page :page="this.$route.params.index" />
	</div>
</template>

<script lang="ts">
import ComicPage from '@/components/ComicPage.vue';

import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
	components: {
		'comic-page': ComicPage,
	},
	validate({ params, $axios }: any) {
		let index = parseInt(params.index);

		return $axios.get('/count').then(({ data }: { data: { count: number } }) => {
			return /^\d+$/.test(params.index) && index > 0 && index <= data.count;
		});
	},
} as any)
export default class Page extends Vue {
	transition = 'test';
}
</script>

<style lang="scss" scoped></style>
