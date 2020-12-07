<template>
  <div>
    <nuxt-link to="/admin/edit/1">EDIT PAGE 1</nuxt-link>
    <nuxt-link to="/admin/edit/2">EDIT PAGE 2</nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "~/util/Vue";

@Component({
  name: "Edit-List",
  middleware: ["auth"],
} as any)
export class EditList extends Vue {}

export default EditList;
</script>
