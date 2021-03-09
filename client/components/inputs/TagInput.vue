<template>
  <multiselect
    v-model="selectedTags"
    :options="tags"
    tag-placeholder="Add this as new tag"
    placeholder="Search or add a tag"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
    @tag="addTag"
  >
    <template v-slot:tag="slotProps">
      <Chip :text="slotProps.option" @delete="() => slotProps.remove(slotProps.option)" deletable />
    </template>
  </multiselect>
</template>

<script lang="ts">
import Multiselect from "vue-multiselect";
import { Vue, Component, Prop } from "vue-property-decorator";
import Chip from "@/components/Chip.vue";

@Component({
  components: {
    Multiselect,
    Chip,
  },
})
export default class TagInput extends Vue {
  @Prop(Array) private value!: string[];
  @Prop(Array) private tags!: string[];

  private get selectedTags() {
    return this.value;
  }

  private set selectedTags(value) {
    this.$emit("input", value);
  }

  private addTag(tag: string) {
    this.$emit("addTag", tag);
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
