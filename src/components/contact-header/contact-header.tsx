import React, { useContext } from 'react';
import { Row, Col, Popover, Typography, Popconfirm } from 'antd';
import IconButton from '../icon-button/icon-button';
import SelectedContactContext from '../context/selected-contact.contexts';
const { Title, Text} = Typography;

const ContactHeader : React.FC = () => {
    const {selectedContact} = useContext(SelectedContactContext);

    return (
        <Row className="main-content-header">
          <Col span={24}>
            {selectedContact == null ? (
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
                  {selectedContact.first_name + " " + selectedContact.last_name}
                </Title>
                <div className="buttons">
                  <Popconfirm
                    placement="rightBottom"
                    title="Are you sure you want to delete this contact?"
                    onConfirm={() => {
                      alert('You deleted the damn nigga');
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <IconButton icon="delete" color="red"/>
                  </Popconfirm>
                  <Popover content="favorite">
                    <IconButton icon="star" />
                  </Popover>
                  {selectedContact.twitter != null ? (
                    <Popover content={selectedContact.twitter}>
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
    )
}

export default ContactHeader;