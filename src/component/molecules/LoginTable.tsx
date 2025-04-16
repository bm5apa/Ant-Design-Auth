import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function LoginTable() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data.success) {
        message.success("登录成功！");
        // 如果用户选择了"记住我"，可以在这里存储token
        if (values.remember) {
          localStorage.setItem("token", response.data.token);
        }
        router.push("/dashboard"); // 登录成功后跳转到仪表板页面
      } else {
        message.error(response.data.message || "登录失败");
      }
    } catch (error) {
      message.error("登录失败，请检查网络连接或联系管理员");
      console.error("登录错误:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    message.error("请填写所有必填字段");
  };

  return (
    <div className="login-table__container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
