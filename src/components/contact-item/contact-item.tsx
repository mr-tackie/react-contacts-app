import React from "react";
import { Row, Col, Typography } from "antd";
import LetterAvatar from "../letter-avatar/letter-avatar";
import "./contact-item.css";
import { Contact } from "../../models/interfaces";
import SelectedContactContext from "../context/selected-contact.contexts";
const { Text } = Typography;

const ContactItem: React.FC<{
  contact: Contact;
}> = ({ contact, }) => {
  const { first_name, last_name, emails } = contact;
  return (
    <SelectedContactContext.Consumer>
      {context => (
        <div onClick={() => {context.setContact(contact)}}>
          <Row>
            <Col span={24} className={`contact-details-container`}>
              <div className="contact-details">
                <LetterAvatar name={first_name + " " + last_name}  color="#999999"/>
                <div className="contact-name">
                  <Text className="contact-name__name">
                    {first_name} {last_name}
                  </Text>
                  <Text className="contact-name__email">{emails[0].email}</Text>
                </div>
              </div>
            </Col>
          </Row>
          <div className="divider div-transparent"></div>
        </div>
      )}
    </SelectedContactContext.Consumer>
  );
};

export default ContactItem;
