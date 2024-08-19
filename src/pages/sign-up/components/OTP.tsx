import { Input, Typography } from "antd";

const { Title } = Typography;

const OTP = () => {
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
      <Input.OTP length={6} style={{ marginTop: "1rem" }} />
    </div>
  );
};

export default OTP;
