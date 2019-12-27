import React from 'react';
import { Contact } from '../../models/interfaces';


const defaultState : { selectedContact: Contact | null, setContact: Function} = {
    selectedContact: null,
    setContact: () => {
        
    }
}

const SelectedContactContext = React.createContext(defaultState);
export default SelectedContactContext;