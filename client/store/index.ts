import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Toast from "~/store/toast";

let toastStore: Toast;

function initialiseStores(store: Store<any>): void {
  toastStore = getModule(Toast, store);
}

const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];
export { initialiseStores, toastStore };
