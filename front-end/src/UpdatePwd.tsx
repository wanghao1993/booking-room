import React from "react";
import { Form, Input, message } from "antd";
import { loginApi } from "./api/login";
import { TOKEN_KEY } from "./constant";
const onFinish = (values: any) => {
  loginApi({
    username: values.username,
    password: values.password,
  }).then((res) => {
    localStorage.setItem(TOKEN_KEY, res.accessToken);
    window.location.replace("/home");
    message.success("登陆成功");
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const pageStyle: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const UpdatePwd: React.FC = () => (
  <div style={pageStyle}>
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      style={{ minWidth: 400 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  </div>
);
