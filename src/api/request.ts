import axios from 'axios';

import { useRootStore } from '@/store/modules/root';
import { useUserStore } from '@/store/modules/user';

export const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  withCredentials: true,
});

async function handleResponse(code: number, error: string) {
  return new Promise((resolve, reject) => {
    console.log('code', code);
    const rootStore = useRootStore();
    switch (code) {
      case undefined:
        return;
      // 针对业务状态码匹配code值进行错误信息返回
      case 1010:
      case 405:
        rootStore.error(new Error('暂停服务，请稍后再试'));
        reject(new Error(error));
        break;
      case 1003:
      case 400:
        rootStore.error(new Error('请求参数错误：' + error));
        reject(new Error(error));
        break;
      case 1007:
      case 403:
        rootStore.error(new Error('终止操作，请开通对应权限后再试'));
        reject(new Error(error));
        break;
      case 1005:
      case 404:
        rootStore.error(new Error('数据不存在'));
        reject(new Error(error));
        break;
      case 1016:
      case 401:
        rootStore.redirectWithNotify(
          { name: 'index' },
          '登录状态失效，请重新登录后再试',
          'negative',
        );
        reject(new Error(error));
        break;
      case 1013:
      case 500:
        rootStore.error(new Error('服务异常，请联系系统管理员'));
        reject(new Error(error));
        break;
      case 0:
      case 200:
        resolve('ok');
        return;
      // 更多其他状态码逻辑
      default:
        rootStore.error(new Error('服务异常：' + error));
        reject(new Error(error));
    }
  });
}

// 请求过滤器
api.interceptors.request.use(
  (config) => {
    if (config.method === 'post' && !config.transformRequest) {
      for (const key in config.data) {
        if (config.data[key] === '') {
          delete config.data[key];
        }
      }
    } else {
      if (typeof config.params === 'object') {
        for (const key in config.params) {
          if (config.params[key] === '') {
            delete config.params[key];
          }
        }
      }
    }

    const userStore = useUserStore();
    if (userStore.getCurrentUserToken) {
      // @ts-ignore
      config.headers['mtrpc-mtrpc-jwt'] = userStore.getCurrentUserToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应过滤器
api.interceptors.response.use(
  async (res) => {
    switch (res.headers['content-type']) {
      case 'image/jpeg':
        return res.data;
      case 'application/octet-stream':
        return res;
      default:
        if (!res.data.meta) {
          Promise.reject(new Error('接口响应失败'));
          // TODO log res.data
          return;
        }

        await handleResponse(
          res.data.meta.code,
          res.data.meta.message || res.data.meta.error,
        );

        return res.data;
    }
  },
  async (err) => {
    if (!err.response) {
      // router.push({ name: 'Login' })
    } else {
      const error = err.response.data.meta
        ? new Error(err.response.data.meta.message)
        : err;
      try {
        await handleResponse(err.response.status, error);
      } catch (e) {
        return;
      }
    }
    return Promise.reject(err);
  },
);

export interface Meta {
  message: string;
  code: number;
  requestID: string;
  requestURL: string;
}

export default api;
