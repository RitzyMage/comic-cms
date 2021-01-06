<template>
  <div>
    <h1>Add Comic</h1>
    <div class="addForm">
      <TextInput v-model="title" name="title" />

      <span>Image</span>
      <ImageInput v-model="image" />

      <TextInput large v-model="transcript" name="transcript" />

      <TextInput v-model="mouseover" name="mouseover text" />

      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "../../util/Vue";
import TextInput from "@/components/inputs/TextInput.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";

@Component({
  middleware: ["auth"],
  components: {
    TextInput,
    ImageInput,
  },
})
export class AddComic extends Vue {
  private image: any = null;
  private async submit() {
    try {
      let data = {
        title: this.title,
        transcript: this.transcript,
        mouseover: this.mouseover,
        image: this.image,
      };
      await this.$axios.post("/comic", data);
      this.$router.push("/admin");
    } catch (e) {
      console.error(e);
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
  max-width: 550px;
  margin: 0 auto;
}
</style>
