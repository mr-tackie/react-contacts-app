import React from "react";
import { Card, Avatar, Icon, Typography } from "antd";
import { Contact } from "../../models/contact";
import { getRandomColor } from "../../helpers";
const { Text } = Typography;

const ContactCard: React.FC<{
  selectedContact: Contact | null;
}> = ({ selectedContact }) => {
  return (
    <Card className="main-content-contact-details mb-2">
      <Avatar
        size={120}
        icon="user"
        style={{
          backgroundColor: getRandomColor(),
          margin: "0 auto"
        }}
      />
      <Text className="main-content-contact-name">
        {selectedContact
          ? `${selectedContact.first_name} ${selectedContact.last_name}`
          : null}
      </Text>
      <Text>
        {selectedContact && selectedContact.emails.length > 0
          ? selectedContact.emails[0].email
          : null}
      </Text>
      <Text>
        <Icon type="twitter"></Icon>{" "}
        {!selectedContact ? "N/A" : selectedContact?.twitter}
      </Text>
    </Card>
  );
};

export default ContactCard;