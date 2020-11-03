<template>
  <div>
    <h1>ADMIN</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Admin",
  middleware: ["auth"]
} as any)
export class Admin extends Vue {}

export default Admin;
</script>
