import React from "react";
import { Contact } from "../../models/interfaces";
import ContactsContext from "./contacts.context";

class ContactContext extends React.Component {
  state: {
    contacts: Contact[];
    setContacts: Function;
  } = {
    contacts: [],
    setContacts: (contacts: Contact[]) => {
        this.setState({contacts})
    }
  };

  render() {
    return (
      <ContactsContext.Provider value={this.state}>
        {this.props.children}
      </ContactsContext.Provider>
    );
  }
}

export default ContactContext;
