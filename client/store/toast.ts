import { Module, VuexModule, Mutation } from "vuex-module-decorators";

interface Toast {
  message: string;
  error: boolean;
  id: number;
}

interface State {
  toasts: Toast[];
}

@Module({
  name: "toast",
  stateFactory: true,
  namespaced: true,
})
class Toast extends VuexModule {
  toasts: Toast[] = [];

  @Mutation
  addToast(toast: Toast) {
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
