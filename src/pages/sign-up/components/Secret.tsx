import { forwardRef, useImperativeHandle } from "react";
import { Form, Input, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const query = /* GraphQL */ `
  mutation AuthPasskeyRegisterCreate {
    authPasskeyRegisterCreateOptions
  }
`;

type SecretType = "password" | "passkey";

const Secret = forwardRef(({}, ref) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (secretType: SecretType) => {
    if (secretType === "passkey") {
      handleOnSubmit(query);
    } else {
      const values = form.getFieldsValue();
      form.submit();
      form
        .validateFields({ validateOnly: true })
        .then(() => {
          handleOnSubmit(query, values);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleOnSubmit = (query: string, value?: any) => {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query,
        ...(value && { value }),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        navigate("/");
        console.log("data returned:", data);
      });
  };
  useImperativeHandle(ref, () => ({
    submit: () => {
      onFinish("password");
    },
  }));

  return (
    <Form form={form} layout="vertical">
      <Form.Item>
        <Button type="primary" block ghost onClick={() => onFinish("passkey")}>
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
});

export default Secret;
