import { Form, Input, Button, Divider } from "antd";

const Secret = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="signup"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item>
        <Button type="primary" block ghost>
          Create a Passkey
        </Button>
      </Form.Item>
      <Divider plain>or</Divider>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: "Please input your password again!" },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default Secret;
