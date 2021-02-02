<template>
  <div class="comicForm">
    <TextInput v-model="title" name="title" />

    <span>Image</span>
    <ImageInput v-model="image" />

    <TextInput large v-model="transcript" name="transcript" />

    <span>Tags</span>
    <multiselect
      v-model="selectedTags"
      :options="allTags"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      :multiple="true"
      :taggable="true"
      :close-on-select="false"
      @tag="addTag"
    ></multiselect>

    <TextInput v-model="mouseover" name="mouseover text" />

    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import TextInput from "@/components/inputs/TextInput.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import Multiselect from "vue-multiselect";
import { Vue, Component, Prop } from "@/util/Vue";

export interface ComicFormData {
  transcript: string;
  title: string;
  mouseover: string;
  image: any;
}

@Component({
  components: {
    TextInput,
    ImageInput,
    Multiselect,
  },
})
export default class ComicForm extends Vue {
  @Prop() private value!: ComicFormData;

  private allTags = ["tag1", "tag2", "tag3"];

  private selectedTags = [];

  private get image() {
    return this.value.image;
  }

  private set image(newImage: any) {
    this.$emit("input", { ...this.value, image: newImage });
  }

  private get transcript() {
    return this.value.transcript;
  }

  private set transcript(newTranscript: string) {
    this.$emit("input", { ...this.value, transcript: newTranscript });
  }

  private get title() {
    return this.value.title;
  }

  private set title(newTitle: string) {
    this.$emit("input", { ...this.value, title: newTitle });
  }

  private get mouseover() {
    return this.value.mouseover;
  }

  private set mouseover(newMouseover: string) {
    this.$emit("input", { ...this.value, mouseover: newMouseover });
  }

  private submit() {
    this.$emit("submit");
  }

  private addTag(tag: string) {
    this.allTags.push(tag);
    this.selectedTags.push(tag);
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.comicForm {
  max-width: 550px;
  margin: 0 auto;
}
</style>
