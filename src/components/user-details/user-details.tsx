import React from "react";
import { Row, Col, Typography } from "antd";
import LetterAvatar from "../letter-avatar/letter-avatar";
import IconButton from "../icon-button/icon-button";
const { Title, Text } = Typography;

class UserDetails extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24} className="user-details-container">
          <div className="user-details">
            <LetterAvatar name="John Doe" size="large" />
            <div className="header-name">
              <Title className="header-name__name" level={3}>
                John Doe
              </Title>
              <Text className="header-name__email">johndoe@gmail.com</Text>
            </div>
          </div>
          <IconButton icon="logout" color="#2196F3" />
        </Col>
      </Row>
    );
  }
}

export default UserDetails;
