<template>
  <div class="comicForm">
    <TextInput v-model="title" name="title" />

    <span>Image</span>
    <ImageInput v-model="image" />

    <TextInput large v-model="transcript" name="transcript" />

    <span>Tags</span>
    <TagInput v-model="selectedTags" :tags="allTags" @addTag="addTag" />

    <TextInput v-model="mouseover" name="mouseover text" />

    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import TextInput from "@/components/inputs/TextInput.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import TagInput from "@/components/inputs/TagInput.vue";
import { Vue, Component, Prop } from "@/util/Vue";

export interface ComicFormData {
  transcript: string;
  title: string;
  mouseover: string;
  image: any;
  tags: string[];
}

@Component({
  components: {
    TextInput,
    ImageInput,
    TagInput,
  },
})
export default class ComicForm extends Vue {
  @Prop() private value!: ComicFormData;
  @Prop() private allTags!: any;

  private get selectedTags() {
    return this.value.tags;
  }

  private set selectedTags(tags) {
    this.$emit("input", { ...this.value, tags: tags });
  }

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
    this.selectedTags = [...this.selectedTags, tag];
    console.log(this.selectedTags);
  }
}
</script>

<style scoped>
.comicForm {
  max-width: 550px;
  margin: 0 auto;
}
</style>
