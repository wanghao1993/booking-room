import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { registerApi, getVerifyCodeApi } from "./api/login";
export const Register: React.FC = () => {
  const [form] = Form.useForm();

  const [disabled, setStatus] = useState(true);
  type FieldType = {
    username?: string;
    password?: string;
    nickName?: string;
    email?: string;
    captcha?: string;
  };

  useEffect(() => {
    const email = form.getFieldValue("email");
    console.log(email, "email");
  }, [form]);

  const onFinish = (values: any) => {
    registerApi({
      ...values,
    }).then((res) => {
      if (res) {
        message.success("注册成功");
        window.location.replace("/login");
      }
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getCode = () => {
    getVerifyCodeApi(form.getFieldValue("email")).then((res) => {
      message.success("发送成功");
    });
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
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
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: "Please input your nickname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入合法的邮箱", type: "email" },
          ]}
        >
          <Input onChange={(e) => onInputChange(e)} />
        </Form.Item>
        <Form.Item<FieldType>
          label="验证码"
          name="captcha"
          rules={[{ required: true, message: "验证码!" }]}
        >
          <div>
            <Input style={{ width: "40%" }} />
            <Button onClick={() => getCode()} disabled={disabled}>
              获取验证码
            </Button>
          </div>
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
