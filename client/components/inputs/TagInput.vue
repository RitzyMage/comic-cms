<template>
  <multiselect
    v-model="selectedTags"
    class="comicTagInput"
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

<style lang="scss">
@import "~/assets/scss/colors.scss";
@import "~/assets/scss/grid.scss";

.comicTagInput,
.comicTagInput input {
  color: $font;
}

.comicTagInput input::placeholder {
  color: $font;
  opacity: 0.5;
}

.comicTagInput .multiselect__content-wrapper::-webkit-scrollbar-track {
  background: $darkBackground;
}
.comicTagInput .multiselect__content-wrapper::-webkit-scrollbar-thumb {
  background: $primary;
}

.comicTagInput .multiselect__tags,
.comicTagInput input,
.comicTagInput .multiselect__content-wrapper {
  border: none;
  background-color: $lightBackground;
}

.comicTagInput .multiselect__option--highlight {
  background-color: $secondary;
  color: $darkBackground;
  font-weight: bold;
}

.comicTagInput .multiselect__option--highlight::after {
  background-color: $secondaryDark;
  color: $font;
  font-weight: normal;
}
</style>
