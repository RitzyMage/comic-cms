<template>
  <div>
    <h1>Edit {{ index }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Edit-Comic",
  middleware: ["auth"]
} as any)
export class EditComic extends Vue {
  get index() {
    return this.$route.params.index;
  }
}

export default EditComic;
</script>
