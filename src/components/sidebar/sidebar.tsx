import React, { useContext, useEffect, ChangeEvent, useState } from "react";
import "./sidebar.css";
import { Row, Input, Tabs, Empty, Skeleton, notification } from "antd";
import ContactItem from "../contact-item/contact-item";
import { useQuery } from "react-apollo";
import { GET_CONTACTS_QUERY } from "../../queries";
import { Contact } from "../../models/interfaces";
import UserDetails from "../user-details/user-details";
import ContactsContext from "../context/contacts.context";
const { Search } = Input;
const { TabPane } = Tabs;

const Sidebar: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CONTACTS_QUERY);
  const { contacts, setContacts } = useContext(ContactsContext);
  const [searchResults, setSearchResults] = useState();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    if (value === "") {
      setHasSearched(false);
    } else {
      const results = contacts.filter(
        (contact: Contact) =>
          (contact.first_name + " " + contact.last_name)
            .toLowerCase()
            .search(value.toLowerCase()) !== -1
      );
      setHasSearched(true);
      setSearchResults(results);
    }
  };

  const handleLoadingState = () => {
    if (loading) {
      return <Skeleton avatar paragraph={{ rows: 1 }} />;
    } else if (!loading && data) {
      if (contacts.length === 0) {
        return <Empty />;
      } else {
        if (hasSearched) {
          return searchResults.map((item: Contact) => {
            return <ContactItem key={item.id} contact={item} />;
          });
        }

        return contacts.map((item: Contact) => {
          return <ContactItem key={item.id} contact={item} />;
        });
      }
    } else if (error) {
      notification.error({
        message: "Error",
        description: "There was a problem fetching contacts"
      });
    }
  };

  useEffect(() => {
    if (data && data.contacts) {
      setContacts(data.contacts);
    }
  }, [data, setContacts]);

  return (
    <div className="sidebar-container">
      <UserDetails />
      <Row className="recents">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Contacts" key="1">
            <Search
              placeholder="Type a name to search for a contact"
              onChange={e => handleSearch(e)}
            />
            <div className="contacts">{handleLoadingState()}</div>
          </TabPane>
        </Tabs>
      </Row>
    </div>
  );
};

export default Sidebar;
