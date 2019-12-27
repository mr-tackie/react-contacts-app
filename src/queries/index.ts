import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import {Email, PhoneNumber} from './../models/interfaces';

export const GET_CONTACTS_QUERY: DocumentNode = gql`
  query getMyContacts {
    contacts {
      id
      first_name
      last_name
      twitter
      emails {
        email
      }
      phone_numbers {
        phone_number
      }
    }
  }
`;


export const ADD_CONTACT: DocumentNode = gql`
  mutation addContact(
    $first_name: String!,
    $last_name: String!,
    $twitter: String,
    $emails: [Email]!,
    $phone_numbers: [phone_numbers]!
  ) {
    insert_contacts(object: {
      first_name: $first_name
      last_name: $last_name,
      twitter: $twitter,
      emails: {
        data: $emails
      },
      phone_numbers: {
        data: $phone_numbers
      }
    })
  }
`;

export const UPDATE_CONTACT: DocumentNode = gql`
  mutation updateUser(
    $id: Int!
    $first_name: String!
    $last_name: String!
    $twitter: String
  ) {
    update_contacts(
      where: { id: { _eq: $id } }
      _set: {
        first_name: $first_name
        last_name: $last_name
        twitter: $twitter
      }
    ) {
      affected_rows
    }
  }
`;

export const REMOVE_CONTACT: DocumentNode = gql`
  mutation removeContact($id: Int!) {
    delete_contacts(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const GET_TWITTER: DocumentNode = gql`
  query getTwitter($username: String) {
    get_twitter(username: $username)
  }
`;
