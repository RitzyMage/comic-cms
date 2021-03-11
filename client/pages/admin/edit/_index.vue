<template>
  <div>
    <h1>Edit {{ index }}</h1>
    <ComicForm v-model="data" :all-tags="tags" @submit="submit" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
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
    let { comic } = await $axios.$get(`/comic/${params.index}`);
    return {
      tags: await $axios.$get("/tags"),
      data: {
        title: comic.title,
        tags: comic.tags.map((tag: { name: string }) => tag.name),
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
  private data!: ComicFormData;

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

<style scoped lang="scss">
@import "~/assets/scss/grid.scss";

.editForm {
  display: flex;
  flex-direction: column;
  max-width: #{$gridUnit * 80};
  margin: 0 auto;
}
</style>
