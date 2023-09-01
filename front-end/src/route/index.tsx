import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Layouts from "../layout/index";
import { Register } from "../Register";
import { Login } from "../LoginPage";
import { UpdatePwd } from "../UpdatePwd";
import { HomePage } from "../views/home";
import { UserList } from "../views/userList";
export const routerList = [
  { path: "/home", element: <HomePage></HomePage> },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "user-list",
    element: <UserList />,
  },
];

function RouterList() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/update-password"
          element={<UpdatePwd></UpdatePwd>}
        ></Route>
        <Route path="/" element={<Layouts></Layouts>}>
          {ListItem(routerList)}
        </Route>
      </Routes>
    </Suspense> // 把这里注释掉，放到包裹到具体的组件上
  );
}

function ListItem(list: any[]) {
  if (list.length > 0) {
    return list.map((item: any, index: any) => (
      <Route key={index} path={item.path} element={item.element}></Route>
    ));
  }
}

export default RouterList;
