<template>
  <div class="toasts">
    <p v-for="toast in toasts" :key="toast.id" :class="`toast ${getClass(toast)}`">
      {{ toast.message }}
    </p>
  </div>
</template>

<script lang="ts">
import { toastStore } from "~/store";
import ToastInfo from "~/util/ToastInfo";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ToastDisplay extends Vue {
  get toasts() {
    return toastStore.toasts;
  }

  getClass(toast: ToastInfo) {
    return toast.error ? "toast--error" : "toast--success";
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

.toast--error {
  background-color: #921212;
}

.toast--success {
  background-color: #128232;
}

.toast {
  width: 200px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 60%);
  border-radius: 4px;
}
</style>
