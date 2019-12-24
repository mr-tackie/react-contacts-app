import React from "react";
import "./sidebar.css";
import { Row, Col, Typography, Input, Tabs, Empty } from "antd";
import LetterAvatar from "../letter-avatar/letter-avatar";
import IconButton from "../icon-button/icon-button";
import ContactItem from "../recent-card/contact-item";
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const Sidebar: React.FC = () => {
  const contacts : {name: string, email: string}[] = [{
      name: 'James Annor',
      email: 'jamesannor@gmail.com',
  },{
    name: 'James Annor',
    email: 'jamesannor@gmail.com',
},{
    name: 'James Annor',
    email: 'jamesannor@gmail.com',
},{
    name: 'James Annor',
    email: 'jamesannor@gmail.com',
},{
    name: 'James Annor',
    email: 'jamesannor@gmail.com',
},{
    name: 'James Annor',
    email: 'jamesannor@gmail.com',
},{
    name: 'James Annor',
    email: 'jamesannor@gmail.com',
},]

  return (
    <div className="sidebar-container">
      <Row>
        <Col span={24} className="user-details-container">
          <div className="user-details">
            <LetterAvatar name="John Doe" size="large" />
            <div className="header-name">
              <Title className="header-name__name" level={3}>
                John Doe
              </Title>
              <Text className="header-name__email">johndoe@gmail.com</Text>
            </div>
          </div>
          <IconButton icon="logout" color="#2196F3" />
        </Col>
      </Row>
      <Row className="recents">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Contacts" key="1">
            <Search placeholder="Type a name to search for a contact" />
            <div className="contacts">
                {contacts.length > 0 ? contacts.map((item, index) => (
                    <ContactItem name={item.name} email={item.email} key={index}/>
                )) : <Empty description="No contacts available"/>}
            </div>
          </TabPane>
          <TabPane tab="Favorites" key="2">
            Favorites tab 2
          </TabPane>
        </Tabs>
      </Row>
    </div>
  );
};

export default Sidebar;
