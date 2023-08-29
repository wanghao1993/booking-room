import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "../layout/index";
import { Register } from "../Register";
import { Login } from "../LoginPage";
import { UpdatePwd } from "../UpdatePwd";
import { HomePage } from "../views/home";
const list = [
  { path: "/home", element: <HomePage></HomePage> },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update-password",
    element: <UpdatePwd />,
  },
];

function RouterList() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Layout></Layout>}>
          {ListItem(list)}
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
