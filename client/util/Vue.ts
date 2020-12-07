import { Vue as _Vue, Component, Prop } from "vue-property-decorator";

class Vue extends _Vue {
  public $auth!: {
    loggedIn: boolean;
    loginWith: (strategy: string, data: any) => Promise<void>;
  };
}

export { Vue, Component, Prop };
