import { LocationAsRelativeRaw } from "vue-router";

export interface Menu {
  title: string;
  icon: string;
  router?: LocationAsRelativeRaw;
  open?: boolean;
  children?: Menu[];
}
