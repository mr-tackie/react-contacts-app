import React, { useContext, useEffect } from "react";
import "./sidebar.css";
import { Row, Input, Tabs, Empty, Skeleton, Alert, notification } from "antd";
import ContactItem from "../contact-item/contact-item";
import {useQuery} from 'react-apollo';
import { GET_CONTACTS_QUERY } from "../../queries";
import { Contact } from "../../models/contact";
import UserDetails from "../user-details/user-details";
import ContactsContext from "../context/contacts.context";
const { Search } = Input;
const { TabPane } = Tabs;

const Sidebar: React.FC = () => {
  const {data, loading, error} = useQuery(GET_CONTACTS_QUERY);
  const {contacts, setContacts} = useContext(ContactsContext)

  const handleLoadingState = () => {
      if(loading){
        return <Skeleton avatar paragraph={{rows: 1}}/> 
      }else if(!loading && data){
          if(contacts.length === 0){
              return <Empty/>
          }else{
              return contacts.map((item: Contact) => {
                  return <ContactItem key={item.id} contact={item}/>
              })
          }
      }else if(error){
        notification.error({
          message: 'Error',
          description: 'There was a problem fetching contacts'
        })
      }
  }

  useEffect(() => {
    if(data && data.contacts)
    {
      setContacts(data.contacts);
    }
  }, [data, setContacts]);

  return (
    <div className="sidebar-container">
      <UserDetails/>
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
