import { Plugin } from "@nuxt/types";
import { toastStore } from "~/store";

interface Injected {
  $NotifyToast(message: string): void;
  $ErrorToast(message: string): void;
}

declare module "vue/types/vue" {
  interface Vue extends Injected {}
}

declare module "@nuxt/types" {
  interface NuxtAppOptions extends Injected {}
  interface Context extends Injected {}
}

declare module "vuex/types/index" {
  interface Store<S> extends Injected {}
}

function addToast(error: boolean, message: string) {
  toastStore.addToast({
    error,
    message,
    id: 1,
  });
}

const ToastPlugin: Plugin = (context, inject) => {
  inject("NotifyToast", (message: string) => console.log(context, message));
  inject("ErrorToast", (message: string) => addToast(true, message));
};

export default ToastPlugin;
