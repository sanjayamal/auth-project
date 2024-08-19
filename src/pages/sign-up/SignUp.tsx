import {
  Form,
  Input,
  Button,
  Card,
  Flex,
  theme,
  message,
  Row,
  Col,
  Steps,
} from "antd";
import { useEffect, useRef, useState } from "react";
import SignUpForm from "./components/SignUpForm";
import OTP from "./components/OTP";
import Secret from "./components/Secret";

const SignUp = () => {
  const [stepLayout, setStepLayout] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [current, setCurrent] = useState(0);

  const signUpFormRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setStepLayout("vertical");
      } else {
        setStepLayout("horizontal");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      title: "First",
      content: <SignUpForm ref={signUpFormRef} />,
    },
    {
      title: "Second",
      content: <OTP />,
    },
    {
      title: "Last",
      content: <Secret />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
    if (signUpFormRef?.current) {
      (signUpFormRef?.current as any).submit();
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Row
      style={{
        padding: "2rem",
        maxWidth: stepLayout == "horizontal" ? "60%" : "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
      }}
      gutter={[0, 24]}
    >
      <Col className="gutter-row" xs={0} sm={6} md={24}>
        <Steps current={current} items={items} direction={stepLayout} />
      </Col>
      <Col className="gutter-row" xs={24} sm={18} md={24}>
        <Card style={{ minHeight: "15rem" }}>{steps[current].content}</Card>
        <Row style={{ marginTop: "1rem" }}>
          <Col className="gutter-row" xs={24} sm={18} md={24}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignUp;
