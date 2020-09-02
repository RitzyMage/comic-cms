<template>
    <ListLink :name="name" :path="path" :backgroundImage="backgroundImage"/>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import ListLink from './ListLink.vue';
@Component({
    name: 'PageLink',
    props: {
        name
    },
    components: {
        ListLink
    }
})
export default class PageLink extends Vue {
    @Prop(String)
    private name!: string;

    @Prop(Number)
    private index!: number;

    private get comicName(): string {
        return this.$route.params.name;
    }

    private get path(): string {
        return "/comic/" + this.comicName + "/" + this.index;
    }
    
    private get backgroundImage(): string {
        return "/img/comics/" + this.comicName + "/page" + this.index + ".png";
    }
}
</script>

<style lang="scss" scoped>

</style>