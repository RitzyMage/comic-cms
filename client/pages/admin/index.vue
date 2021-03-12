<template>
  <div class="mainContainer">
    <h1>ADMIN</h1>
    <nuxt-link to="/admin/add">ADD COMIC</nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  middleware: ["auth"],
})
export class Admin extends Vue {}

export default Admin;
</script>
