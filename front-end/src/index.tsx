import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
} from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./LoginPage";
import { UpdatePwd } from "./UpdatePwd";
import { ErrorPage } from "./ErrorPage";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const routes = [
  {
    path: "/",
    element: <div>index</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update-password",
    element: <UpdatePwd />,
  },
];
const router = createBrowserRouter(routes);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
