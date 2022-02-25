import { useUserStore } from "./modules/user";
import { useRootStore } from "./modules/root";

export default {
  user: useUserStore(),
  root: useRootStore(),
};
