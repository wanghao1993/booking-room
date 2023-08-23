import { dfhttp } from "./http";

export const loginApi = (data: { username: string; password: string }) => {
  return dfhttp.post("/user/login", {
    ...data,
  });
};
