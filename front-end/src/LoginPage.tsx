import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { loginApi } from "./api/login";
import { TOKEN_KEY } from "./constant";
import { Link } from "react-router-dom";
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

export const Login: React.FC = () => (
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

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        {...{
          labelCol: { span: 0 },
          wrapperCol: { span: 24, offset: 4 },
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={{ pathname: "/register" }}>创建账号</Link>

          <Link to={{ pathname: "/update-password" }}>
            <Button size="small" type="link" danger>
              忘记密码
            </Button>
          </Link>
        </div>
      </Form.Item>
      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 4, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          登录
        </Button>
      </Form.Item>
    </Form>
  </div>
);
