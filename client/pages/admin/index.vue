<template>
  <div>
    <h1>ADMIN</h1>
    <nuxt-link to="/admin/edit/list">EDIT</nuxt-link>
    <nuxt-link to="/admin/add">ADD COMIC</nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "~/util/Vue";

@Component({
  name: "Admin",
  middleware: ["auth"],
} as any)
export class Admin extends Vue {}

export default Admin;
</script>
