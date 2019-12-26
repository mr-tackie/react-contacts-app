import React from 'react';
import { Contact } from '../../models/contact';


const defaultState : { contacts: Contact[], setContacts: Function} = {
    contacts: [],
    setContacts: () => {

    }
}

const ContactsContext = React.createContext(defaultState);
export default ContactsContext;