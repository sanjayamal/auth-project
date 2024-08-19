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
import { useNavigate, useParams } from "react-router-dom";

const SignUp = () => {
  const [stepLayout, setStepLayout] = useState<"horizontal" | "vertical">(
    "horizontal"
  );

  let { stepId } = useParams();
  const signUpFormRef = useRef(null);
  const navigate = useNavigate();

  const currentStep = Number(stepId) - 1;

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
    navigate(`/sign-up/step/${currentStep + 2}`);
    if (signUpFormRef?.current) {
      (signUpFormRef?.current as any).submit();
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const getContent = (stepId: number) => {
    return steps[stepId].content;
  };

  return (
    <Row
      style={{
        padding: "2rem",
        maxWidth: stepLayout == "horizontal" ? "48%" : "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
      }}
      gutter={[0, 24]}
    >
      <Col className="gutter-row" xs={0} sm={6} md={24}>
        <Steps current={currentStep} items={items} direction={stepLayout} />
      </Col>
      <Col className="gutter-row" xs={24} sm={18} md={24}>
        <Card style={{ minHeight: "15rem" }}>{getContent(currentStep)}</Card>
        <Row style={{ marginTop: "1rem" }}>
          <Col className="gutter-row" xs={6}>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => next()} block>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
                block
              >
                Done
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignUp;
