import { dfhttp } from "./http";
import { LoginResModal } from "./data.modal";

export const loginApi = (data: { username: string; password: string }) => {
  return dfhttp.post<LoginResModal>("/user/login", {
    ...data,
  });
};
