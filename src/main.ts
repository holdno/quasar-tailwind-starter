// FILE: main.js

import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import quasarLang from "quasar/lang/zh-CN";
import quasarIconSet from "quasar/icon-set/svg-material-icons";
import { useRootStore } from "@/store/modules/root";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import "@/index.css";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import router from "@/router";

const store = createPinia();
store.use(piniaPluginPersist);

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
  lang: quasarLang,
  iconSet: quasarIconSet,
});
myApp.use(store);
myApp.use(router);

myApp.mount("#app");
