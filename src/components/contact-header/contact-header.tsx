import React, { useContext } from "react";
import { Row, Col, Popover, Typography, Popconfirm } from "antd";
import IconButton from "../icon-button/icon-button";
import SelectedContactContext from "../context/selected-contact.contexts";
import { useMutation } from "react-apollo";
import { REMOVE_CONTACT, GET_CONTACTS_QUERY } from "../../queries";
import { Contact } from "../../models/interfaces";
const { Title, Text } = Typography;

const ContactHeader: React.FC<{
  twitterLink?: string | null;
}> = ({twitterLink}) => {
  const { selectedContact, setContact } = useContext(SelectedContactContext);
  const [removeContact, { loading }] = useMutation(REMOVE_CONTACT);

  const _handleDelete = () => {
    if (selectedContact != null) {
      removeContact({
        variables: { id: selectedContact.id },
        optimisticResponse: null,
        update: cache => {
          const existingContacts: any = cache.readQuery({
            query: GET_CONTACTS_QUERY
          });
          const newContacts = existingContacts.contacts.filter(
            (contact: Contact) => contact.id !== selectedContact.id
          );
          setContact(null);
          cache.writeQuery({
            query: GET_CONTACTS_QUERY,
            data: { contacts: newContacts }
          });
        }
      });
    }
  };

  return (
    <Row className="main-content-header">
      <Col span={24}>
        {selectedContact == null ? (
          <div>
            <Title level={2} className="main-content-header-title">
              Add new
            </Title>
            <Text type="secondary">Add a new contact to your address book</Text>
          </div>
        ) : (
          <div className="main-content-header-items">
            <Title level={2} className="main-content-header-title">
              {selectedContact.first_name + " " + selectedContact.last_name}
            </Title>
            <div className="buttons">
              <Popconfirm
                placement="rightBottom"
                title="Are you sure you want to delete this contact?"
                onConfirm={_handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <IconButton icon="delete" color="red" loading={loading} />
              </Popconfirm>
              {twitterLink ? (
                <Popover content={selectedContact.twitter} placement="bottom">
                  <a
                    href={twitterLink != null ? twitterLink : "#"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IconButton icon="twitter" color="#00aced" />
                  </a>
                </Popover>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ContactHeader;
