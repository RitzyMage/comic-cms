<template>
    <div class="header">
        <h1 class="title">{{ name }}</h1>
        <div class="links">
            <a v-for="link in links" :href="link.href" :key="link.href" class="link">{{link.name}}</a>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component 
export default class NavHeader extends Vue {
     @State('name') name !: string;

     private links = [
        {name: 'link1', href: "#"},
        {name: 'link2', href: "#"},
     ]
}

</script>

<style lang="scss" scoped>
    .header {
        display: flex;
    }

    .links {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: calc(100% - 200px);
    }

    .link {
        display: block;
        height: calc(100% - 20px);
        flex-grow: 1;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        width: 200px;
        max-width: 200px;
        font-size: 1.2em;
    }
</style>