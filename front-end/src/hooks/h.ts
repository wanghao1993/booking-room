import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constant";

export function useRouterReEa() {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const whiteListPath = ["/login", "/register", "/update-password"];

    if (location.pathname !== "/login") {
      //内部页面
      //判断用户是否登录
      if (!whiteListPath.includes(location.pathname)) {
        if (!localStorage.getItem(TOKEN_KEY)) {
          // 没有登录
          //去登录页面
          navigate("/login", { replace: true });
        } else {
          //登录了
          if (location.pathname === "/") {
            navigate("/home", { replace: true });
          }
        }
      }
    } else {
      if (localStorage.getItem(TOKEN_KEY)) {
        navigate("/home");
      }
    }
  }, [location.pathname, navigate]);
}
