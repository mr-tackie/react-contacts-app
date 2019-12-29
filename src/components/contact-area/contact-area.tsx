import React, { ChangeEvent, useEffect, useState, useContext } from "react";
import "./contact-area.css";
import _ from "lodash";
import {
  Row,
  Typography,
  Col,
  Card,
  Icon,
  Input,
  Button,
  notification,
  Popconfirm
} from "antd";
import SelectedContactContext from "../context/selected-contact.contexts";
import { useMutation, useQuery } from "react-apollo";
import {
  UPDATE_CONTACT,
  GET_CONTACTS_QUERY,
  GET_TWITTER,
  REMOVE_EMAIL,
  REMOVE_PHONE_NUMBER,
  ADD_PHONE_NUMBER,
  UPDATE_PHONE_NUMBER,
  ADD_EMAIL,
  UPDATE_EMAIL
} from "../../queries";
import { Contact, PhoneNumber, Email } from "../../models/interfaces";
import ContactsContext from "../context/contacts.context";
import ContactHeader from "../contact-header/contact-header";
import ContactCard from "../contact-card/contact-card";
import ContactForm from "../contact-form/contact-form";
import Fab from "../fab/fab";
import { validateEmail, validatePhone } from "../../helpers";
const { Title, Text } = Typography;

const ContactArea: React.FC = () => {
  const { selectedContact, setContact } = useContext(SelectedContactContext);

  const { contacts } = React.useContext(ContactsContext);

  //local state :: convert to class component. using too many hooks
  const [hasChanged, setHasChanged] = useState(false);
  const [trackedState, setTrackedState] = useState();
  const [twitterLink, setTwitterLink] = useState();
  const [isAddingNumber, setIsAddingNumber] = useState(false);
  const [isAddingEmail, setIsAddingEmail] = useState(false);
  const [addNumber, setAddNumber] = useState();
  const [addEmail, setAddEmail] = useState();
  const [addEmailError, setAddEmailError] = useState();
  const [addPhoneError, setAddPhoneError] = useState();

  //mutations for basic CRUD
  const [updateUserMutation, { loading }] = useMutation(UPDATE_CONTACT);
  const [removePhoneNumber] = useMutation(REMOVE_PHONE_NUMBER);
  const [removeEmail] = useMutation(REMOVE_EMAIL);
  const [addPhoneNumber, addPhoneNumberMutation] = useMutation(ADD_PHONE_NUMBER);
  const [addEmailAddr, addEmailAddrMutation] = useMutation(ADD_EMAIL);
  const [updatePhoneNumber] = useMutation(UPDATE_PHONE_NUMBER);
  const [updateEmail] = useMutation(UPDATE_EMAIL);

  let unTrackedState: Contact | undefined;

  const query = useQuery(GET_TWITTER, {
    variables: {
      username: selectedContact ? selectedContact.twitter : null
    }
  });

  useEffect(() => {
    if (selectedContact) {
      setTrackedState({ ...selectedContact });
    }

    if (query.data) {
      setTwitterLink(query.data.get_twitter);
    }
  }, [selectedContact, query]);

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

  const onEditInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value: any = target.value;
    const name = target.name;

    if (name === "email") {
      setAddEmail(value);
    } else if (name === "phone") {
      setAddNumber(value);
    }
  };

  //reset input to original data
  const reset = () => {
    setTrackedState(_.find(contacts, ["id", trackedState?.id]));
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

  //add a phone number for the contact
  const onPhoneAdd = () => {
    setAddPhoneError(null);

    if (selectedContact) {
      if (!validatePhone(addNumber)) {
        setAddPhoneError("Enter a valid phone number");
      } else {
        addPhoneNumber({
          variables: {
            contact_id: selectedContact?.id,
            phone_number: addNumber
          },
          optimisticResponse: null,
          update: (cache, { data }) => {
            notification.open({
              message: "Done",
              description: "Phone number has been added"
            });

            const existingContacts: any = cache.readQuery({
              query: GET_CONTACTS_QUERY
            });
            const newContacts = existingContacts.contacts.map(
              (contact: Contact) => {
                if (selectedContact && contact.id === selectedContact.id) {
                  const phone_number = data.insert_phone_numbers.returning[0];
                  contact.phone_numbers = [
                    ...contact.phone_numbers,
                    {
                      __typename: 'phone_numbers_insert_input',
                      id: phone_number.id,
                      phone_number: phone_number.phone_number,
                      contact_id: phone_number.contact_id
                    }
                  ];
                  setContact(contact);
                }
                setIsAddingNumber(false);
                return contact;
              }
            );
            cache.writeQuery({
              query: GET_CONTACTS_QUERY,
              data: { contacts: newContacts }
            });
          }
        });
      }
    }
  };

  //delete a phone number
  const onNumberDelete = (id: number | undefined) => {
    if (id) {
      removePhoneNumber({
        variables: { id: id },
        optimisticResponse: null,
        update: cache => {
          const existingContacts: any = cache.readQuery({
            query: GET_CONTACTS_QUERY
          });
          const newContacts = existingContacts.contacts.map(
            (contact: Contact) => {
              if (selectedContact && contact.id === selectedContact.id) {
                contact.phone_numbers = contact.phone_numbers.filter(
                  phone_number => phone_number.id !== id
                );

                setContact(contact);
              }
              return contact;
            }
          );
          cache.writeQuery({
            query: GET_CONTACTS_QUERY,
            data: { contacts: newContacts }
          });
        }
      });
    }
  };

  const onNumberEdit = (number: PhoneNumber, new_number: string) => {
    if(validatePhone(new_number)){
      updatePhoneNumber({
        variables: {
          id: number.id,
          phone_number: new_number
        },
        optimisticResponse: null,
        update: cache => {
            notification.success({
              message: "Phone number edited",
            });

            const existingContacts: any = cache.readQuery({
              query: GET_CONTACTS_QUERY
            });
            const newContacts = existingContacts.contacts.map(
              (contact: Contact) => {
                if (selectedContact && contact.id === selectedContact.id) {
                  contact.phone_numbers.map((phone_number: PhoneNumber) => {
                    if(phone_number.id === number.id){
                      phone_number.phone_number = new_number
                    }

                    return phone_number;
                  });
                  setContact(contact);
                }
                return contact;
              }
            );
            cache.writeQuery({
              query: GET_CONTACTS_QUERY,
              data: { contacts: newContacts }
            });
          }
      })
    }else{
      notification.error({
        message: 'Invalid phone number provided',
        placement: "bottomRight",
        duration: 1.5,
     })
    }
  };

  const onEmailAdd = () => {
    setAddEmailError(null);

    if (selectedContact) {
      if (!validateEmail(addEmail)) {
        setAddEmailError("Enter a valid phone number");
      } else {
        addEmailAddr({
          variables: {
            contact_id: selectedContact?.id,
            email: addEmail
          },
          optimisticResponse: null,
          update: (cache, { data }) => {
            notification.open({
              message: "Done",
              description: "Phone number has been added"
            });

            const existingContacts: any = cache.readQuery({
              query: GET_CONTACTS_QUERY
            });
            const newContacts = existingContacts.contacts.map(
              (contact: Contact) => {
                if (selectedContact && contact.id === selectedContact.id) {
                  const email = data.insert_emails.returning[0];
                  contact.emails = [
                    ...contact.emails,
                    {
                      __typename: 'emails_insert_input',
                      id: email.id,
                      email: email.email
                    }
                  ];
                  setContact(contact);
                }
                setIsAddingEmail(false);
                return contact;
              }
            );
            cache.writeQuery({
              query: GET_CONTACTS_QUERY,
              data: { contacts: newContacts }
            });
          }
        });
      }
    }
  };

  const onEmailEdit = (email: Email, new_email: string) => {
    if(validateEmail(new_email)){
      updateEmail({
        variables: {
          id: email.id,
          email: new_email
        },
        optimisticResponse: null,
        update: cache => {
            notification.success({
              message: "Email address updated",
            });

            const existingContacts: any = cache.readQuery({
              query: GET_CONTACTS_QUERY
            });
            const newContacts = existingContacts.contacts.map(
              (contact: Contact) => {
                if (selectedContact && contact.id === selectedContact.id) {
                  contact.emails.map((email_addr: Email) => {
                    if(email.id === email_addr.id){
                      email_addr.email = new_email
                    }

                    return email_addr;
                  });
                  setContact(contact);
                }
                return contact;
              }
            );
            cache.writeQuery({
              query: GET_CONTACTS_QUERY,
              data: { contacts: newContacts }
            });
          }
      })
    }else{
      notification.error({
        message: 'Invalid email address provided',
        placement: "bottomRight",
        duration: 1.5,
     })
    }
  }

  //delete an email
  const onEmailDelete = (id: number | undefined) => {
    if (id) {
      removeEmail({
        variables: { id: id },
        optimisticResponse: null,
        update: cache => {
          const existingContacts: any = cache.readQuery({
            query: GET_CONTACTS_QUERY
          });
          const newContacts = existingContacts.contacts.map(
            (contact: Contact) => {
              if (selectedContact && contact.id === selectedContact.id) {
                contact.emails = contact.emails.filter(
                  email => email.id !== id
                );
              }
              return contact;
            }
          );
          cache.writeQuery({
            query: GET_CONTACTS_QUERY,
            data: { contacts: newContacts }
          });
        }
      });
    }
  };

  //render items based on condition
  const renderItems = () => {
    return (
      <div>
        <ContactHeader twitterLink={twitterLink} />
        <div className="main-content-body">
          {selectedContact && trackedState ? (
            <div className="contact-details-area">
              <Row gutter={20}>
                <Col span={8}>
                  <Title level={4}>Contact Info</Title>
                  <ContactCard
                    selectedContact={selectedContact}
                    twitterLink={twitterLink}
                  />
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
                        type={isAddingNumber ? "close" : "plus"}
                        key="phone_add"
                        onClick={() => setIsAddingNumber(!isAddingNumber)}
                      ></Icon>
                    ]}
                  >
                    {selectedContact.phone_numbers.map((item, index) => {
                      return (
                        <div className="deletable-item" key={index}>
                          <div style={{ width: "90%" }}>
                            <Text
                              editable={{ onChange: (val: string) => onNumberEdit(item, val) }}
                              className="deletable-text"
                            >
                              {item.phone_number}
                            </Text>
                          </div>
                          {selectedContact.phone_numbers.length > 1 ? (
                            <Popconfirm
                              placement="rightBottom"
                              title="Are you sure you want to remove this phone number?"
                              onConfirm={() => onNumberDelete(item.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                icon="delete"
                                type="danger"
                                shape="circle"
                                size="small"
                              />
                            </Popconfirm>
                          ) : null}
                        </div>
                      );
                    })}
                    {isAddingNumber ? (
                      <div className="custom-input-field">
                        <label>Phone</label>
                        <Row>
                          <Col span={20}>
                            <Input
                              className="custom-input"
                              value={addNumber}
                              name="phone"
                              onChange={onEditInputChange}
                            />
                          </Col>
                          <Button
                            type="ghost"
                            icon="check"
                            style={{ float: "right" }}
                            loading={addPhoneNumberMutation.loading}
                            onClick={onPhoneAdd}
                          />
                        </Row>
                        {addPhoneError ? (
                          <Text type="danger">
                            <i>{addPhoneError}</i>
                          </Text>
                        ) : null}
                      </div>
                    ) : null}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    title="Email addresses"
                    headStyle={{ backgroundColor: "#fafafa" }}
                    actions={[
                      <Icon
                        type={isAddingEmail ? "close" : "plus"}
                        key="email_add"
                        onClick={() => setIsAddingEmail(!isAddingEmail)}
                      ></Icon>
                    ]}
                  >
                    {selectedContact.emails.map((item, index) => {
                      return (
                        <div className="deletable-item" key={index}>
                          <Text editable={{onChange: (val) => onEmailEdit(item, val)}} className="deletable-text">
                            {item.email}
                          </Text>
                          {selectedContact.emails.length > 1 ? (
                            <Popconfirm
                              placement="rightBottom"
                              title="Are you sure you want to remove this email address?"
                              onConfirm={() => onEmailDelete(item.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                icon="delete"
                                type="danger"
                                shape="circle"
                                size="small"
                              />
                            </Popconfirm>
                          ) : null}
                        </div>
                      );
                    })}
                    {isAddingEmail ? (
                      <div className="custom-input-field">
                        <label>Email</label>
                        <Row>
                          <Col span={20}>
                            <Input
                              className="custom-input"
                              value={addEmail}
                              name="email"
                              onChange={onEditInputChange}
                            />
                          </Col>
                          <Button
                            type="ghost"
                            icon="check"
                            style={{ float: "right" }}
                            onClick={onEmailAdd}
                            loading={addEmailAddrMutation.loading}
                          />
                        </Row>
                        {addPhoneError ? (
                          <Text type="danger">
                            <i>{addEmailError}</i>
                          </Text>
                        ) : null}
                      </div>
                    ) : null}
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <ContactForm />
          )}
        </div>
        {selectedContact ? (
          <Fab
            icon="user-add"
            onClick={() => setContact(null)}
            tooltipText="Add new contact"
          />
        ) : (
          ""
        )}
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};

export default ContactArea;
