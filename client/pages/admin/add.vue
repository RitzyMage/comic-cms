<template>
  <div>
    <h1>Add Comic</h1>
    <button @click="add">ADD</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Add-Comic",
  middleware: ["auth"]
} as any)
export class AddComic extends Vue {
  public $axios!: any;
  private add() {
    this.$axios.post("/comic");
  }
}

export default AddComic;
</script>
