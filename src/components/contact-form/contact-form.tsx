import React, { Component, ChangeEvent } from "react";
import _ from "lodash";
import { Card, Row, Col, Input, Button, Typography, Icon } from "antd";
import ContactCard from "../contact-card/contact-card";
import "./contact-form.css";
import { validateEmail, validatePhone } from "../../helpers";
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
    phoneValue: string;
  } = {
    contact: {},
    emailValue: "",
    phoneValue: "",
    emailError: null,
    phonError: null
  };

  //handle input change
  onInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    let value: any = target.value;

    if (name === "emails" || name === "phone_numbers") {
      value = this.convertStringToObject(value, name.slice(0, -1));
    }

    this.setState({ contact: { ...this.state.contact, [name]: value } });
  };

  onEmailAdd = (e: ChangeEvent) => {
    this.setState({emailError: null});
    const { value } = e.target as HTMLInputElement;
    const {contact} = this.state;

    if (value.slice(-1) === ",") {
      const email = value.slice(0, -1);
      if (!validateEmail(email)) {
        this.setState({ emailError: "Enter a valid email" });
      }else if(contact.emails !== null && _.find(contact.emails, {email})){
        this.setState({ emailError: "You have already entered this email" });
      }else {
        this.setState({
          contact: {
            ...contact,
            emails:
              contact.emails !== undefined ||
              contact.emails != null
                ? [...contact.emails, { email }]
                : [{ email }]
          },
          emailValue: ""
        });
      }
    } else {
      this.setState({ emailValue: value });
    }
  };

  onEmailDelete = (index: number) => {
    const {contact} = this.state;

    if(contact != null){
      this.setState({...this.state.contact.emails?.splice(index, 1)})
    }
  }

  onPhoneNumberAdd = (e: ChangeEvent) => {
    this.setState({phonError: null});
    const { value } = e.target as HTMLInputElement;
    const {contact} = this.state;

    if (value.slice(-1) === ",") {
      const phone_number = value.slice(0, -1);
      if (!validatePhone(phone_number)) {
        this.setState({ phonError: "Enter a valid phone number" });
      }else if(contact.phone_numbers !== null && _.find(contact.phone_numbers, {phone_number})){
        this.setState({ phonError: "You have already entered this phone number" });
      }else{
        this.setState({
          contact: {
            ...contact,
            phone_numbers:
              contact.phone_numbers !== undefined ||
              contact.phone_numbers != null
                ? [...contact.phone_numbers, { phone_number }]
                : [{ phone_number }]
          },
          phoneValue: ""
        });
      }
    } else {
      this.setState({ phoneValue: value });
    }
  };

  onPhoneNumberDelete = (index: number) => {
    const {contact} = this.state;

    if(contact != null){
      this.setState({...this.state.contact.phone_numbers?.splice(index, 1)})
    }
  }

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

  save = () => {

  }

  render() {
    const { contact, emailValue, emailError, phoneValue, phonError } = this.state;
    return (
      <div>
        <Row gutter={20}>
          <Col span={16}>
            <Card title="Fill this form to add a contact">
              <Row gutter={10}>
                <Col span={8} className="custom-input-field">
                  <label>First name</label>
                  <Input
                    className="custom-input"
                    name="first_name"
                    onChange={this.onInputChange}
                    value={contact.first_name}
                  />
                </Col>
                <Col span={8} className="custom-input-field mb-3">
                  <label>Last name</label>
                  <Input
                    className="custom-input"
                    name="last_name"
                    onChange={this.onInputChange}
                    value={contact.last_name}
                  />
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
                  <label>Phone Numbers</label>
                  <div className="tag-container">
                    {contact.phone_numbers
                      ? contact.phone_numbers.map((contact, index) => (
                          <div key={index} className="tag-item">
                            <Text>{contact.phone_number}</Text>
                            <Icon
                              type="close"
                              className="tag-icon"
                              onClick={() => this.onPhoneNumberDelete(index)}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                  <Input
                    className="custom-input"
                    onChange={event => this.onPhoneNumberAdd(event)}
                    value={phoneValue}
                  />
                  {!phonError ? (
                    <Text type="secondary">
                      <i>(Seperate multiple phone numbers with a comma)</i>
                    </Text>
                  ) : (
                    <Text type="danger">
                      <i>{phonError}</i>
                    </Text>
                  )}
                </Col>
                <Col span={12} className="custom-input-field">
                  <label>Emails</label>
                  <div className="tag-container">
                    {contact.emails
                      ? contact.emails.map((contact, index) => (
                          <div key={index} className="tag-item">
                            <Text>{contact.email}</Text>
                            <Icon
                              type="close"
                              className="tag-icon"
                              onClick={() => this.onEmailDelete(index)}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                  <Input
                    className="custom-input"
                    onChange={event => this.onEmailAdd(event)}
                    value={emailValue}
                  />
                  {!emailError ? (
                    <Text type="secondary">
                      <i>(Seperate multiple emails with a comma)</i>
                    </Text>
                  ) : (
                    <Text type="danger">
                      <i>{emailError}</i>
                    </Text>
                  )}
                </Col>
              </Row>
              <Button type="primary" className="save-button">
                Save
              </Button>
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
