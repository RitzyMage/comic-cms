import { Store } from "vuex";
import { Module, VuexModule, Mutation } from "vuex-module-decorators";

interface ToastInfo {
  message: string;
  error: boolean;
  id: number;
}

@Module({
  name: "toast",
  stateFactory: true,
  namespaced: true,
})
export default class Toast extends VuexModule {
  toasts: ToastInfo[] = [];

  @Mutation
  addToast(toast: ToastInfo) {
    this.toasts.push(toast);
  }

  @Mutation
  removeToast(id: number) {
    let indexToRemove = this.toasts.findIndex(value => value.id === id);
    if (indexToRemove >= 0) {
      this.toasts.splice(indexToRemove, 1);
    }
  }
}
