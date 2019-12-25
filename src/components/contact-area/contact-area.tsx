import React from "react";
import "./contact-area.css";
import {
  Row,
  Typography,
  Col,
  Popover,
  Avatar,
  Card,
  Icon,
  Input,
  Button
} from "antd";
import IconButton from "../icon-button/icon-button";
const { Title, Text, Paragraph } = Typography;

interface ContactScreenState {
  currentItem?: {
    firstname: string;
    lastname: string;
    twitter?: string;
    phone_numbers: any[];
    emails: any[];
  } | null;
}

class ContactArea extends React.Component {
  state: ContactScreenState = {
    currentItem: null
  };

  render() {
    return <div>{this._renderItems()}</div>;
  }

  _renderItems = () => {
    return (
      <div>
        <Row className="main-content-header">
          <Col span={24}>
            {this.state.currentItem == null ? (
              <div>
                <Title level={2} className="main-content-header-title">
                  Add new
                </Title>
                <Text type="secondary">
                  Add a new contact to your address book
                </Text>
              </div>
            ) : (
              <div className="main-content-header-items">
                <Title level={2} className="main-content-header-title">
                  {this.state.currentItem.firstname +
                    " " +
                    this.state.currentItem.lastname}
                </Title>
                <div className="buttons">
                  <Popover content="delete">
                    <IconButton icon="delete" color="red" />
                  </Popover>
                  <Popover content="favorite">
                    <IconButton icon="star" />
                  </Popover>
                  {this.state.currentItem.twitter != null ? (
                    <Popover content={this.state.currentItem.twitter}>
                      <IconButton icon="twitter" color="#00aced" />
                    </Popover>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </Col>
        </Row>
        <div className="main-content-body">
          {this.state.currentItem != null ? (
            <div>
              <Row gutter={20}>
                <Col span={8}>
                  <Title level={4}>Contact Info</Title>
                  <Card className="main-content-contact-details mb-2">
                    <Avatar size={120} icon="user" />
                    <Text className="main-content-contact-name">
                      James Annor
                    </Text>
                    <Text>jamesannor@gmail.com</Text>
                    <Text>
                      <Icon type="twitter"></Icon> jamesannor
                    </Text>
                  </Card>
                </Col>
                <Col span={16}>
                  <Title level={4}>Edit details</Title>
                  <Row gutter={16}>
                    <Col span={12} className="custom-input-field">
                      <label>First name</label>
                      <Input value={"James"} className="custom-input" />
                    </Col>
                    <Col span={12} className="custom-input-field mb-3">
                      <label>Last name</label>
                      <Input value={"Annor"} className="custom-input" />
                    </Col>
                    <Col span={24} className="custom-input-field">
                      <label>Twitter</label>
                      <Input value={"jamesannor"} className="custom-input" />
                    </Col>
                  </Row>
                  <Button type="primary" className="save-button">
                    Save
                  </Button>
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
                    {this.state.currentItem.phone_numbers.map(item => {
                      return <Paragraph>{item}</Paragraph>;
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
                    {this.state.currentItem.emails.map(item => {
                      return <Paragraph>{item}</Paragraph>;
                    })}
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
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
                  <label>
                    Phone Numbers{" "}
                    <i>(Seperate different numbers with a comma)</i>
                  </label>
                  <Input className="custom-input" />
                </Col>
                <Col span={12} className="custom-input-field">
                  <label>
                    Emails <i>(Seperate different emails with a comma)</i>
                  </label>
                  <Input className="custom-input" />
                </Col>
              </Row>
              <Button type="primary" className="save-button">
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };
}

export default ContactArea;
