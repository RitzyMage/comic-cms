import { Vue as _Vue, Component, Prop, Watch } from "vue-property-decorator";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

class Vue extends _Vue {
  protected $auth!: {
    loggedIn: boolean;
    loginWith: (strategy: string, data: any) => Promise<void>;
    logout: () => Promise<void>;
  };

  public $axios!: NuxtAxiosInstance;
}

export { Vue, Component, Prop, Watch };
