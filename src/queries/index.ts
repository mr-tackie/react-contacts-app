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
