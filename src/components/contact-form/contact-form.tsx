import React, { Component, ChangeEvent } from "react";
import _ from "lodash";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Icon,
  notification
} from "antd";
import ContactCard from "../contact-card/contact-card";
import "./contact-form.css";
import { validateEmail, validatePhone } from "../../helpers";
import { Mutation } from "react-apollo";
import { ADD_CONTACT, GET_CONTACTS_QUERY } from "../../queries";
const { Text } = Typography;

class ContactForm extends Component {
  state: {
    contact: {
      first_name?: string;
      last_name?: string;
      twitter?: string;
      emails?: any[];
      phone_numbers?: any[];
    };
    emailValue: string;
    emailError: string | null;
    phonError: string | null;
    fNameError: string | null;
    lNameError: string | null;
    phoneValue: string;
  } = {
    contact: {},
    emailValue: "",
    phoneValue: "",
    emailError: null,
    phonError: null,
    fNameError: null,
    lNameError: null
  };

  //handle input change
  onInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    let value: any = target.value;

    if (name === "first_name") {
      this.setState({ fNameError: null });
    } else if (name === "last_name") {
      this.setState({ lNameError: null });
    }

    this.setState({ contact: { ...this.state.contact, [name]: value } });
  };

  onEmailInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    this.setState({ emailValue: value });
  };

  onEmailAdd = (e: any) => {
    this.setState({ emailError: null });
    const { value } = e.target as HTMLInputElement;
    const { contact } = this.state;

    const email = value;
    if (!validateEmail(email)) {
      this.setState({ emailError: "Enter a valid email" });
    } else if (contact.emails !== null && _.find(contact.emails, { email })) {
      this.setState({ emailError: "You have already entered this email" });
    } else {
      this.setState({
        contact: {
          ...contact,
          emails:
            contact.emails !== undefined || contact.emails != null
              ? [...contact.emails, { email }]
              : [{ email }]
        },
        emailValue: ""
      });
    }
  };

  onEmailDelete = (index: number) => {
    const { contact } = this.state;

    if (contact != null) {
      this.setState({ ...this.state.contact.emails?.splice(index, 1) });
    }
  };

  onPhoneInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    this.setState({ phoneValue: value });
  };

  onPhoneNumberAdd = (e: any) => {
    this.setState({ phonError: null });
    const { value } = e.target as HTMLInputElement;
    const { contact } = this.state;

    const phone_number = value;
    if (!validatePhone(phone_number)) {
      this.setState({ phonError: "Enter a valid phone number" });
    } else if (
      contact.phone_numbers !== null &&
      _.find(contact.phone_numbers, { phone_number })
    ) {
      this.setState({
        phonError: "You have already entered this phone number"
      });
    } else {
      this.setState({
        contact: {
          ...contact,
          phone_numbers:
            contact.phone_numbers !== undefined || contact.phone_numbers != null
              ? [...contact.phone_numbers, { phone_number }]
              : [{ phone_number }]
        },
        phoneValue: ""
      });
    }
  };

  onPhoneNumberDelete = (index: number) => {
    const { contact } = this.state;

    if (contact != null) {
      this.setState({ ...this.state.contact.phone_numbers?.splice(index, 1) });
    }
  };

  //convert string to array of objects
  convertStringToObject = (value: string, type: string) => {
    const items = value.trim().split(",");
    const result: {}[] = [];

    for (let item of items) {
      if (item !== "") {
        const obj = {
          [type]: item
        };

        result.push(obj);
      }
    }

    return result;
  };

  save = (mutateFunction: Function) => {
    const { emails, first_name, last_name, phone_numbers } = this.state.contact;
    let hasErrors = false;

    if (first_name === undefined || first_name === "") {
      hasErrors = true;
      this.setState({ fNameError: "Enter a first name" });
    }

    if (last_name === undefined || last_name === "") {
      hasErrors = true;
      this.setState({ lNameError: "Enter a last name" });
    }

    if (emails === undefined || emails?.length === 0) {
      hasErrors = true;
      this.setState({ emailError: "Provide at least one email address" });
    }

    if (phone_numbers === undefined || phone_numbers?.length === 0) {
      hasErrors = true;
      this.setState({ phonError: "Provide at least one phone number" });
    }

    if (!hasErrors) {
      mutateFunction();
    }
  };

  onContactAdded = (cache: any, data: any) => {
    notification.open({
      message: "Done",
      description: "Contact has been updated"
    });

    const existingContacts: any = cache.readQuery({
      query: GET_CONTACTS_QUERY
    });
    cache.writeQuery({
      query: GET_CONTACTS_QUERY,
      data: {
        contacts: [
          data.insert_contacts.returning[0],
          ...existingContacts.contacts
        ]
      }
    });
    this.setState({
      contact: {},
      emailValue: "",
      phoneValue: "",
      emailError: null,
      phonError: null,
      fNameError: null,
      lNameError: null
    });
  };

  render() {
    const {
      contact,
      emailValue,
      emailError,
      phoneValue,
      phonError,
      fNameError,
      lNameError
    } = this.state;
    return (
      <div>
        <Row gutter={20}>
          <Col span={16}>
            <Card title="Fill this form to add a contact">
              <Row gutter={10}>
                <Col span={8} className="custom-input-field">
                  <label>
                    First name <Text type="danger">*</Text>
                  </label>
                  <Input
                    className="custom-input"
                    name="first_name"
                    onChange={this.onInputChange}
                    value={contact.first_name}
                  />
                  <Text type="danger">
                    <i>{fNameError}</i>
                  </Text>
                </Col>
                <Col span={8} className="custom-input-field mb-3">
                  <label>
                    Last name <Text type="danger">*</Text>
                  </label>
                  <Input
                    className="custom-input"
                    name="last_name"
                    onChange={this.onInputChange}
                    value={contact.last_name}
                  />
                  <Text type="danger">
                    <i>{lNameError}</i>
                  </Text>
                </Col>
                <Col span={8} className="custom-input-field">
                  <label>Twitter</label>
                  <Input
                    className="custom-input"
                    name="twitter"
                    onChange={this.onInputChange}
                    value={contact.twitter}
                  />
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12} className="custom-input-field">
                  <label>
                    Phone Numbers <Text type="danger">*</Text>
                  </label>
                  <div className="tag-container">
                    {contact.phone_numbers &&
                    contact.phone_numbers.length > 0 ? (
                      contact.phone_numbers.map((contact, index) => (
                        <div key={index} className="tag-item">
                          <Text>{contact.phone_number}</Text>
                          <Icon
                            type="close"
                            className="tag-icon"
                            onClick={() => this.onPhoneNumberDelete(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <Button disabled type="dashed">
                        No numbers added
                      </Button>
                    )}
                  </div>
                  <Input
                    className="custom-input"
                    onChange={event => this.onPhoneInputChange(event)}
                    value={phoneValue}
                    onPressEnter={event => this.onPhoneNumberAdd(event)}
                  />
                  {!phonError ? (
                    <Text type="secondary">
                      <i>(Enter a number and hit Enter to add)</i>
                    </Text>
                  ) : (
                    <Text type="danger">
                      <i>{phonError}</i>
                    </Text>
                  )}
                </Col>
                <Col span={12} className="custom-input-field">
                  <label>
                    Emails <Text type="danger">*</Text>
                  </label>
                  <div className="tag-container">
                    {contact.emails && contact.emails.length > 0 ? (
                      contact.emails.map((contact, index) => (
                        <div key={index} className="tag-item">
                          <Text>{contact.email}</Text>
                          <Icon
                            type="close"
                            className="tag-icon"
                            onClick={() => this.onEmailDelete(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <Button disabled type="dashed">
                        No emails added
                      </Button>
                    )}
                  </div>
                  <Input
                    className="custom-input"
                    onChange={event => this.onEmailInputChange(event)}
                    value={emailValue}
                    onPressEnter={event => this.onEmailAdd(event)}
                  />
                  {!emailError ? (
                    <Text type="secondary">
                      <i>(Enter an email and hit Enter to add)</i>
                    </Text>
                  ) : (
                    <Text type="danger">
                      <i>{emailError}</i>
                    </Text>
                  )}
                </Col>
              </Row>
              <Mutation
                mutation={ADD_CONTACT}
                variables={contact}
                update={(cache: any, { data }: any) => {
                  this.onContactAdded(cache, data);
                }}
              >
                {(postMutation: Function, mutationObject: any) => (
                  <div>
                    <Button
                      type="primary"
                      className="save-button"
                      loading={mutationObject.loading}
                      onClick={() => this.save(postMutation)}
                    >
                      Save
                    </Button>
                    {mutationObject.error
                      ? notification.error({
                          message: "Error",
                          description: "Could not save the contact"
                        })
                      : ""}
                  </div>
                )}
              </Mutation>
            </Card>
          </Col>
          <Col span={8}>
            <ContactCard selectedContact={contact} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ContactForm;
