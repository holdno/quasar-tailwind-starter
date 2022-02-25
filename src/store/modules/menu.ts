// import { defineStore } from "pinia";
// import { User } from "@/types/user";
// import { LocationAsRelativeRaw } from "vue-router";

// export const MenuStoreKey = "menu";

// interface Menu {
//   title: string;
//   icon: string;
//   router: LocationAsRelativeRaw;
//   open: boolean;
//   children: Menu[];
// }

// export interface State {
//   menu?: Menu[];
// }

// export const useUserStore = defineStore(MenuStoreKey, {
//   state(): State {
//     return {
//       menu: [],
//     };
//   },
//   getters: {
//     getMenu(state: State) {
//       return state.menu;
//     },
//   },
//   actions: {
//     metch(currentRouterMatched) {
//       let menu = this.getMenu()
//     }
//   },
// });
