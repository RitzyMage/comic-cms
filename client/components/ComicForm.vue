<template>
  <div class="comicForm">
    <TextInput v-model="title" name="title" />

    <span>Image</span>
    <ImageInput v-model="image" />

    <TextInput large v-model="transcript" name="transcript" />

    <TextInput v-model="mouseover" name="mouseover text" />

    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import TextInput from "@/components/inputs/TextInput.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
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
  },
})
export default class ComicForm extends Vue {
  @Prop() private value!: ComicFormData;

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
}
</script>

<style scoped>
.comicForm {
  max-width: 550px;
  margin: 0 auto;
}
</style>
