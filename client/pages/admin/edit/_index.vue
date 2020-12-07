<template>
  <div>
    <h1>Edit {{ index }}</h1>
    <div class="editForm">
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
import { Vue, Component } from "~/util/Vue";
import PictureInput from "vue-picture-input";

@Component({
  name: "Edit-Comic",
  middleware: ["auth"],
  components: {
    PictureInput,
  },
} as any)
export class EditComic extends Vue {
  get index() {
    return this.$route.params.index;
  }

  private image: any;
  private submit() {
    try {
      let data = {
        title: this.title,
        transcript: this.transcript,
        mouseover: this.mouseover,
        image: this.image,
      };
      console.log("edit data");
      //this.$axios.post("/comic", data);
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

export default EditComic;
</script>
