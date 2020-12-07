import { Plugin } from "@nuxt/types";

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

const ToastPlugin: Plugin = (context, inject) => {
  inject("NotifyToast", (message: string) => console.log(message));
  inject("ErrorToast", (message: string) => console.error(message));
};

/*$nuxt.$store.dispatch("toast/addToast", {
      error: false,
      message,
    });*/

/*$nuxt.$store.dispatch("toast/addToast", {
      error: false,
      message,
    });*/

export default ToastPlugin;
