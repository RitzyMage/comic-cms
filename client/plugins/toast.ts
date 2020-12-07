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

const TOAST_LENGTH = 2000;
let id = 1;

function addToast(error: boolean, message: string) {
  toastStore.addToast({
    error,
    message,
    id,
  });
  let createdID = id;
  ++id;
  setTimeout(() => toastStore.removeToast(createdID), TOAST_LENGTH);
}

const ToastPlugin: Plugin = (context, inject) => {
  inject("NotifyToast", (message: string) => addToast(false, message));
  inject("ErrorToast", (message: string) => addToast(true, message));
};

export default ToastPlugin;
