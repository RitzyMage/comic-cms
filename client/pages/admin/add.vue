<template>
  <div>
    <h1>Add Comic</h1>
    <ComicForm v-model="data" :all-tags="tags" @submit="submit" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ComicForm, { ComicFormData } from "~/components/ComicForm.vue";

@Component({
  middleware: ["auth"],
  components: {
    ComicForm,
  },
  async asyncData({ $axios }) {
    return { tags: await $axios.$get("/tags") };
  },
})
export class AddComic extends Vue {
  private tags!: any;
  private data: ComicFormData = {
    title: "",
    transcript: "",
    mouseover: "",
    image: null,
    tags: [],
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
