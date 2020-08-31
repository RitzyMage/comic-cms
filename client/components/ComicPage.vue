<template>
    <div>
        Comic page {{page}}
        <nuxt-link to="/comic/3">Third page</nuxt-link>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';

@Component 
export default class ComicPage extends Vue {
    @Prop(String) private page!:string;
}

</script>

<style lang="scss" scoped>

</style>