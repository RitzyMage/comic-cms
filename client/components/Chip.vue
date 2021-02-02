<template>
  <span class="chip">
    {{ text }}
    <button class="chip-delete" v-if="deletable">
      <XIcon class="chip-delete-icon" size="16" @click="() => $emit('delete')" />
    </button>
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "@/util/Vue";
import { XIcon } from "vue-feather-icons";
@Component({
  components: {
    XIcon,
  },
})
export default class Chip extends Vue {
  @Prop(String) private text!: string;
  @Prop({ type: Boolean, default: false }) private deletable!: boolean;
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/colors.scss";

.chip {
  background-color: $secondaryDark;
  color: white;
  padding: 0 8px;
  margin: 0 4px;
  border-radius: 2px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.chip-delete {
  background: none;
  border: none;
  color: white;
  display: flex;
  padding: 0;
  margin-left: 8px;
}
</style>
