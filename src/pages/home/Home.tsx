import { Button, Flex, Typography } from "antd";
import video1 from "../../assets/videos/video-1.mp4";
import { useNavigate } from "react-router-dom";
import "./home.css";

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterNavigation = () => {
    navigate("/sign-up/step/1");
  };
  return (
    <div className="hero-container">
      <Flex gap="middle" align="start" className="button-row">
        <Button type="default">Sign In</Button>
        <Button type="primary" onClick={handleRegisterNavigation}>
          Register
        </Button>
      </Flex>
      <div className="title-container">
        <Title level={1} className="title">
          CONNECT TO THE DIGITAL WORLD
        </Title>
        <Paragraph className="description">
          Experience the next generation of digital connectivity with our
          innovative solutions. Our platform offers seamless integration,
          advanced features, and unparalleled performance to keep you connected
          in a rapidly evolving digital landscape. Join us today to be at the
          forefront of technological advancement.
        </Paragraph>
      </div>
      <video src={video1} autoPlay loop muted />
    </div>
  );
};

export default Home;
