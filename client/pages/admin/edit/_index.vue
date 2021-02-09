<template>
  <div>
    <h1>Edit {{ index }}</h1>
    <ComicForm v-model="data" :all-tags="tags" @submit="submit" />
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
    ComicForm,
  },

  async asyncData({ $axios, params }) {
    let { comic } = await $axios.$get(`/${params.index}`);
    return {
      tags: await $axios.$get("/tags"),
      data: {
        title: comic.title,
        tags: comic.tags,
        mouseover: comic.mouseover,
        transcript: comic.transcript,
      },
    };
  },
})
export class EditComic extends Vue {
  public $axios!: any;
  private tags!: any;
  private comic!: any;
  private data: ComicFormData = {
    title: "",
    mouseover: "",
    transcript: "",
    image: null,
    tags: [],
  };

  get index() {
    return this.$route.params.index;
  }

  private mounted() {
    console.log(this.comic);
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
