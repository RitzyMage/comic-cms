<template>
  <span :class="`chip ${classes}`" @click="onClick">
    {{ text }}
    <button class="chip-delete" v-if="deletable">
      <XIcon class="chip-icon" size="16" @click="() => $emit('delete')" />
    </button>
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { XIcon } from "vue-feather-icons";
@Component({
  components: {
    XIcon,
  },
})
export default class Chip extends Vue {
  @Prop(String) private text!: string;
  @Prop({ type: Boolean, default: false }) private deletable!: boolean;
  @Prop({ type: Boolean, default: false }) private clickable!: boolean;

  private onClick() {
    if (this.clickable) {
      this.$router.push(`/tag/${this.text}`);
    }
  }

  private get classes() {
    if (this.clickable) {
      return "chip--clickable";
    }
    return "chip--unclickable";
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/colors.scss";
@import "~/assets/scss/grid.scss";
.chip {
  background-color: $secondaryDark;
  color: white;
  padding: 0 #{$gridUnit * 1};
  margin: 0 #{$gridUnit / 2};
  border-radius: 2px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
}

.chip-delete {
  background: none;
  border: none;
  color: white;
  display: flex;
  padding: 0;
  margin-left: #{$gridUnit * 1};
}

.chip--clickable {
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .chip--clickable {
    line-height: 3rem;
    font-size: 0.8em;
  }
}

@media screen and (max-height: 600px) {
  .chip--clickable {
    line-height: 4rem;
    font-size: 0.8em;
  }
}
</style>
