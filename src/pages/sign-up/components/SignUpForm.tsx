import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input, Button, Card } from "antd";

const SignUpForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log("Received values of form: ", values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      onFinish();
    },
  }));

  return (
    <Form
      name="signup"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});

export default SignUpForm;
