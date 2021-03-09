import { Vue as _Vue, Component, Prop, Watch } from "vue-property-decorator";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

class Vue extends _Vue {
  public $axios!: NuxtAxiosInstance;
}

export { Vue, Component, Prop, Watch };
