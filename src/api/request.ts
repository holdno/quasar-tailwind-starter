import axios from "axios";
import router from "@/router/index.js";
import store from "@/store/pinia";

export const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  withCredentials: true,
});

// 请求过滤器
api.interceptors.request.use(
  (config) => {
    if (config.method === "post" && !config.transformRequest) {
      for (let key in config.data) {
        if (config.data[key] === "") {
          delete config.data[key];
        }
      }
    } else {
      if (typeof config.params == "object") {
        for (let key in config.params) {
          if (config.params[key] === "") {
            delete config.params[key];
          }
        }
      }
    }

    if (store.user.getCurrentUserToken) {
      // @ts-ignore
      config.headers["x-token"] = store.user.getCurrentUserToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应过滤器
api.interceptors.response.use(
  (res) => {
    switch (res.status) {
      case 200:
        switch (res.headers["content-type"]) {
          case "image/jpeg":
            return res.data;
          case "application/octet-stream":
            return res;
          default:
            return res.data;
        }
    }
  },
  (err) => {
    if (!err.response) {
      // router.push({ name: 'Login' })
    } else {
      const error = err.response.data.meta
        ? new Error(err.response.data.meta.message)
        : err;
      switch (err.response.status) {
        case 400:
          store.root.error(error);
          break;
        case 401:
          store.user.logout();
          router.push("/login");
          break;
        case 404:
          store.root.error(error);
          break;
        case 500:
          store.root.error(error);
          break;
        default:
        // console.log('unknow err')
      }
    }
    return Promise.reject(err);
  }
);

export interface Meta {
  message: string;
  code: number;
  requestID: string;
  requestURL: string;
}

export default api;
