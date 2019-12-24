import React from "react";
import { Row, Col, Typography } from "antd";
import LetterAvatar from "../letter-avatar/letter-avatar";
import './contact-item.css'
const { Text } = Typography;

const ContactItem: React.FC<{
  name: string;
  email: string;
}> = ({ name, email }) => {
  return (
    <div>
      <Row>
        <Col span={24} className="contact-details-container">
          <div className="contact-details">
            <LetterAvatar name="John Doe"/>
            <div className="contact-name">
              <Text className="contact-name__name">
                {name}
              </Text>
              <Text className="contact-name__email">{email}</Text>
            </div>
          </div>
        </Col>
      </Row>
      <div className="divider div-transparent"></div>
    </div>
  );
};

export default ContactItem;
