import { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import { useParams } from "react-router-dom";

interface ISignUpForm {
  handleNavigation: (stepId: number) => void;
}

const query = /* GraphQL */ `
  mutation AuthSignup($user: SignupInput!) {
    authSignup(user: $user)
  }
`;

const SignUpForm = forwardRef(({ handleNavigation }: ISignUpForm, ref) => {
  const [form] = Form.useForm();
  const { stepId } = useParams();

  const currentStep = Number(stepId) - 1;

  const onFinish = () => {
    const values = form.getFieldsValue();

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query,
        variables: {
          user: values,
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        handleNavigation(currentStep);
        console.log("data returned:", data);
      });
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.submit();
      form
        .validateFields({ validateOnly: true })
        .then(() => {
          onFinish();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }));

  return (
    <Form name="signUp" form={form} layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your name" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});

export default SignUpForm;
