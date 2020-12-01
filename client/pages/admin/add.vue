<template>
  <div>
    <h1>Add Comic</h1>
    <div class="addForm">
      <span>Title</span>
      <input v-model="title" type="text" />

      <span>Image</span>
      <picture-input
        width="600"
        height="600"
        margin="16"
        accept="image/jpeg,image/png"
        size="10"
        button-class="btn"
        @change="imageChange"
      ></picture-input>

      <span>Transcript</span>
      <textarea v-model="transcript" />

      <span>Mouseover Text</span>
      <input v-model="mouseover" type="text" />

      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PictureInput from "vue-picture-input";

@Component({
  name: "Add-Comic",
  middleware: ["auth"],
  components: {
    PictureInput,
  },
} as any)
export class AddComic extends Vue {
  public $axios!: any;
  private image: any;
  private submit() {
    try {
      let data = {
        title: this.title,
        transcript: this.transcript,
        mouseover: this.mouseover,
        image: this.image,
      };
      this.$axios.post("/comic", data);
    } catch (e) {
      console.error(e);
    }
  }

  private imageChange(image: any) {
    if (image) {
      this.image = image;
    }
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
