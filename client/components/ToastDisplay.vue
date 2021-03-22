<template>
  <div class="toasts">
    <p v-for="toast in toasts" :key="toast.id" :class="`toast ${getClass(toast)}`">
      {{ toast.message }}
      <button class="close-toast" @click="() => closeToast(toast.id)"><XIcon /></button>
    </p>
  </div>
</template>

<script lang="ts">
import { toastStore } from "~/store";
import ToastInfo from "~/util/ToastInfo";
import { Vue, Component } from "vue-property-decorator";
import { XIcon } from "vue-feather-icons";

@Component({
  components: { XIcon },
})
export default class ToastDisplay extends Vue {
  get toasts() {
    return toastStore.toasts;
  }

  getClass(toast: ToastInfo) {
    return toast.error ? "toast--error" : "toast--success";
  }

  closeToast(id: number) {
    toastStore.removeToast(id);
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/grid.scss";
.toasts {
  position: absolute;
  bottom: #{$gridUnit * 2};
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.toast--error {
  background-color: #921212;
}

.toast--success {
  background-color: #128232;
}

.toast {
  width: #{$gridUnit * 25};
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 60%);
  border-radius: 4px;
  padding: #{$gridUnit * 1/2};
}
</style>
