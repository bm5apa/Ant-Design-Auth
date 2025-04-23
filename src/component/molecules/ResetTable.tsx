"use client";

import React, { useState } from "react";
import { Button, Form, FormProps, Input, Spin, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FieldType {
  username: string;
  newPassword: string;
  resetCode: string;
}

export default function ResetTable() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      console.log("Attempting Password Reset with:", values);
      const response = await axios.post("/api/reset", {
        username: values.username,
        newPassword: values.newPassword,
        resetCode: values.resetCode,
      });
      console.log("Reset response:", response.data);
      if (response.data.success) {
        message.success("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        message.error(response.data.message || "Password reset failed.");
      }
    } catch (error: any) {
      console.error("Reset error details:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Password reset failed. Please check your inputs.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateInput = (field: string) => (_: any, value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: "Required!" }));
      return Promise.reject(new Error("Required!"));
    }
    if (field === "newPassword") {
      const alphabetCount = (value.match(/[a-zA-Z]/g) || []).length;
      const numberCount = (value.match(/[0-9]/g) || []).length;
      if (alphabetCount < 4 || numberCount < 4) {
        const errorMsg = "Must contain at least 4 letters and 4 numbers!";
        setErrors((prev) => ({ ...prev, [field]: errorMsg }));
        return Promise.reject(new Error(errorMsg));
      }
    }
    if (field === "resetCode" && value.length !== 6) {
      const errorMsg = "Reset code must be 6 characters!";
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
      return Promise.reject(new Error(errorMsg));
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    return Promise.resolve();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation failed:", errorInfo);
    message.warning("Please fill in all required fields correctly.");
  };

  return (
    <div className="reset-table__container">
      <Spin spinning={loading} tip="Resetting Password...">
        <Form
          name="reset-password"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            validateStatus={errors.username ? "warning" : undefined}
            help={errors.username}
            rules={[
              { required: true, message: "Please input your username!" },
              { validator: validateInput("username") },
            ]}
          >
            <Input placeholder="e.g., user1234" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Reset Code"
            name="resetCode"
            validateStatus={errors.resetCode ? "warning" : undefined}
            help={errors.resetCode}
            rules={[
              { required: true, message: "Please input your reset code!" },
              { validator: validateInput("resetCode") },
            ]}
          >
            <Input placeholder="e.g., ABC123" />
          </Form.Item>
          <Form.Item<FieldType>
            label="New Password"
            name="newPassword"
            validateStatus={errors.newPassword ? "warning" : undefined}
            help={errors.newPassword}
            rules={[
              { required: true, message: "Please input your new password!" },
              { validator: validateInput("newPassword") },
            ]}
          >
            <Input.Password placeholder="e.g., abcd1234" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}
