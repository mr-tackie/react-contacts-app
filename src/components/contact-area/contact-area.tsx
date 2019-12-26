import React, { ChangeEvent, useEffect, useState, useContext } from "react";
import "./contact-area.css";
import _ from "lodash";
import {
  Row,
  Typography,
  Col,
  Popover,
  Avatar,
  Card,
  Icon,
  Input,
  Button,
  notification
} from "antd";
import IconButton from "../icon-button/icon-button";
import SelectedContactContext from "../context/selected-contact.contexts";
import { useMutation } from "react-apollo";
import { UPDATE_CONTACT, GET_CONTACTS_QUERY } from "../../queries";
import { Contact } from "../../models/contact";
import ContactsContext from "../context/contacts.context";
import ContactHeader from "../contact-header/contact-header";
import ContactCard from "../contact-card/contact-card";
const { Title, Text, Paragraph } = Typography;

const ContactArea: React.FC = () => {
  const { selectedContact, setContact } = useContext(SelectedContactContext);

  const { contacts } = React.useContext(ContactsContext);

  //created local state to check if there was a change in data
  const [hasChanged, setHasChanged] = useState(false);
  const [trackedState, setTrackedState] = useState();

  //mutation to update contact information
  const [updateUserMutation, { error, loading, data }] = useMutation(
    UPDATE_CONTACT
  );

  let unTrackedState: Contact | undefined;

  useEffect(() => {
    if (selectedContact) {
      setTrackedState({ ...selectedContact });
    }
  }, [selectedContact]);

  if (selectedContact) {
    unTrackedState = _.find(contacts, ["id", selectedContact?.id]);
  }

  //handle input change
  const onInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value: any = target.value;
    const name = target.name;

    const newState: any = { ...trackedState, [name]: value };
    if (
      unTrackedState !== null &&
      unTrackedState?.first_name === newState?.first_name &&
      (unTrackedState?.twitter === newState?.twitter ||
        newState.twitter === undefined) &&
      unTrackedState?.last_name === newState?.last_name
    ) {
      setHasChanged(false);
    } else {
      setHasChanged(true);
    }

    setTrackedState(newState);
  };

  //reset input to original data
  const reset = () => {
    setContact(_.find(contacts, ["id", trackedState?.id]));
    setHasChanged(false);
  };

  //save changes to data
  const save = () => {
    updateUserMutation({
      variables: {
        id: trackedState?.id,
        first_name: trackedState?.first_name,
        last_name: trackedState?.last_name,
        twitter: trackedState?.twitter
      },
      optimisticResponse: null,
      //update local cache with updated data
      update: cache => {
        notification.open({
          message: "Done",
          description: "Contact has been updated"
        });

        const existingContacts: any = cache.readQuery({
          query: GET_CONTACTS_QUERY
        });
        const newContacts = existingContacts.contacts.map(
          (contact: Contact) => {
            if (trackedState && contact.id === trackedState.id) {
              const updatedContact = {
                ...contact,
                first_name: trackedState.first_name,
                last_name: trackedState.last_name,
                twitter: trackedState.twitter
              };
              setContact(updatedContact);
              return updatedContact;
            } else {
              return contact;
            }
          }
        );
        cache.writeQuery({
          query: GET_CONTACTS_QUERY,
          data: { contacts: newContacts }
        });
      }
    });
  };

  //render items based on condition
  const renderItems = () => {
    return (
      <div>
        <ContactHeader />
        <div className="main-content-body">
          {selectedContact && trackedState ? (
            <div>
              <Row gutter={20}>
                <Col span={8}>
                  <Title level={4}>Contact Info</Title>
                  <ContactCard selectedContact = {selectedContact}/>
                </Col>
                <Col span={16}>
                  <Title level={4}>Edit details</Title>
                  <Row gutter={16}>
                    <Col span={12} className="custom-input-field">
                      <label>First name</label>
                      <Input
                        value={trackedState.first_name}
                        className="custom-input"
                        onChange={onInputChange}
                        name="first_name"
                      />
                    </Col>
                    <Col span={12} className="custom-input-field mb-3">
                      <label>Last name</label>
                      <Input
                        value={trackedState.last_name}
                        className="custom-input"
                        onChange={onInputChange}
                        name="last_name"
                      />
                    </Col>
                    <Col span={24} className="custom-input-field">
                      <label>Twitter</label>
                      <Input
                        value={
                          trackedState.twitter
                            ? trackedState.twitter
                            : undefined
                        }
                        className="custom-input"
                        onChange={onInputChange}
                        name="twitter"
                      />
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    className="save-button"
                    disabled={!hasChanged}
                    onClick={save}
                    loading={loading}
                  >
                    Save
                  </Button>
                  {hasChanged ? (
                    <Button className="save-button" onClick={reset}>
                      Reset
                    </Button>
                  ) : null}
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={8}>
                  <Card
                    title="Phone numbers"
                    className="mb-1"
                    headStyle={{ backgroundColor: "#fafafa" }}
                    actions={[
                      <Icon
                        type="plus"
                        key="phone_add"
                        onClick={() =>
                          alert("You wanna add some bitch ass number")
                        }
                      ></Icon>
                    ]}
                  >
                    {selectedContact.phone_numbers.map((item, index) => {
                      return (
                        <Paragraph key={index}>{item.phone_number}</Paragraph>
                      );
                    })}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    title="Email addresses"
                    headStyle={{ backgroundColor: "#fafafa" }}
                    actions={[
                      <Icon
                        type="plus"
                        key="email_add"
                        onClick={() =>
                          alert("You wanna add some bitch ass email")
                        }
                      ></Icon>
                    ]}
                  >
                    {selectedContact.emails.map((item, index) => {
                      return <Paragraph key={index}>{item.email}</Paragraph>;
                    })}
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <Row>
                <Col span={18}>
                  <Card title="Fill this form to add a contact">
                    <Row gutter={20}>
                      <Col span={8} className="custom-input-field">
                        <label>First name</label>
                        <Input className="custom-input" />
                      </Col>
                      <Col span={8} className="custom-input-field mb-3">
                        <label>Last name</label>
                        <Input className="custom-input" />
                      </Col>
                      <Col span={8} className="custom-input-field">
                        <label>Twitter</label>
                        <Input className="custom-input" />
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12} className="custom-input-field">
                        <label>Phone Numbers</label>
                        <Input className="custom-input" />
                        <Text type="secondary">
                          <i>(Seperate multiple numbers with a comma)</i>
                        </Text>
                      </Col>
                      <Col span={12} className="custom-input-field">
                        <label>Emails</label>
                        <Input className="custom-input" />
                        <Text type="secondary">
                          <i>(Seperate multiple emails with a comma)</i>
                        </Text>
                      </Col>
                    </Row>
                    <Button type="primary" className="save-button">
                      Save
                    </Button>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};

export default ContactArea;
