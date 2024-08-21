import { Button, Card, Row, Col, Steps } from "antd";
import { useEffect, useRef, useState } from "react";
import { Secret, OTP, SignUpForm } from "./components";
import { useNavigate, useParams } from "react-router-dom";

type Direction = "horizontal" | "vertical";

const SignUp = () => {
  const [stepLayout, setStepLayout] = useState<Direction>("horizontal");

  const { stepId } = useParams();
  const signUpFormRef = useRef(null);
  const secretFormRef = useRef(null);
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

  const handleNextStepNavigation = (stepId: number) => {
    navigate(`sign-up/step/${stepId + 2}`);
  };

  const steps = [
    {
      title: "First",
      content: (
        <SignUpForm
          ref={signUpFormRef}
          handleNavigation={handleNextStepNavigation}
        />
      ),
    },
    {
      title: "Second",
      content: <OTP handleNavigation={handleNextStepNavigation} />,
    },
    {
      title: "Last",
      content: <Secret ref={secretFormRef} />,
    },
  ];

  const handleOnNext = async () => {
    if (signUpFormRef?.current && currentStep === 0) {
      (signUpFormRef?.current as any).submit();
    }

    if (secretFormRef?.current && currentStep === 2) {
      (secretFormRef?.current as any).submit();
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const getContent = (stepId: number) => {
    return steps[stepId]?.content;
  };

  return (
    <Row
      style={{
        padding: "2rem",
        maxWidth: stepLayout == "horizontal" ? "35%" : "90%",
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
        {currentStep != 1 && (
          <Row style={{ marginTop: "1rem" }}>
            <Col className="gutter-row" xs={6}>
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={() => handleOnNext()} block>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" onClick={() => handleOnNext()} block>
                  Done
                </Button>
              )}
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default SignUp;
