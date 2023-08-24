import { message } from "antd";
import axios from "axios";

export const dfhttp = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 3000,
});

dfhttp.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.code >= 300 || response.data.code < 200) {
      message.error(response.data.data);
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

dfhttp.interceptors.request.use(function (config) {
  config.headers["Authorization"] = localStorage.getItem("token");
  return config;
});
