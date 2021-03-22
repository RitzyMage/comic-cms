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
    let result = await this.$axios.post("/comic", this.data);
    if (result) {
      this.$router.push("/admin");
    }
  }
}

export default AddComic;
</script>
