<template>
  <div>
    <h1>Add Comic</h1>
    <ComicForm v-model="data" @submit="submit" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/util/Vue";
import ComicForm, { ComicFormData } from "~/components/ComicForm.vue";

@Component({
  middleware: ["auth"],
  components: {
    ComicForm,
  },
})
export class AddComic extends Vue {
  private data: ComicFormData = {
    title: "",
    transcript: "",
    mouseover: "",
    image: null,
  };

  private async submit() {
    try {
      await this.$axios.post("/comic", this.data);
      this.$router.push("/admin");
    } catch (e) {
      console.error(e);
    }
  }
}

export default AddComic;
</script>
