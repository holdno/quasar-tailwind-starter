import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { LocationAsRelativeRaw, useRoute, useRouter } from 'vue-router';

import { MsgQueue, MsgQueueData } from '@/utils/queue';

export const RootStoreKey = 'root';

export interface QNotify {
  msg: string;
  type?: string;
}

export interface State {
  q: Notify;
  drawerDisplay: boolean;
  fromURL: string;
  redirectMsgQueue: MsgQueue;
}

export const useRootStore = defineStore(RootStoreKey, {
  state(): State {
    return {
      q: Notify,
      drawerDisplay: false,
      fromURL: '',
      redirectMsgQueue: new MsgQueue((data: MsgQueueData | boolean) => {
        if (!data) {
          return;
        }
        const d = data as MsgQueueData;
        useRootStore().notify({
          msg: d.msg,
          type: d.type,
        });

        return undefined;
      }, 10),
    };
  },
  getters: {
    $q(state: State): Notify {
      const q = state.q;
      if (q === undefined) {
        throw new Error('Quasar api instance not found');
      }
      return q;
    },
  },
  actions: {
    redirectWithNotify(
      path: LocationAsRelativeRaw,
      msg: string,
      type: string = 'warning',
    ) {
      const route = useRoute();
      if (route.name === path.name) {
        return;
      }
      const router = useRouter();
      this.addRedirectNotify(path, msg, type);
      router.push(path);
    },
    addRedirectNotify(
      path: LocationAsRelativeRaw,
      msg: string,
      type: string = 'warning',
    ) {
      this.redirectMsgQueue.join(path.name?.toString(), msg, type);
    },
    modifyDrawer(payload: boolean) {
      this.drawerDisplay = payload;
    },
    notify(payload: QNotify) {
      if (!payload.msg) return;
      this.$q.create({
        message: payload.msg,
        type: payload.type || 'info',
        position: 'top-right',
      });
    },
    error(payload: Error) {
      this.$q.create({
        message: payload.message,
        color: 'red',
        icon: 'announcement',
        position: 'top-right',
      });
    },
  },
});
