<template>
  <div>
    <h1>Edit {{ index }}</h1>
    <div class="editForm">
      <TextInput v-model="title" name="title" />

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

      <TextInput large v-model="transcript" name="transcript" />

      <TextInput v-model="mouseover" name="mouseover text" />

      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "~/util/Vue";
//@ts-ignore
import PictureInput from "vue-picture-input";
import TextInput from "@/components/inputs/TextInput.vue";

@Component({
  name: "Edit-Comic",
  middleware: ["auth"],
  components: {
    PictureInput,
    TextInput,
  },
})
export class EditComic extends Vue {
  public $axios!: any;
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
      this.$axios.patch(`/comic/${this.index}`, data);
      this.$router.push("/admin");
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

<style scoped>
.editForm {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}
</style>
