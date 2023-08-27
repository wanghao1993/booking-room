import { dfhttp } from "./http";
import { LoginResModal } from "./data.modal";

export const loginApi = (data: { username: string; password: string }) => {
  return dfhttp.post<LoginResModal>("/user/login", {
    ...data,
  });
};

export const registerApi = (data: { username: string; password: string }) => {
  return dfhttp.post<LoginResModal>("/user/register", {
    ...data,
  });
};

export const getVerifyCodeApi = (address: string) => {
  return dfhttp.get<LoginResModal>(`/user/register_captcha?address=${address}`);
};
