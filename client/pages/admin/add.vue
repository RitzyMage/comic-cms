<template>
  <div>
    <h1>Add Comic</h1>
    <div class="addForm">
      <span>Title</span>
      <input v-model="title" type="text" />

      <span>Image</span>
      <input type="file" accept="image/x-png,image/gif,image/jpeg" />

      <span>Transcript</span>
      <textarea v-model="transcript" />

      <span>Mouseover Text</span>
      <input v-model="mouseover" type="text" />

      <button @click="add">ADD</button>
    </div>
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
  private transcript = "";
  private title = "";
  private mouseover = "";
}

export default AddComic;
</script>

<style scoped>
.addForm {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}
</style>
