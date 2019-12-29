import { DocumentNode } from "graphql";
import gql from "graphql-tag";

export const GET_CONTACTS_QUERY: DocumentNode = gql`
  query getMyContacts {
    contacts(order_by: {first_name: asc, last_name: asc}) {
      id
      first_name
      last_name
      twitter
      emails {
        id
        email
      }
      phone_numbers {
        id
        phone_number
      }
    }
  }
`;

export const ADD_CONTACT: DocumentNode = gql`
  mutation addContact(
    $first_name: String!
    $last_name: String!
    $twitter: String
    $emails: [emails_insert_input!]!
    $phone_numbers: [phone_numbers_insert_input!]!
  ) {
    insert_contacts(
      objects: {
        first_name: $first_name
        last_name: $last_name
        twitter: $twitter
        emails: { data: $emails }
        phone_numbers: { data: $phone_numbers }
      }
    ) {
      returning {
        last_name
        id
        first_name
        twitter
        emails {
          id
          contact_id
          email
        }
        phone_numbers {
          id
          phone_number
        }
      }
    }
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

export const ADD_PHONE_NUMBER: DocumentNode = gql`
  mutation addPhoneNumber($contact_id: Int!, $phone_number: String!) {
    insert_phone_numbers(
      objects: { contact_id: $contact_id, phone_number: $phone_number }
    ) {
      returning {
        id
        contact_id
        phone_number
      }
    }
  }
`;

export const UPDATE_PHONE_NUMBER: DocumentNode = gql`
  mutation updatePhoneNumber($id: Int!, $phone_number: String!) {
    update_phone_numbers(where: { id: { _eq: $id } }
      _set: {
        phone_number: $phone_number
      }
    ){
      affected_rows
    }
  }
`;

export const REMOVE_PHONE_NUMBER: DocumentNode = gql`
  mutation removePhoneNumber($id: Int!) {
    delete_phone_numbers(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const ADD_EMAIL: DocumentNode = gql`
  mutation addEmail($contact_id: Int!, $email: String!) {
    insert_emails(objects: { contact_id: $contact_id, email: $email }) {
      returning {
        id
        contact_id
        email
      }
    }
  }
`;

export const UPDATE_EMAIL: DocumentNode = gql`
  mutation updateEmail($id: Int!, $email: String!) {
    update_emails(where: { id: { _eq: $id } }
      _set: {
        email: $email
      }
    ){
      affected_rows
    }
  }
`;

export const REMOVE_EMAIL: DocumentNode = gql`
  mutation removeEmail($id: Int!) {
    delete_emails(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const GET_TWITTER: DocumentNode = gql`
  query getTwitter($username: String) {
    get_twitter(username: $username)
  }
`;
