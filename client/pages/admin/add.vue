<template>
  <div>
    <h1>Add Comic</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Add Comic",
  middleware: ["auth"]
} as any)
export class AddComic extends Vue {}

export default AddComic;
</script>
