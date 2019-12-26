import { DocumentNode } from "graphql";
import gql from "graphql-tag";

export const GET_CONTACTS_QUERY: DocumentNode = gql`
query getMyContacts{
    contacts{
        id,
        first_name,
        last_name,
        twitter,
        emails{
            email
        },
        phone_numbers{
            phone_number
        }
    }
}
`;

export const UPDATE_CONTACT: DocumentNode = gql`
mutation updateUser($id: Int!, $first_name: String!, $last_name: String! $twitter: String){
    update_contacts(where: {id: {_eq: $id}}, _set: {first_name: $first_name, last_name: $last_name, twitter: $twitter}){
        affected_rows
    }
}
`;