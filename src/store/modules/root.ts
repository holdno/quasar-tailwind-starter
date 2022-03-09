import { defineStore } from "pinia";
import { Notify } from "quasar";

export const RootStoreKey = "root";

export interface QNotify {
  msg: string;
  type?: string;
}

export interface State {
  q: Notify;
  drawerDisplay: boolean;
}

export const useRootStore = defineStore(RootStoreKey, {
  state(): State {
    return {
      q: Notify,
      drawerDisplay: false,
    };
  },
  getters: {
    $q(state: State): Notify {
      const q = state.q;
      if (q === undefined) {
        throw new Error("Quasar api instance not found");
      }
      return q;
    },
  },
  actions: {
    modifyDrawer(payload: boolean) {
      this.drawerDisplay = payload;
    },
    notify(payload: QNotify) {
      if (!payload.msg) return;
      this.$q.create({
        message: payload.msg,
        type: payload.type || "info",
        position: "top-right",
      });
    },
    error(payload: Error) {
      this.$q.create({
        message: payload.message,
        color: "red",
        icon: "announcement",
        position: "top-right",
      });
    },
  },
});
