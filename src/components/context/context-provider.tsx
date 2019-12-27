import React from "react";
import { Contact } from "../../models/interfaces";
import SelectedContactContext from "./selected-contact.contexts";

class ContactContext extends React.Component {
  state: {
    selectedContact: Contact | null;
    setContact: Function;
  } = {
    selectedContact: null,
    setContact: (contact: Contact | null) => {
      this.setState({ selectedContact: contact });
    },
  };

  render() {
    return (
      <SelectedContactContext.Provider value={this.state}>
        {this.props.children}
      </SelectedContactContext.Provider>
    );
  }
}

export default ContactContext;
