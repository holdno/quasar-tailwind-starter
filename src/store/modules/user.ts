import { defineStore } from "pinia";
import { User } from "@/types/user";
import { GetUserInfo, GetUserRequest } from "@/api/user";

export const UserStoreKey = "user";

export interface State {
  user?: User;
}

export const useUserStore = defineStore(UserStoreKey, {
  state(): State {
    return {
      user: undefined,
    };
  },
  getters: {
    getUser(state: State) {
      return state.user;
    },
    getCurrentUserToken(state) {
      return state.user?.token;
    },
  },
  actions: {
    async login(payload: GetUserRequest) {
      try {
        const res = await GetUserInfo(payload);
        this.user = res;
      } catch (e) {
        console.log(e);
      }
    },
    async logout() {
      this.user = undefined;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["user"],
      },
    ],
  },
});
