import { gql } from "@apollo/client";

export const registerMutation = gql`
mutation register($email: String!, $password: String!, $name: String!) {
  register(object:{ email: $email, password: $password, name: $name }) {
    name
    email
    token
  }
}
`;
