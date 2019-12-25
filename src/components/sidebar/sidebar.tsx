import React from "react";
import "./sidebar.css";
import { Row, Col, Typography, Input, Tabs, Empty, Skeleton, Alert } from "antd";
import LetterAvatar from "../letter-avatar/letter-avatar";
import IconButton from "../icon-button/icon-button";
import ContactItem from "../contact-item/contact-item";
import {useQuery} from 'react-apollo';
import { GET_CONTACTS_QUERY } from "../../queries";
import { Contact } from "../../models/contact";
const { Title, Text } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const Sidebar: React.FC = () => {
  const {data, loading, error} = useQuery(GET_CONTACTS_QUERY);

  const handleLoadingState = () => {
      if(loading){
        return <Skeleton avatar paragraph={{rows: 1}}/> 
      }else if(!loading && data){
          console.log(data);
          if(data.length === 0){
              return <Empty/>
          }else{
              return data.contacts.map((item: Contact) => {
                  return <ContactItem key={item.id} name={item.first_name+' '+item.last_name} email={item.emails[0].email}/>
              })
          }
      }else if(error){
        return <Alert message="There was a problem fetching contacts" type="error" />
      }
  }
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
                {
                handleLoadingState()
                }
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
