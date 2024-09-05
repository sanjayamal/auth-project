import { useState } from "react";
import { Input, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;

interface IOTP {
  handleNavigation: (stepId: number) => void;
}

const query = /* GraphQL */ `
  mutation AuthVerifySignup($token: String!) {
    authVerifySignup(token: $token) {
      accessToken
    }
  }
`;

const OTP = ({ handleNavigation }: IOTP) => {
  const [otp, setOtp] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const { stepId } = useParams();

  const currentStep = Number(stepId) - 1;

  const maxAttempts = 3;
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      handleSubmitOtp(value);
    }
  };

  const handleSubmitOtp = async (enteredOtp: string) => {
    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          query,
          variables: { token: enteredOtp },
        }),
      });

      if (response.ok) {
        message.success("OTP verified successfully!");
        const res = await response.json();
        localStorage.setItem("tem_token", res.accessToken);
        handleNavigation(currentStep);
      } else {
        setAttempts(attempts + 1);

        if (attempts + 1 >= maxAttempts) {
          message.error("Maximum attempts reached.");
          navigate(-1);
        } else {
          setError("Incorrect OTP. Please try again.");
          setOtp("");
        }
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Title level={3}>Enter OTP</Title>
      <Input.OTP
        status={error && "error"}
        length={6}
        style={{ marginTop: "1rem" }}
        value={otp}
        onChange={(value) => handleChange(value)}
        onFocus={(e) => {
          setError("");
        }}
      />
      {error && <Text type="danger">{error}</Text>}
    </div>
  );
};

export default OTP;
