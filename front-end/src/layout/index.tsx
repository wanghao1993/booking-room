import { Outlet } from "react-router-dom";
import { Suspense } from "react";

function Layout() {
  // react执行机制：只要路由地址发生改变，路由表就会重新执行（所以路由重定向/导航组件不能发在App根组件中，而要放在Layout组件中）
  // 这个侧边栏导航的数据需要动态生成
  // 权限： 1 基础版本 => 前端 => 内部页面和外部页面 =》 路由守卫 后端：内部接口和外部接口     官网
  //        2 进阶版本 =》 后台管理系统  =》 页面 =》 1 侧边栏导航 2 动态路由
  //        3 中级版本 =》 后台管理系统  =》 自己可以设置权限

  // 这个侧边栏导航的数据需要的动态生成 =》 根据用户登录的时候获取

  return (
    <div>
      <div className="layout">
        <Suspense fallback={<div>loading...</div>}>
          <Outlet></Outlet>
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;
