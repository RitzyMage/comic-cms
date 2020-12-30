<template>
  <div>
    <h1>Add Comic</h1>
    <div class="addForm">
      <TextInput v-model="title" name="title" />

      <span>Image</span>
      <input type="file" accept="image/*" @change="imageChange" id="file-input" />

      <TextInput large v-model="transcript" name="transcript" />

      <TextInput v-model="mouseover" name="mouseover text" />

      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "../../util/Vue";
import TextInput from "@/components/inputs/TextInput.vue";

@Component({
  middleware: ["auth"],
  components: {
    TextInput,
  },
})
export class AddComic extends Vue {
  private image: any;
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

  private async fileToDataURL(file: File) {
    let fileReader = new FileReader();
    let promise = new Promise(resolve => {
      fileReader.addEventListener("load", () => {
        resolve(fileReader.result);
      });
    });
    fileReader.readAsDataURL(file);
    return await promise;
  }

  private async imageChange({
    target: {
      files: [image],
    },
  }: any) {
    if (image) {
      this.image = await this.fileToDataURL(image);
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
