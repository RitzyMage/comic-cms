<template>
  <div>
    <h1>Edit {{ index }}</h1>
    <ComicForm v-model="data" @submit="submit" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "~/util/Vue";
import TextInput from "@/components/inputs/TextInput.vue";
import ComicForm, { ComicFormData } from "~/components/ComicForm.vue";

@Component({
  name: "Edit-Comic",
  middleware: ["auth"],
  components: {
    TextInput,
  },
})
export class EditComic extends Vue {
  public $axios!: any;
  private data: ComicFormData = {
    title: "",
    mouseover: "",
    transcript: "",
    image: null,
  };

  get index() {
    return this.$route.params.index;
  }

  private image: any;
  private submit() {
    try {
      this.$axios.patch(`/comic/${this.index}`, this.data);
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
