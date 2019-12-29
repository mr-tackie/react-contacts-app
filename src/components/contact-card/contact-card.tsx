import React from "react";
import { Card, Avatar, Icon, Typography } from "antd";
import { Contact } from "../../models/interfaces";
const { Text } = Typography;

const ContactCard: React.FC<{
  selectedContact:
    | Contact
    | null
    | {
        first_name?: string;
        last_name?: string;
        twitter?: string;
        emails?: any[];
        phone_numbers?: any[];
      };
  twitterLink?: string | null;
}> = ({ selectedContact, twitterLink }) => {
  return (
    <Card className="main-content-contact-details mb-2">
      <Avatar
        size={120}
        icon="user"
        style={{
          backgroundColor: "#03a9f4",
          margin: "0 auto"
        }}
      />
      <Text className="main-content-contact-name">
        {selectedContact
          ? `${selectedContact.first_name ? selectedContact.first_name : ""} ${
              selectedContact.last_name ? selectedContact.last_name : ""
            }`
          : "N/A"}
      </Text>
      <Text>
        {selectedContact &&
        selectedContact.emails &&
        selectedContact.emails.length > 0
          ? selectedContact.emails[0].email
          : "N/A"}
      </Text>
      <Text>
        <Icon type="twitter"></Icon>{" "}
        {!selectedContact || selectedContact.twitter === "" ? (
          "N/A"
        ) : (
          <a
            href={twitterLink ? twitterLink : undefined}
            rel="noopener noreferrer"
            target="_blank"
          >
            {selectedContact?.twitter}
          </a>
        )}
      </Text>
    </Card>
  );
};

export default ContactCard;
