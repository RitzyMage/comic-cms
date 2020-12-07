<template>
  <div class="toasts">
    <p v-for="toast in toasts" :key="toast.id" class="toast">
      {{ toast.message }}
    </p>
  </div>
</template>

<script lang="ts">
import { toastStore } from "~/store";
import { Vue, Component } from "~/util/Vue";

@Component
export default class ToastDisplay extends Vue {
  get toasts() {
    return toastStore.toasts;
  }
}
</script>

<style scoped>
.toasts {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.toast {
  background-color: #921212;
  width: 200px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 60%);
  border-radius: 4px;
}
</style>
