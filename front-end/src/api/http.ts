import { message as Msg } from "antd";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { TOKEN_KEY } from "../constant";

export const service = axios.create({
  baseURL: "http://localhost:3100/",
  timeout: 3000,
});

service.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data;

    // 根据自定义错误码判断请求是否成功
    if (code >= 200 && code < 300) {
      // 将组件用的数据返回
      return data;
    } else {
      // 处理业务错误。
      Msg.error(message);
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
    }

    Msg.error(message);
    return Promise.reject(error);
  }
);

service.interceptors.request.use(function (config) {
  config.headers["authorization"] = localStorage.getItem(TOKEN_KEY);
  console.log(localStorage.getItem(TOKEN_KEY), config);
  return config;
});

export const dfhttp = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};
