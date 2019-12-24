import React from "react";
import "./contact-area.css";
import { Row, Typography, Col } from "antd";
const { Title, Text } = Typography;

class ContactArea extends React.Component {
  state = {
    currentItem: {
        firstname: 'James',
        lastname: 'Annor',
        twitter: 'https://twitter.com/mr-tackie',
        phone_numbers: [
            '0261527546',
            '0505720335',
        ],
        emails: [
            'abonious@gmail.com',
            'niiabonie@gmail.com'
        ]
    }
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
                <Title level={2} className="main-content-header-title">Add new</Title>
                <Text type="secondary">Add a new contact to your address book</Text> 
              </div>
            ) : (
                <div className="main-content-header-items">
                    <Title level={2} className="main-content-header-title">{this.state.currentItem.firstname+' '+this.state.currentItem.lastname}</Title>
                    <div className="buttons">

                    </div>
                </div>
            )}
          </Col>
        </Row>
      </div>
    );
  };
}

export default ContactArea;
