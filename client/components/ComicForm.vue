<template>
  <div class="comicForm">
    <TextInput v-model="title" name="title" :required="required" />

    <span>
      <span v-if="required" class="requiredStar">*</span>
      Image
    </span>
    <ImageInput v-model="image" />

    <TextInput large v-model="transcript" name="transcript" :required="required" />

    <span>Tags</span>
    <TagInput v-model="selectedTags" :tags="allTags" @addTag="addTag" />

    <TextInput v-model="mouseover" name="mouseover text" />

    <Button @click="submit">Submit</Button>
  </div>
</template>

<script lang="ts">
import TextInput from "@/components/inputs/TextInput.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import TagInput from "@/components/inputs/TagInput.vue";
import Button from "@/components/inputs/Button.vue";
import { Vue, Component, Prop } from "vue-property-decorator";

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
    Button,
  },
})
export default class ComicForm extends Vue {
  @Prop() private value!: ComicFormData;
  @Prop() private allTags!: any;
  @Prop({ type: Boolean, default: false }) private required!: boolean;

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
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/grid.scss";
.comicForm {
  max-width: #{$gridUnit * 80};
  margin: 0 auto;
}

.requiredStar {
  color: red;
}
</style>
