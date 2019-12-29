import React from "react";
import "./landing-page.css";
import { Card, Typography, Button } from "antd";
import { useAuth0 } from "./../../react-auth0-spa";

const { Paragraph, Title } = Typography;

const LandingPage = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <div className="hero-main">
        <Card className="hero-content-card">
      <Title className="hero-title">Happy Contacts</Title>
      <Paragraph type="secondary" className="subtitle">
        Manage all your contacts from one place, anywhere you are regardless of
        your device
      </Paragraph>
      <Button type="primary" size="large" onClick={loginWithRedirect}>
        Login
      </Button>
      <Button className="signup-button" size="large"  onClick={loginWithRedirect}>
          Sign up
      </Button>
      </Card>
    </div>
  );
};

export default LandingPage;
