import { dfhttp } from "./http";
import { LoginResModal } from "./data.modal";

export const getUserList = (data: { username: string; password: string }) => {
  return dfhttp.post<LoginResModal>("/user/list", {
    ...data,
  });
};
